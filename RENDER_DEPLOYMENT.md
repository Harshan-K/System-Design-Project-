# Deploy Backend to Render

## Step 1: Prepare Repository
1. Push your backend code to GitHub
2. Make sure `.env` is in `.gitignore`

## Step 2: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub account

## Step 3: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Select the `backend` folder (or root if backend is in root)
4. Configure:
   - **Name**: `college-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

## Step 4: Set Environment Variables
Add these in Render dashboard:
```
MONGO_URL=mongodb+srv://harshan:harshan%40123@cluster0.ny5bkdb.mongodb.net/college-management?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=a8f5f167f44f4964e6c998dee827110c
NODE_ENV=production
PORT=10000
```

## Step 5: Update Frontend
Replace `http://localhost:5000` with your Render URL:
`https://your-service-name.onrender.com`

## Your Render URL will be:
`https://college-backend-xxxx.onrender.com`

## Important Notes:
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes ~30 seconds
- Update CORS origins in server.js with your frontend domain