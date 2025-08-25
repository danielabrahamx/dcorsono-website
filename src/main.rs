use axum::{
    extract::Multipart,
    http::StatusCode,
    response::Html,
    routing::{get, post},
    Json, Router,
};
use serde::Serialize;
use std::{
    fs,
    net::SocketAddr,
    path::Path,
};
use tokio::fs as tokio_fs;
use tower_http::{cors::CorsLayer, services::ServeDir};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use tokio::net::TcpListener;
use uuid::Uuid;

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
        .route("/art/gallery", get(serve_art_gallery))
        .route("/health", get(|| async { "OK" }))
        // API routes
        .route("/api/corsono/gallery", get(api_list_gallery))
        .route("/api/corsono/gallery/upload", post(api_upload_gallery))
        .route("/api/art/gallery", get(api_list_art_gallery))
        .route("/api/art/gallery/upload", post(api_upload_art_gallery))
        // Static assets
        .nest_service("/static", ServeDir::new("static"))
        .nest_service("/images", ServeDir::new("images"))
        .layer(CorsLayer::permissive());

    // Bind to address
    let addr = SocketAddr::from(([127, 0, 0, 1], 3001));
    tracing::info!("Starting server on {}", addr);

    // Start the server
    let listener = TcpListener::bind(addr).await.unwrap();
    tracing::info!("Listening on {}", addr);

    tracing::info!("Server is running! Visit http://localhost:3001");
    axum::serve(listener, app).await.unwrap();
}

async fn serve_home() -> Html<&'static str> {
    Html(include_str!("../index.html"))
}

async fn serve_corsono_gallery() -> Html<&'static str> {
    Html(include_str!("../templates/corsono-gallery.html"))
}

async fn serve_art_gallery() -> Html<&'static str> {
    Html(include_str!("../templates/art-gallery.html"))
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

async fn api_upload_gallery(mut multipart: Multipart) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    // Ensure gallery directory exists
    if let Err(e) = tokio_fs::create_dir_all("images/corsono").await {
        return Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to ensure directory: {}", e)));
    }

    let mut saved: Vec<String> = Vec::new();
    let mut count = 0;

    while let Some(field) = multipart.next_field().await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))? {
        if field.name() == Some("photos") {
            let filename = field.file_name().map(|s| s.to_string()).unwrap_or_else(|| "unnamed".to_string());
            let ext = Path::new(&filename).extension()
                .and_then(|os| os.to_str())
                .map(|s| s.to_lowercase())
                .unwrap_or_else(|| "".to_string());

            if !["jpg", "jpeg", "png", "webp"].contains(&ext.as_str()) {
                continue;
            }

            let new_name = format!("{}.{}", Uuid::new_v4(), ext);
            let data = field.bytes().await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
            let path = format!("images/corsono/{}", new_name);

            tokio_fs::write(&path, &data).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

            saved.push(new_name);
            count += 1;
        }
    }

    Ok(Json(serde_json::json!({
        "saved": saved,
        "count": count,
        "message": "Files uploaded successfully"
    })))
}

async fn api_list_art_gallery() -> Json<Vec<GalleryItem>> {
    let dir = Path::new("images/art");
    let mut items: Vec<GalleryItem> = Vec::new();
    if let Ok(entries) = fs::read_dir(dir) {
        for entry in entries.flatten() {
            if let Ok(meta) = entry.metadata() {
                if meta.is_file() {
                    if let Some(name) = entry.file_name().to_str() {
                        let ext_ok = Path::new(name)
                            .extension()
                            .and_then(|e| e.to_str())
                            .map(|e| matches!(e.to_lowercase().as_str(), "jpg" | "jpeg" | "png" | "webp" | "gif" | "mp4" | "mov"))
                            .unwrap_or(false);
                        if ext_ok {
                            items.push(GalleryItem {
                                name: name.to_string(),
                                url: format!("/images/art/{}", name),
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

async fn api_upload_art_gallery(mut multipart: Multipart) -> Result<Json<serde_json::Value>, (StatusCode, String)> {
    // Ensure gallery directory exists
    if let Err(e) = tokio_fs::create_dir_all("images/art").await {
        return Err((StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to ensure directory: {}", e)));
    }

    let mut saved: Vec<String> = Vec::new();
    let mut count = 0;

    while let Some(field) = multipart.next_field().await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))? {
        if field.name() == Some("artwork") {
            let filename = field.file_name().map(|s| s.to_string()).unwrap_or_else(|| "unnamed".to_string());
            let ext = Path::new(&filename).extension()
                .and_then(|os| os.to_str())
                .map(|s| s.to_lowercase())
                .unwrap_or_else(|| "".to_string());

            if !["jpg", "jpeg", "png", "webp", "gif", "mp4", "mov"].contains(&ext.as_str()) {
                continue;
            }

            let new_name = format!("{}.{}", Uuid::new_v4(), ext);
            let data = field.bytes().await.map_err(|e| (StatusCode::BAD_REQUEST, e.to_string()))?;
            let path = format!("images/art/{}", new_name);

            tokio_fs::write(&path, &data).await.map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, e.to_string()))?;

            saved.push(new_name);
            count += 1;
        }
    }

    Ok(Json(serde_json::json!({
        "saved": saved,
        "count": count,
        "message": "Artwork uploaded successfully"
    })))
}
