const bcrypt = require('bcrypt');

async function hashPass(){
    const hash = await bcrypt.hash('Enrique23',10);
    console.log(hash);
}

hashPass();


