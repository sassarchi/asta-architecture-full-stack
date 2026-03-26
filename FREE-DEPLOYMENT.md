# 🚀 FREE Deployment Guide - ASTA Architecture

## The Best FREE Option: Vercel + Supabase

**Total Cost: $0/month forever!**

| Service | Free Limits | What it provides |
|---------|-------------|------------------|
| **Vercel** | 100GB bandwidth, 100 builds/day | Hosting |
| **Supabase** | 500MB database, 1GB storage | Database + Auth |

---

## Step-by-Step Deployment

### Step 1: Create a GitHub Account (if you don't have one)
1. Go to https://github.com
2. Sign up for FREE
3. Create a new repository called "asta-architecture"

### Step 2: Push Your Code to GitHub
```bash
# In your project folder
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/asta-architecture.git
git push -u origin main
```

### Step 3: Create Supabase Account (FREE Database)
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub
4. Create a new project:
   - Name: "asta-architecture"
   - Database password: (save this!)
   - Region: Choose closest to you

5. Wait ~2 minutes for project to be ready

6. Get your database URL:
   - Go to: Project Settings → Database
   - Copy the "Connection string" (URI format)
   - It looks like: `postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

### Step 4: Deploy to Vercel (FREE Hosting)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New" → "Project"
4. Import your "asta-architecture" repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `bun run build` (or `npm run build`)
   - Output Directory: `.next`

6. Add Environment Variables:
   ```
   DATABASE_URL = postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true
   DIRECT_DATABASE_URL = postgresql://postgres.[REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
   ```

7. Click "Deploy"
8. Wait 2-3 minutes

### Step 5: Update Database Schema for PostgreSQL
After first deployment, update your Prisma schema:

1. Change `prisma/schema.prisma` datasource to:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

2. Push to GitHub - Vercel will auto-redeploy

---

## Alternative: Use Render (Simpler but Slower)

If Vercel + Supabase seems complicated, use Render:

1. Go to https://render.com
2. Sign up with GitHub
3. Create "New Web Service"
4. Connect your repository
5. Configure:
   - Build Command: `bun run build`
   - Start Command: `bun run start`
6. Add persistent disk (FREE) for SQLite
7. Deploy!

---

## Custom Domain (Optional)

### Free Domain Options:
- **Freenom** - .tk, .ml, .ga domains (limited)
- **DuckDNS** - Free subdomain

### Paid Domains (Recommended):
- **Namecheap** - $1-10/year for .com
- **Cloudflare** - At-cost pricing (~$10/year)

### Setup:
1. Buy domain
2. In Vercel: Settings → Domains → Add
3. Update DNS records at your registrar
4. SSL is automatic!

---

## Summary

| Step | Time | Action |
|------|------|--------|
| 1 | 5 min | Create GitHub repo |
| 2 | 5 min | Push code to GitHub |
| 3 | 5 min | Create Supabase project |
| 4 | 5 min | Deploy to Vercel |
| 5 | 2 min | Update database schema |
| **Total** | **~20 min** | **Your site is LIVE!** |

---

## Need Help?

If you get stuck:
1. Check Vercel deployment logs
2. Make sure environment variables are correct
3. Ensure DATABASE_URL is properly formatted

Good luck! 🎉
