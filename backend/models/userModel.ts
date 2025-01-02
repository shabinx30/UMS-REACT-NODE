import pool from "../db";
import bcrypt from "bcrypt";

export interface User {
  id?: number;
  name: string;
  profile: string;
  email: string;
  password: string;
}

const HashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10);
};

const addUser = async (name:string, profile: string, email: string, password: string): Promise<string> => {
    const hashedPassword = await HashPassword(password)
    const query = 'insert into users (name, profile, email, password) values($1, $2, $3, $4) returning id, name, profile, email, created_at'
    const values = [name, profile, email, hashedPassword]
    const result = await pool.query(query,values)
    return result.rows[0];
}

export default{ 
    HashPassword, 
    addUser 
};