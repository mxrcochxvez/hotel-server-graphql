# 🏨 hotel-server-graphql

A TypeScript + GraphQL playground project for exploring **schema design, resolvers, and database modeling** in a hotel booking domain.  
Built with **Apollo Server**, **Drizzle ORM**, and **SQLite**.  

This repo isn’t meant to be a production app — it’s a sandbox for experimenting with **GraphQL best practices**, **TypeScript type-safety**, and **clean API design**.

---

## ✨ Features

- **GraphQL API** with Apollo Server  
- **Typed database models** powered by Drizzle ORM  
- **Hotel domain modeling**: rooms, reservations, guests, and cards  
- **Reusable resolver patterns** with generics  
- **Date-aware reservation logic** (active reservations, overlaps, etc.)  
- **TypeScript-first development**: utility types, partials, and inference  

---

## 📂 Project Structure

```
hotel-server-graphql/
├── src/
│   ├── db/                # Database schema & config
│   ├── modules/           # GraphQL modules
│   │   ├── reservations/  # Reservation types, resolvers, models
│   │   ├── rooms/         # Room types & resolvers
│   │   └── guests/        # Guest types & resolvers
│   ├── graphql/           # Base GraphQL schema
│   └── utilities/         # Shared resolver types & helpers
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/mxrcochxvez/hotel-server-graphql.git
cd hotel-server-graphql
```

### 2. Install dependencies
```bash
bun install
```

### 3. Set up environment
Create a `.env` file in the root:

```bash
DATABASE_URL="file:./dev.db"
```

### 4. Run migrations
```bash
bun drizzle-kit generate:sqlite
bun drizzle-kit push
```

### 5. Start the server
```bash
bun dev
```

GraphQL Playground should now be available at:
```
http://localhost:4000/graphql
```

---

## 🧩 Example Queries

### Get all rooms
```graphql
query {
  getRooms {
    number
    type
  }
}
```

### Create a reservation
```graphql
mutation {
  createReservation(input: {
    roomNumber: 101,
    checkinDate: "2025-09-05",
    checkoutDate: "2025-09-07",
    guestId: "guest-123"
  }) {
    success
  }
}
```

---

## 🛠 Tech Stack

- **[TypeScript](https://www.typescriptlang.org/)** – type safety everywhere
- **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)** – GraphQL server
- **[Drizzle ORM](https://orm.drizzle.team/)** – typed SQL ORM
- **[SQLite](https://www.sqlite.org/)** – lightweight database
- **[Bun](https://bun.sh/)** – fast all-in-one JavaScript runtime

---

## 🎯 Goals of This Project

- Practice **GraphQL schema design**  
- Explore **TypeScript type inference** in resolvers  
- Build a foundation for hotel-style booking systems  
- Demonstrate **senior-level patterns** (abstractions, reusability, testing ideas)  

---

## 🤝 Contributing

This is a personal playground, but PRs, ideas, and discussions are welcome.  
If you’d like to extend it (e.g. add payments, authentication, or advanced room logic), open an issue!

---

## 📜 License

MIT © 2025 Marco Chavez Jr
