# User Data Collection & API System 🚀

## Overview
Welcome to the **User Data Collection & API System**! This project automatically fetches random user data, stores it in a PostgreSQL database, and provides a handy API to access the data with various filters.

## Features
- **Auto Data Fetching:** Retrieves 5 random users every 5 minutes from [Random User API](https://randomuser.me/api/).
- **Database Storage:** Saves user info in PostgreSQL using Prisma ORM.
- **RESTful API:** Get users with filters like gender, city, country, plus pagination and field selection.

## Tech Stack
- **Frontend & API:** Next.js (App Router) with TypeScript
- **ORM:** Prisma
- **Database:** PostgreSQL
- **Scheduling:** node-cron
- **HTTP Requests:** Axios

## Getting Started

### Prerequisites
- **Node.js** (v14+)
- **npm**
- **PostgreSQL** database up and running

### Installation
1. **Clone the repo**
    ```bash
    git clone https://github.com/artem-auth0/user-data-collection.git
    cd user-data-collection
    ```

2. **Install dependencies**
    ```bash
    npm install
    ```

### Configuration
1. **Set up Environment Variables**
    Create a `.env` file in the root and add your PostgreSQL connection string:
    ```env
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE_NAME?schema=public"
    ```
    Replace `USER`, `PASSWORD`, `HOST`, `PORT`, and `DATABASE_NAME` with your DB credentials.

2. **Prisma Setup**
    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

### Running the Project
- **Development Mode**
    ```bash
    npm run dev
    ```
    This starts the Next.js server and the cron job that fetches user data every 5 minutes.

- **Production Mode**
    ```bash
    npm run build
    npm start
    ```

## API Usage

### Get Users
**Endpoint:** `GET /api/users`

**Query Params:**
- `gender` (optional): `male` or `female`
- `city` (optional): e.g., `New York`
- `country` (optional): e.g., `USA`
- `page` (optional): Page number (default: 1)
- `limit` (optional): Users per page (default: 10)
- `fields` (optional): Comma-separated fields (e.g., `name,email,gender, location`)

**Example Request:**
```GET http://localhost:3000/api/users?gender=male&page=1&limit=5&fields=name,email,gender,location&city=Brighton%20and%20Hove```

**Example Response:**
```{
  "page": 1,
  "limit": 5,
  "total": 1,
  "totalPages": 1,
  "data": [
    {
      "name": "Matt Diaz",
      "email": "matt.diaz@example.com",
      "gender": "male",
      "location": {
        "city": "Brighton and Hove",
        "country": "United Kingdom"
      }
    },
		//...more users
  ]
}
```

## Project Structure
```user-data-collection/
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── users/
│   │   │       └── route.ts
│   │   └── page.tsx
│   ├── scripts/
│   │   └── dataCollector.ts
│   └── ...
├── server.ts
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## Contributing
Feel free to fork the repo and submit pull requests. Any improvements or bug fixes are welcome!

## Contact
Got questions or suggestions? Reach out to [tim.zozulia@gmail.com](mailto:tim.zozulia@gmail.com).

---
**Happy Coding! 🎉**