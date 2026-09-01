# API reference

All endpoints are JSON over HTTPS and require a bearer token issued by the
platform gateway.

## `GET /artists`

Returns a page of artists.

| Query parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `page` | integer | `1` | 1-based page number |
| `q` | string | — | Free-text filter on name |

```json
{
  "items": [{ "id": "a_01", "name": "Example Artist" }],
  "page": 1,
  "total": 1
}
```

## `GET /artists/{id}`

Returns a single artist, or `404` with a problem-details body:

```json
{ "type": "about:blank", "title": "Not found", "status": 404 }
```

## Errors

!!! warning "Rate limiting"
    Clients are limited to 600 requests per minute per token. Exceeding the
    limit returns `429` with a `Retry-After` header.

> Breaking changes are announced two releases ahead in the **What's new**
> panel on the portal home page.
