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
Insert your env variable in file .env

### 4. Run project

```bash
node server.js
```