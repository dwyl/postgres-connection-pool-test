# postgres-connection-pool-test

Experiment with PostgreSQL Connection Pool (Multiple HTTP Requests should not create multiple pg connections)

## Background

While attempting to use PostgreSQL in our Hapi.js application,
we were experiencing an issue when multiple connections were made.

This issue is described in: https://github.com/brianc/node-postgres/issues/725
and a *potential* solution was suggested:
https://github.com/brianc/node-postgres/issues/725#issuecomment-195718983

The code in `server.js` is copied from:
https://github.com/brianc/node-postgres/wiki/Example

We added a few console logs and an *optional* extra parameter to
the `handleError` function to show how many times it is being called.

## Discovered

Each HTTP request is inserting *two* records into the `visit` table,
where we *expect* only *one* to be inserted ...

## Try it!

We pushed the example up to heroku:
https://node-postgres-example.herokuapp.com/

When you refresh the page you see that the visit count goes up by ***two***
each time...!
