const pgp = require("pg-promise")()
var cn = {
    host: 'localhost', // 'localhost' is the default
    port: 5432, // 5432 is the default;
    database: 'task',
    user: 'postgres',
    password: 'gfhjkm36'
};
var db = pgp(cn);
// db.none('INSERT INTO documents(id, doc) VALUES(${id}, ${this})', {
//     id: 123,
//     body: 'some text'
// })
// db.none('INSERT INTO "Task" (value) VALUES(${value})', {
//     value: 'John1'
// });
var x = true
 db.none('UPDATE "Task" SET done = ${status} WHERE "pkKey" = ${id}', {
   id:  74,
   status: !x
 }) ;
// db.none('UPDATE "Task" SET done = $1 WHERE "pkKey" = $2', [true, 23]);
// db.none('UPDATE "Task" SET done = $1 WHERE "pkKey" = $2', [true, 24]);
// db.none('UPDATE "Task" SET done = $1 WHERE "pkKey" = $2', [true, 25]);
// db.none('UPDATE "Task" SET done = $1 WHERE "pkKey" = $2', [true, 26]);
// db.none('UPDATE "Task" SET done = $1 WHERE "pkKey" = $2', [true, 27]);//db.none('INSERT INTO "Task" (value, "pkKey") VALUES(Buka", 1234)');
//db.none('INSERT INTO documents(id, doc) VALUES(123, {"id":123,"body":"some text"}');
//=> INSERT INTO documents(id, doc) VALUES(123, '{"id":123,"body":"some text"}')
db.any('SELECT "value", "done", "pkKey" from "Task"')
    .then(function (data) {
        console.log("DATA:", data);
    })
    .catch(function (error) {
        console.log("ERROR:", error);
    });

// export const getAllTask =() => db.any("SELECT \"value\" from \"Task\"")
    //     .then(function (data) {
    //         console.log("DATA:", data);
    //     })
    //     .catch(function (error) {
    //         console.log("ERROR:", error);
    //     });
    // const response = await fetch('/api/tasks');
    // return await response.json();

