# EthioPet Backend (PetConnect)

Production-ready NestJS + Prisma + PostgreSQL + Redis backend for EthioPet.

## Architecture
- **NestJS** modular structure under `src/modules/*`
- **PostgreSQL** via Prisma ORM
- **Redis** for JWT blacklist, presence, and pet listing cache
- **JWT Auth** access + refresh tokens
- **Socket.IO** WebSocket chat gateway under `/chat`
- **Validation** via `class-validator`
- **Swagger** docs at `/docs`

## Local Setup
1. Copy env file:
   - `.env.example` → `.env`
2. Start dependencies:
   - `docker compose up -d`
3. Install deps:
   - `npm install`
4. Run migrations + generate client:
   - `npm run prisma:migrate`
   - `npm run prisma:generate`
5. Seed data:
   - `npm run seed`
6. Start server:
   - `npm run start:dev`

Server: `http://localhost:4000`
Swagger: `http://localhost:4000/docs`

## Frontend Connection
- Base URL: `http://localhost:4000`
- Auth: use `Authorization: Bearer <accessToken>`
- Refresh token: `POST /auth/refresh`
- WebSocket: `ws://localhost:4000/chat` with `auth: { token }`

## Modules & Example Routes
### Auth
- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`

### Users
- `GET /users/me`
- `PATCH /users/me`

### Sellers
- `GET /sellers/:id`
- `PATCH /sellers/me/profile`

### Pets
- `GET /pets?breed=&location=&featured=&page=&limit=`
- `GET /pets/:id`
- `POST /pets` (SELLER)
- `PATCH /pets/:id` (SELLER)
- `DELETE /pets/:id` (SELLER)

### Favorites
- `POST /favorites`
- `DELETE /favorites`
- `GET /favorites`

### Reservations
- `POST /reservations`
- `POST /reservations/confirm`
- `GET /reservations/me`

### Payments
- `POST /payments/initiate`
- `POST /payments/verify`

### Orders
- `POST /orders`
- `GET /orders/me`
- `PATCH /orders/:id/status` (SELLER)

### Chat (HTTP)
- `GET /chat/rooms/:orderId`
- `GET /chat/rooms/:roomId/messages`

### Chat (WebSocket)
- `joinRoom` (payload: `{ orderId }`)
- `sendMessage` (payload: `{ roomId, content }`)
- `typing` (payload: `{ roomId, isTyping }`)

### Notifications
- `GET /notifications/me`

## Notes
- Controllers are thin; business logic is in services.
- JWT blacklist is enforced via Redis.
- Pet listing cache uses Redis (60s).
- Order status transitions are enforced server-side.
- Payment providers are pluggable (see `PaymentProvider` interface).
