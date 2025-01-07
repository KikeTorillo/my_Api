const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const routerApi = require('./routes');
const port = 3000;
const { checkApiKey } = require('./middleware/authHandler')
const {logErrors, errorHandler,boomErrorHandler} = require('./middleware/errorHandler');

//eso es para poder recibir info tipo json es el middleware de express
app.use(express.json());

app.use(cookieParser());

//------------------------------------------------------------------------------------------------------------
//esto es para que se puedan realizar peticiones de diferentes direcciones lo ideal seria crear una white list
const whiteList = ['http://localhost:5173','http://localhost:3000','https://suite-apps-front-orpin.vercel.app','https://my-api-eta-orcin.vercel.app'];
const options = {
  origin: (origin, callback)=>{
    if (whiteList.includes(origin)) {
      callback(null,true);
    }else{
      callback(new Error('muesto error de cors'));
    }
  },
  credentials: true
};

app.use(cors(options));

//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//Se realiza el require de la autenticacion con passport para que valide de acuerdo a la estrategia
require('./utils/auth');
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//Ejemplo de como se crea una ruta
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
})

app.use(checkApiKey);

//Es mejor trabajar las rutas con un router para cumplir con la separacion de responsabilidades
routerApi(app);
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//Los middleware se tienen que tienen que colocar siempre despues del routing
//Los midlewares son para realizar validaciones como manejo de errores que son los enlistados debajo
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
//------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------------------------------
//Se levanta en el puerto mandado por la variable de entorno
app.listen(process.env.PORT, () => {
  console.log(`Mi port ${process.env.PORT}`);
})
