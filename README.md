# Salon Management API

RESTful API for managing **Salons, Services, and User Authentication**.

### Tech Stack

Node.js • Express.js • Supabase • PostgreSQL • JWT • bcryptjs

### Deployed API

https://assignment-4-salon-management-api-1.onrender.com/

### API

* `POST /register` — Register user
* `POST /login` — Login
* `GET /salons` — Get salons
* `GET /salons/top` — Top 5 salons
* `GET /salons/city/:city` — Filter by city
* `GET /salons/:id` — Get salon
* `POST /salons` — Create salon
* `PUT /salons/:id` — Update salon
* `DELETE /salons/:id` — Delete salon
* `GET /salons/:id/services` — Get services
* `POST /salons/:id/services` — Add service
* `GET /services/available` — Available services
* `PUT /services/:id` — Update service
* `DELETE /services/:id` — Delete service

### Installation

```bash
git clone https://github.com/AtharvaD2007/assignment-4-salon-management-api
cd salon-management-api
npm install
npm start
```

### Author

**Atharva dalvi** — B.Tech CSE, ITM Skills University

