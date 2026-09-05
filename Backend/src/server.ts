// src/server.ts
// Entry point. `dotenv/config` MUST be the very first import — env.ts
// validates process.env at import time, so .env must already be loaded
// before anything else (including createApp, which imports env.ts
// transitively) gets imported.

import "dotenv/config";

import { createApp } from "@/app";
import { env } from "@/lib/env";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`AuraHR backend listening on http://localhost:${env.PORT}`);
  console.log(`CORS allowed origin(s): ${env.CORS_ORIGIN}`);
});