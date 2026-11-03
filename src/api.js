// All calls to the TaskFlow API go through this file.
// The base URL comes from VITE_API_URL, which Vite bakes in at build time.

const BASE_URL = (import.meta.env.VITE_API_URL ?? "").trim().replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, { status = null, isNetworkError = false } = {}) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

async function request(path, { method = "GET", body } = {}) {
  if (!BASE_URL) {
    throw new ApiError(
      "The API URL is not set. Add VITE_API_URL to your .env file (or to Netlify's environment variables) and rebuild.",
      { isNetworkError: true },
    );
  }

  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    // fetch only throws when no response came back at all:
    // the server is down, the URL is wrong, or CORS blocked the request.
    throw new ApiError(
      `Cannot reach the TaskFlow API at ${BASE_URL}. Check that the server is running and that CORS allows this site.`,
      { isNetworkError: true },
    );
  }

  if (!response.ok) {
    // The API's 404 handler returns { message, timeStamp }.
    let message = `The API returned an error (HTTP ${response.status}).`;
    try {
      const data = await response.json();
      if (data?.message) message = data.message;
    } catch {
      // No JSON body. Keep the default message.
    }
    throw new ApiError(message, { status: response.status });
  }

  // DELETE returns 200 with an empty body.
  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const getTasks = () => request("/api/tasks");

export const createTask = ({ title, description }) =>
  request("/api/tasks", {
    method: "POST",
    body: { title, description, isCompleted: false },
  });

// The API's PUT overwrites title, description and isCompleted,
// so always send all three.
export const updateTask = (id, { title, description, isCompleted }) =>
  request(`/api/tasks/${id}`, {
    method: "PUT",
    body: { title, description, isCompleted },
  });

export const deleteTask = (id) =>
  request(`/api/tasks/${id}`, { method: "DELETE" });

export const completeTask = (id) =>
  request(`/api/tasks/${id}/complete`, { method: "PUT" });
