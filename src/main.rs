use axum::{
    extract::Multipart,
    response::Html,
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use std::{
    fs,
    net::SocketAddr,
    path::{Path, PathBuf},
};
use tokio::{fs as tokio_fs, io::AsyncWriteExt};
use tower_http::{cors::CorsLayer, services::ServeDir};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use uuid::Uuid;
use tokio::net::TcpListener;

#[derive(Serialize)]
struct GalleryItem {
    name: String,
    url: String,
}

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Ensure gallery directory exists
    if let Err(e) = tokio_fs::create_dir_all("images/corsono").await {
        tracing::warn!(error = ?e, "Failed to create images/corsono directory");
    }

    // Create the application router
    let app = Router::new()
        // Web pages
        .route("/", get(serve_home))
        .route("/corsono/gallery", get(serve_corsono_gallery))
        .route("/health", get(|| async { "OK" }))
        // API routes
        .route("/api/corsono/gallery", get(api_list_gallery))
        .route("/api/corsono/gallery/upload", post(api_upload_gallery))
        // Static assets
        .nest_service("/static", ServeDir::new("static"))
        .nest_service("/images", ServeDir::new("images"))
        .layer(CorsLayer::permissive());

    // Bind to address
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    tracing::info!("Starting server on {}", addr);

    // Start the server
    let listener = TcpListener::bind(addr).await.unwrap();
    tracing::info!("Listening on {}", addr);

    tracing::info!("Server is running! Visit http://localhost:3000");
    axum::serve(listener, app).await.unwrap();
}

async fn serve_home() -> Html<&'static str> {
    Html(include_str!("../index.html"))
}

async fn serve_corsono_gallery() -> Html<&'static str> {
    Html(include_str!("../templates/corsono-gallery.html"))
}

async fn api_list_gallery() -> Json<Vec<GalleryItem>> {
    let dir = Path::new("images/corsono");
    let mut items: Vec<GalleryItem> = Vec::new();
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            if let Ok(meta) = entry.metadata() {
                if meta.is_file() {
                    if let Some(name) = entry.file_name().to_str() {
                        let ext_ok = Path::new(name)
                            .extension()
                            .and_then(|e| e.to_str())
                            .map(|e| matches!(e.to_lowercase().as_str(), "jpg" | "jpeg" | "png" | "webp"))
                            .unwrap_or(false);
                        if ext_ok {
                            items.push(GalleryItem {
                                name: name.to_string(),
                                url: format!("/images/corsono/{}", name),
                            });
                        }
                    }
                }
            }
        }
    }
    // Sort by name for now
    items.sort_by(|a, b| a.name.cmp(&b.name));
    Json(items)
}

async fn api_upload_gallery(mut multipart: Multipart) -> Result<Json<serde_json::Value>, (axum::http::StatusCode, String)> {
    let save_dir = PathBuf::from("images/corsono");
    if let Err(e) = tokio_fs::create_dir_all(&save_dir).await {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to ensure directory: {}", e)));
    }

    let mut saved: Vec<String> = Vec::new();

    loop {
        match multipart.next_field().await {
            Ok(Some(field)) => {
                let filename = field
                    .file_name()
                    .map(|s| s.to_string())
                    .unwrap_or_else(|| format!("upload-{}.bin", Uuid::new_v4()));

                // Sanitize filename
                let name_only = Path::new(&filename)
                    .file_name()
                    .unwrap_or_default()
                    .to_string_lossy()
                    .to_string();

                // Enforce allowed extensions
                let ext = Path::new(&name_only)
                    .extension()
                    .and_then(|e| e.to_str())
                    .map(|e| e.to_lowercase())
                    .unwrap_or_else(|| "bin".to_string());
                let allowed = matches!(ext.as_str(), "jpg" | "jpeg" | "png" | "webp");
                if !allowed {
                    // Skip unsupported types
                    continue;
                }

                // Generate unique filename to avoid collisions
                let unique = format!(
                    "{}-{}.{}",
                    Path::new(&name_only)
                        .file_stem()
                        .and_then(|s| s.to_str())
                        .unwrap_or("photo"),
                    Uuid::new_v4(),
                    ext
                );

                let path = save_dir.join(unique);
                let bytes = match field.bytes().await {
                    Ok(b) => b,
                    Err(e) => return Err((axum::http::StatusCode::BAD_REQUEST, format!("Read field bytes error: {}", e))),
                };

                // Write file
                match tokio_fs::File::create(&path).await {
                    Ok(mut file) => {
                        if let Err(e) = file.write_all(&bytes).await {
                            return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to write file: {}", e)));
                        }
                    }
                    Err(e) => {
                        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to create file: {}", e)))
                    }
                }

                if let Some(basename) = path.file_name().and_then(|n| n.to_str()) {
                    saved.push(basename.to_string());
                }
            }
            Ok(None) => break,
            Err(e) => return Err((axum::http::StatusCode::BAD_REQUEST, format!("Multipart error: {}", e))),
        }
    }

    Ok(Json(serde_json::json!({
        "saved": saved,
        "count": saved.len(),
        "message": "Upload completed"
    })))
}
