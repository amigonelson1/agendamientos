import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import { Password } from 'primereact/password';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import useAuth from '../auth/useAuth'
import '../index.css'
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import rutas from '../helpers/rutas';
import 'primeicons/primeicons.css';
import { ColorPicker } from 'primereact/colorpicker';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Toast } from 'primereact/toast';


const espacio = {
    margin: '10px',
}

export function RegistroUsersAdmin() {

    const resetBoton = useRef(null);
    const toast = useRef(null);
    const inputEl = useRef(null);
    const navigate = useNavigate();
    const { user, upDateDates } = useAuth();
    const [nombre, setNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [documento, setDoc] = useState('');
    const [celular, setCel] = useState('');
    const [telefono2, settelefono2] = useState('');
    const [direccion, setdireccion] = useState('');
    const [color, setcolor] = useState('');
    const [correo, setCorreo] = useState('');
    const [contra, setContra] = useState('');
    const [contra2, setContra2] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('Socio');
    const [idFamiliares, setFam] = useState('');
    const [envio, setenvio] = useState(false);
    const [imagen, setimagen] = useState(null);
    const [preimagen, setpreimagen] = useState(null);
    const [namefile, setnamefile] = useState('');
    const [fechaNacimiento, setfechanacimiento] = useState('');
    const [estatura, setestatura] = useState(0);
    const [peso, setpeso] = useState(0);
    const [genero, setgenero] = useState('');
    const [barrio, setbarrio] = useState('');
    const [categoria, setcategoria] = useState('');
    const [torneos, settorneos] = useState('');
    const [brazoDominante, setbrazo] = useState('');


    addLocale('es', {
        firstDayOfWeek: 1,
        dayNames: ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'],
        dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
        dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
        monthNames: ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'],
        monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
        today: 'Hoy',
        clear: 'Claro'
    });

    const limpiarDatos = () => {
        setNombre('');
        setCod('');
        setDoc('');
        setCel('');
        settelefono2('');
        setdireccion('');
        setcolor('');
        setCorreo('');
        setContra('');
        setContra2('');
        setAct(false);
        setTipo('Socio');
        setFam('');
        setimagen(null);
        setnamefile('');
        setfechanacimiento('')
        setestatura(0)
        setpeso(0)
        setgenero('')
        setbarrio('')
        setcategoria('')
        settorneos('')
        setbrazo('')
    }

    const enviarDatos = async e => {
        let respu = '';
        setenvio(true);
        try {
            respu = await axios.post(rutas.server + 'api/administrador/', {
                nombre: nombre,
                codigo: codigo,
                documento: documento,
                celular: celular,
                telefono2: telefono2,
                direccion: direccion,
                color: color,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: tipo,
                contra: contra,
                email: correo,
                fechaNacimiento: fechaNacimiento.value,
                estatura: estatura,
                peso: peso,
                genero: genero,
                barrio: barrio,
                categoria: categoria,
                torneos: torneos,
                brazoDominante: brazoDominante
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            let id = respu.data.message._id
            enviarImagen(id);
            setenvio(false);
            upDateDates();
            limpiarDatos();
            swal({
                title: "En hora buena!",
                text: "Usuario registrado exitosamente",
                icon: "success",
                buttons: 'cerrar'
            });
            navigate(rutas.admin, { replace: true });
        }
        catch (e) {
            setenvio(false);
            if (e.request !== undefined) {
                let respuesta = JSON.parse(e.request.response).message;
                swal({
                    title: "Datos ya existentes!",
                    text: ('Por favor revisa los datos ingresados, ' + respuesta),
                    icon: "warning",
                    buttons: 'cerrar'
                })
            }
        }
    }

    const mostrarAlerta = () => {
        swal({
            title: 'Error en contraseñas',
            text: 'las contraseñas deben coincidir',
            icon: 'warning', //success , warning, info, error
            buttons: 'Aceptar', // tambien se puede para confirmar buttons: ['no','si'] siendo la parte derecha siempre true
            timer: '' //tiempo en milisegundos
        })
    };


    const validarContra = e => {
        e.preventDefault()
        nombreAMay(nombre)
        if (contra.length >= 8) {
            if (contra === contra2) {
                enviarDatos()
            }
            else {
                mostrarAlerta();
                return;
            }
        }
        else { swal("Stop!!!", "Por la seguridad de tu cuenta te pedimos ingresa una contraseña igual o mayor a 8 caracteres, recuerda que la mejor opción es combinar caracteres entre mayúsculas, minúsculas, números y caracteres especiales.", "warning"); }
    }

    const subirImagen = (e) => {
        const [file] = e.target.files;
        if (file) {
            const validateSize = file.size < 2 * 1024 * 1024;
            const extencionName = /.(jpe?g|gif|png|jfif)$/i;
            const validateExtention = extencionName.test(file.name)
            if (!validateSize) { swal('Imagen muy pesada', 'Lo sentimos pero el tamaño de la imagen que intentas subir sobrepasa el valor máximo permitido (2MB).', 'warning'); return }
            if (!validateExtention) { swal('Formato no valido', 'Lo sentimos pero el formato del archivo no es permitido, aceptamos formatos de imagen (jpg, jpeg, gif, png y jfif).', 'warning'); return }
            if (validateSize && validateExtention) {
                document.getElementById('id01').style.display = 'block';
                const reader = new FileReader();
                reader.onloadend = () => {
                    setnamefile(file.name);
                    setimagen(file);
                    setpreimagen(reader.result);
                }
                reader.readAsDataURL(file)
            }
        }
    }

    const enviarImagen = async (id) => {
        let file = new FormData()
        file.append('imagen', imagen)
        try {
            await axios.put(rutas.server + 'api/users/cambiarImagen/' + id, file,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
        }
        catch (e) {
            swal('Upss', 'Algo no salio bien, no pudimos enviar tu imagen', 'error')
        }
    }


    const limpiarBoton = () => {
        resetBoton.current.value = '';
        setimagen(null);
        setpreimagen(null);
        setnamefile('');
    }

    var modal = document.getElementById('id01');

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' };
        if (!envio) { document.getElementById('id02').style.display = 'none' };
    }, [envio])

    const nombreAMay = (n) => {
        if (n === '') { setNombre(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setNombre(nombreCompleto.join(' '));
    }


    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />;
    }


    const validarCorreo = async (mail) => {
        try {
            const resp = await axios.get(rutas.server + 'api/auth/email/' + mail);
            if (resp.data) {
                toast.current.show({ severity: 'warn', summary: 'Correo ya registrado', detail: 'Por favor verifica tu correo, ya tenemos este mail registrado en nuestra base de datos', life: 10000 });
                inputEl.current.focus();
            }
        }
        catch (e) {
            //console.log(e.request)
        }
    }

    const validarNum = (e, num) => {
        if (e === '') {
            if (num === 1) { setestatura(0) }
            if (num === 2) { setpeso(0) }
            return
        }
        if (!isNaN(e)) {
            if (num === 1) { setestatura(e) }
            if (num === 2) { setpeso(e) }
        }
        else {
            //alert('Por favor dígite unicamente números')
            toast.current.show({ severity: 'warn', summary: 'Sólo números', detail: 'Por favor ingrese sólo valores numéricos', life: 3000 });
            return;
        }
    }

    return (
        <>
            <Toast ref={toast} />
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
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large w3-text-indigo">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <h2 className='w3-center'><b>Registre aquí su nuevo usuario.</b></h2>
                    <form onSubmit={validarContra}>
                        <div style={{ maxWidth: '800px', margin: 'auto' }}>
                            <div className="w3-col m6 w3-panel">
                                <p>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Nombre Completo:</b></label>
                                    <input autoFocus className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={50} value={nombre}
                                        onChange={e => nombreAMay(e.target.value)} />
                                </p>
                                <p>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Número documento:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={20} value={documento}
                                        onChange={e => setDoc(e.target.value)} />
                                </p>
                                <p>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Código:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text" required
                                        maxLength={20} value={codigo}
                                        onChange={e => setCod(e.target.value)} />
                                </p>
                                <p>
                                    <label><b>Celular/Teléfono:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="tel"
                                        maxLength={15} value={celular}
                                        onChange={e => setCel(e.target.value)} />
                                </p>
                                <p>
                                    <label><b>Celular/Teléfono(2):</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="tel"
                                        maxLength={15} value={telefono2}
                                        onChange={e => settelefono2(e.target.value)} />
                                </p>
                                <p>
                                    <label><b>Dirección:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} value={direccion}
                                        onChange={e => setdireccion(e.target.value)} />
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Barrio:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} value={barrio}
                                        onChange={e => setbarrio(e.target.value)} />
                                </p>
                                <div className='w3-margin-top'>
                                    <label className="w3-text-indigo"><b>Estatura(cm):</b></label>
                                    <input style={{ maxWidth: '200px' }} type="text" maxLength="4" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Estatura" title="Estatura"
                                        onChange={e => validarNum(e.target.value, 1)} value={estatura} />
                                </div>
                                <div className='w3-margin-top'>
                                    <label className="w3-text-indigo"><b>Peso(kg):</b></label>
                                    <input style={{ maxWidth: '200px' }} type="text" maxLength="4" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Peso" title="Peso"
                                        onChange={e => validarNum(e.target.value, 2)} value={peso} />
                                </div>
                                <div className="w3-margin-top w3-text-indigo">
                                    <label><b>Fecha de nacimiento:</b></label>
                                    <Calendar value={fechaNacimiento} onChange={(e) => setfechanacimiento(e)} monthNavigator yearNavigator yearRange="1922:2018"
                                        dateFormat="dd/mm/yy" readOnlyInput locale="es"
                                        monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                                </div>
                            </div>
                            <div className="w3-col m6 w3-panel">
                                <p>
                                    <label className="w3-text-indigo"><b>Género:</b></label>
                                    <select className="w3-select w3-border w3-round-large" name="option"
                                        onChange={e => setgenero(e.target.value)}>
                                        <option defaultValue={''}></option>
                                        <option value={'masculino'}>Masculino</option>
                                        <option value={'femenino'}>Femenino</option>
                                        <option value={'otro'}>Otro</option>
                                    </select>
                                </p>
                                <p>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Email:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="email" required
                                        maxLength={50} value={correo} ref={inputEl}
                                        onChange={e => setCorreo(e.target.value)}
                                        onBlur={e => validarCorreo(e.target.value)} />
                                </p>
                                <p>
                                    <label><b>Id Familiar:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={20} value={idFamiliares}
                                        onChange={e => setFam(e.target.value)} />
                                </p>
                                <div className='w3-margin-top w3-margin-bottom'>
                                    <label style={{ marginRight: '15px' }}><b>Color:</b></label>
                                    <ColorPicker value={color} onChange={(e) => setcolor(e.value)} defaultColor={'CFD0D0'} />
                                </div>

                                <p>
                                    <label className="w3-text-indigo"><b>Categoría:</b></label>
                                    <select className="w3-select w3-border w3-round-large" name="option"
                                        onChange={e => setcategoria(e.target.value)}>
                                        <option defaultValue={''}></option>
                                        <option value={'4ta B'}>4ta B</option>
                                        <option value={'4ta'}>4ta</option>
                                        <option value={'3ra B'}>3ra B</option>
                                        <option value={'3ra'}>3ra</option>
                                        <option value={'2da'}>2da</option>
                                        <option value={'Intermedia'}>Intermedia</option>
                                        <option value={'Primera'}>Primera</option>
                                    </select>
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Brazo dominante:</b></label>
                                    <select className="w3-select w3-border w3-round-large" name="option"
                                        onChange={e => setbrazo(e.target.value)}>
                                        <option defaultValue={''}></option>
                                        <option value={'derecho'}>Derecho</option>
                                        <option value={'izquierdo'}>Izquierdo</option>
                                        <option value={'ambidiestro'}>Ambidiestro</option>
                                    </select>
                                </p>
                                <p>
                                    <label className="w3-text-indigo"><b>Torneos:</b></label>
                                    <input className="w3-input w3-border w3-round-large" type="text"
                                        maxLength={100} value={torneos}
                                        onChange={e => settorneos(e.target.value)} />
                                </p>
                                <div className='w3-margin-bottom'>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Contraseña:</b></label><br></br>
                                    <Password value={contra} onChange={(e) => setContra(e.target.value)} toggleMask feedback={false} />
                                </div>
                                <div>
                                    <span style={{ fontSize: '13px', color: 'red' }}>*</span>
                                    <label><b>Confirme contraseña:</b></label><br></br>
                                    <Password value={contra2} onChange={(e) => setContra2(e.target.value)} toggleMask feedback={false} />
                                </div>
                            </div>
                            <div className="w3-col m12">
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label><b>Seleccione el roll que dará al usuario:</b></label>
                                        <select className="w3-select w3-border w3-round-large"
                                            onChange={e => setTipo(e.target.value)}>
                                            <option defaultValue={"Socio"}>Socio</option>
                                            <option value={"Canchero"}>Canchero</option>
                                            <option value={"Profesor"}>Profesor</option>
                                            <option value={"Administrativo"}>Administrativo</option>
                                        </select>
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel">
                                    <p>
                                        <label><b>Activar o desactivar usuario:</b></label>
                                        <select className="w3-select w3-border w3-round-large"
                                            onChange={e => setAct(e.target.value)}>
                                            <option defaultValue={false}>Inactivo</option>
                                            <option value={true}>Activar</option>
                                            <option value={false}>Desactivar</option>
                                        </select>
                                    </p>
                                </div>
                            </div>
                            <div className="w3-col w3-center ">
                                <div style={{ margin: '10px auto', maxWidth: '300px' }}>
                                    <div className="w3-center w3-margin-top w3-indigo w3-border w3-round-large w3-hover-blue">
                                        {namefile ?
                                            <div style={{ cursor: "pointer" }} className='w3-light-blue w3-border w3-round-large'
                                                onClick={e => { document.getElementById('id01').style.display = 'block' }}>
                                                {namefile}<br></br>
                                            </div>
                                            : null}
                                        <label style={{ cursor: "pointer" }} >
                                            {namefile ? <b>Elegir otra imagen...</b>
                                                : <b>Agregar imagen...</b>}
                                            <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif" ref={resetBoton}
                                                onChange={subirImagen} />
                                            <span className="material-icons-round">
                                                image
                                            </span>
                                        </label>
                                    </div>
                                    {preimagen ?
                                        <div className='w3-right-align'>
                                            <span style={{ cursor: "pointer" }} className="material-icons-round"
                                                onClick={e => { document.getElementById('id01').style.display = 'block' }} >
                                                visibility
                                            </span>
                                            <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={limpiarBoton}>
                                                delete
                                            </span>
                                        </div> : null}
                                </div>
                                <div id="id01" className="w3-modal">
                                    <div className="w3-modal-content w3-animate-opacity w3-card-4">
                                        <header className="w3-container w3-indigo w3-center">
                                            <span onClick={e => document.getElementById('id01').style.display = 'none'}
                                                className="w3-button w3-display-topright">&times;</span>
                                            <h3>{namefile}</h3>
                                        </header>
                                        <div className="w3-container w3-center">
                                            <img src={preimagen} alt="previsualización" className="w3-circle" style={{ width: "100%", maxWidth: "400px" }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w3-panel w3-margin w3-center">
                                <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                    Registrar
                                </button>
                                <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={limpiarDatos}>
                                    <Link to="/users/admin">
                                        Cerrar
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}