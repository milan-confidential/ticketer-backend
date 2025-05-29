# 🎟️ Ticketer 2.0 – Backend

This is the backend codebase for **Ticketer 2.0**, a modern event ticketing platform powered by **Node.js**, **Express**, **TypeScript**, and **Prisma ORM**.

---

## 🚀 Tech Stack

- **Node.js** + **Express** – HTTP server and routing
- **TypeScript** – Type safety and clean structure
- **PostgreSQL** – Main relational database
- **Prisma ORM** – Typed DB queries and schema migrations
- **Dotenv** – Manage environment variables securely
- **Helmet, Morgan, CORS** – Security and logging middleware

---

## 📁 Project Structure


---

## 🛠 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with live reload (`ts-node-dev`) |
| `npm run build` | Compile TypeScript into JavaScript (`dist/`) |
| `npm start` | Run compiled server (for production use) |
| `npm run prisma:generate` | Rebuild Prisma Client after schema changes |
| `npm run prisma:migrate` | Run and apply database migrations |

---

## ⚙️ Environment Variables

Create a `.env` file at the root of the project, based on the `.env.example` template:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/ticketer"

# 1. Install project dependencies
npm install

# 2. Set up your PostgreSQL database
Create a local DB and update your .env file

# 3. Apply initial schema to the DB
npx prisma migrate dev --name init

# 4. Start the development server
npm run dev
