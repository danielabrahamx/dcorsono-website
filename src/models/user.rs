use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub password_hash: String,
    pub is_active: bool,
    pub email_verified: bool,
    pub newsletter_subscribed: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateUser {
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub password: String,
    pub newsletter_subscribed: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateUser {
    pub first_name: Option<String>,
    pub last_name: Option<String>,
    pub newsletter_subscribed: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserProfile,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UserProfile {
    pub id: Uuid,
    pub email: String,
    pub first_name: String,
    pub last_name: String,
    pub newsletter_subscribed: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NewsletterSubscription {
    pub id: Uuid,
    pub email: String,
    pub subscribed: bool,
    pub created_at: DateTime<Utc>,
}


