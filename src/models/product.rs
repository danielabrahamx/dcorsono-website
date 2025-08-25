use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Product {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub price: i32, // Price in cents
    pub category: String,
    pub brand: String,
    pub material: String,
    pub care_instructions: String,
    pub images: Vec<String>,
    pub sizes: Vec<String>,
    pub colors: Vec<String>,
    pub in_stock: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateProduct {
    pub name: String,
    pub description: String,
    pub price: i32,
    pub category: String,
    pub brand: String,
    pub material: String,
    pub care_instructions: String,
    pub images: Vec<String>,
    pub sizes: Vec<String>,
    pub colors: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateProduct {
    pub name: Option<String>,
    pub description: Option<String>,
    pub price: Option<i32>,
    pub category: Option<String>,
    pub brand: Option<String>,
    pub material: Option<String>,
    pub care_instructions: Option<String>,
    pub images: Option<Vec<String>>,
    pub sizes: Option<Vec<String>>,
    pub colors: Option<Vec<String>>,
    pub in_stock: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ProductVariant {
    pub id: Uuid,
    pub product_id: Uuid,
    pub size: String,
    pub color: String,
    pub stock_quantity: i32,
    pub price_adjustment: i32, // Price adjustment in cents
}




