const { Model, DataTypes } = require('sequelize');
const sequelize = require("./database");

class Usuarios extends Model {}

Usuarios.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize,
    timestamps: false,
    modelName: 'usuarios'
})

class Colores extends Model {}

Colores.init({
    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,
            key: 'id'
        }
    },
    color_1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color_2: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color_3: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color_4: {
        type: DataTypes.STRING,
        allowNull: false
    },
    color_5: {
        type: DataTypes.STRING,
        allowNull: false
    },
    predeterminado: {
        type: DataTypes.TINYINT,
        defaultValue: 0
    }
},{
    sequelize,
    timestamps: false,
    modelName: 'colores'
})


Colores.belongsTo(Usuarios, { foreignKey: 'id_usuario' });
Usuarios.hasMany(Colores, { foreignKey: 'id_usuario' });


module.exports = { Usuarios , Colores };
