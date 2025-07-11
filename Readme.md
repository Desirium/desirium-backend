# How to setup project
### 1. Run command for create minio container
```bash
docker run \
		-p 9000:9000 \
		-p 9001:9001 \
		--name minio1 \
		-v D:\minio\data:/data \
		-e "MINIO_ROOT_USER=MINIO" \
		-e "MINIO_ROOT_PASSWORD=1234" \
		quay.io/minio/minio server /data --console-address ":9001"
```

### 2. Setup minio 
Go to localhost:9000 and setup your bucket. You need save accessKey and secretKey.

### 3. Config env
Create a `.env` file in the root directory and add the following environment variables:

```env
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_username
DATABASE_PASSWORD=your_password

# Minio Configuration
MINIO_HOST=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=your_access_key
MINIO_SECRET_KEY=your_secret_key

# Application Configuration
PORT=3000
```

Replace the placeholder values with your actual database and Minio credentials.

### 4. Run project
```bash
# Install dependencies
pnpm install

# Start development server
pnpm run start:dev

# Or build and run production
pnpm run build
pnpm run start:prod
```