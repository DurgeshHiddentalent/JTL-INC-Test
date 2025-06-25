# JTL-INC-Test


# Backend Project (node.js)
1. Install Dependencies
npm install

2. Run Database Migrations
npx knex migrate:latest

3. Seed the Database (Organization , Venue)
npx knex seed:run

4. Start the Server
npm run start


# Frontend Project (Next.js)
1. Install Dependencies
npm install

2. Start the Server
npm run dev


# We used Next JS App router because:
The App Router in Next.js offers a modern approach to routing by enabling features like React Server Components, nested layouts, and streaming with Suspense. It simplifies data fetching using native fetch() and async/await, supports modular file structures, and introduces powerful tools like Server Actions. Compared to the traditional Pages Router, the App Router provides better performance, scalability, and a more intuitive developer experience, making it the recommended choice for new Next.js projects.

