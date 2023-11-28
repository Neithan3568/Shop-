const express = require("express")
const productosModel = require('../modelos/ModeloProductos')
const VentaModelo = require('../modelos/ModeloVenta')
const moongose = require('mongoose')
const router = express.Router()


//registrar venta
router.post('/registerV', async (req, res) => {
    try {
        const venta = await VentaModelo.create(req.body);

        res.status(201).json({
            success: true,
            msg: "Venta registrada con éxito"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
});


router.get('/traer/:nombreEmpresa', async(req, res)=>{

    const nombreE = req.params.nombreEmpresa;
    try {
        const venta = await VentaModelo.findOne({ nombreEmpresa:nombreE });
  
        if (!venta) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }
  
        // Filtrar los productos asociados al usuario
        const products = await VentaModelo.find({ nombreEmpresa: venta.nombreEmpresa });
  
        res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor',
        });
    }
  });
module.exports = router