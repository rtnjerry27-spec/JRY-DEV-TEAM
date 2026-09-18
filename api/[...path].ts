import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";
import { registerOAuthRoutes } from "../server/_core/oauth";

const app = express();
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

// These routes are served by the same Vercel function so OAuth sessions and
// protected preset procedures share the same origin and cookies as the SPA.
registerOAuthRoutes(app);
app.use(
  "/api/trpc",
  createExpressMiddleware({ router: appRouter, createContext }),
);
// Vercel may strip the /api prefix before invoking a catch-all function.
app.use(
  "/trpc",
  createExpressMiddleware({ router: appRouter, createContext }),
);

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
