-- Active: 1700054762577@@127.0.0.1@3306

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    last_name TEXT,
    cpf_cnpj TEXT UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL, 
    role TEXT DEFAULT('NORMAL') NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL,
	updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS addresses (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    cep TEXT NOT NULL,
    country TEXT NOT NULL,
    state TEXT NOT NULL,
    city TEXT NOT NULL,
    district TEXT NOT NULL,
    road TEXT NOT NULL,
    house_number TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS phones (
    id TEXT PRIMARY KEY NOT NULL,
    phone_number TEXT NOT NULL,
    user_id TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY NOT NULL,
    user_id TEXT NOT NULL,
    name_user TEXT NOT NULL,
    content TEXT NOT NULL,
    like INTEGER DEFAULT(0) NOT NULL,
    dislike INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
	id TEXT PRIMARY KEY NOT NULL,
	post_id TEXT NOT NULL,
	parent_comment_id TEXT NULL DEFAULT(NULL),
	content TEXT NOT NULL,
	id_user TEXT NOT NULL,
	like INTEGER DEFAULT(0) NOT NULL,
	dislike INTEGER DEFAULT(0) NOT NULL,
	amount_comment INTEGER DEFAULT(0) NOT NULL,
	created_at TEXT DEFAULT(DATETIME()) NOT NULL,
	updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
	FOREIGN KEY(post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(parent_comment_id) REFERENCES comments_posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(id_user) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE
    IF NOT EXISTS likes_dislikes_posts (
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(post_id) REFERENCES posts(id) ON UPDATE CASCADE ON DELETE CASCADE
    );
	
CREATE TABLE
    IF NOT EXISTS likes_dislikes_comments (
        user_id TEXT NOT NULL,
        comment_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY(user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE,
        FOREIGN KEY(comment_id) REFERENCES comments(id) ON UPDATE CASCADE ON DELETE CASCADE
    );


DROP TABLE IF EXISTS comments_posts;

CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    rg TEXT NOT NULL UNIQUE,
    cpf TEXT UNIQUE,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    cnpj TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);