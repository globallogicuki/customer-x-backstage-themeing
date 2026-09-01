# Getting started

## Prerequisites

- Node 22 or 24
- Access to the `cx-dev` Kubernetes namespace
- The `example-service` secret in Vault (ask the owning team)

## Run it locally

```bash
git clone git@github.com:example/example-service.git
cd example-service
yarn install
yarn dev
```

The service listens on `http://localhost:8080`. Point it at a local Postgres
with `DATABASE_URL`, or leave it unset to use the in-memory fixture data.

```ts
// src/config.ts
export const config = {
  port: Number(process.env.PORT ?? 8080),
  databaseUrl: process.env.DATABASE_URL,
  cacheTtlSeconds: 300,
};
```

## Make your first request

```bash
curl -s http://localhost:8080/artists | jq '.items[0]'
```

!!! tip
    Every response carries an `x-request-id` header. Quote it when you raise
    an incident — it is indexed in the platform's log search.

## Next steps

1. Read the [API reference](api.md).
2. Add yourself to the owning group in `org.yaml`.
3. Open a pull request against `main`; CI runs the scorecard checks shown on
   this entity's **Scorecard** tab.
