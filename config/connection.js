const db_host = "cluster0.ff4aoli.mongodb.net";
const db_name = "vidly";
const db_user = "abhishekbose86";
const db_pwd = "P6V9Vl4YOjiijGtU";


function connectionstring() {
 const conn = `mongodb+srv://${db_user}:${db_pwd}@${db_host}/${db_name}?retryWrites=true&w=majority`;
 return conn;

}

console.log(connectionstring());

module.exports = connectionstring;