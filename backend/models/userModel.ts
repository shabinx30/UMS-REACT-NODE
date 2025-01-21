import pool from "../config/db";
import bcrypt from "bcrypt";

interface User {
  id?: number;
  name: string;
  profile?: string;
  email: string;
  password?: string;
  created_at?: Date;
}

const HashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const addUser = async (name:string, profile: string, email: string, password: string): Promise<any> => {
  try {
    const hashedPassword = await HashPassword(password)
    console.log('pass ',hashedPassword)
    const query = `INSERT INTO users (name, profile, email, password) VALUES ($1, $2, $3, $4) returning id, name, profile, email`
    const values = [name, profile, email, hashedPassword];
    const result = await pool.query(query,values)

    if (!result.rows.length) {
      throw new Error("Failed to insert user.");
    }
    return result.rows[0];
  } catch (error) {
    console.log(error)
  }
}

const userExist = async (email: string) : Promise<any> => {
  try {
    return await pool.query('select * from users where email=$1',[email])
  } catch (error) {
    console.log(error)
  }
}

const getUsers = async () => {
  try {
    return await pool.query('select * from users ORDER BY id DESC')
  } catch (error) {
    console.log(error)
  }
}

const login = async (email: string, password: string) => {
  try {
    
    return await pool.query('select * from users where email=$1',[email]);
    
  } catch (error) {
    console.log(error)
  }
}

const deleteUser = async (id: string | number) => {
  try {
    await pool.query('delete from users where id=$1',[id])
  } catch (error) {
    console.log(error)
  }
}

const searchUser = async (name: string) => {
  try {
    return await pool.query(`select * from users where name ilike $1`,[`%${name}%`]);
  } catch (error) {
    console.log(error)
  }
}

export { 
  User,
  HashPassword, 
  addUser,
  userExist,
  getUsers ,
  login,
  deleteUser,
  searchUser
};