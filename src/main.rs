use axum::{
    routing::get,
    Router,
    response::Html,
};
use std::net::SocketAddr;
use tower_http::cors::CorsLayer;
use tower_http::services::ServeDir;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use tokio::net::TcpListener;

#[tokio::main]
async fn main() {
    // Initialize tracing
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "info".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Create the application router
    let app = Router::new()
        .route("/", get(serve_home))
        .route("/health", get(|| async { "OK" }))
        .nest_service("/static", ServeDir::new("static"))
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
