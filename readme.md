# Development
```
npm install
```
### copy .env.example to .env
```
cp .env.example .env
```
### set up .env variables, and create a new openssl random key for the jwt secret
```
openssl rand -base64 32
```
# Run project
```
npm run dev
```
Build MongoDB via docker
```
docker compose up -d
```

# Production
```
npm run build
```