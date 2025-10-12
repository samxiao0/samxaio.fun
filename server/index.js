import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.warn("Warning: No GITHUB_TOKEN found in environment. Proxy will forward unauthenticated requests.");
}

app.use((req, res) => {
  const target = `https://api.github.com${req.url}`;
  const headers = {
    Accept: req.headers.accept || "application/vnd.github.v3+json",
  };
  if (GITHUB_TOKEN) headers.Authorization = `token ${GITHUB_TOKEN}`;

  fetch(target, { headers })
    .then(async (r) => {
      const body = await r.text();
      res.status(r.status).set(Object.fromEntries(r.headers.entries())).send(body);
    })
    .catch((err) => {
      console.error(err);
      res.status(502).json({ message: "proxy error" });
    });
});

app.listen(PORT, () => {
  console.log(`GitHub proxy listening on http://localhost:${PORT}`);
});
