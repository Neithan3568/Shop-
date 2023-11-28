const express = require("express")
const productosModel = require('../modelos/ModeloProductos')
const ModeloVendedor = require('../modelos/ModeloVendedores.js')
const moongose = require('mongoose')
const router = express.Router()
const multer = require('multer');
const fs = require('node:fs');


const upload = multer({ dest: 'public/img/uploads' });

//registrar producto
router.post('/registerP', async (req, res) => {
    try {
        const producto = await productosModel.create(req.body);

        res.status(201).json({
            success: true,
            msg: "Producto creado con éxito"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
});


function saveImage(file) {
    const newPath = `public/img/uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);
    return newPath;
}


router.post('/guardar/single', upload.single('imagenProducto'), (req,res) => {
    try {
        const imagePath = saveImage(req.file);

        res.status(201).json({
            success: true,
            msg: "Imagen guardada con exito",
            imagePath: imagePath,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: error.message
        });
    }
})


//traer todos los productos
router.get('/',
    async(req,res)=>{
        try {
            const productos = await productosModel.find()
            if (productos.length === 0) {
                return res.status(404).json({
                    success: false,
                    msg:"No hay productos disponibles"
                })
            }
            res.status(200).json({
                "success":true,
                "results":productos
            })
        } catch (error) {
            res.status(500).json({
                success:false,
                msg:"Error interno del Servidor"
            })
        }
    }
);


//traer los productos por el nombre de la empresa
router.get('/vendedor/:nombreEmpresa', async(req, res)=>{

    const nombreE = req.params.nombreEmpresa;
    try {
        const user = await ModeloVendedor.findOne({ nombreEmpresa:nombreE });
  
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Empresa no encontrada',
            });
        }
  
        // Filtrar los productos asociados al usuario
        const products = await productosModel.find({ nombreEmpresa: user.nombreEmpresa });
  
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


//Traer producto por id
router.get('/:id',
    async(request, response)=>{

        try {      
            const productoId = request.params.id 
            
            if(!moongose.Types.ObjectId.isValid(productoId)){
                response
                .status(500)
                .json({
                    success: false,
                    msg: "El producto no esta registrado"
                })
            }else{
                const selected_productoId = await productosModel.findById(productoId)

                if (!selected_productoId) {
                    return response
                        .status(404)
                        .json({
                            success: false,
                            msg:`No se encuentra el producto con id: ${productoId}`
                        })
                    
                }
                else{
                    response
                        .status(200)
                        .json({
                            "success": true, 
                            "results": selected_productoId
                        })
                }
            }
            
            
        } catch (error) {
            response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
        }
})


// Actualizar Producto
router.put('/:id',
  async (request, response)=>{
    try {
        const productoId= request.params.id

        if(!moongose.Types.ObjectId.isValid(productoId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
            const updProducto = await productosModel.findByIdAndUpdate(
                productoId, 
                request.body,
                {
                    new:true
                }  
            )

            if (!updProducto) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encontro el producto con id: ${productoId}`
                    })
                
            }
            else{
                response
                .status(200)
                .json({
                    "success": true, 
                    "results": productoId
                })
            }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })   
    }
})


//Eliminar producto
router.delete('/:id',
   async (request, response)=>{

    try {

        const productoId= request.params.id
        if(!moongose.Types.ObjectId.isValid(productoId)){
            response
            .status(500)
            .json({
                success: false,
                msg: "Id invalido"
            })
        }else{
           const EliminarProducto = await productosModel.findByIdAndDelete(productoId)

           if (!EliminarProducto) {
                return response
                    .status(404)
                    .json({
                        success: false,
                        msg:`No se encontro el producto con id: ${productoId}`
                    })
           }else{
            response
                .status(200)
                .json({
                    "success": true, 
                    "results":[]
                })
           }
        }
        
    } catch (error) {
        response
                .status(500)
                .json({
                    success: false,
                    msg: "Error interno del servidor"
                })
    }
})

module.exports = router
