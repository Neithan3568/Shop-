import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Catalogo = () => {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [BuscarProducts, setBuscarProducts]= useState([]);

    useEffect(() => {
        const traerProducts = async () => {
            try {
                const res = await axios.get("http://localhost:8888/api/v1/devcamps/productos")
                setProductos(res.data.results);
                setBuscarProducts(res.data.results);
            } catch (error) {
                console.error("Error al traer los productos:", error);
            }
        };

        traerProducts();
    }, []);


    const filtrar=(Busqueda)=>{
        var resultadoBusqueda=BuscarProducts.filter((elemento)=>{
          if(elemento.tipoProducto.toString().toLowerCase().includes(Busqueda.toLowerCase())
          || elemento.precio.toString().toLowerCase().includes(Busqueda.toLowerCase())
          || elemento.region.toString().toLowerCase().includes(Busqueda.toLowerCase())
          ){
            return elemento;
          }
        });
        setProductos(resultadoBusqueda);
      }
    
      const handleChange=e=>{
        setBusqueda(e.target.value);
        filtrar(e.target.value);
      }

    return (
        <div>
            <nav>
                <div className='nav'>
                    <div className='tituloNav'>
                        <b>Omega-Pet-Shop</b>
                    </div>
                    <button className="boton-desplegable">●●●</button>
                    <div className="bodyNav">
                        <Link className='navLink' to={"register"}>Regístrate</Link>
                        <Link className='boton' to={"Login"}><b>Iniciar sesión</b></Link>
                    </div>
                </div>
                <div className='yellow'></div>
                <div className='icono'>
                    <img src="/img/icono.jpg" className='tamañoImg' alt="Icono" />
                </div>
            </nav>



            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="true">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div class="carousel-inner">
                <div className="carousel-inner">
    <div className="carousel-item active">
        <img src="/img/carusel_1.jpg" className="d-block mx-auto" width="400" height="your-desired-height" data-bs-interval="2000" />
        <div className="carousel-caption d-none d-md-block">
        </div>
    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="/img/carusel_2.jpg" className="d-block mx-auto" width="400" height="your-desired-height" data-bs-interval="2000" />
        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                    <div class="carousel-item">
                    <img src="/img/carusel_3.jpg" className="d-block mx-auto" width="400" height="your-desired-height" data-bs-interval="2000" />
        <div className="carousel-caption d-none d-md-block">
                        </div>
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <hr></hr>
            <div className='buscar'>
                <div className='catalogo'>
                    <h3><b>Catalogo</b></h3>
                </div>
                <div className='BotonesC'>
                    {/*<select className='buscarSelect' name='buscar'>
                        <option value='categoria'>Categoria</option>
                        <option value='region'>Region</option>
                        <option value='precios'>Precios</option>
                    </select>*/}
                    <input type='text' className='buscarInput' value={busqueda} name='search' placeholder='Buscar por tipo producto, precio y region' onChange={handleChange} required></input>
                    <button className='buscarBoton'>Buscar</button>
                </div>
            </div>

            <div className='contenedorCards'>
                <div className="containerCards">
                    {productos.map((producto, index) => (
                        <div className="producto">
                            <input type='hidden' key={index}></input>
                            <img src="/img/img.jpg" className='imgVendedor' width={50}></img>
                            <><div className='img'>
                                <img src='/img/chuncky.jpg' width={230} height={270}></img>
                            </div><div className='cardBody'>
                                    <p className='tituloCard'>{producto.tipoProducto} {producto.nombre} {producto.cantidadContenido}{producto.tipoContenido}</p>
                                    <p className='precio'><b>{producto.precio}</b></p>

                                    <div className='form-group col-sm-12'>
                                        <div className='row'>
                                            <div className='col-sm-7'>
                                                <p>{producto.nombreEmpresa}</p>
                                            </div>
                                            <div className='col-sm-5'>
                                                <Link to={`/compra/${producto._id}`} className='verMas'>Ver mas</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div></>
                        </div>
                    ))}


               
                </div>
            </div>
        </div>
    );
}

export default Catalogo;