import React from 'react';

import "./iniciarSesion.css";

class IniciarSesion extends React.Component {

    constructor(){
        super();

        this.state = {
            correo: "",
            contraseña: ""
        }

        this.capturarInput = this.capturarInput.bind(this);
        this.iniciarSesion = this.iniciarSesion.bind(this);
    }

    capturarInput(event){
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    iniciarSesion(event){
        event.preventDefault();
        const { correo, contraseña } = this.state;
        console.log(correo, contraseña);
    }

    render() {
        const {correo, contraseña} = this.state;
        return (
            <div>
                <div className="card iniciarSesion container" >
                    <div id="cuadroForm" className="card-body">

                        <h5 className="card-title">Iniciar Sesion</h5>

                        <form>
                            <div className="form-group">
                                <input id="campo1" type="email" className="campo form-control" ria-describedby="emailHelp" placeholder="Ingrese su correo" name="correo" value={correo} onChange={this.capturarInput} required />
                            </div>

                            <div className="form-group ">
                                <input type="password" className="campo form-control" placeholder="Ingrese su contraseña" name="contraseña" value={contraseña} onChange={this.capturarInput} required />
                            </div>

                            <button id="btnIngresar" className="btn btn-primary" onClick={this.iniciarSesion}>Ingresar</button>
                        </form>

                    </div>
                </div>
            </div>
        )
    }

}

export default IniciarSesion;