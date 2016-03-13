var pg = require('pg');
var assert = require('assert');

var conString = process.env.DATABASE_URL || "postgres://postgres:@localhost/test";

function create_tables (callback) {
  pg.connect(conString, function(err, client, done) {
    console.log(err);
    var create = 'CREATE TABLE IF NOT EXISTS visit (date DATE)';
    // see: http://stackoverflow.com/a/13823560/1148249
    console.log('\n', create);
    client.query(create, function(err, result) {
      console.log(err, result);
      done();       // call `done()` to release the client back to the pool
      client.end(); // close connection to database
      return callback(err, result);
    });
  });
}

create_tables(function(){
  console.log('Table created!');
});
