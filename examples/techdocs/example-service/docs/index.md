# example-service

The example service is a small HTTP API that the Accelerate portal uses to
demonstrate how a component's documentation, API definition and scorecard sit
together on one entity page.

!!! info "Who owns this"
    `artist-relations-team` owns this service. Raise questions in
    `#artist-relations-eng`; on-call rota is in the [runbook](runbook.md).

## What it does

| Capability | Endpoint | Notes |
| --- | --- | --- |
| List artists | `GET /artists` | Paginated, 50 per page |
| Fetch one artist | `GET /artists/{id}` | Returns 404 when the id is unknown |
| Health | `GET /healthz` | Used by the platform's readiness probe |

## Architecture

```text
client ──► gateway ──► example-service ──► Postgres (source of truth)
                                       └─► Redis    (read-through cache)
```

The service is stateless; every instance can serve every request. Postgres is
the source of truth and Redis is a read-through cache with a five-minute TTL.

## Related

- [example-grpc-api](../../catalog/default/api/example-grpc-api) — the gRPC
  contract this service provides.
- [Accelerate design guide](../../docs/default/component/accelerate-design-guide)
  — how portal pages like this one are put together.
