const { validateRegistro, validateLogin } = require("./usersValidate");
const { UsersModel } = require("./usersModel");
const jwt = require("jsonwebtoken")
const { SECRET_JWT_KEY } = require("../../config");

class UsersController {
    register = async (req, res) => {
        //console.log(req.body)
        const result = validateRegistro(req.body)
        //console.log(result)
        //console.log(result.data)
        if (!result.success) {
            console.log(result.error.message)
            return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        const usuario = result.data    

        try {
            const response = await UsersModel.register({ usuario })
            return res.json(response)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Usuario ya existe' });
        }
    }

    login = async (req, res) => {
        const result = validateLogin(req.body)
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
        
        const usuario = result.data
        try {
            const response = await UsersModel.login({ usuario })
            return res.status(200).json({
                message: `El usuario ${response.username} ha iniciado sesión exitosamente`,
                token: response.token
            })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error al iniciar sesión' });
        }
    }

    getAuth = async (req, res) => {
        const authResult = await this.auth(req);
        console.log(authResult)
        return res.json(authResult);
    }

    async auth(req) {
        const token = req.headers.authorization?.split(' ')[1];
    
        if (!token) {
            return { valid: false };
        }
    
        try {
            const decoded = await new Promise((resolve, reject) => {
                jwt.verify(token, SECRET_JWT_KEY, (err, decoded) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(decoded); 
                    } 
                });
            });
            //console.log(decoded);
            const id = decoded.id;
            return { valid: true , id: id };
    
        } catch (err) {
            console.log(err);
            return { valid: false, error: `Error al verificar el token:, ${err.message}` };
        }
    }
}

module.exports = { UsersController }