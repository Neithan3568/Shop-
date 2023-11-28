import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [usuario, setName] = useState('');
    const [contrasena, setPass] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const parseToken = (token) => {
        const decodedToken = token.split('.')[1];
        const decodedData = JSON.parse(atob(decodedToken));
        return decodedData;
    };

    const datosLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8888/api/v1/devcamps/users/login', {
                usuario,
                contrasena: contrasena,
            });
            console.log('Después de la solicitud')

            if (response.data && response.data.token) {
                const tokenPayload = parseToken(response.data.token);
                if (tokenPayload) {
                    const { nombreEmpresa, token } = tokenPayload;
                    localStorage.setItem('token', token);
                    localStorage.setItem('nombreEmpresa', nombreEmpresa)
                    navigate('/InterVende');
                }
            }
            setError('');
        }
        catch (error) {
            console.error('Error en el inicio de sesión:', error);

            if (error.response && error.response.data && error.response.data.msg) {
                setError('Error: ' + error.response.data.msg);
            } else {
                setError('Error en el inicio de sesión: ' + error.message);
            }
        }
    };
    return (
        <div className="fondoPagina">
            <div className="fondo">
                <div className="margin">
                    <div className="tituloPet-Shop">
                        <div className="logo">
                        <div className="logo d-flex justify-content-center align-items-center"><img src="/img/icono.jpg" width={100} alt="Icono" /></div>
                        </div>
                        <h1>Omega-Pet-Shop</h1>
                    </div>

                    {error && (
                        <div className="alert alert-danger alert-dismissible fade show" role="alert">
                            <strong></strong>{error}
                            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                        </div>
                    )}

                    <div className="login">
                        <div className="titulo">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={30}
                                height={30}
                                fill="currentColor"
                                className="bi bi-person-fill-check"
                                viewBox="0 0 16 16"
                            >
                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm1.679-4.493-1.335 2.226a.75.75 0 0 1-1.174.144l-.774-.773a.5.5 0 0 1 .708-.708l.547.548 1.17-1.951a.5.5 0 1 1 .858.514ZM11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path d="M2 13c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Z" />
                            </svg>
                            <h5>Iniciar Sesion</h5>
                        </div>

                        <form method="post" onSubmit={datosLogin}>
                            <div className="loginBody">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="floatingInput"
                                        placeholder="name@example.com"
                                        required
                                        name="usuario"
                                        value={usuario}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <label htmlFor="floatingInput">Nombre Usuario</label>
                                </div>
                                <div className="form-floating">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="floatingPassword"
                                        placeholder="Password"
                                        required
                                        name="contrasena"
                                        value={contrasena}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                    <label htmlFor="floatingPassword">Contraseña</label>
                                </div>
                                <br />
                                <br />
                                <input type="submit" className="btn btn-primary" value={'Ingresar'}></input>
                                <Link className="text_b" to={"/"}>
                                    Atras
                                </Link>
                                <br />
                            </div>

                            <div className="Or">
                                <div className="line" />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={16}
                                    height={16}
                                    fill="currentColor"
                                    className="bi bi-box-arrow-in-down"
                                    viewBox="0 0 16 16"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"
                                    />
                                    <path
                                        fillRule="evenodd"
                                        d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"
                                    />
                                </svg>
                                <div className="line" />
                            </div>
                            <div className="buttonR">
                                <i className="bi bi-person-add"></i>
                                <Link className="text_A" to="/register">Registrarse</Link>
                            </div>  
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
