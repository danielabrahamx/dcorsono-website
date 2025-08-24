use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Cart {
    pub id: Uuid,
    pub user_id: Option<Uuid>, // Optional for guest carts
    pub session_id: String,
    pub items: Vec<CartItem>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct CartItem {
    pub id: Uuid,
    pub cart_id: Uuid,
    pub product_id: Uuid,
    pub product_name: String,
    pub quantity: i32,
    pub unit_price: i32,
    pub size: String,
    pub color: String,
    pub added_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AddToCartRequest {
    pub product_id: Uuid,
    pub quantity: i32,
    pub size: String,
    pub color: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateCartItemRequest {
    pub quantity: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CartSummary {
    pub total_items: i32,
    pub subtotal: i32,
    pub estimated_shipping: i32,
    pub total: i32,
}



