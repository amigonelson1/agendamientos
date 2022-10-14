import React, { useState, useEffect, useRef } from 'react';
import '../index.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';

export default function Imagenes() {
    window.scroll(0, 0)

    const resetBoton = useRef(null);
    const { user, upDateDates } = useAuth();
    const [envio, setenvio] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const [preimagenes, setpreimagenes] = useState([]);
    const [control, setcontrol] = useState(0);


    useEffect(() => {
        if (envio) {
            document.getElementById('id01').style.display = 'none';
            document.getElementById('id02').style.display = 'block';
        }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    useEffect(() => {
        if (preimagenes.length === 0) { document.getElementById('id01').style.display = 'none' }
    }, [preimagenes])


    const subirImagen = (e) => {
        if (e.target.files.length > 5) {
            swal('Upss, Máx 5 imágenes', 'Por favor no se exceda de 5 imágenes por solicitud', 'info')
            return;
        }
        const file = e.target.files;
        const fileValide = []
        const extencionName = /.(jpe?g|gif|png|jfif)$/i;
        if (file) {
            for (var j = 0; j < e.target.files.length; j++) {
                let validateSize = file[j].size < 2 * 1024 * 1024;
                let validateExtention = extencionName.test(file[j].name);
                if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen "' + file[j].name + '" que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); }
                if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo "' + file[j].name + '" no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); }
                if (validateSize && validateExtention) {
                    fileValide.push(file[j]);
                    document.getElementById('id01').style.display = 'block';
                }
            }
        }
        setpreimagenes(fileValide);
    }


    function Previsualizar() {
        if (preimagenes) {
            const images = preimagenes;
            const urls = images.map((url, index) =>
                <div key={index} className="w3-col m4">
                    <img src={URL.createObjectURL(url)} alt="previsualización" style={{ maxHeight: "150px", width: "100%", margin: "15px", marginLeft: "15px" }} />
                    <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={e => limpiarSeleccion(index)}>
                        delete
                    </span>
                </div>
            );
            return (
                <div className='w3-panel w3-white'>{urls}
                    <div className='w3-col m12 w3-center'>
                        <button className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-margin"
                            onClick={enviarImagen}>
                            Subir imágenes
                        </button>
                    </div>
                </div>
            );
        }
        else { return null }
    }

    function MostrarImagenes() {
        if (imagenes) {
            const images = imagenes;
            const imgs = images.map((url, index) =>
                <div key={index} className="w3-col m4 w3-center">
                    <img src={url.imagen} alt="previsualización" style={{ maxHeight: "150px", width: "100%", margin: "15px", marginLeft: "15px" }} />
                    {url.ver ?
                        <span className="material-icons-round w3-cyan" style={{ cursor: 'pointer', marginRight: '15px' }} title="Habilitar para encabezado."
                            onClick={e => cambiarVer(false, url._id)}>
                            filter_5
                        </span>
                        : <span className="material-icons-round" style={{ cursor: 'pointer', marginRight: '15px' }} title="Habilitar para encabezado."
                            onClick={e => cambiarVer(true, url._id)}>
                            filter_5
                        </span>}
                    {url.presentar ?
                        <span className="material-icons-round w3-cyan" style={{ cursor: 'pointer', marginRight: '15px' }} title="Habilitar para presentaciones."
                            onClick={e => cambiarPresentar(false, url._id)}>
                            co_present
                        </span>
                        : <span className="material-icons-round" style={{ cursor: 'pointer', marginRight: '15px' }} title="Habilitar para presentaciones."
                            onClick={e => cambiarPresentar(true, url._id)}>
                            co_present
                        </span>}
                    <span className="material-icons-round" style={{ cursor: 'pointer' }} title="Eliminar esta imagen."
                        onClick={e => deleteImage(url._id)}>
                        delete
                    </span>
                </div>
            );
            return (
                <div className='w3-panel w3-white w3-border w3-round-large'>{imgs}
                    <div className='w3-col m12 w3-center'>
                        <button className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-margin"
                            onClick={e => setimagenes([])}>
                            cerrar
                        </button>
                    </div>
                </div>
            );
        }
        else { return null }
    }


    const limpiarSeleccion = (e) => {
        const updatedItems = [...preimagenes];
        updatedItems.splice(e, 1);
        setpreimagenes(updatedItems);
        resetBoton.current.value = null;
    }

    const limpiarTodo = (e) => {
        setpreimagenes([]);
        resetBoton.current.value = null;
    }

    const enviarImagen = async () => {
        setenvio(true)
        let files = new FormData()
        for (var k = 0; k < preimagenes.length; k++) {
            files.append('imagen', preimagenes[k])
        }
        try {
            await axios.post(rutas.server + 'api/empresa/imagenes/', files,
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            setpreimagenes([]);
            document.getElementById('id01').style.display = 'none';
            swal('En hora buena', 'Archivos guardados satisfactoriamente, si no visualiza su imagen por favor recargue la página', 'success')
            setimagenes([]);
            recargarImagenes();
        }
        catch (e) {
            console.log(e.request.response)
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')

        }
    }

    const recargarImagenes = async () => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/empresa/imagenes/')
            setimagenes(resp.data);
            setenvio(false);
            setcontrol(resp.data.filter(user => user.ver === true).length);
            if (resp.data.length === 0) swal('Sin imagenes', 'Aun no tienes imágenes guardadas', 'info');
        } catch (e) {
            setenvio(false);
            swal('Lo sentimos', 'Ocurrio un inconveniente y no pudimos cargar tus imágenes, por favor intenta de nuevo', 'error')
            return;
        }
    }

    const deleteImage = (idImagen) => {
        swal({
            title: '¿Eliminar imagen?',
            text: ('Estas a punto de eliminar esta imagen, si estas de acuerdo da clic en "Continuar".'),
            icon: 'warning',
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                setimagenes([]);
                borrarImagen(idImagen);
            }
        })
    }

    const borrarImagen = async (idImagen) => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/empresa/imagenes/' + idImagen,
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            swal('Listo', 'Hemos eliminado la imagen', 'success')
            recargarImagenes();
            upDateDates();
        }
        catch (e) {
            //console.log(e.request)
            setenvio(false)
            if (!e.request.response) swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
        }
    }


    const cambiarPresentar = async (seleccion, idImagen) => {
        setenvio(true);
        try {
            await axios.put(rutas.server + 'api/empresa/imagenes/presentar/' + idImagen,
                {
                    presentar: seleccion
                },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            recargarImagenes();
            upDateDates();
        } catch (e) {
            setenvio(false);
            swal('Lo sentimos', 'Ocurrio un inconveniente y no pudimos finalizar tu petición, por favor intenta de nuevo', 'info')
        }
    }


    const cambiarVer = async (seleccion, idImagen) => {
        setenvio(true);
        if (seleccion === true) {
            if (control > 4) {
                setenvio(false);
                swal('Máx 5', 'Solo puedes habilitar un máximo de 5 imágenes para el encabezado.', 'info');
                return
            }
        }
        try {
            await axios.put(rutas.server + 'api/empresa/imagenes/ver/' + idImagen,
                {
                    ver: seleccion
                },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            recargarImagenes();
            upDateDates();
        } catch (e) {
            setenvio(false);
            swal('Lo sentimos', 'Ocurrio un inconveniente y no pudimos finalizar tu petición, por favor intenta de nuevo', 'info')
        }
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
            <div className='componentes  w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-container w3-border w3-round-large w3-gray w3-padding">
                        <h2 className='w3-center w3-text-indigo'><b>Personalice aquí las imágenes a mostrar de su página.</b></h2>
                        <div>
                            <span className="material-icons-round" >
                                filter_5
                            </span>: Imágenes para mostrar en encabezado de la página(máximo 5).<br></br>
                            <span className="material-icons-round" >
                                co_present
                            </span>: Imágenes para mostrar en presentación de diapositivas.
                        </div>
                        <div>
                            <span style={{ marginRight: '15px' }} className="material-icons-round w3-cyan" >
                                filter_5
                            </span>
                            <span className="material-icons-round w3-cyan" >
                                co_present
                            </span>: Iconos en color cian son los habilitados.
                        </div>
                    </div>
                    <div className="w3-col w3-center ">
                        <div style={{ margin: '10px auto', maxWidth: '300px' }}>
                            <div className="w3-center w3-margin-top w3-indigo w3-border w3-round-large w3-hover-cyan">
                                <label style={{ cursor: "pointer" }} >
                                    {preimagenes.length > 0 ? <b>Elegir más imágenes</b>
                                        : <b>Agregar imágenes</b>}
                                    <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif" multiple={true}
                                        ref={resetBoton} onChange={subirImagen} />
                                    <span className="material-icons-round">
                                        image
                                    </span>
                                </label>
                            </div>
                            {preimagenes.length > 0 ?
                                <div>
                                    {preimagenes.length === 1 ? <div style={{ cursor: "pointer" }} className='w3-container w3-border w3-round-large w3-hover-cyan w3-blue w3-text-white'
                                        onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                        {preimagenes.length} imagen seleccionada.
                                        <div className='w3-right-align'>
                                            <span className="material-icons-round">
                                                visibility
                                            </span>
                                        </div>
                                    </div>
                                        : null}
                                    {preimagenes.length > 1 ? <div style={{ cursor: "pointer" }} className='w3-container w3-border w3-round-large w3-hover-cyan w3-blue w3-text-white'
                                        onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                        {preimagenes.length} imágenes seleccionadas.
                                        <div className='w3-right-align'>
                                            <span className="material-icons-round">
                                                visibility
                                            </span>
                                        </div>
                                    </div>
                                        : null}
                                    <button style={{ marginRight: '10px' }} className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-small"
                                        onClick={enviarImagen}>
                                        Subir imágenes
                                    </button>
                                    <button className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-small"
                                        onClick={limpiarTodo}>
                                        Borrar selección
                                    </button>
                                </div>
                                : null}
                        </div>
                        <div id="id01" className="w3-modal">
                            <div style={{ maxWidth: "1250px" }} className="w3-modal-content w3-animate-opacity w3-card-4">
                                <header className="w3-container w3-indigo w3-center">
                                    <span onClick={e => document.getElementById('id01').style.display = 'none'}
                                        className="w3-button w3-display-topright">&times;</span>
                                    <h3>Imágenes seleccionadas</h3>
                                </header>
                                <Previsualizar />
                            </div>
                        </div>
                        <div className='w3-container w3-border w3-round-large w3-light-grey w3-left-align'>
                            {imagenes.length > 0 ? <div className='w3-container w3-border w3-round-large w3-grey w3-left-align'>
                                <MostrarImagenes />
                            </div>
                                : <div className='w3-left-align'>
                                    <button className="w3-button w3-indigo w3-round-large w3-hover-cyan w3-margin"
                                        onClick={recargarImagenes}>
                                        Mis imágenes
                                    </button>
                                </div>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
