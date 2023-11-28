import React from 'react';
import { Link } from 'react-router-dom';

const RegistroC = () => {
    return (
        <div>
            <nav>
            <div className='nav_register'>
                <div className='tituloNavR'>
                    <div className='icono_register'>
                        <img src="/img/icono.jpg" width={40} alt="Icono" />
                    </div>
                    <b>Omega-Pet-Shop</b>
                </div>
            </div>
        </nav>

        <div className='fondoRegistro'>
            <div className='register_C mt-4'>
                <div className='tituloRC'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-clipboard-check" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                    </svg>
                        <h4>Registro cliente</h4>
                </div>
                <form action='' method='post'>
                <div className='"form-group col-sm-12'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" required pattern=''/>
                                    <label htmlFor="floatingInput">Nombres</label>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                    <label htmlFor="floatingInput">Apellidos</label>
                                </div>
                            </div> 
                        </div>
                    </div>

                        
                    <div className='"form-group col-sm-12'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div class="input-group mb-3">
                                    <select class="form-select" id="inputGroupSelect01" required >
                                        <option selected>Tipo de Documento</option>
                                        <option value="CC">Cedula de Ciudadania</option>
                                        <option value="CE">Cedula de Extrangeria</option>
                                        <option value="TI">Tarjeta de Identidad</option>
                                        <option value="PA">Pasaporte</option>
                                    </select>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                    <label htmlFor="floatingInput">Numero de Documento</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='"form-group col-sm-12'>
                        <div className='row'>
                            <div className='col-sm-6'>
                                <div className="form-floating mb-3">
                                    <input type="number" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                    <label htmlFor="floatingInput">Telefono</label>
                                </div>
                            </div>
                            <div className='col-sm-6'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                    <label htmlFor="floatingInput">Direccion</label>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='"form-group col-sm-12 lineaB'>
                        <div className='row'>
                            <div className='col-sm-12'>
                                <div className="form-fating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required/>
                                    <label htmlFor="floatingInput">Correo</label>
                                </div>
                            </div>
                        </div>
                    </div>     

                    <div className='"form-group col-sm-12 lineaY'>
                        <div className='row'>
                            <div className='col-sm-4'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" required pattern='[A-Za-z0-9]{5,}'/>
                                    <label htmlFor="floatingInput">Usuario Nuevo</label>
                                </div>
                            </div>
                            <div className='col-sm-4'>
                                <div className="form-floating">
                                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password" required pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]){8,10}'/>
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                            </div>
                            <div className='col-sm-4 B'>
                                <Link className='boton_R'>Registrarse</Link>
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
  
  export default RegistroC;