-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    newsletter_subscribed BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Newsletter subscriptions table
CREATE TABLE newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INTEGER NOT NULL, -- Price in cents
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    material TEXT NOT NULL,
    care_instructions TEXT NOT NULL,
    images TEXT[] NOT NULL, -- Array of image URLs
    sizes TEXT[] NOT NULL, -- Array of available sizes
    colors TEXT[] NOT NULL, -- Array of available colors
    in_stock BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Product variants table
CREATE TABLE product_variants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    stock_quantity INTEGER NOT NULL DEFAULT 0,
    price_adjustment INTEGER DEFAULT 0, -- Price adjustment in cents
    UNIQUE(product_id, size, color)
);

-- Blog categories table
CREATE TABLE blog_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT NOT NULL,
    slug VARCHAR(100) NOT NULL UNIQUE,
    color VARCHAR(7) NOT NULL -- Hex color code
);

-- Blog posts table
CREATE TABLE blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    categories TEXT[] NOT NULL, -- Array of category names
    tags TEXT[] NOT NULL, -- Array of tags
    featured_image VARCHAR(255),
    published BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Carts table
CREATE TABLE carts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    session_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cart_id UUID NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    stripe_payment_intent_id VARCHAR(255) NOT NULL UNIQUE,
    status order_status DEFAULT 'pending',
    total_amount INTEGER NOT NULL, -- Total in cents
    currency VARCHAR(3) DEFAULT 'USD',
    shipping_address JSONB NOT NULL, -- Address object
    billing_address JSONB NOT NULL, -- Address object
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order items table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    quantity INTEGER NOT NULL,
    unit_price INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    size VARCHAR(20) NOT NULL,
    color VARCHAR(50) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_in_stock ON products(in_stock);
CREATE INDEX idx_blog_posts_categories ON blog_posts USING GIN(categories);
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_carts_session_id ON carts(session_id);
CREATE INDEX idx_carts_user_id ON carts(user_id);
CREATE INDEX idx_orders_customer_id ON orders(customer_id);
CREATE INDEX idx_orders_status ON orders(status);

-- Insert default blog categories
INSERT INTO blog_categories (name, description, slug, color) VALUES
('Occult Science', 'Ancient wisdom and mystical knowledge', 'occult-science', '#8B4513'),
('Tech', 'Technology, blockchain, and innovation', 'tech', '#4169E1'),
('The Mind', 'Psychology, consciousness, and mental exploration', 'the-mind', '#9932CC'),
('Muay Thai', 'Martial arts, training, and technique', 'muay-thai', '#DC143C'),
('Consciousness', 'The nature of awareness and being', 'consciousness', '#FFD700');

-- Insert sample products for Corsono brand
INSERT INTO products (name, description, price, category, brand, material, care_instructions, images, sizes, colors, in_stock) VALUES
('Corsono Classic Tee', 'Premium black t-shirt with subtle gold accents', 4500, 'T-Shirts', 'Corsono', '100% Organic Cotton', 'Machine wash cold, tumble dry low', ARRAY['/images/corsono-classic-tee-1.jpg', '/images/corsono-classic-tee-2.jpg'], ARRAY['XS', 'S', 'M', 'L', 'XL'], ARRAY['Black'], true),
('Corsono Luxury Hoodie', 'Black hoodie with gold embroidery detailing', 8900, 'Hoodies', 'Corsono', 'Premium Cotton Blend', 'Hand wash cold, air dry', ARRAY['/images/corsono-hoodie-1.jpg', '/images/corsono-hoodie-2.jpg'], ARRAY['S', 'M', 'L', 'XL'], ARRAY['Black'], true),
('Corsono Statement Jacket', 'Bold black jacket with gold hardware', 12500, 'Outerwear', 'Corsono', 'Premium Leather', 'Professional leather care recommended', ARRAY['/images/corsono-jacket-1.jpg', '/images/corsono-jacket-2.jpg'], ARRAY['M', 'L', 'XL'], ARRAY['Black'], true);

-- Insert sample blog posts
INSERT INTO blog_posts (title, content, excerpt, author, categories, tags, featured_image, published, published_at) VALUES
('The Alchemy of Consciousness: Beyond Material Reality', 'In the ancient traditions of alchemy, consciousness was not merely a byproduct of material processes, but the very essence that animated all existence. The alchemists understood that consciousness operates as an act rather than a static state...', 'Exploring how ancient alchemical wisdom reveals consciousness as an active, dynamic force rather than a passive state of being.', 'Danny Abraham', ARRAY['Occult Science', 'Consciousness'], ARRAY['alchemy', 'consciousness', 'ancient-wisdom'], '/images/blog/alchemy-consciousness.jpg', true, NOW()),
('Blockchain and the New Alchemy: Digital Transformation of Value', 'Just as the alchemists sought to transform base metals into gold, modern blockchain technology transforms traditional value systems into digital assets...', 'How blockchain technology embodies ancient alchemical principles in the digital age.', 'Danny Abraham', ARRAY['Tech', 'Occult Science'], ARRAY['blockchain', 'alchemy', 'technology', 'innovation'], '/images/blog/blockchain-alchemy.jpg', true, NOW()),
('Muay Thai as Moving Meditation: The Flow State in Combat', 'In the heat of combat, when technique becomes second nature and the mind enters a state of pure awareness, Muay Thai transcends physical exercise...', 'How Muay Thai training cultivates consciousness through movement and technique.', 'Danny Abraham', ARRAY['Muay Thai', 'The Mind'], ARRAY['muay-thai', 'meditation', 'flow-state', 'consciousness'], '/images/blog/muay-thai-meditation.jpg', true, NOW());


