# API Starter Template

This is a starter template for building a type-safe, Fastify-based API with Supabase.

## Autoload Mechanism

The project uses [fastify-autoload](https://github.com/fastify/fastify-autoload) to automatically register all plugins and routes from the `/plugins` and `/routes` directories. This keeps the codebase modular and easy to extend.

**To add a new plugin or route:**
- Place your plugin in `/plugins/`.
- Place your route in `/routes/`.

- **plugins/**: Fastify plugins (e.g., authentication, CORS, etc.) are automatically loaded from here.
- **/routes/**: Routes handlers are placed here and autoloaded.
- **src/index.ts**: Main entry point. Bootstraps Fastify, loads plugins/routes, and starts the server.

They will be registered automatically on server startup.

## Supabase Client and Authentication

This API uses [Supabase Auth](https://supabase.com/docs/guides/auth) for authentication.

The authentication logic is implemented in [`plugins/app/auth.ts`](plugins/app/auth.ts). It checks for a `Bearer` token in the `Authorization` header of incoming requests.

- If the token is **missing or invalid**, the server responds with a `401 Unauthorized` error.
- If the token is **valid**, the plugin:
  - Verifies the user session.
  - Attaches the authenticated user to `req.user`.
  - Initializes a Supabase client using the user's access token.
  - Attaches the Supabase client to `req.supabase`.

This setup ensures each request has its own Supabase client with the correct user context and permissions.

**Usage:**
- Configure your Supabase credentials via environment variables.
- Use the provided authentication hooks/plugin in your route handlers.

## Extending the Template

- Add new plugins to `autoload/plugins/` for things like CORS, logging, etc.
- Add new routes to `autoload/routes/` for your API endpoints.
- Use Supabase utilities for authentication and database access.

---

**This template is ideal for quickly bootstrapping a Fastify API with Supabase authentication.**