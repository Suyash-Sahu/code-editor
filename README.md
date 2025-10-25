# Codyn IDE - AI-Powered Code Editor

Codyn IDE is a modern, AI-enhanced code editor built with **Next.js 15** that allows you to create, edit, and run code projects directly in your browser.  
With **WebContainer** technology and **xterm integration**, Codyn provides a seamless in-browser development experience — no local server setup required.

---

## 🚀 Features

- 🤖 **AI-Powered Coding**: Get intelligent code suggestions and completions  
- 🌐 **Browser-Based Execution**: Run Node.js environments directly in the browser using WebContainer  
- 🧠 **xterm Integration**: Fully interactive terminal-like experience directly inside the IDE  
- 🎨 **Modern UI**: Beautiful interface with dynamic theme support (Dark & Light modes)  
- 🔧 **Multiple Templates**: Start coding instantly with templates for Express, React, Next.js, Vue, and more  
- 🔐 **Authentication**: Secure login with GitHub or Google OAuth  
- 💾 **Project Management**: Create, save, and manage multiple coding projects  
- 📱 **Responsive Design**: Optimized for both desktop and mobile environments  

---

## ⚙️ Prerequisites

Before starting, make sure you have:

- Node.js **v18 or higher**
- A package manager: **npm**, **yarn**, **pnpm**, or **bun**
- **Git** for cloning the repository

---

## 🛠 Getting Started

### 1. Clone the Repository

```bash
https://github.com/Suyash-Sahu/code-editor.git
cd code-editor
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
touch .env
```

Add the following values:

```env
# Database connection (MongoDB)
DATABASE_URL="mongodb://localhost:27017/codyn-ide"
# or for MongoDB Atlas:
# DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/codyn-ide?retryWrites=true&w=majority"

# Authentication secret
AUTH_SECRET="your-super-secret-key-here-change-this-in-production"

# GitHub OAuth (optional)
AUTH_GITHUB_ID="your-github-oauth-app-id"
AUTH_GITHUB_SECRET="your-github-oauth-app-secret"

# Google OAuth (optional)
AUTH_GOOGLE_ID="your-google-oauth-app-id"
AUTH_GOOGLE_SECRET="your-google-oauth-app-secret"

# Optional base path (for deployments under subpaths)
NEXT_PUBLIC_BASE_PATH=
```

**Notes:**

- Generate `AUTH_SECRET` using:
  ```bash
  openssl rand -base64 32
  ```
- For OAuth, create apps in GitHub and Google Developer Consoles
- For local testing, you only need `DATABASE_URL` and `AUTH_SECRET`

### 🗄 Database Setup

Codyn IDE uses MongoDB. You can choose one of the following:

**Option A: Local MongoDB**
1. Install and run MongoDB locally.
2. Use the default connection URL in your `.env`.

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account on MongoDB Atlas.
2. Create a new cluster.
3. Copy the connection string and update your `.env` file.

### 🧩 Generate Prisma Client

```bash
npx prisma generate
```

### 🧠 Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Then open http://localhost:3000 in your browser.

---

## 📁 Project Structure

```
codyn-ide/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── modules/             # Core features (auth, dashboard, playground, etc.)
├── lib/                 # Utility functions and shared libraries
├── prisma/              # Prisma schema and migrations
├── codyn-starters/      # Boilerplates for Express, React, etc.
├── public/              # Static assets
└── ...
```

---

## 🧰 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint to check for issues |
| `npx prisma generate` | Generate Prisma client |
| `npx prisma studio` | Open Prisma Studio (visual DB interface) |

---


## 🔑 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | MongoDB connection string | ✅ Yes |
| `AUTH_SECRET` | Secret key for NextAuth | ✅ Yes |
| `AUTH_GITHUB_ID` | GitHub OAuth App ID | ❌ Optional |
| `AUTH_GITHUB_SECRET` | GitHub OAuth Secret | ❌ Optional |
| `AUTH_GOOGLE_ID` | Google OAuth App ID | ❌ Optional |
| `AUTH_GOOGLE_SECRET` | Google OAuth Secret | ❌ Optional |
| `NEXT_PUBLIC_BASE_PATH` | App base path for deployment | ❌ Optional |

---

## 📚 Learn More

- [Next.js Docs](https://nextjs.org/docs) – Learn about Next.js features
- [Prisma Docs](https://www.prisma.io/docs) – ORM and database toolkit
- [WebContainer Docs](https://webcontainers.io) – Run Node.js in the browser
- [NextAuth.js Docs](https://next-auth.js.org) – Authentication library

---

## 🤝 Contributing

We welcome contributions!
To contribute:

1. Fork the repository
2. Create a feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request 🎉

---

## 📄 License

This project is licensed under the MIT License – see the LICENSE file for details.

---

## 💬 Support

If you face any issues or have questions, please open an issue on the GitHub repository.