import React, { useState, useEffect } from 'react'
import rutas from '../helpers/rutas';
import axios from 'axios';
import swal from 'sweetalert';
import { Password } from 'primereact/password';
import { Encabezado } from './Encabezado';
import { Link, useNavigate } from 'react-router-dom';


export default function NewPassword() {

    const navigate = useNavigate();
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [token, settoken] = useState('');

    useEffect(() => {
        let valor = (rutas.index).length + (rutas.password).length - 1
        settoken((window.location.href).substring(valor));
    }, [contra])


    const validarContra = e => {
        if (contra.length >= 8) {
            if (contra === contra2) {
                enviarDatos()
            }
            else {
                swal('Error en contraseñas', 'Las contraseñas deben coincidir, por favor verifica e intenta de nuevo', 'warning');
                return;
            }
        }
        else { swal("Stop!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning"); }
    }

    const enviarDatos = async (e) => {
        try {
            await axios.put(rutas.server + 'api/auth/new-password', {
                newPassword: contra
            }, {
                headers: {
                    'reset': token,
                    'Content-Type': 'application/json'
                }
            })
            setContra('');
            setContra2('')
            swal({
                title: "En hora buena!",
                text: "Tú contraseña se actualizo con exito, por favor inicia sesión.",
                icon: "success",
                buttons: "Ok"
            })
            navigate(rutas.home, { replace: true });
        } catch (e) {
            if (e.request.status === 401) {
                swal('Upss', 'Lo sentimos, al parecer el link de actualización ya venció, por favor solicítalo nuevamente', 'info')
            }
            else { swal(':(', 'Algo no salio bien, por favor intenta de nuevo', 'error') }
            //let respuesta = JSON.parse(e.request.response).message; 
            //console.log(e.request.status)           
        }

    };

    return (
        <>
            <div className="w3-container w3-black">
                <div className="w3-right-align w3-padding">
                    <button className="w3-button w3-metro-red  w3-round-xlarge w3-hover-white w3-small">
                        <Link to={rutas.home}>
                            <b >
                                Ir a inicio
                            </b>
                        </Link>
                    </button>
                </div>
            </div>
            <div className="componentes w3-animate-zoom">
                <div className="w3-container w3-center w3-panel w3-white w3-border w3-round-large w3-text-indigo">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.home}>
                            <b >&times;</b>
                        </Link>
                    </div>
                    <h2><b>A continuación ingrese su nueva contraseña.</b></h2>
                    <div>
                        <label><b>Contraseña.</b></label><br></br>
                        <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask promptLabel='contraseña, mínimo 8 caracteres' weakLabel='Débil' mediumLabel='Moderada' strongLabel="Fuerte" />
                    </div>
                    <div>
                        <label><b>Confirme contraseña.</b></label><br></br>
                        <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask feedback={false} />
                    </div>
                    <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-margin"
                        onClick={validarContra}>
                        Enviar
                    </button>
                </div>
            </div>
            <Encabezado />
        </>
    )
}
