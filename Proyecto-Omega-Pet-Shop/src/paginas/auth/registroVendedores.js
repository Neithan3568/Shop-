import React, { useState} from "react";
import { Link } from "react-router-dom";
import { mostrarImagenSeleccionada } from '../../js/imagenRegistroE';
import axios from 'axios';

const RegistroE = () => {
    const [user, setUsuario] = useState({
        nombreContacto: '',
        cargo: '',
        telefonoContacto: '',
        nombreEmpresa: '',
        NIT: '',
        logoEmpresa:'',
        correo: '',
        usuario: '',
        contrasena: ''
    })

    const { nombreContacto, cargo, telefonoContacto, nombreEmpresa, NIT, logoEmpresa, correo, usuario, contrasena } = user;
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    

    const handleRegister = async () => {
        try {

            const response = await axios.post('http://localhost:8888/api/v1/devcamps/users/registerE', user, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setSuccessMessage('Usuario creado con éxito');
            setError('');
        } catch (error) {
            if (error.response) {
                console.log('Respuesta del servidor:', error.response);
                if (error.response.data && error.response.data.message) {
                    setError('Error: ' + error.response.data.message);
                } else {
                    setError('Error en el registro: ' + error.message);
                }
            } else {
                setError('Error en el registro: ' + error.message);
            }
        }
    };
    const onChange = (e) => {
        setUsuario({
            ...user,
            [e.target.name]: e.target.value
        });

        mostrarImagenSeleccionada();
    }



    const onSubmit = (e) => {
        e.preventDefault();
        handleRegister()
    };


    return (
        <div>
            <nav>
                <div className='nav_RE'>
                    <div className='tituloNavR'>
                        <div className='icono_register'>
                            <img src="/img/icono.jpg" width={40} alt="Icono" />
                        </div>
                        <b>Omega-Pet-Shop</b>
                    </div>
                </div>
            </nav>

            {successMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong></strong>{successMessage}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
            )}
            {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong></strong>{error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                </div>
            )}

            <div className='fondoRegistro'>
                <div className='register_C'>
                    <div className='tituloRE'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                        </svg>
                        <h4>Registro Empresa</h4>
                    </div>
                    <form method='post' onSubmit={onSubmit}>
                        <div className='"form-group col-sm-12'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-floating mb-3">
                                        <input type="text" value={nombreContacto} name='nombreContacto' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Nombre de contacto</label>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div className="form-floating mb-3">
                                        <input type="text" value={cargo} name='cargo' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Cargo</label>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='"form-group col-sm-12'>
                            <div className='row'>
                                <div className='col-sm-6'>
                                    <div className="form-floating mb-3">
                                        <input type="number" value={telefonoContacto} name='telefonoContacto' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Telefono de contacto</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" value={nombreEmpresa} name='nombreEmpresa' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Nombre de la Empresa</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" value={NIT} name='NIT' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">NIT</label>
                                    </div>
                                </div>
                                <div className='col-sm-6'>
                                    <div id="contenedorImg" className='contenedorImg'>
                                        <div className='textoImg'>
                                            <p>Logo Empresa</p>
                                            <p className='blue'><u>Opcional</u></p>
                                        </div>
                                        <img id="imagenSeleccionada" className='imgR' src="#" width={150} />
                                    </div>
                                    <div className="input-group mt-3">
                                        <input type="file" value={logoEmpresa} name='logoEmpresa' className='form-control' id="archivoInput" onChange={onChange}/>
                                    </div> 
                                </div>
                            </div>
                        </div>


                        <div className='"form-group col-sm-12 lineaB'>
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <div className="form-floating mb-3">
                                        <input type="email" value={correo} name='correo' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Correo</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='"form-group col-sm-12 lineaR'>
                            <div className='row'>
                                <div className='col-sm-4'>
                                    <div className="form-floating mb-3">
                                        <input type="text" value={usuario} name='usuario' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={onChange} />
                                        <label htmlFor="floatingInput">Usuario Nuevo</label>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className="form-floating">
                                        <input type="password" value={contrasena} name='contrasena' className="form-control" id="floatingPassword" placeholder="Password" required onChange={onChange} />
                                        <label htmlFor="floatingPassword">Contraseña</label>
                                    </div>
                                </div>
                                <div className='col-sm-4 B'>
                                    <input type="submit" className='boton_R' value="Registrarse"></input>
                                    <Link className='text_decoration' to={'/register'}>| Atras</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RegistroE;