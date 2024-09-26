CREATE SEQUENCE wishlist_id_seq
    START WITH 1
    INCREMENT BY 1;

ALTER TABLE "wishlist"
    ALTER COLUMN id SET DEFAULT nextval('user_id_seq');

