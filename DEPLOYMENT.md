# Deployment Guide for ASTA Architecture

## Quick Start (Railway - Recommended)

### Step 1: Prepare for Deployment

Add these files to your project:

#### 1. Create `vercel.json` (for Vercel) or use Railway defaults
```json
{
  "buildCommand": "bun run build",
  "outputDirectory": ".next",
  "framework": "nextjs"
}
```

#### 2. Update `package.json` scripts if needed
Make sure you have:
```json
{
  "scripts": {
    "build": "next build",
    "start": "next start"
  }
}
```

### Step 2: Choose Your Platform

---

## Option A: Railway (RECOMMENDED for SQLite)

**Best for:** Your current setup with SQLite database

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Environment Variables**
   ```
   DATABASE_URL=file:./db/custom.db
   NODE_ENV=production
   ```

4. **Add Persistent Volume** (Important for SQLite!)
   - Go to your project settings
   - Add a volume mounted to `/app/db`
   - This keeps your database persistent

5. **Deploy**
   - Railway auto-detects Next.js
   - Click "Deploy"

**Cost:** Free tier available, then ~$5/month

---

## Option B: Vercel (Best for Next.js)

**Best for:** Performance, but needs external database

1. **Create Vercel Account**
   - Go to https://vercel.com
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Database**
   - ⚠️ SQLite won't work on Vercel
   - Use PlanetScale, Supabase, or Neon (PostgreSQL)

4. **Deploy**
   - Vercel auto-configures Next.js
   - Click "Deploy"

**Cost:** Free tier available

---

## Option C: Render

**Best for:** Simple setup with persistence

1. **Create Render Account**
   - Go to https://render.com
   - Sign up

2. **Create Web Service**
   - Select "New Web Service"
   - Connect your GitHub repo

3. **Configure**
   ```
   Build Command: bun run build
   Start Command: bun run start
   ```

4. **Add Persistent Disk**
   - Add disk mounted to `/app/db`
   - Size: 1GB (free tier)

**Cost:** Free tier available

---

## Option D: Self-Hosted VPS

**Best for:** Full control, custom domain

### Popular VPS Providers:
| Provider | Starting Price | Location |
|----------|---------------|----------|
| DigitalOcean | $4/month | US/EU |
| Linode | $5/month | Global |
| Hetzner | €3.50/month | EU/US |
| OVH | $3.50/month | EU/US |

### Steps:
1. **Buy VPS** (Ubuntu 22.04 recommended)

2. **Connect via SSH**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js & Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

4. **Clone your repo**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
   cd YOUR_REPO
   ```

5. **Install dependencies & build**
   ```bash
   bun install
   bun run build
   ```

6. **Run with PM2**
   ```bash
   bun add -g pm2
   pm2 start bun -- run start
   pm2 save
   pm2 startup
   ```

7. **Setup Nginx (reverse proxy)**
   ```bash
   apt install nginx
   ```

8. **Add SSL with Certbot**
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx
   ```

---

## Domain Name Setup

### Where to Buy Domains:
- **Namecheap** - Affordable, good support
- **Cloudflare** - At-cost pricing
- **Google Domains** - Simple interface
- **GoDaddy** - Popular but pricier

### Connect Domain to Hosting:

**For Vercel/Railway/Render:**
1. Go to your project settings
2. Add custom domain
3. Update DNS records at your domain registrar:
   - Add CNAME record pointing to your hosting

**For VPS:**
1. Point A record to your server IP
2. Configure Nginx with your domain

---

## Quick Comparison

| Platform | SQLite Support | Free Tier | Ease | Speed |
|----------|---------------|-----------|------|-------|
| Railway | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐⭐ | Fast |
| Vercel | ❌ No | ✅ Yes | ⭐⭐⭐⭐⭐ | Fastest |
| Render | ✅ Yes | ✅ Yes | ⭐⭐⭐⭐ | Fast |
| VPS | ✅ Yes | ❌ No | ⭐⭐⭐ | Depends |

---

## My Recommendation

For your ASTA Architecture website with SQLite:

### 🥇 **Railway** (Best Overall)
- SQLite works out of the box
- Easy deployment
- Free tier to start
- Add persistent volume for uploads

### 🥈 **VPS** (If you want full control)
- Full control over server
- Works with your current setup
- Costs ~$5/month

---

## Need Help?

1. **Push to GitHub first** - All platforms need your code in a Git repository
2. **Choose Railway** - It's the easiest for your current setup
3. **Connect custom domain** - After deployment

Good luck! 🚀
