const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors')
const mongoose = require('mongoose');
const multer = require('multer')
const fs =require('node:fs')

const app = express();
const puerto = process.env.EXPRESS_PORT || 8888;

app.use(cors());

const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/Omega-Pet-Shop';
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

    .then(() => console.log('Conectado a la db'.bgCyan.black))
    .catch(error => console.error('Error al conectar con la base de datos:', error.message));

app.use(express.json());


const vendedoresRouter = require('./rutas/RutaVendedores');
app.use('/api/v1/devcamps/users', vendedoresRouter);

const productosRouter = require('./rutas/RutaProductos');
app.use('/api/v1/devcamps/productos', productosRouter);

const ventasRouter = require('./rutas/RutaVenta');
app.use('/api/v1/devcamps/ventas', ventasRouter);


{/*const upload = multer({ dest:'public/img/uploads' });

app.post('/images/single',upload.single('imagen'), (req,res) => {
    console.log(req.file);
    saveImage(req.file);
    res.send('Termina');
});

function saveImage(file) {
    const newPath = `public/img/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath
}


app.post('/images/multi', upload.array('photos', 3), (req,res) => {
    req.files.map(saveImage);
    res.send('Termina multi')
});*/}


app.listen(puerto, () => {
    console.log(`El servidor se ha iniciado en el puerto ${puerto}`.bgMagenta.white)
})
