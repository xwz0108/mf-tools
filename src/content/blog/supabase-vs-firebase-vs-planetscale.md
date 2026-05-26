## Supabase vs Firebase vs PlanetScale: Backend Platforms Compared

Three backend-as-a-service platforms for modern apps.

### Comparison

| | Supabase | Firebase | PlanetScale |
|--|----------|----------|-------------|
| Database | PostgreSQL | Firestore (NoSQL) | MySQL (Vitess) |
| Auth | Built-in | Built-in | Third-party |
| Real-time | Yes | Yes | No |
| Pricing | Free tier generous | Pay-as-you-go | Free tier available |
| Open source | Yes | No | No |

### Supabase — Best for SQL Lovers

Supabase gives you a full PostgreSQL database with auth, real-time subscriptions, and storage. Open source, so you can self-host. Best for developers who want SQL without managing servers.

### Firebase — Best for Rapid Prototyping

Firebase Firestore is a NoSQL document database. Realtime sync, auth, cloud functions, hosting — everything integrated. Best for MVPs and mobile apps.

### PlanetScale — Best for Scale

PlanetScale runs on Vitess (the tech behind YouTube's database). Serverless MySQL with branching and schema change workflows. Best for production apps that need to scale.

> Use [SQL Formatter](/tools/sql-formatter) to format your queries on any platform.
