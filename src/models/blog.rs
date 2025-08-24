use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct BlogPost {
    pub id: Uuid,
    pub title: String,
    pub content: String,
    pub excerpt: String,
    pub author: String,
    pub categories: Vec<String>, // ["Occult Science", "Tech", "The Mind", "Muay Thai", "Consciousness"]
    pub tags: Vec<String>,
    pub featured_image: Option<String>,
    pub published: bool,
    pub published_at: Option<DateTime<Utc>>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreateBlogPost {
    pub title: String,
    pub content: String,
    pub excerpt: String,
    pub author: String,
    pub categories: Vec<String>,
    pub tags: Vec<String>,
    pub featured_image: Option<String>,
    pub published: bool,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct UpdateBlogPost {
    pub title: Option<String>,
    pub content: Option<String>,
    pub excerpt: Option<String>,
    pub author: Option<String>,
    pub categories: Option<Vec<String>>,
    pub tags: Option<Vec<String>>,
    pub featured_image: Option<String>,
    pub published: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct BlogCategory {
    pub id: Uuid,
    pub name: String,
    pub description: String,
    pub slug: String,
    pub color: String, // For UI theming
}



