import React from 'react';
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class Productos extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        this.state = {
            productos: [{
                id: 0,
                id_categoria: "",
                sku: "",
                nombre: "",
                descripcion: "",
                precio: "",
                descuento: "",
                stock: "",
                has_stock: "",
                status: "",
                created_at: "",
                updated_at: "",
                imagenes: [
                    {
                        id: 0,
                        src: "",
                        relation_id: "",
                        relation_type: "",
                        created_at: "",
                        updated_at: ""
                    }
                ]
            }],
            menu: [{
                id:0,
                id_padre:"",
                nombre:"",
                subnivel:"",
                status:"",
            }],
            url:Apiurl,
            carrito: [],
            validar:false,        
        };

        this.filtrando = this.filtrando.bind(this);
        this.listarAsc = this.listarAsc.bind(this);
        this.listarDesc = this.listarDesc.bind(this);
        this.filtrandoDisponibilidad = this.filtrandoDisponibilidad.bind(this);
        this.filtrandoStock = this.filtrandoStock.bind(this);
        this.listarDisponibleMayor = this.listarDisponibleMayor.bind(this);
        this.listarCantidadMayor = this.listarCantidadMayor.bind(this);
        this.crearCarrito = this.crearCarrito.bind(this);
        this.eliminarDelCarrito = this.eliminarDelCarrito.bind(this);
        this.pagado = this.pagado.bind(this);
        this.actualizarDatos = this.actualizarDatos.bind(this)

    }

    componentWillMount() {
        console.log("Cargado categorias");
        let url = Apiurl + "categorias";
        console.log(url)
        axios.get(url)
        .then(response => {

            var listaA = []
            for (var x = 0; x < response.data[0].length; x++) {
                listaA.push(response.data[0][x]);
            }
            this.setState({
                menu:[...listaA]});

        });
        console.log("Cargado productos");
        url = Apiurl + "productos";
        console.log(url);
        axios.get(url)
            .then(response => {

                var listaB = []
                for (var x = 0; x < response.data[0].length; x++) {
                    listaB.push(response.data[0][x]);
                }

                this.setState({
                    productos: [...listaB]
                });

            });

            if (localStorage.getItem('carritoStorage') !== null){
                this.setState({
                    carrito:JSON.parse(localStorage.getItem('carritoStorage'))
                })
            }
        
    };

    //filter precio
    filtrando() {
        console.log("filtrando");
        console.log(this.state.productos);

        var nuevos = this.state.productos.filter((producto) => {
            return producto.precio > 40000;
        });
        console.log(nuevos)

        var listaN = []
        for (var x = 0; x < nuevos.length; x++) {
            listaN.push(nuevos[x]);
        }

        console.log(nuevos);

        this.setState({
            productos: [...nuevos]
        });
    }

    //filter disponibilidad
    filtrandoDisponibilidad() {
        console.log("filtrando");
        console.log(this.state.productos);

        var nuevos = this.state.productos.filter((producto) => {
            return producto.has_stock === 1;
        });
        console.log(nuevos)

        var listaN = []
        for (var x = 0; x < nuevos.length; x++) {
            listaN.push(nuevos[x]);
        }

        console.log(nuevos);

        this.setState({
            productos: [...nuevos]
        });
    }

    //filter Stock
    filtrandoStock() {
        console.log("filtrando");
        console.log(this.state.productos);

        var nuevos = this.state.productos.filter((producto) => {
            return producto.has_stock > 0;
        });
        console.log(nuevos);

        var listaN = []
        for (var x = 0; x < nuevos.length; x++) {
            listaN.push(nuevos[x]);
        }

        console.log(nuevos);

        this.setState({
            productos: [...nuevos]
        });
    }

    //ordenar menor a mayor
    listarAsc() {
        var ascendientes = this.state.productos.sort((a, b) => {
            return a.precio - b.precio;
        });

        var listaN = []
        for (var x = 0; x < ascendientes.length; x++) {
            listaN.push(ascendientes[x]);
        }

        this.setState({
            productos: [...ascendientes]
        });

    }

    //ordenar mayor a menor
    listarDesc() {
        var desc = this.state.productos.sort((a, b) => {
            return b.precio - a.precio;
        });
        console.log(desc);

        var listaN = []
        for (var x = 0; x < desc.length; x++) {
            listaN.push(desc[x]);
        }


        this.setState({
            productos: [...desc]
        });

    }
    //mayor disponibilidad
    listarDisponibleMayor() {
        var desc = this.state.productos.sort((a, b) => {
            return b.has_stock - a.has_stock;
        });

        var listaN = []
        for (var x = 0; x < desc.length; x++) {
            listaN.push(desc[x]);
        }

        this.setState({
            productos: [...desc]
        });

    }

    //mayor disponibilidad
    listarCantidadMayor() {
        var desc = this.state.productos.sort((a, b) => {
            return b.stock - a.stock;
        });

        var listaN = []
        for (var x = 0; x < desc.length; x++) {
            listaN.push(desc[x]);
        }

        this.setState({
            productos: [...desc]
        });

    }

    crearCarrito(id, e) {

        var nuevo = this.state.productos.filter((producto) => {
            return producto.id === id;
        });

        this.state.carrito.push(nuevo[0]);

        this.setState({
            carrito:this.state.carrito
        })

        localStorage.setItem('carritoStorage', JSON.stringify(this.state.carrito));

        document.getElementById('btnagregar'+nuevo[0].id).setAttribute("disabled","disabled");

    }

    eliminarDelCarrito(id, e){
        const nuevosProds = this.state.carrito.filter((productoCarrito)=>productoCarrito.id !== id)

        this.setState({
            carrito:[...nuevosProds]
        });

        localStorage.setItem('carritoStorage', JSON.stringify(nuevosProds))
    }

    pagado(){
        this.setState({
            carrito:[]
        });
        localStorage.clear();
        window.location.reload()
    }

    actualizarDatos(id, e){
        let url = Apiurl + "productos/"+id;
        console.log(url);

        axios.get(url)
            .then(response => {

                var listaB = []
                for (var x = 0; x < response.data[0].length; x++) {
                    listaB.push(response.data[0][x]);
                }

                this.setState({
                    productos: [...listaB]
                });

            });

    }

    render() {
        return (

            <React.Fragment>
                <div className="alert alert-secondary" role="alert">
                    <center>
                        Baratón
                    </center>
                </div>
                    <ul>
                        {this.state.menu.map(item => (
                            <div key={item.id}>
                                {item.id_padre===null &&
                                    item.nombre
                                }
                                {item.id_padre!==null & item.subnivel===1 &&
                                    item.nombre
                                }
                                {item.id_padre!==null & item.subnivel===0 &&
                                    <button className="btn btn-outline-dark" onClick={(e)=>this.actualizarDatos(item.id, e)}>
                                        {item.nombre}
                                    </button>
                                }
                            </div>
                        ))}
                    </ul>
                <br />
                <div className="accordion accordion-flush border border-secondary" id="accordionFlushExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                                Ordenar / Filtros
                            </button>
                        </h2>
                        <div id="flush-collapseOne" className="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <h3>Filtros</h3>
                                            <hr />
                                            <button className="btn btn-outline-dark" onClick={this.filtrandoDisponibilidad}>Por disponibilidad</button>
                                            <br />
                                            <br />
                                            <button className="btn btn-outline-dark" onClick={this.filtrando}>Rango de precios mayor a 40.000</button>
                                            <br />
                                            <br />
                                            <button className="btn btn-outline-dark" onClick={this.filtrandoStock}>Cantidad en stock</button>
                                        </div>
                                        <div className="col-md-6">
                                        <h3>Ordenar</h3>
                                            <hr />
                                            <button className="btn btn-outline-dark" onClick={this.listarDesc}>Por precio mayor precio primero</button>
                                            <br />
                                            <br />
                                            <button className="btn btn-outline-dark" onClick={this.listarAsc}>Por precio menor precio primero</button>
                                            <br />
                                            <br />
                                            <button className="btn btn-outline-dark" onClick={this.listarDisponibleMayor}>Mayor Disponibilidad</button>
                                            <br />
                                            <br />
                                            <button className="btn btn-outline-dark" onClick={this.listarCantidadMayor}>Cantidad</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="container-fluid">
                    <div className="row">
                        {this.state.productos.map(producto => (
                            <div className="col-md-2" key={producto.id}>
                                <div className="card">
                                    <img src={'http://api.test/storage/' + producto.imagenes[0].src} className="card-img-top" alt="" width="50%" height="300px" />
                                    <div className="card-body">
                                        <h5 className="card-title">{producto.nombre}</h5>
                                        <p className="card-text">sku:{producto.sku}</p>
                                        <p className="card-text">Precio:{producto.precio}</p>
                                        <p className="card-text">Stock:{producto.stock}</p>
                                        {producto.has_stock === 1 &&
                                            <div className="alert alert-success" role="alert">
                                                Disponible
                                            </div>
                                        }
                                        {producto.has_stock === 0 &&
                                            <div className="alert alert-danger" role="alert">
                                                No Disponible
                                            </div>
                                        }
                                        {producto.has_stock === 1 &&
                                            <button className="btn btn-outline-primary" onClick={(e)=>this.crearCarrito(producto.id, e)} id={"btnagregar"+producto.id}>Agregar al carrito</button>
                                        }
                                        {producto.has_stock === 0 &&
                                            <button className="btn btn-outline-primary" disabled>Agregar al carrito</button>
                                        }


                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <br />
                <br />
                <br />
                <div className="container">
                    <div className="row">
                        <div className="col-md">
                        <div className="shadow-lg p-3 mb-5 bg-body rounded">
                            <h3>Carrito de compras</h3>
                            <hr />

                            <table className="table">
                            <thead>
                                <tr>
                                <th scope="col">id</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio/unidad</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.carrito.map(car => (
                                <tr key={car.id}>
                                <th scope="row">{car.id}</th>
                                <td>{car.nombre}</td>
                                <td>{car.precio}</td>
                                <td><input type="numbre" placeholder="1" /></td>
                                <td><button className="btn btn-outline-dark" onClick={(e)=>this.eliminarDelCarrito(car.id, e)}>Eliminar</button></td>
                                </tr>
                            ))}
                            </tbody>
                            </table>
                            
                            <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-outline-dark" onClick={this.pagado}>Pagado</button>
                            </div>

                        </div>
                        </div>
                    </div>
                </div>                               

            </React.Fragment>
        );
    }
}

export default Productos;