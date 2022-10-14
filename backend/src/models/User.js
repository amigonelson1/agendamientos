const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require("../config");

const userSchema = new Schema({
    nombre: String,
    codigo:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    documento:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    resetToken:String,
    imagen: String,
    celular:String,
    activo: {
        type: Boolean,
        required: true,
        trim: true
    },
    idFamiliar: String,
    contra: String,
    telefono2: String,
    direccion: String,
    color: String,
    fechaNacimiento: String,
    estatura: String,
    genero: String,
    barrio: String,
    peso: String,
    categoria: String,
    torneos: String,
    brazoDominante: String,
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rol: [{
        ref: "Role",
        type: Schema.Types.ObjectId, //para relacionarlo con el rol
        required: true,
        trim: true,
    }]
}, {
    timestaps: true,
    versionKey: false
});


userSchema.methods.cifrarPass = async (contra) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(contra, salt);
};
userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

userSchema.methods.setImagen = function setImagen (filename) {
const {local, host, port} = config
if (local == 1){
    //el aplicativo se encuentra de manera local, no en un servidor remoto
    this.imagen = `${host}:${port}/public/${filename}`
  } else {
    //el aplicativo se encuentra en un servidor remoto como heroku
    this.imagen = `${host}/public/${filename}`
  }
    
}

module.exports = model('User', userSchema);