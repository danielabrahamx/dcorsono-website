use axum::{
    extract::Request,
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

async fn api_upload_gallery(_request: Request) -> Result<Json<serde_json::Value>, (axum::http::StatusCode, String)> {
    // Ensure gallery directory exists
    if let Err(e) = tokio_fs::create_dir_all("images/corsono").await {
        return Err((axum::http::StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to ensure directory: {}", e)));
    }

    // For now, return a success response to test the endpoint
    // TODO: Implement proper multipart handling
    Ok(Json(serde_json::json!({
        "saved": ["test-image.jpg"],
        "count": 1,
        "message": "Upload endpoint working - multipart handling in progress"
    })))
}
