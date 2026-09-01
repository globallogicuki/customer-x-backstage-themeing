# Runbook

## Dashboards

- **Service health** — latency, error rate and saturation.
- **Dependencies** — Postgres connections and Redis hit rate.

## Alerts

| Alert | Meaning | First action |
| --- | --- | --- |
| `ExampleServiceHighErrorRate` | 5xx above 2% for 5 minutes | Check recent deploys; roll back if one correlates |
| `ExampleServiceCacheMiss` | Redis hit rate below 60% | Confirm Redis is reachable; the service degrades gracefully |

## Rollback

```bash
kubectl -n cx-prod rollout undo deployment/example-service
```

!!! danger "Data migrations"
    Migrations are forward-only. If a release included one, do **not** roll
    back the deployment — fix forward and page the owning team.
