CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(100) ,
    password TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    roles VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    image_url TEXT,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);



CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100),
    icon VARCHAR(50),
    description TEXT,
    link TEXT,
    group_count INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    name VARCHAR(100) NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,

    user_count INTEGER NOT NULL DEFAULT 0,
    image_url TEXT,
    link TEXT ,
    description TEXT NOT NULL,

    rules TEXT NOT NULL,

    verified BOOLEAN NOT NULL DEFAULT FALSE,
    banned BOOLEAN NOT NULL DEFAULT FALSE,
    whats_link TEXT,

    author_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS profile_groups (
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    group_id UUID NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
    PRIMARY KEY (profile_id, group_id)
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);



INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Sports',
  '⚽',
  'Football, basketball, and sports discussion groups.',
  'https://example.com/categories/sports',
  'https://example.com/img/sports.jpg'
);

INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Education',
  '📚',
  'Study groups, courses, and learning communities.',
  'https://example.com/categories/education',
  'https://example.com/img/education.jpg'
);

INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Business',
  '💼',
  'Entrepreneurship, digital marketing, and networking groups.',
  'https://example.com/categories/business',
  'https://example.com/img/business.jpg'
);



INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Entertainment',
  '🎬',
  'Movies, series, games, and fun communities.',
  'https://example.com/categories/entertainment',
  'https://example.com/img/entertainment.jpg'
);

INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Health & Fitness',
  '💪',
  'Groups about training, diet, and healthy lifestyle.',
  'https://example.com/categories/health-fitness',
  'https://example.com/img/fitness.jpg'
);
INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'News & Politics',
  '📰',
  'General news discussion and political debate.',
  'https://example.com/categories/news-politics',
  'https://example.com/img/news.jpg'
);


INSERT INTO categories (name, icon, description, link, image_url)
VALUES (
  'Travel',
  '✈️',
  'Travel tips, tourism, and destination guides.',
  'https://example.com/categories/travel',
  'https://example.com/img/travel.jpg'
);
