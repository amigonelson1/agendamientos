import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import { InputSwitch } from 'primereact/inputswitch';

const espacio = {
    margin: '10px',
}

export function ConfigEmpresa() {


    const { user, datosempresa, upDateDates } = useAuth();
    const [validar, setVal] = useState('');
    const [admin, setAdmin] = useState('');
    const [logo, setLogo] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [Imagen, setImagen] = useState('');
    const [telefono1, setTelefono1] = useState('');
    const [telefono2, setTelefono2] = useState('');
    const [telefono3, setTelefono3] = useState('');
    const [direccion, setDireccion] = useState('');
    const [correo, setCorreo] = useState('');
    const [facebook, setFace] = useState('');
    const [instagram, setInst] = useState('');
    const [whatsapp, setWhat] = useState('');
    const [twitter, setTwit] = useState('');
    const [linkedin, setLinked] = useState('');
    const [youtube, setYou] = useState('');
    const [presentacion, setpresentacion] = useState(false);
    const [encabezado, setencabezado] = useState(false);
    const [clima, setclima] = useState(false);
    const [envio, setenvio] = useState(false);
    const [mostrar, setmostrar] = useState(true);
    const [mostraredit, setmostraredit] = useState(false)


    const handleClearAll = () => {
        setAdmin('');
        setLogo('');
        setTitulo('');
        setDescripcion('');
        setImagen('');
        setTelefono1('');
        setTelefono2('');
        setTelefono3('');
        setDireccion('');
        setCorreo('');
        setFace('');
        setInst('');
        setWhat('');
        setTwit('');
        setLinked('');
        setYou('');
        setpresentacion(false);
        setencabezado(false);
        setclima(false);
        setmostrar(true);
        setmostraredit(false);
    }



    function traerDatos() {
        setmostrar(false)
        setVal(datosempresa._id);
        setAdmin(datosempresa.administrador);
        setTitulo(datosempresa.title);
        setDescripcion(datosempresa.descripcion);
        setImagen(datosempresa.imagen);
        setLogo(datosempresa.logo);
        setTelefono1(datosempresa.telefono1);
        setTelefono2(datosempresa.telefono2);
        setTelefono3(datosempresa.telefono3);
        setDireccion(datosempresa.direccion);
        setCorreo(datosempresa.email);
        setFace(datosempresa.facebook);
        setInst(datosempresa.instagram);
        setWhat(datosempresa.whatsapp);
        setTwit(datosempresa.twitter);
        setLinked(datosempresa.linkedin);
        setYou(datosempresa.youtube);
        setpresentacion(datosempresa.presentacion);
        setencabezado(datosempresa.encabezado);
        setclima(datosempresa.clima);
        setmostraredit(true);
    }

    const enviarDatos = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/' + datosempresa._id, {
                title: titulo,
                descripcion: descripcion,
                administrador: admin,
                imagen: Imagen,
                telefono1: telefono1,
                telefono2: telefono2,
                telefono3: telefono3,
                logo: logo,
                direccion: direccion,
                email: correo,
                presentacion: presentacion,
                encabezado: encabezado,
                clima: clima,
                facebook: facebook,
                instagram: instagram,
                whatsapp: whatsapp,
                twitter: twitter,
                linkedin: linkedin,
                youtube: youtube
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false)
            handleClearAll();
            //window.location.reload();
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }

    const validarVacio = (e) => {
        e.preventDefault()
        if (validar) {
            swal({
                title: '¿Actualizar datos?',
                text: ('Estas a punto de modificar uno o más datos, si estas de acuerdo da en "Continuar".'),
                icon: 'info',
                buttons: ['Cancelar', 'Continuar'],
            }).then(res => {
                if (res) enviarDatos();
            })
        }
        else {
            swal({
                title: 'Sin datos',
                text: 'Por favor de clic en "Editar datos club"',
                icon: 'info', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const nombreAMay = (n) => {
        if (n === '') { setAdmin(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setAdmin(nombreCompleto.join(' '));
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])

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
            <div className='componentes w3-animate-zoom'>
                {mostrar ?
                    <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        <div className="w3-container w3-right-align w3-text-indigo">
                            <Link to={rutas.admin}>
                                <b >cerrar</b>
                            </Link>
                        </div>
                        <div className="w3-container w3-border w3-round-large w3-gray w3-padding">
                            <h2 className='w3-center w3-text-indigo'><b>Personalice aquí los datos de su página.</b></h2>
                            <div className="w3-container w3-padding w3-right-align">
                                <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={traerDatos}>Editar datos Club
                                </button>
                            </div>
                            <div className="w3-container w3-col m6 w3-padding w3-white">
                                <p className="w3-text-indigo">
                                    <label >Admin o representante legal: <br></br></label>
                                    <b>{datosempresa.administrador}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label >Dirección:<br></br></label>
                                    <b>{datosempresa.direccion}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label className="w3-text-indigo">Teléfono(s):<br></br></label>
                                    <b>{datosempresa.telefono1}<br></br>
                                        {datosempresa.telefono2}<br></br>
                                        {datosempresa.telefono3}<br></br></b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Correo electrónico:<br></br></label>
                                    <b>{datosempresa.email}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Título:<br></br></label>
                                    <b>{datosempresa.title}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Sitio Web:<br></br></label>
                                    <b>{datosempresa.logo}</b>
                                </p>
                                <label className="w3-text-indigo">
                                    <p><b>Mostrar título en encabezado:</b></p>
                                    <InputSwitch disabled checked={datosempresa.encabezado} onChange={(e) => setencabezado(e.value)} />
                                </label><br></br>
                            </div>
                            <div className="w3-container w3-col m6 w3-padding w3-white">
                                <label className="w3-text-indigo">
                                    <p><b>Mostrar presentación de imágenes:</b></p>
                                    <InputSwitch disabled checked={datosempresa.presentacion} onChange={(e) => setpresentacion(e.value)} />
                                </label><br></br>
                                <label className="w3-text-indigo">
                                    <p><b>Mostrar clima:</b></p>
                                    <InputSwitch disabled checked={datosempresa.clima} onChange={(e) => setclima(e.value)} />
                                </label><br></br>
                                <p className="w3-text-indigo">
                                    <label>Facebook:<br></br></label>
                                    <b>{datosempresa.facebook}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Instagram:<br></br></label>
                                    <b>{datosempresa.instagram}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Whatsapp:<br></br></label>
                                    <b>{datosempresa.whatsapp}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Twitter:<br></br></label>
                                    <b>{twitter}</b>
                                </p>
                                <p className="w3-text-indigo">
                                    <label>Linkedin:<br></br></label>
                                    <b>{datosempresa.linkedin}</b>

                                </p>
                                <p className="w3-text-indigo">
                                    <label >Youtube:<br></br></label>
                                    <b>{datosempresa.youtube}</b>
                                </p>
                            </div>
                            <div className="w3-container w3-white">
                                <p className="w3-text-indigo">
                                    <label>
                                        Texto, políticas o información a mostrar:<br></br>
                                    </label>
                                    <b>{datosempresa.descripcion}</b>
                                </p>
                                <div className="w3-col w3-panel w3-center">
                                    <button onClick={traerDatos} style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                        Editar
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                    : null}
                {mostraredit ?
                    <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        <div className="w3-container w3-right-align w3-text-indigo">
                            <Link to={rutas.admin}>
                                <b >&times;</b>
                            </Link>
                        </div>
                        <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                            <h2 className='w3-center w3-text-indigo'><b>Personalice aquí los datos de su página.</b></h2>
                            <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={handleClearAll}>Cancelar</button>
                        </div>
                        <div className="w3-container w3-col m6 w3-padding">
                            <p>
                                <label className="w3-text-indigo"><b>Admin o representante legal.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={50} name="admin" value={admin}
                                    onChange={e => nombreAMay(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-indigo"><b>Dirección.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={90} name="direccion" value={direccion}
                                    onChange={e => setDireccion(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-indigo"><b>Teléfono(s).</b></label>
                                <input className="w3-input w3-border w3-round-large" type="tel"
                                    maxLength={10} name="telefono1" value={telefono1}
                                    onChange={e => setTelefono1(e.target.value)} />
                                <input className="w3-input w3-border w3-round-large" type="tel"
                                    maxLength={10} name="telefono1" value={telefono2}
                                    onChange={e => setTelefono2(e.target.value)} />
                                <input className="w3-input w3-border w3-round-large" type="tel"
                                    maxLength={10} name="telefono1" value={telefono3}
                                    onChange={e => setTelefono3(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-indigo"><b>Correo electrónico.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="email"
                                    maxLength={80} name="correo" value={correo}
                                    onChange={e => setCorreo(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-indigo"><b>Ingrese aquí el título.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={50} name="titulo" value={titulo}
                                    onChange={e => setTitulo(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-indigo"><b>Sitio Web.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={80} value={logo}
                                    onChange={e => setLogo(e.target.value)} />
                            </p>
                            <label className="w3-text-indigo">
                                <p><b>Mostrar título en encabezado:</b></p>
                                <InputSwitch checked={encabezado} onChange={(e) => setencabezado(e.value)} />
                            </label><br></br>
                        </div>
                        <div className="w3-container w3-col m6 w3-padding">
                            <label className="w3-text-indigo">
                                <p><b>Mostrar presentación de imágenes:</b></p>
                                <InputSwitch checked={presentacion} onChange={(e) => setpresentacion(e.value)} />
                            </label><br></br>
                            <label className="w3-text-indigo">
                                <p><b>Mostrar clima:</b></p>
                                <InputSwitch checked={clima} onChange={(e) => setclima(e.value)} />
                            </label><br></br>
                            <p>
                                <label className="w3-text-indigo"><b>Facebook.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={100} name="redes" value={facebook}
                                    onChange={e => setFace(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-pink"><b>Instagram.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={100} name="redes" value={instagram}
                                    onChange={e => setInst(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-green"><b>Whatsapp.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={100} name="redes" value={whatsapp}
                                    onChange={e => setWhat(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-blue"><b>Twitter.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={100} name="redes" value={twitter}
                                    onChange={e => setTwit(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-blue"><b>Linkedin.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={100} name="redes" value={linkedin}
                                    onChange={e => setLinked(e.target.value)} />
                            </p>
                            <p>
                                <label className="w3-text-red"><b>Youtube.</b></label>
                                <input className="w3-input w3-border w3-round-large" type="text"
                                    maxLength={300} name="redes" value={youtube}
                                    onChange={e => setYou(e.target.value)} />
                            </p>
                        </div>
                        <div className="w3-panel w3-col m12">
                            <p>
                                <label className="w3-text-indigo">
                                    <b>
                                        Texto, políticas o información a mostrar:
                                    </b>
                                </label>
                                <textarea type="text" style={{ height: '120px' }} spellCheck={true} maxLength={1000} name="descripcion"
                                    className="w3-input w3-animate-input w3-border w3-round-xlarge w3-text-indigo"
                                    value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                            </p>
                        </div>
                        <div className="w3-col w3-panel w3-center">
                            <button onClick={validarVacio} style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                Actualizar
                            </button>
                            <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={handleClearAll}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                    : null}
            </div>
        </>
    )
}
