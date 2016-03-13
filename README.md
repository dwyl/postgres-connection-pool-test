# postgres-connection-pool-test

Experiment with PostgreSQL Connection Pool (Multiple HTTP Requests should not create multiple pg connections)

## Background

While attempting to use PostgreSQL in our Hapi.js application,
we were experiencing an issue when multiple connections were made.

This issue is described in: https://github.com/brianc/node-postgres/issues/725
and a *potential* solution was suggested:
https://github.com/brianc/node-postgres/issues/725#issuecomment-195718983
