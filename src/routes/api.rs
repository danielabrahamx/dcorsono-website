use axum::{
    routing::{get, post, put, delete},
    Router,
    extract::{Path, Query, State},
    Json,
    http::StatusCode,
};
use serde::{Deserialize, Serialize};
use sqlx::PgPool;
use uuid::Uuid;

use crate::{
    handlers::{
        auth, products, blog, cart, orders, users,
    },
    models::*,
};

pub fn create_api_routes() -> Router<PgPool> {
    Router::new()
        // Auth routes
        .route("/api/auth/register", post(auth::register))
        .route("/api/auth/login", post(auth::login))
        
        // Product routes
        .route("/api/products", get(products::get_products))
        .route("/api/products/:id", get(products::get_product))
        .route("/api/products", post(products::create_product))
        .route("/api/products/:id", put(products::update_product))
        .route("/api/products/:id", delete(products::delete_product))
        
        // Blog routes
        .route("/api/blog/posts", get(blog::get_posts))
        .route("/api/blog/posts/:id", get(blog::get_post))
        .route("/api/blog/categories", get(blog::get_categories))
        .route("/api/blog/posts", post(blog::create_post))
        .route("/api/blog/posts/:id", put(blog::update_post))
        .route("/api/blog/posts/:id", delete(blog::delete_post))
        
        // Cart routes
        .route("/api/cart", get(cart::get_cart))
        .route("/api/cart/items", post(cart::add_to_cart))
        .route("/api/cart/items/:id", put(cart::update_cart_item))
        .route("/api/cart/items/:id", delete(cart::remove_from_cart))
        .route("/api/cart/clear", post(cart::clear_cart))
        
        // Order routes
        .route("/api/orders", post(orders::create_order))
        .route("/api/orders/:id", get(orders::get_order))
        .route("/api/orders", get(orders::get_user_orders))
        
        // User routes
        .route("/api/users/profile", get(users::get_profile))
        .route("/api/users/profile", put(users::update_profile))
        .route("/api/users/newsletter", post(users::subscribe_newsletter))
        
        // Stripe webhook
        .route("/api/webhooks/stripe", post(orders::stripe_webhook))
}


