import React, { useState, useEffect } from 'react';
import useAuth from '../auth/useAuth';
import axios from 'axios';
import rutas from '../helpers/rutas';
import swal from 'sweetalert';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

const TextoEstilo = {
    color: 'white',
    textAlign: 'justify',
    fontFamily: 'Helvética arial',
    fontSize: '24px',
    textShadow: '2px 2px 2px Black',
    cursor: 'pointer'
}


export function TextoInformativo() {

    const { datosempresa, updatedates } = useAuth();
    const [mostrar, setMostrar] = useState(false);
    const [mostrarCampo, setMostrarCampo] = useState(false);
    const [presentacion, setpresentacion] = useState(datosempresa.presentacion);
    const [imagen, setimagen] = useState([]);
    const [imagenes, setimagenes] = useState([]);
    const [envio, setenvio] = useState(false);
    const [zoom, setzoom] = useState(false);
    const [controlmax, setControlmax] = useState(0);
    const [control2, setControl2] = useState(0);
    const [conteo, setConteo] = useState(updatedates);

    useEffect(() => {
        if (envio) {
            document.getElementById('id02').style.display = 'block';
        }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    useEffect(() => {
        if (zoom) {
            document.getElementById('id04').style.display = 'block';
        }
        else { document.getElementById('id04').style.display = 'none' }
    }, [zoom])

    useEffect(() => {
        if (datosempresa.descripcion === '' && (!datosempresa.presentacion || imagenes.length === 0)) { setMostrarCampo(false) }
        else { setMostrarCampo(true) }
        setpresentacion(datosempresa.presentacion);
    }, [datosempresa.descripcion, datosempresa.presentacion, imagenes.length])


    useEffect(() => {
        const tiempo = setTimeout(() => {
            adelante();
        }, 5000);
        if (conteo !== updatedates) {
            atras();
        }
        return () => { clearTimeout(tiempo); }
    });


    useEffect(() => {
        setConteo(updatedates);
    }, [updatedates])


    useEffect(() => {
        let ignore = false
        const recargarImagenes = async () => {
            setenvio(true);
            try {
                const resp = await axios.get(rutas.server + 'api/empresa/imagenes/')
                if (!ignore) {
                    setimagenes(resp.data.filter(user => user.presentar === true));
                    setControlmax(resp.data.filter(user => user.presentar === true).length - 1);
                    setenvio(false);
                }
            } catch (e) {
                if (!ignore) {
                    setenvio(false);
                    swal('Lo sentimos', 'Ocurrio un inconveniente y no pudimos cargar tus imágenes, por favor intenta de nuevo', 'error')
                    return;
                }
            }
        }
        recargarImagenes();
        return () => { ignore = true };
    }, [updatedates])

    const adelante = () => {
        if (control2 < controlmax) {
            setControl2(control2 + 1);
        }
        else { setControl2(0) }
    }


    const atras = () => {
        setControl2(control2 - 1)
        if (control2 < 1) {
            setControl2(controlmax)
        }
    }

    function MostrarImagenes() {
        if (imagenes.length > 0) {
            return (
                <>
                    {
                        imagenes[control2] !== undefined ?
                            <div className="presentar">
                                <img src={imagenes[control2].imagen} alt="imágenes subidas por parte del administrador" className="present w3-animate-zoom" />
                                {imagenes.length > 1 ?
                                    <div>
                                        <div className="w3-display-left w3-container">
                                            <div className='flechaIp' onClick={atras} >&#10094;</div>
                                        </div>
                                        <div className="w3-display-right w3-container">
                                            <div className='flechaDp' onClick={adelante} >&#10095;</div>
                                        </div>
                                    </div> : null}
                            </div>
                            : null}
                </>
            );
        }
        else { return null }
    }


    return (
        <>
            <div id="id02" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <h3>Por favor espera un momento</h3>
                        Estamos trabajando en tu solicitud.
                    </header>
                    <div className="w3-container w3-panel w3-center">
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="4s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration="1.8s" />
                        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" animationDuration=".5s" /><br></br>
                        <ProgressBar mode="indeterminate" style={{ height: '8px' }} />
                    </div>
                </div>
            </div>
            <div id="id04" className="w3-modal" onClick={e => setzoom(false)}>
                <div className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    {imagen.length > 0 && imagen !== undefined ?
                        <img src={imagen} alt="imágenes subidas por parte del administrador" style={{ width: '100%' }} />
                        : null}
                </div>
            </div>
            {mostrarCampo ?
                <div className="w3-container w3-center w3-metro-red">
                    <div style={TextoEstilo} onClick={e => setMostrar(!mostrar)} className="w3-padding w3-metro-red w3-center">
                        {mostrar ? 'Ocultar' : '¡Información importante aquí!'}
                    </div>
                    {mostrar ?
                        <div className='w3-animate-top'>
                            {presentacion && imagenes.length > 0 ?
                                <div>
                                    <div className='w3-col m4 w3-padding w3-container w3-white w3-card w3-border w3-round-large' >
                                        <MostrarImagenes />
                                        {imagenes[control2] !== undefined ?
                                            <span style={{ cursor: 'pointer' }} className="material-icons-round"
                                                onClick={e => { setimagen(imagenes[control2].imagen); setzoom(true) }}>
                                                zoom_in
                                            </span>
                                            : null}
                                    </div>
                                    {datosempresa.descripcion !== '' ?
                                        <div style={{ fontFamily: 'Helvética arial', fontSize: '20px', textAlign: 'justify' }}
                                            className="w3-col m8 w3-padding w3-container w3-white w3-border w3-round-large">
                                            {datosempresa.descripcion}
                                        </div>
                                        : null}
                                </div>
                                : <div style={{ fontFamily: 'Helvética arial', fontSize: '20px', textAlign: 'justify' }}
                                    className="w3-padding w3-container w3-white w3-border w3-round-large">
                                    {datosempresa.descripcion}
                                </div>}
                        </div>
                        : null}
                    <div className="w3-col m12 w3-padding w3-metro-red w3-center">
                    </div>
                </div>
                : null}
        </>
    )
}