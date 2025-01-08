const { Pool } = require("pg");

// console.log('test of db.ts',process.env.DB_HOST)

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

// const connect = async () => {
//   db.connect()
//     .then(() => console.log("Database connected"))
//     .catch((err: any) => console.error("Connection error:", err));
// };

// db.query('select * from users', (err:any,res:any) => {
//   if(!err){
//     console.log(res.rows[0])
//   }else{
//     console.log('db error',err.message)
//   }
// })

export default pool