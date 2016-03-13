var http = require('http');
var pg = require('pg');

var conString = "postgres://postgres:@localhost/test";

var server = http.createServer(function(req, res) {

  // get a pg client from the connection pool
  pg.connect(conString, function(err, client, done) {

    var handleError = function(err, query) {
      console.log('handleError...', query);
      // no error occurred, continue with the request
      if(!err) return false;

      // An error occurred, remove the client from the connection pool.
      // A truthy value passed to done will remove the connection from the pool
      // instead of simply returning it to be reused.
      // In this case, if we have successfully received a client (truthy)
      // then it will be removed from the pool.
      if(client){
        console.log('>> done(client)');
        done(client);
      }
      res.writeHead(500, {'content-type': 'text/plain'});
      res.end('An error occurred');
      return true;
    };

    // handle an error from the connection
    if(handleError(err, 'CONNECT')) return;

    // record the visit
    client.query('INSERT INTO visit (date) VALUES ($1)', [new Date()], function(err, result) {

      // handle an error from the query
      if(handleError(err, 'INSERT')) return;
      console.log(' - - - - - - - - - - - - - - - - - - - - - - - - - - - ');
      console.log(err, result);

      // get the total number of visits today (including the current visit)
      client.query('SELECT COUNT(date) AS count FROM visit', function(err, result) {
        // console.log(err, result);
        // handle an error from the query
        if(handleError(err, 'SELECT')) return;

        // return the client to the connection pool for other requests to reuse
        done();
        res.writeHead(200, {'content-type': 'text/plain'});
        res.end('You are visitor number ' + result.rows[0].count);
      });
    });
  });
})

server.listen(3001)
