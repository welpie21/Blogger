// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_auth_login from "./routes/(auth)/login.tsx";
import * as $_main_layout from "./routes/(main)/_layout.tsx";
import * as $_main_middleware from "./routes/(main)/_middleware.ts";
import * as $_main_index from "./routes/(main)/index.tsx";
import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";

import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/(auth)/login.tsx": $_auth_login,
    "./routes/(main)/_layout.tsx": $_main_layout,
    "./routes/(main)/_middleware.ts": $_main_middleware,
    "./routes/(main)/index.tsx": $_main_index,
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
  },
  islands: {},
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
