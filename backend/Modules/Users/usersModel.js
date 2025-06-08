require('dotenv/config');
const { Op } = require('sequelize');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT_ROUNDS, SECRET_JWT_KEY } = require("../../config");
const { Usuarios } = require('../../db/schema');

class UsersModel {
    static async register({ usuario }) {
        const {
            username,
            password,
            email
        } = usuario;
        const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS);

        try {
            // Verificar si ya existe un usuario con el mismo username o email
            const existingUser = await Usuarios.findOne({
                where: {
                    [Op.or]: [
                        { email }
                    ]
                }
            });
            if (existingUser) {
                throw new Error("Ya existe un usuario con ese nombre de usuario o correo electrónico.");
            }

            const user = await Usuarios.create({
                username,
                password: hashedPassword,
                email
            });
            return {
                username: user.username,
                email: user.email
            };
        } catch (error) {
            throw new Error(`Error al crear el usuario ${username}: ${error}`);
        }
    }

    static async login({ usuario }) {
        const {
            email,
            password
        } = usuario;
        try {
            const user = await Usuarios.findOne({ where: { email } });
            if (!user) {
                throw new Error(`El usuario ${email} no existe.`);
            }
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                throw new Error("Contraseña inválida.");
            }

            const token = jwt.sign(
                { email: user.email, id: user.id, admin: user.admin },
                SECRET_JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            return {
                email: user.email,
                token: token
            };
        } catch (error) {
            throw new Error(`Error al buscar el usuario ${email}: ${error.message}`);
        }
    }

    static async verifyToken({ token }) {
        try {
            jwt.verify(token, SECRET_JWT_KEY);
            return { valid: true };
        } catch (err) {
            return { valid: false };
        }
    }
}

module.exports = { UsersModel };