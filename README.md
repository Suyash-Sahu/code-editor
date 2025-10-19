This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deploy on Render

To deploy this application to Render, follow these steps:

1. Create a new Web Service on Render
2. Connect your repository
3. Use the following configuration:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start`
4. Add the required environment variables:
   - `DATABASE_URL` - Your production database connection string
   - `AUTH_SECRET` - A secret key for NextAuth
   - `AUTH_GITHUB_ID` and `AUTH_GITHUB_SECRET` - GitHub OAuth credentials
   - `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` - Google OAuth credentials
5. Set `NODE_ENV` to `production`

The `render.yaml` file in this repository contains these settings, which Render will automatically use when you connect your repository.

### Environment Variables

Make sure to set the following environment variables in your Render dashboard:

```
DATABASE_URL=your_production_database_url
AUTH_SECRET=your_secret_key
AUTH_GITHUB_ID=your_github_id
AUTH_GITHUB_SECRET=your_github_secret
AUTH_GOOGLE_ID=your_google_id
AUTH_GOOGLE_SECRET=your_google_secret
NEXT_PUBLIC_BASE_PATH=
NODE_ENV=production