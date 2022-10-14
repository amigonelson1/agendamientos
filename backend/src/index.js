require('dotenv').config();



const app = require('./app')
require('./database');

async function main(){
    await app.listen(app.get('port'),app.get('host'));
    console.log('Server on port ', app.get('port'));
    console.log('Server on host ', app.get('host'))
}

main();
