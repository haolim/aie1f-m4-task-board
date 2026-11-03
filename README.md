# Task Board

React frontend for the [TaskFlow API](https://github.com/haolim/aie1f-m4-assignment-taskflowapi) (Spring Boot, deployed on Railway). Built with Vite and React. The frontend is deployed to Netlify.

## Features

- **Task list:** tasks from `GET /api/tasks` in two columns, Pending and Completed. Each card shows the title, description and status.
- **Mark complete:** a button on each pending card, and in the detail panel. It calls `PUT /api/tasks/{id}/complete`.
- **Task details:** clicking a card opens a side panel. From there you can edit the title, description and completed status (`PUT /api/tasks/{id}`), or delete the task (`DELETE /api/tasks/{id}`). Unticking "Completed" in the edit form is how you move a task back to Pending.
- **Add task:** a form with title and description (`POST /api/tasks`). The title is required.
- **Search:** filters cards by title. This runs in the browser.
- **API errors:** a red banner appears when the API can't be reached, with a Retry button. Failed saves show the API's error message.

## Setup

You need Node.js 20.19+ or 22.12+.

```bash
npm install
cp .env.example .env
```

Set `VITE_API_URL` in `.env` to the API's base URL, with no `/api` at the end:

```
VITE_API_URL=http://localhost:8080
```

Then start the dev server:

```bash
npm run dev
```

The app runs at `http://localhost:5173`. The API must allow this origin in its CORS settings.

`.env` is git-ignored. Never commit it.

## Build

```bash
npm run build
```

The output goes to `dist/`.

## Deploy to Netlify

`netlify.toml` already sets the build command (`npm run build`), the publish folder (`dist`) and a redirect that sends every path to `index.html`.

1. In Netlify, choose **Add new site → Import an existing project** and pick this GitHub repo.
2. Under **Site configuration → Environment variables**, add `VITE_API_URL` with your Railway URL, e.g. `https://your-app.up.railway.app`. Use `https://`, because a Netlify site can't call a plain `http://` API.
3. Deploy. Vite copies `VITE_API_URL` into the built files, so after changing the variable you must trigger a new deploy.
4. Add your Netlify URL (e.g. `https://your-site.netlify.app`) to the API's CORS allowed origins.

## Notes

- The API keeps tasks in memory, so every API restart or redeploy clears the list.
- The API's `PUT /api/tasks/{id}` replaces all fields, so the frontend always sends `title`, `description` and `isCompleted` together.
