"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.searchUser = exports.deleteUser = exports.login = exports.getUsers = exports.userExist = exports.addUser = exports.HashPassword = void 0;
const db_1 = __importDefault(require("../config/db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const HashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, 10);
});
exports.HashPassword = HashPassword;
const addUser = (name, profile, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield HashPassword(password);
        console.log('pass ', hashedPassword);
        const query = `INSERT INTO users (name, profile, email, password) VALUES ($1, $2, $3, $4) returning id, name, profile, email`;
        const values = [name, profile, email, hashedPassword];
        const result = yield db_1.default.query(query, values);
        if (!result.rows.length) {
            throw new Error("Failed to insert user.");
        }
        return result.rows[0];
    }
    catch (error) {
        console.log(error);
    }
});
exports.addUser = addUser;
const userExist = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.query('select * from users where email=$1', [email]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.userExist = userExist;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.query('select * from users ORDER BY id DESC');
    }
    catch (error) {
        console.log(error);
    }
});
exports.getUsers = getUsers;
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.query('select * from users where email=$1', [email]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.login = login;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query('delete from users where id=$1', [id]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.deleteUser = deleteUser;
const searchUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield db_1.default.query(`select * from users where name ilike $1`, [`%${name}%`]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.searchUser = searchUser;
const updateUser = (profile, name, email, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        db_1.default.query('UPDATE users SET profile = $1, name = $2, email = $3 WHERE id = $4', [profile, name, email, id]);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateUser = updateUser;
