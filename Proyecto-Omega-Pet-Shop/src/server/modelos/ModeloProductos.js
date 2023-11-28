const mongoose = require('mongoose')

const productoSchema = new mongoose.Schema(
    {   
        nombre:{
            type:String,
        },
        tipoProducto:{
            type:String,
        },
        imagenProducto:{
           type:String,
           required: true
        },
        descripcion:{
            type:String,
        },
        precio:{
            type:String,
        },
        cantidadContenido:{
            type:String,
        },
        tipoContenido:{
            type:String,
            enum:[
                "g",
                "Kg",
                "mL",
                "L"
            ]
        },
        region:{
            type:String,
        },
        nombreEmpresa:{
            type:String,
        } 
    }
)

const Producto = mongoose.model('Producto', productoSchema);
module.exports = Producto;