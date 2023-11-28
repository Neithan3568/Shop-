const mongoose = require('mongoose')

const ventaSchema = new mongoose.Schema(
    {   
        nombreCliente:{
            type:String,
        },
        apellidoCliente:{
            type:String,
        },
        tipoDocumento:{
            type:String,
            enum:[
                "cc",
                "ce",
                "pa"
            ]
        },
        numeroDocumento:{
            type:String,
        },
        correo:{
            type:String,
        },
        telefono:{
            type:String,
        },
        numeroUnidades:{
            type:String,
        },
        metodoPago:{
            type:String,
            enum:[
                'efectivo',
                'tarjeta',
                'billetera digital'
            ]
        },
        nombreProducto:{
            type:String,
        },
        nombreEmpresa:{
            type:String
        } 
    }
)

const Venta = mongoose.model('Venta', ventaSchema);
module.exports = Venta;