import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { loadConfig } from "./config/env.js";
import { createApp } from "./app.js";

const here = dirname(fileURLToPath(import.meta.url));
const rootEnv = resolve(here, "../../../.env");
const localEnv = resolve(process.cwd(), ".env");
dotenv.config({ path: existsSync(rootEnv) ? rootEnv : localEnv });

const config = loadConfig();
const app = createApp(config);

app.listen(config.PORT, () => {
  console.log(`Guardian402 API listening on http://localhost:${config.PORT}`);
  console.log(`Network: ${config.STELLAR_NETWORK}`);
});
