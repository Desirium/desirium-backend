CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1;

ALTER TABLE "user"
    ALTER COLUMN id SET DEFAULT nextval('user_id_seq');

