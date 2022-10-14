const mongoose = require('mongoose');
const config = require("./config");

//con node 14
//HEROKU, DESCOMENTAR LINEA 5 y comentar la 7
let URI;
let infoDB;
const {local, uri, uri_local} = config
if (local ==1){
    //se usara la base de datos local
     URI = uri_local
    infoDB = " de manera local"
} else {
    //se usara la base de datos alojada en mongoDB-ATLAS
     URI = uri;
     infoDB = " de manera remota"
}

//con node 17
//const URI = 'mongosh "mongodb+srv://citagenda.bonz18f.mongodb.net/myFirstDatabase" --apiVersion 1 --username <username>';

mongoose.connect(URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Base de datos conectada'+infoDB);
});
