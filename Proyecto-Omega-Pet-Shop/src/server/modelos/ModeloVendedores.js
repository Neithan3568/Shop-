const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema(
    {
        nombreContacto:{
            type:String,
        },
        cargo:{
            type:String,
        },
        telefonoContacto:{
            type:String,
        },
        nombreEmpresa:{
            type:String,
        },
        NIT:{
            type:String,
        },
        logoEmpresa:{
            type:String,
            required: true
        },
        correo:{
            type: String,
        },
        usuario:{
            type:String,
        },
        contrasena:{
            type:String,
        }
    }
)

userSchema.pre('save', async function (next){
    const sal = await bcryptjs.genSalt(10)
    this.contrasena = await bcryptjs.hash(this.contrasena, sal)
})


userSchema.methods.ObtenerTokenJWT = function(){
    const JWT_SECRET_KEY = "SI TE VAS NO HAY LIO"
    return jwt.sign({
        id: this._id,
        nombreEmpresa: this.nombreEmpresa,
        logoEmpresa: this.logoEmpresa,
        contrasena: this.contrasena,
        NIT: this.NIT
    },
        JWT_SECRET_KEY,
        {
            expiresIn: Date.now() + 10000
        }
    )
}

userSchema.methods.comparacionContrasena = async function(contrasena){
    return await bcryptjs.compare(contrasena, this.contrasena)
}


const User = module.exports = mongoose.model('User',userSchema)