# Task Board
 
A React frontend for the [TaskFlow API](https://github.com/haolim/aie1f-m4-assignment-taskflowapi), built with Vite and deployed on Netlify. This is Option 2 of the Module 4 assignment.
 
- **Live site:** https://hao-m4-task-board.netlify.app
- **API:** https://taskflowapi-latest.onrender.com/api/tasks
The API runs on Render's free tier. The first load can take about 50 seconds while it wakes up.
 
## Features
 
- View tasks in Pending and Completed columns
- Add, edit, complete and delete tasks
- Search tasks by title
- Error banner with a Retry button when the API can't be reached
## Run locally
 
Requires Node.js 20.19+ or 22.12+.
 
```bash
npm install
cp .env.example .env
npm run dev
```
 
Set `VITE_API_URL` in `.env` to the API's base URL, without `/api` (for example `http://localhost:8080`). The app runs at `http://localhost:5173`.
 
## Deploy
 
`netlify.toml` sets the build command and publish folder. In Netlify, set `VITE_API_URL` to the Render URL, then redeploy. The API must list the Netlify URL in its `CORS_ALLOWED_ORIGINS`.
 