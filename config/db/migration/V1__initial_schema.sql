CREATE TABLE "user"
(
    id             INT PRIMARY KEY,
    wallet_address VARCHAR(30),
    isPrivate      BOOLEAN DEFAULT FALSE,
    image          TEXT
);

CREATE TABLE "wishlist"
(
    id             INT PRIMARY KEY,
    user_id        INT,
    wallet_address VARCHAR(30),
    isPrivate      BOOLEAN DEFAULT FALSE,
    image          TEXT,
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES "user" (id)
            ON DELETE CASCADE
);

CREATE TABLE "friend"
(
    id           INT PRIMARY KEY,
    from_user_id INT,
    to_user_id   INT,
    CONSTRAINT fk_from_user
        FOREIGN KEY (from_user_id)
            REFERENCES "user"(id)
            ON DELETE CASCADE,
    CONSTRAINT fk_to_user
        FOREIGN KEY (to_user_id)
            REFERENCES "user"(id)
            ON DELETE CASCADE
)

