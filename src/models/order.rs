use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct Order {
    pub id: Uuid,
    pub customer_id: Uuid,
    pub stripe_payment_intent_id: String,
    pub status: OrderStatus,
    pub total_amount: i32, // Total in cents
    pub currency: String,
    pub shipping_address: Address,
    pub billing_address: Address,
    pub items: Vec<OrderItem>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct OrderItem {
    pub id: Uuid,
    pub order_id: Uuid,
    pub product_id: Uuid,
    pub product_name: String,
    pub quantity: i32,
    pub unit_price: i32,
    pub total_price: i32,
    pub size: String,
    pub color: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Address {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub address_line_1: String,
    pub address_line_2: Option<String>,
    pub city: String,
    pub state: String,
    pub postal_code: String,
    pub country: String,
}

#[derive(Debug, Serialize, Deserialize, sqlx::Type)]
#[sqlx(type_name = "order_status", rename_all = "lowercase")]
pub enum OrderStatus {
    Pending,
    Processing,
    Shipped,
    Delivered,
    Cancelled,
    Refunded,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateOrder {
    pub customer_id: Uuid,
    pub items: Vec<CreateOrderItem>,
    pub shipping_address: Address,
    pub billing_address: Address,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateOrderItem {
    pub product_id: Uuid,
    pub quantity: i32,
    pub size: String,
    pub color: String,
}



