use axum::{
    routing::get,
    Router,
    response::Html,
    extract::State,
};
use sqlx::PgPool;
use tower_http::services::ServeDir;

pub fn create_web_routes() -> Router<PgPool> {
    Router::new()
        // Serve static files
        .nest_service("/static", ServeDir::new("static"))
        .nest_service("/images", ServeDir::new("images"))
        
        // Main pages
        .route("/", get(home_page))
        .route("/corsono", get(corsono_page))
        .route("/sibrox", get(sibrox_page))
        .route("/occult", get(occult_page))
        .route("/muay-thai", get(muay_thai_page))
        .route("/inner-library", get(inner_library_page))
        .route("/blog", get(blog_page))
        .route("/about", get(about_page))
        .route("/contact", get(contact_page))
        
        // Legal pages
        .route("/privacy", get(privacy_page))
        .route("/terms", get(terms_page))
}

async fn home_page() -> Html<&'static str> {
    Html(include_str!("../../templates/home.html"))
}

async fn corsono_page() -> Html<&'static str> {
    Html(include_str!("../../templates/corsono.html"))
}

async fn sibrox_page() -> Html<&'static str> {
    Html(include_str!("../../templates/sibrox.html"))
}

async fn occult_page() -> Html<&'static str> {
    Html(include_str!("../../templates/occult.html"))
}

async fn muay_thai_page() -> Html<&'static str> {
    Html(include_str!("../../templates/muay-thai.html"))
}

async fn inner_library_page() -> Html<&'static str> {
    Html(include_str!("../../templates/inner-library.html"))
}

async fn blog_page() -> Html<&'static str> {
    Html(include_str!("../../templates/blog.html"))
}

async fn about_page() -> Html<&'static str> {
    Html(include_str!("../../templates/about.html"))
}

async fn contact_page() -> Html<&'static str> {
    Html(include_str!("../../templates/contact.html"))
}

async fn privacy_page() -> Html<&'static str> {
    Html(include_str!("../../templates/privacy.html"))
}

async fn terms_page() -> Html<&'static str> {
    Html(include_str!("../../templates/terms.html"))
}


