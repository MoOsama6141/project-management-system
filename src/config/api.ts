export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? "https://upskilling-egypt.com:3003"
).replace(/\/$/, "");

export const API_V1 = `${API_BASE_URL}/api/v1`;
