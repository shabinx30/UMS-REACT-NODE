const { Pool } = require("pg");

const pool = new Pool({
  user: 'postgres',
  host: process.env.DB_HOST,
  database: 'user_managment_system',
  password: '28650',
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