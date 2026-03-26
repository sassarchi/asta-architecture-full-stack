# ASTA Architecture - Quick Deployment Guide

## 🚀 Deploy Your Website in 10 Minutes (100% FREE)

### Step 1: Download Your Project
Click the download button in the sandbox to get all files.

### Step 2: Create Accounts (FREE)
1. **GitHub** → https://github.com/signup
2. **Vercel** → https://vercel.com/signup (sign up with GitHub)
3. **Supabase** → https://supabase.com (sign up with GitHub)

### Step 3: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `asta-architecture`
3. Make it **Private** or **Public**
4. Click "Create repository"

### Step 4: Push Your Code to GitHub
Open terminal in your project folder and run:

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - ASTA Architecture"

# Set main branch
git branch -M main

# Connect to your GitHub repo
git remote add origin https://github.com/YOUR_USERNAME/asta-architecture.git

# Push to GitHub
git push -u origin main
```

### Step 5: Create Supabase Database (FREE)
1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Name: `asta-architecture`
4. Set a strong password (save it!)
5. Region: Choose closest to you
6. Click "Create new project"
7. Wait 2-3 minutes...

**Get your database URL:**
1. Go to Project Settings → Database
2. Find "Connection string" → Select "URI"
3. Copy it (looks like: `postgresql://postgres.xxxx:password@...`)
4. Save this - you'll need it!

### Step 6: Deploy to Vercel (FREE)
1. Go to https://vercel.com/new
2. Select your `asta-architecture` repository
3. Framework: Next.js (auto-detected)
4. Click "Environment Variables"
5. Add:
   - Name: `DATABASE_URL`
   - Value: (paste your Supabase connection string)
6. Click "Deploy"
7. Wait 2-3 minutes...

### Step 7: 🎉 Done!
Your website is now live at:
```
https://asta-architecture.vercel.app
```

---

## 🔄 After First Deployment

### Switch to PostgreSQL (Required for Vercel)

1. Open `prisma/schema.prisma`
2. Change line 8-10 from:
```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```
To:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_DATABASE_URL")
}
```

3. Add another environment variable in Vercel:
   - Name: `DIRECT_DATABASE_URL`
   - Value: Same DATABASE_URL but without `?pgbouncer=true`

4. Push changes to GitHub - Vercel auto-redeploys!

---

## 🆘 Need Help?

### Common Issues:

**"Build failed"**
- Make sure DATABASE_URL is correct
- Check if Supabase project is running

**"Database connection failed"**
- Verify DATABASE_URL format
- Check Supabase project is not paused

**"Images not uploading"**
- Images work locally on Vercel
- For production, use Cloudinary (free tier)

---

## 📱 Custom Domain (Optional)

1. Buy domain from Namecheap ($1-10/year)
2. In Vercel: Settings → Domains → Add domain
3. Update DNS at your registrar
4. SSL is automatic!

---

## 💰 Total Cost: $0/month

| Service | Free Tier |
|---------|-----------|
| Vercel | 100GB bandwidth, unlimited sites |
| Supabase | 500MB database, 1GB storage |
| GitHub | Unlimited private repos |

You only pay if you grow big! 🚀
