"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const userModel = __importStar(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, password } = req.body;
        const profile = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
        if (!name || !email || !password) {
            res.status(400).json({ error: "Name, email, password is requied!", message: 'data are missing!' });
            return;
        }
        const exist = yield userModel.userExist(email);
        if (exist && exist.rowCount) {
            res.json({ message: 'This user is already existing!' });
            return;
        }
        const user = yield userModel.addUser(name, profile || '', email, password);
        //jwt 
        if (!process.env.ACCESS_TOKEN_SECRET) {
            throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.status(201).json({ user, token, message: 'success' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Error while adding the user!", message: 'Internal sever error!' });
    }
});
//loing*****************
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield userModel.login(email, password);
        if (data.rowCount) {
            const user = data.rows[0];
            if (yield bcrypt_1.default.compare(password, user.password)) {
                //jwt 
                if (!process.env.ACCESS_TOKEN_SECRET) {
                    throw new Error("ACCESS_TOKEN_SECRET is not defined in the environment variables.");
                }
                const token = jsonwebtoken_1.default.sign({ userId: user.id, role: 'user' }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
                res.json({ token, user, message: 'success' });
            }
            else {
                res.json({ message: 'email or password is incorrect!!!' });
            }
        }
        else {
            res.json({ message: 'User is not existing!!!' });
        }
    }
    catch (error) {
        console.log(error);
    }
});
const test = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json({ result: 'api is working' });
    }
    catch (error) {
        res.status(500).json({ error: "Error while adding the user!" });
    }
});
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const { id, name, email } = req.body;
        const profile = (_b = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path) !== null && _b !== void 0 ? _b : req.body.profile;
        const exist = yield userModel.userExist(email);
        if (exist && exist.rowCount) {
            if (id == exist.rows[0].id) {
                yield userModel.updateUser(profile, name, email, id);
            }
            else {
                res.json({ message: "This email is already taken!!!" });
                return;
            }
        }
        else {
            yield userModel.updateUser(profile, name, email, id);
        }
        res.json({ message: 'success' });
        return;
    }
    catch (error) {
        console.log(error);
    }
});
exports.default = {
    addUser,
    login,
    test,
    editUser
};
