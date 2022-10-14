const { Schema, model } = require('mongoose');
const config = require("../config");

const ImgempresaSchema = new Schema({
    imagen: String,
    //number: Number,
    ver: Boolean,
    presentar: Boolean
    
    }, {
    timestaps: true
});

ImgempresaSchema.methods.setImagen = function setImagen (filename) {
    const {local, host, port} = config
    if (local == 1){
        //el aplicativo se encuentra de manera local, no en un servidor remoto
        this.imagen = `${host}:${port}/publicEmpresa/${filename}`
      } else {
        //el aplicativo se encuentra en un servidor remoto como heroku
        this.imagen = `${host}/publicEmpresa/${filename}`
      }
    }

module.exports = model('ImgEmpresa', ImgempresaSchema);