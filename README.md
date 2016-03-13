# postgres-connection-pool-test

## Background

While attempting to use PostgreSQL in our Node (Hapi) application,
we were experiencing an issue when multiple connections were made.

This issue is described in: https://github.com/brianc/node-postgres/issues/725
and a *potential* solution was suggested:
https://github.com/brianc/node-postgres/issues/725#issuecomment-195718983

The code in `server.js` is copied from:
https://github.com/brianc/node-postgres/wiki/Example
(*with a few minor heroku-specific modifications made*)

## Findings

Each HTTP request is inserting *two* records into the `visit` table,
where we *expect* only *one* to be inserted ...

## Try it!

We pushed the example up to Heroku:
https://node-postgres-example.herokuapp.com/

When you refresh the page you see that the visit count goes up by ***two***
each time...!

This is *obviously* not the *desired* behaviour ...
