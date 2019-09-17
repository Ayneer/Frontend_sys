import React from 'react';

import "./user.css";

class Cliente extends React.Component {

    constructor() {
        super();
        this.state = {
            tipo_identificacion: 0,
            email: "",
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            direccion: "",
            telefono: 0,
            ocupacion: "",
            fecha_nacimiento: "",
            id: "",

            listaCliente: [], //Lista que se recorre en la tabla
            newMensaje: false, //Mostrar o no un mensaje en el form
            mensaje: "", //Mensaje del form            

            btnEditarCliente: false,//Habilitar o no boton para editar a un cliente.
            mostrarClientes: false//Habilitar o no la vista principal de este componente.
        }

        this.inputForm = this.inputForm.bind(this);
        this.opcionIdentificacion = this.opcionIdentificacion.bind(this);
        this.limpiarForm = this.limpiarForm.bind(this);

        this.newCliente = this.newCliente.bind(this);
        this.eliminarCliente = this.eliminarCliente.bind(this);
        this.editarCliente = this.editarCliente.bind(this);
        this.cargarDataEditar = this.cargarDataEditar.bind(this);

    }

    async componentDidMount() {
        //this.validarFechaNacimiento();
        const response = await fetch('http://localhost:4000/clientes', {
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        if (json.estado) {
            this.setState({ listaCliente: json.clientes, mostrarClientes: true });
        } else {
            this.setState({ mostrarClientes: false });
        }
    }

    inputForm(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    validarFecha(fecha) {
        var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
        if ((fecha.match(RegExPattern)) && (fecha !== '')) {
            return true;
        } else {
            return false;
        }
    }

    opcionIdentificacion(event) {
        this.setState({
            tipo_identificacion: +event.target.value
        });
    }

    validarEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    lanzarMensaje(mensaje) {
        this.setState({
            newMensaje: true,
            mensaje: mensaje
        });
    }

    // validarFechaNacimiento(fechaN, tipo_identificacion) {
    //     var diaS = new Date().getDate();
    //     var mesS = new Date().getMonth() + 1;
    //     var añoS = new Date().getFullYear();

    //     var fechaf = fechaN.split("/");
    //     var dia = fechaf[0];
    //     var mes = fechaf[1];
    //     var año = fechaf[2];

    //     var edad = añoS - año;

    //     if(dia > diaS || mes > mesS || año > añoS){
    //         return false;
    //     }else{
    //         var edad = añoS - año;
    //         if(tipo_identificacion === 1){
    //             if(edad > 7){
    //                 return false;
    //             }
    //         }else{
    //             if(tipo_identificacion === 2){
    //                 if(edad < 7 && edad > 18){
    //                     return false;
    //                 }
    //             }
    //         }
    //     }
    // }

    async newCliente() {

        const { email, primer_nombre, tipo_identificacion, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, ocupacion, fecha_nacimiento } = this.state;

        if (email === "" || primer_nombre === "" || primer_apellido === "" || tipo_identificacion === 0 || telefono === 0 || telefono === "" || fecha_nacimiento === "" || !this.validarFecha(fecha_nacimiento)) {
            this.lanzarMensaje("Error, debe llenar todos los campos");
        } else {
            if (this.validarEmail(email)) {
                const response = await fetch('http://localhost:4000/clientes', {
                    method: 'POST',
                    body: JSON.stringify({ tipo_identificacion: tipo_identificacion, email: email, primer_nombre: primer_nombre, segundo_nombre: segundo_nombre, primer_apellido: primer_apellido, segundo_apellido: segundo_apellido, direccion, telefono: telefono, ocupacion: ocupacion, fecha_nacimiento: fecha_nacimiento }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                });
                const json = await response.json();
                if (json.estado) {
                    this.lanzarMensaje(json.mensaje);
                    this.componentDidMount();
                    this.limpiarForm();
                } else {
                    this.lanzarMensaje(json.mensaje);
                }
            } else {
                this.lanzarMensaje("Digite un correo valido");
            }

        }
    }

    async eliminarCliente(event) {
        const id_cliente = event.target.value;
        const response = await fetch('http://localhost:4000/clientes/' + id_cliente, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Accept': 'application/json'
            }
        });
        const json = await response.json();
        if (json.estado) {
            this.lanzarMensaje(json.mensaje);
            this.componentDidMount();
        } else {
            this.lanzarMensaje(json.mensaje);
        }

    }

    buscarClientePorId(id) {
        let cliente = JSON;
        const { listaCliente } = this.state;
        for (var i = 0; i < listaCliente.length; i++) {
            if (listaCliente[i]._id === id) {
                cliente = listaCliente[i];
                break;
            }
        }
        return cliente;
    }

    async cargarDataEditar(event) {
        const cliente = this.buscarClientePorId(event.target.value);
        if (cliente.primer_nombre !== undefined) {
            this.setState({
                tipo_identificacion: cliente.tipo_identificacion,
                email: cliente.email,
                primer_nombre: cliente.primer_nombre,
                segundo_nombre: cliente.segundo_nombre,
                primer_apellido: cliente.primer_apellido,
                segundo_apellido: cliente.segundo_apellido,
                direccion: cliente.direccion,
                telefono: cliente.telefono,
                ocupacion: cliente.ocupacion,
                fecha_nacimiento: cliente.fecha_nacimiento,
                id: event.target.value,
                btnEditarCliente: true
            });
        }
    }

    async editarCliente() {
        console.log(0);

        const { tipo_identificacion, email, primer_nombre, id, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, ocupacion, fecha_nacimiento } = this.state;
        console.log(telefono);
        if (email === "" || primer_nombre === "" || primer_apellido === "" || tipo_identificacion === 0 || telefono === 0 || telefono === "" || fecha_nacimiento === "") {
            this.lanzarMensaje("Debe escribir los inputs requeridos");
        } else {
            if (this.validarEmail(email)) {
                const response = await fetch('http://localhost:4000/clientes/' + id, {
                    method: 'PUT',
                    body: JSON.stringify({ tipo_identificacion: tipo_identificacion, email: email, primer_nombre: primer_nombre, segundo_nombre: segundo_nombre, primer_apellido: primer_apellido, segundo_apellido: segundo_apellido, direccion: direccion, telefono: telefono, ocupacion: ocupacion, fecha_nacimiento: fecha_nacimiento }),
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8',
                        'Accept': 'application/json'
                    }
                });
                const json = await response.json();
                if (json.estado) {
                    this.lanzarMensaje(json.mensaje);
                    this.componentDidMount();
                    this.limpiarForm();
                } else {
                    this.lanzarMensaje(json.mensaje);
                }
            } else {
                this.lanzarMensaje("Debes escribir un correo valido!");
            }

        }
    }

    tipo_identificacion(tipo_identificacion) {
        switch (tipo_identificacion) {
            case 1:
                return "RC";
            case 2:
                return "TI";
            case 3:
                return "CC";

            default:
                return "";
        }
    }

    limpiarForm() {
        this.setState({
            primer_nombre: "",
            segundo_nombre: "",
            primer_apellido: "",
            segundo_apellido: "",
            direccion: "",
            telefono: 0,
            email: "",
            ocupacion: "",
            fecha_nacimiento: "",
            id: "",
            btnEditarCliente: false,
            newMensaje: false
        });
    }

    render() {
        const { email, primer_nombre, mostrarClientes, listaCliente, newMensaje, mensaje, btnEditarCliente, segundo_nombre, primer_apellido, segundo_apellido, direccion, telefono, ocupacion, fecha_nacimiento } = this.state;

        let hayClientes = false;

        if (mostrarClientes) {
            if (listaCliente.length > 0) {
                hayClientes = true;
            }
            return (
                <div className="cliente container">
                    <div className="row rowOne">
                        <div className="col-lg-4 newCliente">
                            <div className="tituloNuevoCliente">
                                <h6>
                                    Crear nuevo cliente
                                </h6>
                            </div>
                            {/* Inicio de card */}
                            <div className="card mx-auto cardComponent">
                                {newMensaje ? <div>{mensaje}</div> : null}

                                <div className="card-header">

                                    <select className="form-control inputForm" id="opciones" onChange={this.opcionIdentificacion}>
                                        <option value="0">Seleccione una opción</option>
                                        <option value="1">RC – Registro civil</option>
                                        <option value="2">TI – Tarjeta de identidad</option>
                                        <option value="3">CC – Cedula de ciudadanía</option>
                                    </select>

                                    <input className="form-control inputForm" type="text" name="primer_nombre" placeholder="Primer nombre" value={primer_nombre} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="segundo_nombre" placeholder="Segundo nombre" value={segundo_nombre} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="primer_apellido" placeholder="Primer apellido" value={primer_apellido} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="segundo_apellido" placeholder="Segundo apellido" value={segundo_apellido} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="direccion" placeholder="direccion" value={direccion} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="number" name="telefono" placeholder="telefono" value={telefono} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="mail" name="email" placeholder="E-mail" value={email} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="ocupacion" placeholder="ocupacion" value={ocupacion} onChange={this.inputForm} />

                                    <input className="form-control inputForm" type="text" name="fecha_nacimiento" placeholder="Nacimiento : dd/mm/aaaa" value={fecha_nacimiento} onChange={this.inputForm} />

                                    <div className="btn-group-sm btnForm">

                                        {btnEditarCliente ?
                                            <button type="submit" className="btn btn-primary mr-3" onClick={this.editarCliente}>
                                                Editar
                                            </button>
                                            :
                                            <button type="submit" className="btn btn-primary mr-3" onClick={this.newCliente}>
                                                Crear
                                            </button>
                                        }
                                        <button type="submit" className="btn btn-danger btn-newUser" onClick={this.limpiarForm}>
                                            Cancel
                                        </button>

                                    </div>

                                </div>
                            </div>
                            {/* New user card end */}

                        </div>
                        <div className="col-lg-8 listUser">
                            {hayClientes ?
                                <div className="table-responsive">
                                    <table className="table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Tipo de identificación</th>
                                                <th scope="col">P. Nombre</th>
                                                <th scope="col">S. Nombre</th>
                                                <th scope="col">P. Apellido</th>
                                                <th scope="col">S. Apellido</th>
                                                <th scope="col">Dirección</th>
                                                <th scope="col">Teléfono</th>
                                                <th scope="col">E-mail</th>
                                                <th scope="col">Ocupación</th>
                                                <th scope="col">F. Nacimiento</th>
                                                <th scope="col">Acciones</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listaCliente.map((cliente, index) =>
                                                <tr key={index}>
                                                    <th scope="row">{index + 1}</th>
                                                    <td>{this.tipo_identificacion(cliente.tipo_identificacion)}</td>
                                                    <td>{cliente.primer_nombre}</td>
                                                    <td>{cliente.segundo_nombre}</td>
                                                    <td>{cliente.primer_apellido}</td>
                                                    <td>{cliente.segundo_apellido}</td>
                                                    <td>{cliente.direccion}</td>
                                                    <td>{cliente.telefono}</td>
                                                    <td>{cliente.email}</td>
                                                    <td>{cliente.ocupacion}</td>
                                                    <td>{cliente.fecha_nacimiento}</td>
                                                    <td>
                                                        <div className="btn-group-sm">
                                                            <button className="btn btn-primary mr-3" value={cliente._id} onClick={this.cargarDataEditar}>Editar</button>

                                                            <button className="btn btn-danger" value={cliente._id} onClick={this.eliminarCliente}>Eliminar</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                                :
                                <div>No hay clientes. Puede crear a su hizquierda.</div>
                            }
                        </div>
                    </div>
                </div>
            );

        } else {
            return (<div>Cargando, por favor espere ...</div>)
        }

    }
}

export default Cliente;