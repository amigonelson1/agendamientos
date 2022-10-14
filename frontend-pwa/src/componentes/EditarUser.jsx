import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth'
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import perfil from '../imagenes/perfil.png';
import rutas from '../helpers/rutas';
import roles from "../helpers/roles";
import 'primeicons/primeicons.css';
import { ColorPicker } from 'primereact/colorpicker';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { addLocale } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Toast } from 'primereact/toast';

//componente para editar ususarios con privilegios de administrador

const espacio = {
    margin: '10px',
}

export function EditarUser({ docum, cambio }) {

    const resetBoton = useRef(null);
    const toast = useRef(null);
    const { user, upDateDates } = useAuth();
    const [mostrarEdit, setME] = useState(false);
    const [mostrardatos, setMD] = useState(false);
    const [iduser, setiduser] = useState('');
    const [nombre, setNombre] = useState('');
    const [postnombre, setPNombre] = useState('');
    const [codigo, setCod] = useState('');
    const [busqueda, setBusqueda] = useState('');
    const [documento, setDoc] = useState('');
    const [postdocumento, setPDoc] = useState('');
    const [celular, setCel] = useState('');
    const [telefono2, settelefono2] = useState('');
    const [direccion, setdireccion] = useState('');
    const [color, setcolor] = useState('');
    const [correo, setCorreo] = useState('');
    const [activo, setAct] = useState(false);
    const [tipo, setTipo] = useState('Socio');
    const [idFamiliares, setFam] = useState('');
    const [imagen, setimagen] = useState('');
    const [preimagen, setpreimagen] = useState('');
    const [namefile, setnamefile] = useState('');
    const [imagenmostrar, setimagenmostrar] = useState('');
    const [botonborrar, setbotonborrar] = useState(false);
    const [envio, setenvio] = useState(false);
    const [fechaNacimiento, setfechanacimiento] = useState(new Date());
    const [fechaNac, setfechanac] = useState('');
    const [estatura, setestatura] = useState(0);
    const [peso, setpeso] = useState(0);
    const [genero, setgenero] = useState('');
    const [barrio, setbarrio] = useState('');
    const [categoria, setcategoria] = useState('');
    const [torneos, settorneos] = useState('');
    const [brazoDominante, setbrazo] = useState('');
    const [edad, setedad] = useState('')


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

    useEffect(() => {
        setBusqueda(docum);
        if (docum) {
            const cargarDatos = async (e) => {
                setenvio(true);
                try {
                    const resp = await axios.get(rutas.server + 'api/users/documento/' + docum, {
                        headers: {
                            'x-access-token': user.token,
                            'Content-Type': 'application/json'
                        }
                    });
                    if ((resp.data.message).length === 1) {
                        setiduser(resp.data.message[0]._id);
                        setNombre(resp.data.message[0].nombre);
                        setPNombre(resp.data.message[0].nombre);
                        setCod(resp.data.message[0].codigo);
                        setDoc(resp.data.message[0].documento);
                        setPDoc(resp.data.message[0].documento);
                        setCel(resp.data.message[0].celular);
                        settelefono2(resp.data.message[0].telefono2);
                        setdireccion(resp.data.message[0].direccion);
                        setcolor(resp.data.message[0].color);
                        setAct(resp.data.message[0].activo);
                        setTipo(resp.data.message[0].rol[0].name);
                        setCorreo(resp.data.message[0].email);
                        setFam(resp.data.message[0].grupoFamiliar);
                        setimagen(resp.data.message[0].imagen);
                        setfechanacimiento(new Date(resp.data.message[0].fechaNacimiento))
                        setfechanac(resp.data.message[0].fechaNacimiento)
                        calcularEdad(resp.data.message[0].fechaNacimiento)
                        if (resp.data.message[0].estatura === '' || resp.data.message[0].estatura === null) { setestatura(0) }
                        if (!isNaN(resp.data.message[0].estatura)) { setestatura(resp.data.message[0].estatura) }
                        if (resp.data.message[0].peso === '' || resp.data.message[0].peso === null) { setpeso(0) }
                        if (!isNaN(resp.data.message[0].peso)) { setpeso(resp.data.message[0].peso) }
                        setgenero(resp.data.message[0].genero)
                        setbarrio(resp.data.message[0].barrio)
                        setcategoria(resp.data.message[0].categoria)
                        settorneos(resp.data.message[0].torneos)
                        setbrazo(resp.data.message[0].brazoDominante)
                        setMD(true);
                        setME(false);
                        setenvio(false);
                    }
                    else {
                        setenvio(false);
                        swal({
                            title: "Ninguna coincidencia",
                            text: "No se encontro documento, por favor verifique e intente de nuevo.",
                            icon: "error",
                            buttons: 'cerrar'
                        })
                        //limpiarDatos();
                    }
                } catch (e) {
                    setenvio(false);
                    swal('Upsss', 'Lo sentimos, no pudimos procesar tú solicitud, vuelve a intentarlo', 'info')
                    //console.log(e.request.response.message)
                }

            }
            cargarDatos();
        }
    }, [docum, cambio, user.token])


    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    useEffect(() => {
        if (!imagen || imagen === 'null') { setimagenmostrar(perfil); setbotonborrar(false) }
        else { setimagenmostrar(imagen); setbotonborrar(true) }
    }, [imagen])

    const limpiarDatos = () => {
        setiduser('')
        setNombre('');
        setPNombre('');
        setCod('');
        setDoc('');
        setPDoc('');
        setCel('');
        setCorreo('');
        settelefono2('');
        setdireccion('');
        setcolor('');
        setAct(false);
        setTipo('Socio');
        setFam('');
        setME(false);
        setMD(false);
        setBusqueda('');
        setfechanacimiento(new Date())
        setfechanac('')
        setestatura(0)
        setpeso(0)
        setgenero('')
        setbarrio('')
        setcategoria('')
        settorneos('')
        setbrazo('')
    }

    const mostrarDatos = async () => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/users/documento/' + busqueda, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            if ((resp.data.message).length === 1) {
                setiduser(resp.data.message[0]._id);
                setNombre(resp.data.message[0].nombre);
                setPNombre(resp.data.message[0].nombre);
                setCod(resp.data.message[0].codigo);
                setDoc(resp.data.message[0].documento);
                setPDoc(resp.data.message[0].documento);
                setCel(resp.data.message[0].celular);
                settelefono2(resp.data.message[0].telefono2);
                setdireccion(resp.data.message[0].direccion);
                setcolor(resp.data.message[0].color);
                setAct(resp.data.message[0].activo);
                setTipo(resp.data.message[0].rol[0].name);
                setCorreo(resp.data.message[0].email);
                setFam(resp.data.message[0].grupoFamiliar);
                setimagen(resp.data.message[0].imagen);
                setfechanacimiento(new Date(resp.data.message[0].fechaNacimiento))
                setfechanac(resp.data.message[0].fechaNacimiento)
                calcularEdad(resp.data.message[0].fechaNacimiento)
                if (resp.data.message[0].estatura === '' || resp.data.message[0].estatura === null) { setestatura(0) }
                if (!isNaN(resp.data.message[0].estatura)) { setestatura(resp.data.message[0].estatura) }
                if (resp.data.message[0].peso === '' || resp.data.message[0].peso === null) { setpeso(0) }
                if (!isNaN(resp.data.message[0].peso)) { setpeso(resp.data.message[0].peso) }
                setgenero(resp.data.message[0].genero)
                setbarrio(resp.data.message[0].barrio)
                setcategoria(resp.data.message[0].categoria)
                settorneos(resp.data.message[0].torneos)
                setbrazo(resp.data.message[0].brazoDominante)
                setMD(true);
                setME(false);
                setenvio(false);
            }
            else {
                setenvio(false);
                swal({
                    title: "Ninguna coincidencia",
                    text: "No se encontro documento, por favor verifique e intente de nuevo.",
                    icon: "error",
                    buttons: 'cerrar'
                })
                //limpiarDatos();
            }
        } catch (e) {
            setenvio(false);
            swal('Upsss', 'Lo sentimos, no pudimos procesar tú solicitud, vuelve a intentarlo', 'info')
            //console.log(e.request.response.message)
        }

    }

    const enviarDatos = async e => {
        let fecha = fechaNacimiento.value
        if (fechaNacimiento.value === undefined) {
            fecha = new Date(fechaNacimiento)
        }
        setenvio(true);
        try {
            await axios.put(rutas.server + 'api/users/documento/' + documento, {
                nombre: postnombre,
                codigo: codigo,
                documento: postdocumento,
                celular: celular,
                telefono2: telefono2,
                direccion: direccion,
                color: color,
                activo: activo,
                grupoFamiliar: idFamiliares,
                rol: tipo,
                email: correo,
                fechaNacimiento: fecha,
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
            setenvio(false);
            upDateDates()
            limpiarDatos();
            swal({
                title: "¡En hora buena!",
                text: "Usuario actualizado.",
                icon: "success",
                buttons: 'cerrar'
            }).then(respuesta => {
                if (respuesta) {

                }
            })
        }
        catch (e) {
            setenvio(false);
            if (JSON.parse(e.request.response).message) {
                let mensaje = JSON.parse(e.request.response).message
                if (user.role === roles.admin) {
                    swal('Lo sentimos', mensaje + ', por favor verifica e intenta de nuevo.', 'info');
                }
                else {
                    swal('Lo sentimos', 'Alguno de los datos que intentas ingresar ya se encuentra registrado, por favor verifica o contacta con el administrador', 'info');
                }
                return;
            }
            swal('Upsss', 'Lo sentimos, al parecer ocurrio un error durante la transacción, por favor vuelve a intertarlo', 'error')
        }
    }

    const deleteUser = async e => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/users/documento/' + documento, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false);
            upDateDates();
            swal("Usuario Eliminado", "Usuario eliminado", "success")
        }
        catch {
            setenvio(false);
            swal("Fallo en transacción", "Ocurrio un inconveniente durante el proceso, por favor intenta de nuevo", "success")
        }
    }


    const validarVacio = (e) => {
        e.preventDefault()
        if (documento) {
            swal({
                title: '¿Actualizar datos?',
                text: ('Estas a punto de modificar uno o más de tus datos, si estas seguro de tu operación da clic en "Continuar".'),
                icon: 'info', //success , warning, info, error
                buttons: ['Cancelar', 'Continuar'],
            }).then(respuesta => {
                if (respuesta) {
                    enviarDatos()
                }
            })
        }
        else {
            swal({
                title: 'Ingresar id usuario',
                text: 'Por favor ingrese el número de documento del usuario y de clic en "Editar Usuario".',
                icon: 'warning', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const validarId = (e) => {
        e.preventDefault()
        if (busqueda) { mostrarDatos(); setME(false) }
        else {
            swal({
                title: 'Ingresar id usuario',
                text: 'Por favor ingrese el número de documento del usuario y de clic en "Editar Usuario".',
                icon: 'warning', //success , warning, info, error
                buttons: 'Aceptar',
                timer: ''
            })
        }
    }

    const mensajeEdit = (e) => {
        e.preventDefault()
        swal("Uupss!", "Campor vacio, por favor ingrese número de documento a buscar o da en clic en alguno de los usuarios de la busqueda filtrada", "info");
    }

    const mostrarCampo = (e) => {
        e.preventDefault()
        setME(true);
        setMD(false)
    }

    const eliminarUser = (e) => {
        e.preventDefault();
        swal({
            title: '¿Eliminar Usuario?',
            text: ('Estas a punto de eliminar al usuario con documento: ' + documento + ' , si esta de acuerdo por favor de clic en: "Continuar".'),
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                deleteUser();
                limpiarDatos();
            }

        })
    }

    // Bloque para editar imagen ......
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

    const cambioImagen = async () => {
        setenvio(true)
        let file = new FormData()
        file.append('imagen', imagen)
        try {
            await axios.put(rutas.server + 'api/users/cambiarImagen/' + iduser, file,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            document.getElementById('id01').style.display = 'none';
            swal('Listo', 'Ha sido actualizada la foto de perfil', 'success')
            recargarImagen();
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
            limpiarBoton()
        }
    }

    const borrarImagen = async () => {
        setenvio(true);
        try {
            await axios.delete(rutas.server + 'api/users/cambiarImagen/' + iduser,
                {
                    headers: {
                        'x-access-token': user.token,
                        'content-Type': 'multipart/form-data'
                    }
                })
            setenvio(false);
            swal('Listo', 'Hemos eliminado la foto de perfil', 'success')
            recargarImagen();
        }
        catch (e) {
            if (e.request.response) {
                setenvio(false)
                swal(';)', 'No tienes imagen alguna para eliminar', 'info');
                return
            }
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'error')
        }
    }

    const deleteImage = () => {
        swal({
            title: '¿Eliminar imagen?',
            text: ('Estas a punto de eliminar tu foto de perfil, si estas de acuerdo da clic en "Continuar".'),
            icon: 'warning',
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                setimagen(null);
                setpreimagen(null);
                setnamefile('');
                borrarImagen();
            }
        })
    }

    const recargarImagen = async () => {
        setenvio(true);
        try {
            const resp = await axios.get(rutas.server + 'api/users/' + iduser, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setimagen(resp.data.message.imagen);
            setenvio(false);
        } catch {
            setenvio(false);
        }
    }

    const limpiarBoton = () => {
        resetBoton.current.value = ''
        setimagen(null);
        setpreimagen(null);
        setnamefile('');
        recargarImagen();
        document.getElementById('id01').style.display = 'none';

    }

    //bloque para Capitalizar nombre ingresado.......
    const nombreAMay = (n) => {
        if (n === '') { setPNombre(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        setPNombre(nombreCompleto.join(' '));
    }


    const monthNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} style={{ lineHeight: 1 }} />;
    }

    const yearNavigatorTemplate = (e) => {
        return <Dropdown value={e.value} options={e.options} onChange={(event) => e.onChange(event.originalEvent, event.value)} className="ml-2" style={{ lineHeight: 1 }} />;
    }


    function calcularEdad(fecha) {
        if (fecha === null || fecha === '' || fecha === undefined) { setedad(''); return }
        var hoy = new Date();
        var cumpleanos = new Date(fecha);
        var edad = hoy.getFullYear() - cumpleanos.getFullYear();
        var m = hoy.getMonth() - cumpleanos.getMonth();

        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        setedad(edad)
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
            <div id="id01" className="w3-modal">
                <div className="w3-modal-content w3-animate-opacity w3-card-4">
                    <header className="w3-container w3-indigo w3-center">
                        <span onClick={limpiarBoton}
                            className="w3-button w3-display-topright">&times;</span>
                        <h3>{namefile}</h3>
                    </header>
                    <div className="w3-panel w3-padding w3-center">
                        <img src={preimagen} alt="previsualización" className="w3-circle" style={{ width: "100%", maxWidth: "400px" }} />
                    </div>
                    <div className='w3-panel w3-padding w3-center'>
                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={cambioImagen}>
                            Actualizar imagen
                        </button>
                        <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                            onClick={limpiarBoton}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-border w3-round-large w3-gray w3-padding w3-right-align">
                        <div className="w3-col m7 w3-left-align">
                            <p>
                                <label className="w3-text-indigo"><b>Ingrese el documento del usuario a buscar:</b></label><br></br>
                                <input autoFocus className="w3-input w3-border w3-round-large" type="text" required maxLength={30} title='puedes buscar en "Mostrar todos los usuarios" y filtrar'
                                    onChange={e => setBusqueda(e.target.value)} value={busqueda} />
                            </p>
                        </div>
                        <div className="w3-col m5 w3-right-align">
                            <p>
                                {busqueda ?
                                    <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={validarId}>Buscar usuario</button>
                                    : <button style={espacio} className="w3-button w3-gray w3-border w3-border-black w3-round-large w3-hover-gray"
                                        onClick={mensajeEdit}>Buscar usuario</button>}
                                {mostrardatos ? <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={e => setMD(false)}>Cerrar</button>
                                    : null}
                                {mostrarEdit ? <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                    onClick={mostrarDatos}>Cancelar</button>
                                    : null}
                                {busqueda && !mostrardatos && !mostrarEdit ?
                                    <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={limpiarDatos}>Limpiar</button>
                                    : null}
                            </p>
                        </div>
                        {mostrardatos ?
                            <div className="w3-container w3-col w3-panel w3-white w3-left-align">
                                <div style={{ marginTop: '50px' }} className="w3-container w3-center">
                                    <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                </div>
                                <div className="w3-col m6 w3-panel w3-left-align w3-text-indigo">
                                    <p>
                                        <label>Número documento:</label>
                                        <b>{documento}</b>
                                    </p>
                                    <p>
                                        <label>Nombre Completo:</label>
                                        <b>{nombre}</b>
                                    </p>
                                    <p>
                                        <label>Código:</label>
                                        <b>{codigo}</b>
                                    </p>
                                    <p>
                                        <label>Roll del usuario:</label>
                                        <b>{tipo}</b>
                                    </p>
                                    <p>
                                        <label>Celular/Teléfono:</label>
                                        <b>{celular}</b>
                                    </p>
                                    <p>
                                        <label>Celular/Teléfono(2):</label>
                                        <b>{telefono2}</b>
                                    </p>
                                    <p>
                                        <label>Dirección:</label>
                                        <b>{direccion}</b>
                                    </p>
                                    <p>
                                        <label>Barrio:</label>
                                        <b className="w3-text-indigo">{barrio}</b>
                                    </p>
                                    <p>
                                        <label>Fecha de nacimiento(aaaa-mm-dd):</label>
                                        {fechaNac ?
                                            <b className="w3-text-indigo">
                                                {fechaNac.substring(0, 10)}
                                            </b>
                                            : null}
                                    </p>
                                    <p>
                                        <label>Edad:</label>
                                        <b className="w3-text-indigo">{edad}</b> años.
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel w3-left-align w3-text-indigo">
                                    <p>
                                        <label>Género:</label>
                                        <b className="w3-text-indigo">{genero}</b>
                                    </p>
                                    <p>
                                        <label>Estatura:</label>
                                        <b className="w3-text-indigo">{estatura}</b>cm(s)
                                    </p>
                                    <p>
                                        <label>Peso:</label>
                                        <b className="w3-text-indigo">{peso}</b>Kg(s)
                                    </p>
                                    <p>
                                        <label>Categoría:</label>
                                        <b className="w3-text-indigo">{categoria}</b>
                                    </p>
                                    <p>
                                        <label>Torneo(s):</label>
                                        <b className="w3-text-indigo">{torneos}</b>
                                    </p>
                                    <p>
                                        <label>Brazo dominante:</label>
                                        <b className="w3-text-indigo">{brazoDominante}</b>
                                    </p>
                                    <p>
                                        <label>Email:</label>
                                        <b>{correo}</b>
                                    </p>
                                    <p>
                                        <label>Id Familiar:</label>
                                        <b>{idFamiliares}</b>
                                    </p>
                                    <div>
                                        <label style={{ marginRight: '15px' }}>Color:</label>
                                        <ColorPicker value={color} disabled defaultColor={'CFD0D0'} />
                                    </div>
                                    <p>
                                        <label>Estado:</label>
                                        <b>{activo ? 'Activo' : 'Inactivo'}</b>
                                    </p>
                                </div>
                                <div className="w3-container w3-panel w3-white w3-center">
                                    <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red"
                                        onClick={mostrarCampo}>
                                        Editar
                                    </button>
                                    <button style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => setMD(false)}>cerrar</button>
                                </div>
                            </div>
                            : null}
                    </div>
                    {mostrarEdit ?
                        <div className="w3-margin-top w3-center">
                            <div>
                                <p>
                                    <label className="w3-text-indigo">Nombre Completo:</label>
                                    <b className="w3-text-indigo" style={{ marginLeft: '10px', fontSize: '20px' }}>{nombre}</b>
                                </p>
                                <p>
                                    <label className="w3-text-indigo">Número documento:</label>
                                    <b className="w3-text-indigo" style={{ marginLeft: '10px', fontSize: '20px' }}>{documento}</b>
                                </p>
                                <div className="w3-container w3-padding w3-center">
                                    <img src={imagenmostrar} alt="previsualización" className="w3-circle" style={{ height: "100%", minHeight: '200px', maxHeight: "200px" }} />
                                    <div className="w3-container w3-center">
                                        <label style={{ cursor: 'pointer' }}>
                                            <input type="file" className="input-file-input" accept=".jpg, .jpeg, .gif, .png, .jfif"
                                                onChange={subirImagen} ref={resetBoton} />
                                            <span className="material-icons-round">
                                                mode_edit
                                            </span>
                                        </label>
                                        {botonborrar ? <span style={{ cursor: 'pointer' }} className="material-icons-round" onClick={deleteImage}>
                                            delete
                                        </span> : null}
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={validarVacio}>
                                <div className="w3-col m6 w3-panel w3-left-align w3-text-indigo">
                                    <p>
                                        <label><b>Nombre:</b></label>
                                        <input autoFocus className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={postnombre}
                                            onChange={e => nombreAMay(e.target.value)} />
                                    </p>
                                    <p>
                                        <label><b>Documento:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text" required
                                            maxLength={50} value={postdocumento}
                                            onChange={e => setPDoc(e.target.value)} />
                                    </p>
                                    <p>
                                        <label><b>Código Club:</b></label>
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
                                        <label><b>Barrio:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="text"
                                            maxLength={100} value={barrio}
                                            onChange={e => setbarrio(e.target.value)} />
                                    </p>
                                    <div className="w3-text-indigo">
                                        <label><b>Fecha de nacimiento:</b><br></br></label>
                                        <Calendar value={fechaNacimiento} onChange={(e) => setfechanacimiento(e)} monthNavigator yearNavigator yearRange="1922:2018"
                                            dateFormat="dd/mm/yy" readOnlyInput locale="es"
                                            monthNavigatorTemplate={monthNavigatorTemplate} yearNavigatorTemplate={yearNavigatorTemplate} />
                                    </div>
                                    <p>
                                        <label><b>Género:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setgenero(e.target.value)}>
                                            <option defaultValue={genero}>{genero}</option>
                                            <option value={'masculino'}>Masculino</option>
                                            <option value={'femenino'}>Femenino</option>
                                            <option value={'otro'}>Otro</option>
                                        </select>
                                    </p>
                                </div>
                                <div className="w3-col m6 w3-panel w3-left-align w3-text-indigo">
                                    <div className='w3-margin-top'>
                                        <label className="w3-text-indigo"><b>Estatura(cm):</b></label>
                                        <input style={{ maxWidth: '200px' }} type="text" maxLength="4" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                            placeholder="Estatura" title="Estatura"
                                            onChange={e => validarNum(e.target.value, 1)} value={estatura} />
                                    </div>
                                    <div className='w3-margin-top'>
                                        <label className="w3-text-indigo"><b>Peso(Kg):</b></label>
                                        <input style={{ maxWidth: '200px' }} type="text" maxLength="4" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                            placeholder="Peso" title="Peso"
                                            onChange={e => validarNum(e.target.value, 2)} value={peso} />
                                    </div>
                                    <p>
                                        <label className="w3-text-indigo"><b>Categoría:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setcategoria(e.target.value)}>
                                            <option defaultValue={categoria}>{categoria}</option>
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
                                            <option defaultValue={brazoDominante}>{brazoDominante}</option>
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
                                    <p>
                                        <label><b>Email:</b></label>
                                        <input className="w3-input w3-border w3-round-large" type="email" required
                                            maxLength={50} value={correo}
                                            onChange={e => setCorreo(e.target.value)} />
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
                                        <label><b>Seleccione roll para este usuario:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setTipo(e.target.value)}>
                                            <option defaultValue={tipo}>{tipo}</option>
                                            <option value={"Administrador"}>Administrativo</option>
                                            <option value={"Profesor"}>Profesor</option>
                                            <option value={"Canchero"}>Canchero</option>
                                            <option value={"Socio"}>Socio</option>
                                        </select>
                                    </p>
                                    <p>
                                        <label><b>Activar o desactivar usuario:</b></label>
                                        <select className="w3-select w3-border w3-round-large" name="option"
                                            onChange={e => setAct(e.target.value)}>
                                            <option defaultValue={activo}>{activo ? 'Activo' : 'Inactivo'}</option>
                                            <option value={true}>Activar</option>
                                            <option value={false}>Desactivar</option>
                                        </select>
                                    </p>
                                </div>
                                <div className="w3-col w3-center">
                                    <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue">
                                        Actualizar Usuario
                                    </button>
                                    <button style={espacio} className="w3-button w3-metro-red w3-border w3-border-black w3-round-large w3-hover-red"
                                        onClick={eliminarUser}>
                                        Eliminar Usuario
                                    </button>
                                </div>
                                <div className="w3-col w3-center w3-panel">
                                    <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={mostrarDatos}>
                                        Cancelar
                                    </button>
                                </div>
                            </form>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}