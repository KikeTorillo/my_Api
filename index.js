const express = require('express');
const cors = require('cors');
const app = express();
const routerApi = require('./routes');
const port = 3000;

//eso es para poder recibir info tipo json es el middleware de express
app.use(express.json());
app.use(cors());
//const whiteList = ['http://localhost:8080'];
/*const options = {
  origin: (origin, callback)=>{
    if (whiteList.includes(origin)) {
      callback(null,true);
    }else{
      callback(new Error(''));
    }
  }
};

app.use(cors(options));*/

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
})

routerApi(app);


app.listen(port, () => {
  console.log(`Mi port ${port}`);
})
