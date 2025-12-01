# DevTinder

**DevTinder** — A full-stack social/matching application for developers to connect, collaborate, and find project partners. This repo contains notes, API design and a starter plan based on early project sketches and tech planning.

---

## Table of Contents

* [Project Overview](#project-overview)
* [Goals & Requirements](#goals--requirements)
* [Features](#features)
* [High-level Architecture](#high-level-architecture)
* [Tech Stack](#tech-stack)
* [Database Design (Draft)](#database-design-draft)
* [API Design (REST API)](#api-design-rest-api)
* [HTTP methods and PUT vs PATCH](#http-methods-and-put-vs-patch)
* [Setup / Run (starter guide)](#setup--run-starter-guide)
* [Future Enhancements](#future-enhancements)
* [Contributing](#contributing)
* [License](#license)

---

## Project Overview

DevTinder is an application that helps developers discover and connect with other developers for collaboration, mentorship, or team formation. The initial notes sketch out product requirements, data models, and REST API endpoints needed to get the MVP working.

## Goals & Requirements

* Allow users to create accounts and maintain profiles.
* Explore other developers' profiles (feed / discovery page).
* Send and receive connection requests (with statuses: pending, accepted, rejected, ignored).
* Let users view requests they sent and requests they received.
* Edit and update profile information.
* Provide a clean RESTful API for frontend integration.

## Features (MVP)

* User signup & login (authentication)
* Create / read / update / delete (CRUD) user profile
* Explore feed to discover other users
* Send connection request to other users
* Accept / reject / ignore connection requests
* View connections and pending requests

## High-level Architecture

The notes discuss two architectural approaches:

### Monolithic (simple)

* Entire application in a single codebase and single database.
* Easier to start and deploy.
* Becomes complex to scale and maintain as features grow.

### Microservices (recommended for scaling)

* Break features into small independent services (example: auth service, profile service, connection service).
* Each service can have its own database and scale independently.
* Requires inter-service communication and more effort to test & deploy.

For the MVP, start monolithic (single backend) and split into microservices later if needed.

## Tech Stack (suggested from notes)

* **Frontend:** React (notes indicate React for FE)
* **Backend:** Node.js / Express (notes suggest Node.js)
* **Database:** MongoDB
* **Authentication:** JWT tokens

## Database Design (Draft)

**users (collection)**

```json
{
  "_id": "ObjectId",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "passwordHash": "string",
  "age": "number",
  "gender": "string",
  "bio": "string",
  "skills": ["string"],
  "location": "string",
  "createdAt": "Date"
}
```

**connectionRequests (collection)**

```json
{
  "_id": "ObjectId",
  "fromUserId": "ObjectId",
  "toUserId": "ObjectId",
  "status": "pending | accepted | rejected | ignored",
  "createdAt": "Date",
  "updatedAt": "Date",
  "message": "string (optional)"
}
```

> This is a simple design to store user data and connection relationships. It can be extended later (profiles, reviews, chats, etc.).

## API Design (REST API)

The notes list the main routes needed for the MVP. Below is a cleaned-up version.

### Auth & User

* `POST /signup` — Register a new user (name, email, password).
* `POST /login` — Login and receive JWT token.

### Profile

* `GET /profile/:id` — Get public profile by user id.
* `POST /profile` — Create or replace profile (authenticated).
* `PATCH /profile/:id` — Partial update to profile (authenticated).
* `DELETE /profile/:id` — Delete user profile (authenticated).

### Connection Requests

* `POST /sendRequest` — Send a connection request (body: `{ toUserId, message? }`).
* `POST /reviewRequest` — Review request (accept / reject / ignore) (body: `{ requestId, action }`).
* `GET /request/:id` — Get details of a specific request.
* `GET /connection` — List connections / requests for the authenticated user.

> Use standard HTTP status codes in responses and protect endpoints that require authentication.

## HTTP methods and PUT vs PATCH

* **GET** — Retrieve data (no side effects).
* **POST** — Create new resources or perform actions.
* **PUT** — Full update/replace of a resource. If a field is missing, it may be overwritten/removed.
* **PATCH** — Partial update: change only the fields provided; other fields remain unchanged. Good for small edits and profile updates.
* **DELETE** — Remove a resource.

**When to use:** prefer `PATCH` for profile edits where you only change a few fields; use `PUT` when you want to replace the whole resource.

## Setup / Run (starter guide)

> These are starter instructions — adapt commands to your project layout.

1. Clone the repository

```bash
git clone <your-repo-url>
cd devtinder
```

2. Backend (Node + Express + MongoDB)

```bash
cd backend
npm install
# create a .env file with the following variables
# MONGO_URI=your_mongo_connection_string
# JWT_SECRET=your_jwt_secret
npm run dev
```

3. Frontend (React)

```bash
cd frontend
npm install
npm start
```

4. Open frontend at `http://localhost:3000` (or as configured) and backend at `http://localhost:5000` (default)

## Future Enhancements / Roadmap

* Real-time messaging / in-app chat (WebSockets)
* Video call feature for remote collaboration
* Search & advanced filters (skills, location, experience)
* Microservices split (auth, profile, connections, chat)
* Notifications, activity feed, and recommendation engine
* OAuth social login (GitHub, Google)
* Admin dashboard and moderation tools

## Contributing

* Keep API design consistent and RESTful.
* Write tests for critical endpoints (auth, connections).
* Follow a feature-branch workflow and create PRs for review.

## License

This project is a work-in-progress — add my preferred license when ready.

---

<<<<<<< HEAD
If you'd like, I can also generate:-
=======
>>>>>>> e16445d8069744008b33ef41b80509f65b528ba3

