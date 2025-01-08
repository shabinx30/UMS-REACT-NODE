import pool from "../db";
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

const getUsers = async () => {
  try {
    return await pool.query('select * from users')
  } catch (error) {
    console.log(error)
  }
}

export { 
  User,
  HashPassword, 
  addUser,
  getUsers 
};