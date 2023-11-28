import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { mostrarImagenSeleccionada } from '../../js/imagenRegistroE';

const Vendedor = ({ userName }) => {
    const navigate = useNavigate();
    const nameE = localStorage.getItem('nombreEmpresa');
    const imgE = localStorage.getItem('logoEmpresa');
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda]= useState("");
    const [BuscarProducts, setBuscarProducts]= useState([]);

    const [mensajeExito, setMensajeExito] = useState("");
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [nuevaInformacion, setNuevaInformacion] = useState({
        nombre: '',
        tipoProducto: '',
        imagenProducto: '',
        descripcion: '',
        precio: '',
        cantidadContenido: '',
        tipoContenido: '',
    });

    const handleLogout = () => {
        // Limpiar localStorage al cerrar sesión
        localStorage.removeItem('nombreEmpresa');
        localStorage.removeItem('logoEmpresa')
        // Redirigir a la página de inicio de sesión
        // Puedes usar useHistory() o Link para redirigir según tu configuración de enrutamiento
        navigate('/')
    };


    // Listar por nombre empresa
    useEffect(() => {
        const traerProducts = async () => {
            try {
                const res = await axios.get(`http://localhost:8888/api/v1/devcamps/productos/vendedor/${nameE}`)
                setProductos(res.data.products);
                setBuscarProducts(res.data.products);
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


    //Actualizar producto
    const handleEditarProducto = (producto) => {
        setProductoSeleccionado(producto);
        setNuevaInformacion({
            nombre: producto.nombre,
            tipoProducto: producto.tipoProducto,
            descripcion: producto.descripcion,
            precio: producto.precio,
            cantidadContenido: producto.cantidadContenido,
            tipoContenido: producto.tipoContenido,
            region: producto.region
        });
    };
    const handleActualizarProducto = async () => {
        try {
            await axios.put(`http://localhost:8888/api/v1/devcamps/productos/${productoSeleccionado._id}`, nuevaInformacion);
            const updatedProductos = productos.map((producto) => {
                if (producto._id === productoSeleccionado._id) {
                    return {
                        ...producto,
                        ...nuevaInformacion
                    };
                }
                return producto;
            });

            setProductos(updatedProductos);
            setMensajeExito("Producto actualizado con éxito.");
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    };

    const handleChangeNuevaInformacion = (e) => {
        setNuevaInformacion({
          ...nuevaInformacion,
          [e.target.name]: e.target.value
        });
        mostrarImagenSeleccionada()
      };
      const handleCerrarMensajeExito = () => {
        setMensajeExito("");
      };

    
    // Eliminar producto
    const EliminarProducto = async (productoId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
          try {
            await axios.delete(`http://localhost:8888/api/v1/devcamps/productos/${productoId}`);
            const updatedProductos = productos.filter((producto) => producto._id !== productoId);
            setProductos(updatedProductos);
            setMensajeExito("Producto eliminado con éxito.");
          } catch (error) {
            console.error("Error al eliminar el producto:", error);
          }
        }
      };

    return (
        <div className='interfazVendedor'>
            <meta charSet="UTF-8" />
            <nav>
                <div className='nav'>
                    <div className='tituloNav'>
                        <b>Omega-Pet-Shop</b>
                    </div>
                    <div className="iconoPerfil">
                        <h5 className='nombreE'>{nameE}</h5>
                        <label className='botonPerfil' for='btn-menu'><img className='imgPerfil' src='/img/avatar.png' width={50}></img></label>
                    </div>
                </div>
                <div className='red'></div>
                <div className='icono'>
                    <img src="/img/icono.jpg" className='tamañoImg' alt="Icono" />
                </div>
            </nav>
            <input type='checkbox' id='btn-menu'></input>
            <div className='container-menu'>
                <div className='cont-menu'>
                    <div className='cabezeraDesple'>
                        <img className='imgDesple' src='/img/avatar.png'></img>
                        <p><b>{nameE}</b></p>
                    </div>
                    <nav>
                        <Link className='activo' to={'/InterVende'}><b>Mis Productos</b></Link>
                        <Link to={'/ventas'}><b>Ventas</b></Link>
                        <Link to={'/registrarP'}><b>Registrar Producto</b></Link>
                        <button onClick={handleLogout}><b>Cerrar Sesion</b></button>
                    </nav>
                    <label for='btn-menu'>×</label>
                </div>
            </div>

            <div className='buscarV'>
                <div className='catalogo'>
                    <h3><b>Mis Productos</b></h3>
                </div>
                <div>
                    {/*<select className='buscarSelect' name='buscar'>
                        <option value='categoria'>Categoria</option>
                        <option value='region'>Region</option>
                        <option value='precios'>Precios</option>
                    </select>*/}
                    <input type='text' className='buscarInput' value={busqueda} name='search' placeholder='Buscar por tipo producto, precio y region' required onChange={handleChange}></input>
                    <button className='buscarBotonV'>Buscar</button>
                </div>
            </div>


            <div className='contenedorCards'>
                <div className="containerCards">

                    {productos.map((producto, index) => (
                        <><div className="producto">
                            <input type='hidden' key={index}></input>
                            <img src="/img/Ramo.png" className='imgVendedor' width={50}></img>
                            <div className='img'>
                                <img src="/img/achiras.jpg" width={230} height={270}></img>
                            </div><div className='cardBody'>
                                <p className='tituloCard'>{producto.tipoProducto} {producto.nombre} {producto.cantidadContenido}{producto.tipoContenido}</p>
                                <p className='precio'><b>{producto.precio}</b></p>
                                <div className='form-group col-sm-12'>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleEditarProducto(producto)}>Editar</button>
                                        </div>
                                        <div className='col-sm-6'>
                                            <button type='submit' className='btn btn-danger' onClick={() => EliminarProducto(producto._id)}>Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        

                        <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog modal-lg modal-dialog-centered">
                                    {productoSeleccionado && (
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Editar</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                            </div>
                                            <div className="modal-body">
                                            {mensajeExito && (
                                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                                    <strong></strong>{mensajeExito}
                                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrarMensajeExito}/>
                                                </div>
                                            )}
                                                <div className='groupPL'>
                                                    <div className='imgEspacio'>
                                                        <img id="imagenSeleccionada" className='imgP' src={producto.imagenProducto} width={258}></img>
                                                        <div className="input-group mt-3">
                                                            <input type="file" name='imagenProducto' className='form-control' id="archivoInput" onChange={handleChangeNuevaInformacion}/>
                                                        </div>
                                                    </div>
                                                    <div className='camposP'>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" value={nuevaInformacion.nombre} name='nombre' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                            <label htmlFor="floatingInput">Nombre</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" value={nuevaInformacion.tipoProducto} name='tipoProducto' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                            <label htmlFor="floatingInput">Tipo de producto</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" value={nuevaInformacion.descripcion} name='descripcion' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                            <label htmlFor="floatingInput">Descripcion Producto</label>
                                                        </div>
                                                        <div className="input-group mb-3">
                                                            <div className="form-floating input-group mb-3">
                                                                <input type="text" value={nuevaInformacion.cantidadContenido} name='cantidadContenido' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                                <label htmlFor="floatingInput">Cantidad Contenido</label>
                                                            </div>
                                                            <select name='tipoContenido' value={nuevaInformacion.tipoContenido} className="seleccionarTC" id="inputGroupSelect01" onChange={handleChangeNuevaInformacion}>
                                                                <option value="">Seleccionar</option>
                                                                <option value="g">Gramos</option>
                                                                <option value="Kg">Kilos</option>
                                                                <option value="mL">Mililitros</option>
                                                                <option value="L">Litros</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="number" value={nuevaInformacion.precio} name='precio' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                            <label htmlFor="floatingInput">Precio</label>
                                                        </div>
                                                        <div className="form-floating mb-3">
                                                            <input type="text" value={nuevaInformacion.region} name='region' className="form-control" id="floatingInput" placeholder="name@example.com" required onChange={handleChangeNuevaInformacion}/>
                                                            <label htmlFor="floatingInput">Region Producto</label>
                                                        </div>
                                                        <hr></hr>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                                <button type="button" className="btn btn-primary" onClick={handleActualizarProducto}>Actualizar</button>
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div></>
                    ))}

                </div>
            </div>

        </div>
    );
}

export default Vendedor;