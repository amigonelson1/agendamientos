import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import es from 'date-fns/locale/es';
import rutas from '../helpers/rutas';
import { InputSwitch } from 'primereact/inputswitch';
import { Calendar } from 'primereact/calendar';
import { Toast } from 'primereact/toast';
registerLocale("es", es)

const espacio = {
    margin: '10px',
}

const Tamano = {
    width: '150px',
    height: '155px',
    overFlow: 'auto',
    position: 'absolute',
    backgroundColor: 'white',
    border: '1px solid blue',
    boxShadow: '5px 2px 15px black',
    zIndex: 5
}

var franjas = []
var tiempoInicio, inihFran, inimFran, finhFran, finmFran, indice = 0
var jorI = 'am'
var jorF = 'pm'
var ceroHI, ceroHF, ceroI, ceroF = ''
var fecha = '' // variable para ajustar la fecha al dia que se seleccione
var fechaInicio = '' //variable para generar la fecha de ajuste a los dias lunes.
var fechalunes, fechamartes, fechamiercoles, fechajueves, fechaviernes, fechasabado, fechadomingo = ''
var dia, mes, anio = ''


export function ConfHorario() {

    const { user, upDateDates, updatedates, datosempresa } = useAuth();
    const toast = useRef(null);
    const [horarios, sethorarios] = useState([]);
    const [horaIni, sethoraIni] = useState(6);
    const [minIni, setminIni] = useState(0);
    const [horaFran, sethoraFran] = useState(0);
    const [minFran, setminFran] = useState(0);
    const [horaDes, sethoraDes] = useState(0);
    const [minDes, setminDes] = useState(0);
    const [horaFn, sethoraFn] = useState(6);
    const [minFn, setminFn] = useState(0);
    const [lunes, setlunes] = useState(false);
    const [martes, setmartes] = useState(false);
    const [miercoles, setmiercoles] = useState(false);
    const [jueves, setjueves] = useState(false);
    const [viernes, setviernes] = useState(false);
    const [sabado, setsabado] = useState(false);
    const [domingo, setdomingo] = useState(false);
    const [todos, settodos] = useState(false);
    const [mostraIni, setmostrarIni] = useState(false);
    const [mostraInim, setmostrarInim] = useState(false);
    const [mostraFran, setmostrarFran] = useState(false);
    const [mostraFranm, setmostrarFranm] = useState(false);
    const [mostraDes, setmostrarDes] = useState(false);
    const [mostraDesm, setmostrarDesm] = useState(false);
    const [mostraFn, setmostrarFn] = useState(false);
    const [mostraFnm, setmostrarFnm] = useState(false);
    const [titulo, settitulo] = useState('');
    const [franja, setfranja] = useState([]);
    const [fechaIni, setfecha] = useState(new Date()); // variable para seleccionar la fecha segun lo desee el usuario
    const [fechaInicial, setfechainicial] = useState();
    const [envio, setenvio] = useState(false);
    const [habilitar, sethabilitar] = useState(false);
    const [regenerar, setregenerar] = useState(true);
    const [cambiartitulo, setcambiartitulo] = useState('');
    const [idtitulo, setidtitulo] = useState(0);
    const [horaam, sethoraam] = useState(new Date(datosempresa.horaAm))
    const [horapm, sethorapm] = useState(new Date(datosempresa.horaPm))
    const [lapsoh, setlapsoh] = useState(0)
    const [lapsom, setlapsom] = useState(0)
    const [tiempo, settiempo] = useState(0)
    const [diaRenovar, setdiarenovar] = useState(parseInt(datosempresa.diaRenovar))
    const [horaRenovar, sethorarenovar] = useState(new Date(datosempresa.horaRenovar))
    const [mostrarAct, setmostraract] = useState(false)
    const [aperturaAm, setaperturaam] = useState(new Date(datosempresa.aperturaAm))
    const [cierreAm, setcierream] = useState(new Date(datosempresa.cierreAm))
    const [aperturaPm, setaperturapm] = useState(new Date(datosempresa.aperturaPm))
    const [cierrePm, setcierrepm] = useState(new Date(datosempresa.cierrePm))

    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    //limpiar cajas
    const limpiarDatos = () => {
        sethoraIni(6)
        setminIni(0)
        sethoraFran(0)
        setminFran(0)
        sethoraDes(0)
        setminDes(0)
        sethoraFn(6)
        setminFn(0)
    }

    const limpiarTodo = () => {
        sethoraIni(6)
        setminIni(0)
        sethoraFran(0)
        setminFran(0)
        sethoraDes(0)
        setminDes(0)
        sethoraFn(6)
        setminFn(0)
        setlunes(false)
        setmartes(false)
        setmiercoles(false)
        setjueves(false)
        setviernes(false)
        setsabado(false)
        setdomingo(false)
        settitulo('')
        setfecha(new Date())
        setfranja([])
        sethabilitar(false)
        setregenerar(true)
        setcambiartitulo('')
        setidtitulo(0)
        franjas = []
        indice = 0
        fechaInicio = ''
        fecha = ''
    }

    useEffect(() => {
        if (todos) {
            setlunes(true)
            setmartes(true)
            setmiercoles(true)
            setjueves(true)
            setviernes(true)
            setsabado(true)
            setdomingo(true)
        }
    }, [todos])


    useEffect(() => {
        if (!lunes || !martes || !miercoles || !jueves || !viernes || !sabado || !domingo) {
            settodos(false)
        }
        if (lunes && martes && miercoles && jueves && viernes && sabado && domingo) {
            settodos(true)
        }
    }, [lunes, martes, miercoles, jueves, viernes, sabado, domingo])


    // bloque para validar todos los datos ingresados y generar tabla de horario
    const validarDatos = (e) => {
        e.preventDefault();
        if (fechaIni < new Date().setDate(new Date().getDate() - 1)) {
            swal({
                title: 'Fecha invalida',
                text: 'Por favor indique fecha actual o futura para definir la fecha de inicio, no se permiten fechas anteriores a la actual. ',
                icon: 'info', //success , warning, info, error
                buttons: 'Aceptar',
            })
            setfecha(new Date());
            return;
        }
        dia = fechaIni.getDate();
        mes = fechaIni.getMonth() + 1;
        anio = fechaIni.getFullYear();
        fecha = anio + ',' + mes + ',' + dia  //variable que definira la fecha a su valor establecido
        if (fechaIni.getDay() === 0) { fechaIni.setDate(fechaIni.getDate() - 6) }
        if (fechaIni.getDay() === 2) { fechaIni.setDate(fechaIni.getDate() - 1) }
        if (fechaIni.getDay() === 3) { fechaIni.setDate(fechaIni.getDate() - 2) }
        if (fechaIni.getDay() === 4) { fechaIni.setDate(fechaIni.getDate() - 3) }
        if (fechaIni.getDay() === 5) { fechaIni.setDate(fechaIni.getDate() - 4) }
        if (fechaIni.getDay() === 6) { fechaIni.setDate(fechaIni.getDate() - 5) }
        dia = fechaIni.getDate();
        mes = fechaIni.getMonth() + 1;
        anio = fechaIni.getFullYear();
        fechaInicio = anio + ',' + mes + ',' + dia  // variable para exporta la fecha como lunes de inicio
        setfechainicial(fechaInicio)
        fechalunes = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechamartes = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechamiercoles = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechajueves = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechaviernes = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechasabado = fechaIni.toLocaleDateString('en-US')
        fechaIni.setDate(fechaIni.getDate() + 1)
        fechadomingo = fechaIni.toLocaleDateString('en-US')
        setfecha(new Date(fecha))
        tiempoInicio = 0;
        inihFran = 0
        inimFran = 0
        finhFran = 0
        finmFran = 0
        jorI = 'am'
        jorF = 'pm'
        ceroI = ''
        ceroF = ''
        if (titulo === '') { swal("Título sin definir", "Por favor defina título para este horario", "info"); return }
        if (!lunes && !martes && !miercoles && !jueves && !viernes && !sabado && !domingo) { swal("Días sin definir", "Por favor defina los días a laborar", "info"); return; }
        let tiempototal, cantidadFranjas, cantFranSinDes = 0
        tiempototal = (horaFn * 60 + minFn) - (horaIni * 60 + minIni)
        if (tiempototal === 0) { swal("Horario sin definir", "Por favor defina horas de inicio y fin diferentes y franjas adecuadas para generar el horario", "info"); return }
        if (tiempototal < 0) { tiempototal = 24 * 60 + tiempototal }
        cantidadFranjas = tiempototal / (60 * horaFran + minFran + 60 * horaDes + minDes)
        cantFranSinDes = (tiempototal + 60 * horaDes + minDes) / (60 * horaFran + minFran + 60 * horaDes + minDes)
        let aumento = 0
        if (Number.isInteger(cantidadFranjas) || Number.isInteger(cantFranSinDes)) {
            if (Number.isInteger(cantidadFranjas)) {
                tiempoInicio = horaIni * 60 + minIni;
                for (var i = indice; i < cantidadFranjas + indice; i++) { PonerHorario(i) }
                aumento = indice + cantidadFranjas
            }

            if (Number.isInteger(cantFranSinDes)) {
                tiempoInicio = horaIni * 60 + minIni;
                for (i = indice; i < cantFranSinDes + indice; i++) { PonerHorario(i) }
                aumento = indice + cantFranSinDes
            }
        } else {
            swal({
                title: 'Horario sin ajustar',
                text: 'Por favor verifique los datos ingresados, al momento de revisar el horario y las franjas de turno no se encuentra un ajuste adecuado',
                icon: 'error', //success , warning, info, error
                buttons: 'Aceptar',
            })
            return;
        }
        indice = aumento;
        setfranja(franjas);
        sethoraIni(horaFn);
        setminIni(minFn);
        swal("En buena hora", "Se agregó con éxito al horario, recuerde al tener definido el horario dar en 'Crear horario' para completar esta operación", "success")
    }

    const PonerHorario = (e) => {
        let dia = []
        if (tiempoInicio >= 1440) { tiempoInicio = tiempoInicio - 1440 }
        inihFran = Math.trunc(tiempoInicio / 60)
        inimFran = (tiempoInicio % 60)
        tiempoInicio = tiempoInicio + (horaFran * 60 + minFran)
        if (tiempoInicio >= 1440) { tiempoInicio = tiempoInicio - 1440 }
        finhFran = Math.trunc(tiempoInicio / 60)
        finmFran = (tiempoInicio % 60)
        if (inihFran < 12) { jorI = 'am' }
        if (inihFran > 11) { jorI = 'pm' }
        if (inihFran === 0) { inihFran = 12 }
        if (inihFran > 12) { inihFran = inihFran - 12 }
        if (finhFran < 12) { jorF = 'am' }
        if (finhFran > 11) { jorF = 'pm' }
        if (finhFran === 0) { finhFran = 12 }
        if (finhFran > 12) { finhFran = finhFran - 12 }
        if (inimFran < 10) { ceroI = '0' }
        if (finmFran < 10) { ceroF = '0' }
        if (inimFran > 9) { ceroI = '' }
        if (finmFran > 9) { ceroF = '' }
        if (inihFran < 10) { ceroHI = '0' }
        if (finhFran < 10) { ceroHF = '0' }
        if (inihFran > 9) { ceroHI = '' }
        if (finhFran > 9) { ceroHF = '' }
        let turno = ceroHI + inihFran + ':' + ceroI + inimFran + jorI + ' - ' + ceroHF + finhFran + ':' + ceroF + finmFran + jorF
        franjas[e] = { indice: e, franja: turno, granDemanda: false }

        if (lunes) dia.push({ dia: 'lunes', fecha: fechalunes, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (martes) dia.push({ dia: 'martes', fecha: fechamartes, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (miercoles) dia.push({ dia: 'miercoles', fecha: fechamiercoles, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (jueves) dia.push({ dia: 'jueves', fecha: fechajueves, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (viernes) dia.push({ dia: 'viernes', fecha: fechaviernes, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (sabado) dia.push({ dia: 'sabado', fecha: fechasabado, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        if (domingo) dia.push({ dia: 'domingo', fecha: fechadomingo, turno: turno, autor1: null, codigoAutor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null, idProfesor: null, idCanchero: null, colorProfesor: null })
        else dia.push(null)
        franjas[e].dia = dia
        /*franjas[e] = {
            indice: e, turno: turno, titulo: titulo, fechaInicio: fechaInicio,
            lunes: { fecha: fechalunes, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            martes: { fecha: fechamartes, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            miercoles: { fecha: fechamiercoles, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            jueves: { fecha: fechajueves, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            viernes: { fecha: fechaviernes, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            sabado: { fecha: fechasabado, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null },
            domingo: { fecha: fechadomingo, turno: turno, autor1: null, autor2: null, autor3: null, autor4: null, horaSolicitud: null, solicita: null, asistio: false, profesor: null, canchero: null }
        }*/
        tiempoInicio = tiempoInicio + (horaDes * 60 + minDes)
    }

    const validarFecha = (e) => {
        setfecha(e);
        if (fechaIni < new Date().setDate(new Date().getDate() - 1)) {
            swal({
                title: 'Fecha invalida',
                text: 'Por favor indique fecha actual o futura para definir la fecha de inicio, no se permiten fechas anteriores a la actual. ',
                icon: 'info', //success , warning, info, error
                buttons: 'Aceptar',
            })
            setfecha(new Date());
            return;
        }
    }

    // funcion para enviar los datos del horario creado
    const crearHorario = async () => {
        if (franja.length === 0) { swal('Sin horario', 'Aún no defines un horario', 'info'); return }
        setenvio(true)
        try {
            await axios.post(rutas.server + 'api/horario', {
                horario: franja,
                activo: true,
                mostrarTodo: habilitar,
                fechaInicio: fechaInicial,
                regenerar: regenerar,
                lugar: titulo
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            })
            setenvio(false);
            limpiarTodo();
            upDateDates();
            swal('Genial', 'Se ha creado y guardado tu nuevo horario', 'success');
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
        }
    }

    const tituloAMay = (n) => {
        if (n === '') { settitulo(''); return }
        let nombreCompleto = n.split(' ');
        for (var i = 0; i < nombreCompleto.length; i++) {
            if (nombreCompleto[i][0] !== undefined) {
                nombreCompleto[i] = nombreCompleto[i][0].toUpperCase() + nombreCompleto[i].slice(1);
            }
        }
        settitulo(nombreCompleto.join(' '));
    }


    useEffect(() => {
        const traerHorario = async () => {
            try {
                const respu = await axios.get(rutas.server + 'api/horario')
                sethorarios(respu.data.filter(user => user.activo === true))
            } catch (e) {
                //swal('Upsss!!!', 'Al parecer tuvimos un inconveniente al actualizar tus datos, por favor intenta de nuevo.', 'info')
            }
        }
        traerHorario();
        if (datosempresa.horaAm !== '') { sethoraam(new Date(datosempresa.horaAm)) }
        else { sethoraam('') }
        if (datosempresa.horaPm !== '') { sethorapm(new Date(datosempresa.horaPm)) }
        else { sethorapm('') }

        setdiarenovar(parseInt(datosempresa.diaRenovar))
        sethorarenovar(new Date(datosempresa.horaRenovar))
        setmostraract(false)

        window.scroll(0, 0)
    }, [updatedates, datosempresa.horaAm, datosempresa.horaPm, datosempresa.diaRenovar, datosempresa.horaRenovar])


    const preeliminarHorario = (id) => {
        swal({
            title: 'Eliminar horario',
            text: 'Estas a punto de eliminar este horario, clic en "Continuar" si realmente quieres borrarlo',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                eliminarHorario(id);
            }
        })
    }

    const eliminarHorario = async (id) => {
        setenvio(true)
        try {
            await axios.delete(rutas.server + 'api/horario/' + id,
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
            swal('¡Listo!', 'Hemos eliminado el horario seleccionado', 'success');
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    const precambiarTitulos = (id, tit) => {
        document.getElementById('id04').style.display = 'block'
        setcambiartitulo(tit)
        settitulo(tit)
        setidtitulo(id)
    }

    const cambiarTitulos = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/titulo/' + idtitulo, {
                lugar: titulo
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            settitulo('')
            setcambiartitulo('')
            setidtitulo(0)
            upDateDates();
            document.getElementById('id04').style.display = 'none';
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }

    }


    //funcion para seleccionar el orden de como se pediran las citas
    const ordenSolicitud = async () => {
        if (!datosempresa.aleatorio) {
            if (tiempo === 0) {
                swal('Lapso de tiempo sin definir', 'Por favor digita la cantidad de tiempo que deseas tener en cuenta al momento de hacer por sorteo la solicitud de turno.', 'info');
                return
            }
        }
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/horario/aleatorio/' + datosempresa._id, {
                aleatorio: !datosempresa.aleatorio,
                tiempo: tiempo
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    //funcion para habilitar o deshabilitar la cancelacion de turnos
    const ordenCancelar = async () => {
        let horaaam = horaam;
        let horaapm = horapm;
        if (!datosempresa.cancelar) {
            if (horaam === '' || horapm === '' || horaam === undefined || horapm === undefined) {
                swal('Selecciona las horas', 'Debes elegír las horas límites para cada jornada', 'info')
                return;
            }
        }
        else {
            horaaam = '';
            horaapm = '';
        }
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/horario/cancelar/' + datosempresa._id, {
                cancelar: !datosempresa.cancelar,
                horaAm: horaaam,
                horaPm: horaapm
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }



    function MostrarHorarios() {
        if (horarios.length > 0) {
            const hors = horarios.map((url, index) =>
                <div key={index} style={{ marginBottom: '25px' }} className='w3-col m6 w3-container w3-padding w3-card w3-round-large'>
                    {horarios[index].lugar}
                    <br></br>
                    <div style={{ marginTop: '15px' }} className='w3-right-align'>
                        <label>Horario clases
                            <InputSwitch checked={horarios[index].mostrarTodo} onChange={e => MostrarHorario(horarios[index]._id, horarios[index].mostrarTodo)} />
                        </label><br></br>
                        <label style={{ marginLeft: '25px' }}>AutoRenovar
                            <InputSwitch checked={horarios[index].regenerar} onChange={e => MostrarRenovar(horarios[index]._id, horarios[index].regenerar)} />
                        </label>
                    </div>
                    <div style={{ marginTop: '15px' }} className='w3-right-align'>
                        <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-small"
                            onClick={e => { precambiarTitulos(horarios[index]._id, horarios[index].lugar) }}>
                            Cambiar título
                        </button>
                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red w3-small"
                            onClick={e => { preeliminarHorario(horarios[index]._id) }}>
                            Eliminar
                        </button>
                    </div>
                </div>
            );
            return (
                <div className='w3-panel w3-responsive' style={{ margin: '10px auto', maxWidth: '750px', maxHeight: '530px' }}>
                    <b>{hors}</b>
                </div>
            );
        }
        else { return null }
    }


    const MostrarHorario = async (id, mostrarTodo) => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/mostrarTodo/' + id, {
                mostrarTodo: !mostrarTodo
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    const MostrarRenovar = async (id, activo) => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/regenerar/' + id, {
                regenerar: !activo
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    const validarHora = (e) => {
        if (e === '') {
            setlapsoh(0)
            return
        }
        let total = 0
        if (!isNaN(e)) {
            setlapsoh(e)
            total = parseInt(e * 60) + parseInt(lapsom)
            settiempo(total)

        }
        else {
            //alert('Por favor dígite unicamente números')
            toast.current.show({ severity: 'warn', summary: 'Sólo números', detail: 'Por favor ingrese sólo valores numéricos', life: 3000 });
            return;
        }
    }


    const validarMin = (e) => {
        if (e === '') {
            setlapsom(0)
            return
        }
        let total = 0
        if (!isNaN(e)) {
            setlapsom(e)
            total = parseInt(lapsoh * 60) + parseInt(e)
            settiempo(total)

        }
        else {
            toast.current.show({ severity: 'warn', summary: 'Sólo números', detail: 'Por favor ingrese sólo valores numéricos', life: 3000 });
            return;
        }
    }


    const ActualizarRenovar = async () => {
        if (diaRenovar === '') {
            toast.current.show({ severity: 'warn', summary: 'Selecciona un día', detail: 'Por favor selecciona una día', life: 3000 });
            return
        }
        if (horaRenovar === '') {
            toast.current.show({ severity: 'warn', summary: 'Selecciona una hora', detail: 'Por favor selecciona una hora', life: 3000 });
            return
        }
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/horario/renovar/' + datosempresa._id, {
                dia: diaRenovar,
                hora: horaRenovar
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
            setmostraract(false)
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }


    //funcion para habilitar o deshabilitar apertura de turnos
    const aperturaTurnos = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/empresa/configuracion/aperturas/' + datosempresa._id, {
                apertura: !datosempresa.apertura,
                aperturaAm: aperturaAm,
                cierreAm: cierreAm,
                aperturaPm: aperturaPm,
                cierrePm: cierrePm
            },
                {
                    headers: {
                        'x-access-token': user.token,
                        'Content-Type': 'application/json'
                    }
                })
            setenvio(false);
            upDateDates();
        } catch (e) {
            setenvio(false)
            swal('Upsss!!!', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo.', 'info')
        }
    }

    const mostrarToast = () => {
        toast.current.show({ severity: 'warn', summary: 'Deshabilita primero', detail: 'Debes deshabilitar primero para hacer cambios y volver habilitar para que sean efectivos los cambios', life: 3000 });
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
            <div id="id04" className="w3-modal">
                <div style={{ maxWidth: '650px' }} className="w3-modal-content w3-animate-opacity w3-card-4 w3-center">
                    <header className="w3-container w3-indigo w3-center">
                        <span className="w3-button w3-display-topright"
                            onClick={e => { settitulo(''); document.getElementById('id04').style.display = 'none' }}        >
                            &times;
                        </span>
                        <h3>{cambiartitulo}</h3>
                    </header>
                    <div className="w3-container w3-panel w3-center">
                        <label className="w3-text-indigo">Cambio de título para horario: <b>{cambiartitulo}</b></label>
                        <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                            placeholder="título" title="escriba aquí el nuevo título de este horario"
                            onChange={e => tituloAMay(e.target.value)} value={titulo} />
                        <div className='w3-padding'>
                            <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                onClick={cambiarTitulos}>
                                Cambiar
                            </button>
                            <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={e => { settitulo(''); document.getElementById('id04').style.display = 'none' }}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='componentes w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                        <h2><b>Ajuste de horario</b></h2>
                    </div>
                    {horarios.length > 0 ?
                        <div className='w3-panel w3-white w3-border w3-round-large w3-text-indigo'>
                            <div style={{ marginBottom: '40px' }} className='w3-center'>
                                <b style={{ fontSize: '20px' }}>Horarios presentes.</b>
                            </div>
                            <MostrarHorarios />
                        </div>
                        : null}

                    <div style={{ marginBottom: '30px' }} className="w3-panel w3-text-indigo w3-center w3-border w3-round-large">
                        <b style={{ fontSize: '20px' }}>Horas para apertura y cierre de solicitud de turnos</b><br></br>
                        Ingrese el horario para definir la apertura y cierre de solicitud de turnos.<br></br><br></br>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginLeft: '25px' }} title="seleccione si la solicitud de turno será por orden de llegada o de manera aleatoria">
                                <b>Habilitar: </b>
                                <InputSwitch checked={datosempresa.apertura} onChange={e => aperturaTurnos()} />
                            </label>
                        </div>
                        {!datosempresa.apertura ?
                            <div>
                                <div className='w3-col m6 w3-left-align'>
                                    <label>Hora apertura am:
                                        <Calendar value={aperturaAm} onChange={(e) => setaperturaam(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                    <label>Hora cierre am:
                                        <Calendar value={cierreAm} onChange={(e) => setcierream(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                </div>
                                <div className='w3-col m6 w3-left-align'>
                                    <label>Hora apertura pm:
                                        <Calendar value={aperturaPm} onChange={(e) => setaperturapm(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                    <label>Hora cierre pm:
                                        <Calendar value={cierrePm} onChange={(e) => setcierrepm(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                </div>
                            </div>
                            : <div style={{ marginBottom: '20px' }}>
                                <div className='w3-col m6 w3-left-align'>
                                    <label onClick={(e) => mostrarToast()}>Hora apertura am:
                                        <Calendar disabled value={aperturaAm} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                    <label onClick={(e) => mostrarToast()}>Hora cierre am:
                                        <Calendar disabled value={cierreAm} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                </div>
                                <div className='w3-col m6 w3-left-align'>
                                    <label onClick={(e) => mostrarToast()}>Hora apertura pm:
                                        <Calendar disabled value={aperturaPm} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                    <label onClick={(e) => mostrarToast()}>Hora cierre pm:
                                        <Calendar disabled value={cierrePm} timeOnly hourFormat="12" readOnlyInput />
                                    </label><br></br><br></br>
                                </div>
                            </div>}
                    </div>
                    <div style={{ marginBottom: '30px' }} className="w3-panel w3-text-indigo w3-center w3-border w3-round-large">
                        <b style={{ fontSize: '20px' }}>Selección de tipo de solicitud de turno</b><br></br>
                        Seleccione si la solicitud de turno será por sorteo o por orden de llegada.<br></br><br></br>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginLeft: '25px' }} title="seleccione si la solicitud de turno será por orden de llegada o de manera aleatoria">
                                <b>Por sorteo: </b>
                                <InputSwitch checked={datosempresa.aleatorio} onChange={e => ordenSolicitud()} />
                            </label>
                        </div>
                        {!datosempresa.aleatorio ?
                            <div style={{ marginBottom: '20px' }}>
                                <div className='w3-col m6 w3-left-align'>
                                    <label className="w3-text-indigo">Digite la cantidad de horas:</label>
                                    <input style={{ maxWidth: '200px' }} type="text" maxLength="2" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Hora(s)" title="tiempo en horas"
                                        onChange={e => validarHora(e.target.value)} value={lapsoh} />
                                </div>
                                <div className='w3-col m6 w3-left-align'>
                                    <label className="w3-text-indigo">Digite la cantidad de minutos:</label>
                                    <input style={{ maxWidth: '200px' }} type="text" maxLength="3" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                        placeholder="Minutos(s)" title="tiempo en minutos"
                                        onChange={e => validarMin(e.target.value)} value={lapsom} />
                                </div>
                            </div>
                            : <div style={{ marginBottom: '20px' }}>
                                <div className='w3-col m6 w3-left-align'>
                                    <label onClick={(e) => mostrarToast()} className="w3-text-indigo">Digite la cantidad de horas:
                                        <input disabled style={{ maxWidth: '200px' }} type="text" maxLength="2" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                            placeholder="Hora(s)" title="tiempo en horas" value={lapsoh} />
                                    </label>
                                </div>
                                <div className='w3-col m6 w3-left-align'>
                                    <label onClick={(e) => mostrarToast()} className="w3-text-indigo">Digite la cantidad de minutos:
                                        <input disabled style={{ maxWidth: '200px' }} type="text" maxLength="3" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                            placeholder="Minutos(s)" title="tiempo en minutos" value={lapsom} />
                                    </label>
                                </div>
                            </div>}
                        <div>{'\u00A0'}</div>
                    </div>
                    <div style={{ marginBottom: '30px' }} className="w3-panel w3-text-indigo w3-center w3-border w3-round-large">
                        <b style={{ fontSize: '20px' }}>Opción de cancelar turno</b><br></br>
                        Habilite o deshabilite si sus usuarios pueden cancelar los turnos o agendas ya registrados.<br></br><br></br>
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ marginLeft: '25px' }} title="seleccione si la solicitud de turno será por orden de llegada o de manera aleatoria">
                                <b>Cancelar turnos: </b>
                                <InputSwitch checked={datosempresa.cancelar} onChange={e => ordenCancelar()} />
                            </label>
                        </div>
                        {datosempresa.cancelar ?
                            <div style={{ marginBottom: '20px' }}>
                                <div className='w3-col m6'>
                                    <label onClick={(e) => mostrarToast()}>Hora límite en la mañana:
                                        <Calendar disabled value={horaam} timeOnly hourFormat="12" readOnlyInput />
                                    </label>
                                </div>
                                <div className='w3-col m6'>
                                    <label onClick={(e) => mostrarToast()}>Hora límite en la tarde:
                                        <Calendar disabled value={horapm} timeOnly hourFormat="12" readOnlyInput />
                                    </label>
                                </div>
                            </div>
                            : <div style={{ marginBottom: '20px' }}>
                                <div className='w3-col m6'>
                                    <label>Hora límite en la mañana:
                                        <Calendar value={horaam} onChange={(e) => sethoraam(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label>
                                </div>
                                <div className='w3-col m6'>
                                    <label>Hora límite en la tarde:
                                        <Calendar value={horapm} onChange={(e) => sethorapm(e.value)} timeOnly hourFormat="12" readOnlyInput />
                                    </label>
                                </div>
                            </div>}
                        <div>{'\u00A0'}</div>
                    </div>
                    <div style={{ marginBottom: '30px' }} className="w3-panel w3-text-indigo w3-center w3-border w3-round-large">
                        <b style={{ fontSize: '20px' }}>Día para renovar horario</b><br></br>
                        Defina la fecha para cuando desee que se renueven los horarios.<br></br><br></br>
                        <div style={{ marginBottom: '20px' }} >
                            <div className='w3-col m6 w3-center'>
                                <label className="w3-text-indigo">Defina día:</label>
                                <select style={{ maxWidth: '200px', height: '47px' }} className="w3-select w3-border w3-round-large"
                                    onChange={e => { setdiarenovar(e.target.value); setmostraract(true) }}>
                                    {diaRenovar === 0 ? <option value={0}>Domingo</option> : null}
                                    {diaRenovar === 1 ? <option value={1}>Lunes</option> : null}
                                    {diaRenovar === 2 ? <option value={2}>Martes</option> : null}
                                    {diaRenovar === 3 ? <option value={3}>Miercoles</option> : null}
                                    {diaRenovar === 4 ? <option value={4}>Jueves</option> : null}
                                    {diaRenovar === 5 ? <option value={5}>Viernes</option> : null}
                                    {diaRenovar === 6 ? <option value={6}>Sábado</option> : null}
                                    <option value={0}>Domingo</option>
                                    <option value={1}>Lunes</option>
                                    <option value={2}>Martes</option>
                                    <option value={3}>Miercoles</option>
                                    <option value={4}>Jueves</option>
                                    <option value={5}>Viernes</option>
                                    <option value={6}>Sábado</option>
                                </select>
                            </div>
                            <div className='w3-col m6 w3-center'>
                                <label>Defina la hora:</label>
                                <Calendar value={horaRenovar} onChange={(e) => { sethorarenovar(e.value); setmostraract(true) }} timeOnly hourFormat="12" readOnlyInput />
                            </div>
                        </div>
                        <div>
                            {mostrarAct ?
                                <div>
                                    <button style={{ marginTop: '20px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => ActualizarRenovar()}>
                                        Actualizar
                                    </button><br></br>
                                    (Recuerde dar clic en "Actualizar" para que los cambios sean efectivos.)
                                </div>
                                : null}
                        </div>
                        <div>{'\u00A0'}</div>
                    </div>
                    <div className='w3-center w3-text-indigo'>
                        <b style={{ fontSize: '30px' }}>Crear nuevo espacio con horario.</b>
                    </div>

                    <div className="w3-col m2 w3-panel w3-left-align">
                        <label className="w3-text-indigo"><b>Seleccione los días.</b></label>
                        {franja.length > 0 ? null :
                            <div>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setlunes(!lunes)} checked={lunes} />
                                        Lunes</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setmartes(!martes)} checked={martes} />
                                        Martes</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setmiercoles(!miercoles)} checked={miercoles} />
                                        Miércoles</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setjueves(!jueves)} checked={jueves} />
                                        Jueves</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setviernes(!viernes)} checked={viernes} />
                                        Viernes</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setsabado(!sabado)} checked={sabado} />
                                        Sábado</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => setdomingo(!domingo)} checked={domingo} />
                                        Domingo</label></p>
                                <p>
                                    <label className="w3-text-indigo">
                                        <input className="w3-check" type="checkbox" onChange={e => settodos(!todos)} checked={todos} />
                                        Todos</label></p>
                            </div>}
                    </div>
                    <div className="w3-col m10 w3-center w3-panel">
                        <div className="w3-col m6 w3-panel w3-left-align">
                            <label className="w3-text-indigo"><b>Título del lugar, localidad o profesión</b></label>
                            <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                                placeholder="título" title="escriba aquí el título de este horario, a qué o quién será dedicado"
                                onChange={e => tituloAMay(e.target.value)} value={titulo} />
                        </div>
                        {franja.length > 0 ? null :
                            <div className="w3-col m6 w3-panel w3-left-align" onDoubleClick={() => setfecha(new Date())}>
                                <label className="w3-text-indigo"><b>Fecha de inicio</b></label>
                                <DatePicker selected={fechaIni} onChange={validarFecha} locale="es" dateFormat="dd 'de' MMMM 'de' yyyy"
                                    className="w3-col m12 w3-text-indigo w3-panel w3-padding w3-border w3-round-large" />
                            </div>}
                        <div className="w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo">Hora de inicio: <b> {horaIni === 0 ? '12:' : horaIni > 12 ? horaIni - 12 + ':' : horaIni + ':'}
                                    {minIni < 10 ? '0' + minIni : minIni}
                                    {horaIni > 11 ? ' pm' : ' am'}</b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarIni(!mostraIni)} onDoubleClick={() => sethoraIni(6)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Hora:
                                </div>
                                {mostraIni ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { sethoraIni(1); setmostrarIni(!mostraIni) }}>1am</li>
                                        <li onClick={() => { sethoraIni(2); setmostrarIni(!mostraIni) }}>2am</li>
                                        <li onClick={() => { sethoraIni(3); setmostrarIni(!mostraIni) }}>3am</li>
                                        <li onClick={() => { sethoraIni(4); setmostrarIni(!mostraIni) }}>4am</li>
                                        <li onClick={() => { sethoraIni(5); setmostrarIni(!mostraIni) }}>5am</li>
                                        <li onClick={() => { sethoraIni(6); setmostrarIni(!mostraIni) }}>6am</li>
                                        <li onClick={() => { sethoraIni(7); setmostrarIni(!mostraIni) }}>7am</li>
                                        <li onClick={() => { sethoraIni(8); setmostrarIni(!mostraIni) }}>8am</li>
                                        <li onClick={() => { sethoraIni(9); setmostrarIni(!mostraIni) }}>9am</li>
                                        <li onClick={() => { sethoraIni(10); setmostrarIni(!mostraIni) }}>10am</li>
                                        <li onClick={() => { sethoraIni(11); setmostrarIni(!mostraIni) }}>11am</li>
                                        <li onClick={() => { sethoraIni(12); setmostrarIni(!mostraIni) }}>12pm</li>
                                        <li onClick={() => { sethoraIni(13); setmostrarIni(!mostraIni) }}>1pm</li>
                                        <li onClick={() => { sethoraIni(14); setmostrarIni(!mostraIni) }}>2pm</li>
                                        <li onClick={() => { sethoraIni(15); setmostrarIni(!mostraIni) }}>3pm</li>
                                        <li onClick={() => { sethoraIni(16); setmostrarIni(!mostraIni) }}>4pm</li>
                                        <li onClick={() => { sethoraIni(17); setmostrarIni(!mostraIni) }}>5pm</li>
                                        <li onClick={() => { sethoraIni(18); setmostrarIni(!mostraIni) }}>6pm</li>
                                        <li onClick={() => { sethoraIni(19); setmostrarIni(!mostraIni) }}>7pm</li>
                                        <li onClick={() => { sethoraIni(20); setmostrarIni(!mostraIni) }}>8pm</li>
                                        <li onClick={() => { sethoraIni(21); setmostrarIni(!mostraIni) }}>9pm</li>
                                        <li onClick={() => { sethoraIni(22); setmostrarIni(!mostraIni) }}>10pm</li>
                                        <li onClick={() => { sethoraIni(23); setmostrarIni(!mostraIni) }}>11pm</li>
                                        <li onClick={() => { sethoraIni(0); setmostrarIni(!mostraIni) }}>12am</li>
                                    </ul></div> : null}
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarInim(!mostraInim)} onDoubleClick={() => setminIni(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                                {mostraInim ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { setminIni(0); setmostrarInim(!mostraInim) }}>00</li>
                                        <li onClick={() => { setminIni(1); setmostrarInim(!mostraInim) }}>01</li>
                                        <li onClick={() => { setminIni(2); setmostrarInim(!mostraInim) }}>02</li>
                                        <li onClick={() => { setminIni(3); setmostrarInim(!mostraInim) }}>03</li>
                                        <li onClick={() => { setminIni(4); setmostrarInim(!mostraInim) }}>04</li>
                                        <li onClick={() => { setminIni(5); setmostrarInim(!mostraInim) }}>05</li>
                                        <li onClick={() => { setminIni(6); setmostrarInim(!mostraInim) }}>06</li>
                                        <li onClick={() => { setminIni(7); setmostrarInim(!mostraInim) }}>07</li>
                                        <li onClick={() => { setminIni(8); setmostrarInim(!mostraInim) }}>08</li>
                                        <li onClick={() => { setminIni(9); setmostrarInim(!mostraInim) }}>09</li>
                                        <li onClick={() => { setminIni(10); setmostrarInim(!mostraInim) }}>10</li>
                                        <li onClick={() => { setminIni(11); setmostrarInim(!mostraInim) }}>11</li>
                                        <li onClick={() => { setminIni(12); setmostrarInim(!mostraInim) }}>12</li>
                                        <li onClick={() => { setminIni(13); setmostrarInim(!mostraInim) }}>13</li>
                                        <li onClick={() => { setminIni(14); setmostrarInim(!mostraInim) }}>14</li>
                                        <li onClick={() => { setminIni(15); setmostrarInim(!mostraInim) }}>15</li>
                                        <li onClick={() => { setminIni(16); setmostrarInim(!mostraInim) }}>16</li>
                                        <li onClick={() => { setminIni(17); setmostrarInim(!mostraInim) }}>17</li>
                                        <li onClick={() => { setminIni(18); setmostrarInim(!mostraInim) }}>18</li>
                                        <li onClick={() => { setminIni(19); setmostrarInim(!mostraInim) }}>19</li>
                                        <li onClick={() => { setminIni(20); setmostrarInim(!mostraInim) }}>20</li>
                                        <li onClick={() => { setminIni(21); setmostrarInim(!mostraInim) }}>21</li>
                                        <li onClick={() => { setminIni(22); setmostrarInim(!mostraInim) }}>22</li>
                                        <li onClick={() => { setminIni(23); setmostrarInim(!mostraInim) }}>23</li>
                                        <li onClick={() => { setminIni(24); setmostrarInim(!mostraInim) }}>24</li>
                                        <li onClick={() => { setminIni(25); setmostrarInim(!mostraInim) }}>25</li>
                                        <li onClick={() => { setminIni(26); setmostrarInim(!mostraInim) }}>26</li>
                                        <li onClick={() => { setminIni(27); setmostrarInim(!mostraInim) }}>27</li>
                                        <li onClick={() => { setminIni(28); setmostrarInim(!mostraInim) }}>28</li>
                                        <li onClick={() => { setminIni(29); setmostrarInim(!mostraInim) }}>29</li>
                                        <li onClick={() => { setminIni(30); setmostrarInim(!mostraInim) }}>30</li>
                                        <li onClick={() => { setminIni(31); setmostrarInim(!mostraInim) }}>31</li>
                                        <li onClick={() => { setminIni(32); setmostrarInim(!mostraInim) }}>32</li>
                                        <li onClick={() => { setminIni(33); setmostrarInim(!mostraInim) }}>33</li>
                                        <li onClick={() => { setminIni(34); setmostrarInim(!mostraInim) }}>34</li>
                                        <li onClick={() => { setminIni(35); setmostrarInim(!mostraInim) }}>35</li>
                                        <li onClick={() => { setminIni(36); setmostrarInim(!mostraInim) }}>36</li>
                                        <li onClick={() => { setminIni(37); setmostrarInim(!mostraInim) }}>37</li>
                                        <li onClick={() => { setminIni(38); setmostrarInim(!mostraInim) }}>38</li>
                                        <li onClick={() => { setminIni(39); setmostrarInim(!mostraInim) }}>39</li>
                                        <li onClick={() => { setminIni(40); setmostrarInim(!mostraInim) }}>40</li>
                                        <li onClick={() => { setminIni(41); setmostrarInim(!mostraInim) }}>41</li>
                                        <li onClick={() => { setminIni(42); setmostrarInim(!mostraInim) }}>42</li>
                                        <li onClick={() => { setminIni(43); setmostrarInim(!mostraInim) }}>43</li>
                                        <li onClick={() => { setminIni(44); setmostrarInim(!mostraInim) }}>44</li>
                                        <li onClick={() => { setminIni(45); setmostrarInim(!mostraInim) }}>45</li>
                                        <li onClick={() => { setminIni(46); setmostrarInim(!mostraInim) }}>46</li>
                                        <li onClick={() => { setminIni(47); setmostrarInim(!mostraInim) }}>47</li>
                                        <li onClick={() => { setminIni(48); setmostrarInim(!mostraInim) }}>48</li>
                                        <li onClick={() => { setminIni(49); setmostrarInim(!mostraInim) }}>49</li>
                                        <li onClick={() => { setminIni(50); setmostrarInim(!mostraInim) }}>50</li>
                                        <li onClick={() => { setminIni(51); setmostrarInim(!mostraInim) }}>51</li>
                                        <li onClick={() => { setminIni(52); setmostrarInim(!mostraInim) }}>52</li>
                                        <li onClick={() => { setminIni(53); setmostrarInim(!mostraInim) }}>53</li>
                                        <li onClick={() => { setminIni(54); setmostrarInim(!mostraInim) }}>54</li>
                                        <li onClick={() => { setminIni(55); setmostrarInim(!mostraInim) }}>55</li>
                                        <li onClick={() => { setminIni(56); setmostrarInim(!mostraInim) }}>56</li>
                                        <li onClick={() => { setminIni(57); setmostrarInim(!mostraInim) }}>57</li>
                                        <li onClick={() => { setminIni(58); setmostrarInim(!mostraInim) }}>58</li>
                                        <li onClick={() => { setminIni(59); setmostrarInim(!mostraInim) }}>59</li>
                                    </ul></div> : null}
                            </div>
                        </div>
                        <div className="w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo">Franja de turno:
                                    <b>{horaFran < 10 ? '0' + horaFran : horaFran} horas con
                                        {minFran < 10 ? ' 0' + minFran : ' ' + minFran} minutos
                                    </b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarFran(!mostraFran)} onDoubleClick={() => sethoraFran(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Horas:
                                </div>
                                {mostraFran ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { sethoraFran(0); setmostrarFran(!mostraFran) }}>00</li>
                                        <li onClick={() => { sethoraFran(1); setmostrarFran(!mostraFran) }}>01</li>
                                        <li onClick={() => { sethoraFran(2); setmostrarFran(!mostraFran) }}>02</li>
                                        <li onClick={() => { sethoraFran(3); setmostrarFran(!mostraFran) }}>03</li>
                                        <li onClick={() => { sethoraFran(4); setmostrarFran(!mostraFran) }}>04</li>
                                        <li onClick={() => { sethoraFran(5); setmostrarFran(!mostraFran) }}>05</li>
                                        <li onClick={() => { sethoraFran(6); setmostrarFran(!mostraFran) }}>06</li>
                                        <li onClick={() => { sethoraFran(7); setmostrarFran(!mostraFran) }}>07</li>
                                        <li onClick={() => { sethoraFran(8); setmostrarFran(!mostraFran) }}>08</li>
                                        <li onClick={() => { sethoraFran(9); setmostrarFran(!mostraFran) }}>09</li>
                                        <li onClick={() => { sethoraFran(10); setmostrarFran(!mostraFran) }}>10</li>
                                        <li onClick={() => { sethoraFran(11); setmostrarFran(!mostraFran) }}>11</li>
                                        <li onClick={() => { sethoraFran(12); setmostrarFran(!mostraFran) }}>12</li>
                                    </ul></div> : null}
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarFranm(!mostraFranm)} onDoubleClick={() => setminFran(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                                {mostraFranm ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { setminFran(0); setmostrarFranm(!mostraFranm) }}>00</li>
                                        <li onClick={() => { setminFran(1); setmostrarFranm(!mostraFranm) }}>01</li>
                                        <li onClick={() => { setminFran(2); setmostrarFranm(!mostraFranm) }}>02</li>
                                        <li onClick={() => { setminFran(3); setmostrarFranm(!mostraFranm) }}>03</li>
                                        <li onClick={() => { setminFran(4); setmostrarFranm(!mostraFranm) }}>04</li>
                                        <li onClick={() => { setminFran(5); setmostrarFranm(!mostraFranm) }}>05</li>
                                        <li onClick={() => { setminFran(6); setmostrarFranm(!mostraFranm) }}>06</li>
                                        <li onClick={() => { setminFran(7); setmostrarFranm(!mostraFranm) }}>07</li>
                                        <li onClick={() => { setminFran(8); setmostrarFranm(!mostraFranm) }}>08</li>
                                        <li onClick={() => { setminFran(9); setmostrarFranm(!mostraFranm) }}>09</li>
                                        <li onClick={() => { setminFran(10); setmostrarFranm(!mostraFranm) }}>10</li>
                                        <li onClick={() => { setminFran(11); setmostrarFranm(!mostraFranm) }}>11</li>
                                        <li onClick={() => { setminFran(12); setmostrarFranm(!mostraFranm) }}>12</li>
                                        <li onClick={() => { setminFran(13); setmostrarFranm(!mostraFranm) }}>13</li>
                                        <li onClick={() => { setminFran(14); setmostrarFranm(!mostraFranm) }}>14</li>
                                        <li onClick={() => { setminFran(15); setmostrarFranm(!mostraFranm) }}>15</li>
                                        <li onClick={() => { setminFran(16); setmostrarFranm(!mostraFranm) }}>16</li>
                                        <li onClick={() => { setminFran(17); setmostrarFranm(!mostraFranm) }}>17</li>
                                        <li onClick={() => { setminFran(18); setmostrarFranm(!mostraFranm) }}>18</li>
                                        <li onClick={() => { setminFran(19); setmostrarFranm(!mostraFranm) }}>19</li>
                                        <li onClick={() => { setminFran(20); setmostrarFranm(!mostraFranm) }}>20</li>
                                        <li onClick={() => { setminFran(21); setmostrarFranm(!mostraFranm) }}>21</li>
                                        <li onClick={() => { setminFran(22); setmostrarFranm(!mostraFranm) }}>22</li>
                                        <li onClick={() => { setminFran(23); setmostrarFranm(!mostraFranm) }}>23</li>
                                        <li onClick={() => { setminFran(24); setmostrarFranm(!mostraFranm) }}>24</li>
                                        <li onClick={() => { setminFran(25); setmostrarFranm(!mostraFranm) }}>25</li>
                                        <li onClick={() => { setminFran(26); setmostrarFranm(!mostraFranm) }}>26</li>
                                        <li onClick={() => { setminFran(27); setmostrarFranm(!mostraFranm) }}>27</li>
                                        <li onClick={() => { setminFran(28); setmostrarFranm(!mostraFranm) }}>28</li>
                                        <li onClick={() => { setminFran(29); setmostrarFranm(!mostraFranm) }}>29</li>
                                        <li onClick={() => { setminFran(30); setmostrarFranm(!mostraFranm) }}>30</li>
                                        <li onClick={() => { setminFran(31); setmostrarFranm(!mostraFranm) }}>31</li>
                                        <li onClick={() => { setminFran(32); setmostrarFranm(!mostraFranm) }}>32</li>
                                        <li onClick={() => { setminFran(33); setmostrarFranm(!mostraFranm) }}>33</li>
                                        <li onClick={() => { setminFran(34); setmostrarFranm(!mostraFranm) }}>34</li>
                                        <li onClick={() => { setminFran(35); setmostrarFranm(!mostraFranm) }}>35</li>
                                        <li onClick={() => { setminFran(36); setmostrarFranm(!mostraFranm) }}>36</li>
                                        <li onClick={() => { setminFran(37); setmostrarFranm(!mostraFranm) }}>37</li>
                                        <li onClick={() => { setminFran(38); setmostrarFranm(!mostraFranm) }}>38</li>
                                        <li onClick={() => { setminFran(39); setmostrarFranm(!mostraFranm) }}>39</li>
                                        <li onClick={() => { setminFran(40); setmostrarFranm(!mostraFranm) }}>40</li>
                                        <li onClick={() => { setminFran(41); setmostrarFranm(!mostraFranm) }}>41</li>
                                        <li onClick={() => { setminFran(42); setmostrarFranm(!mostraFranm) }}>42</li>
                                        <li onClick={() => { setminFran(43); setmostrarFranm(!mostraFranm) }}>43</li>
                                        <li onClick={() => { setminFran(44); setmostrarFranm(!mostraFranm) }}>44</li>
                                        <li onClick={() => { setminFran(45); setmostrarFranm(!mostraFranm) }}>45</li>
                                        <li onClick={() => { setminFran(46); setmostrarFranm(!mostraFranm) }}>46</li>
                                        <li onClick={() => { setminFran(47); setmostrarFranm(!mostraFranm) }}>47</li>
                                        <li onClick={() => { setminFran(48); setmostrarFranm(!mostraFranm) }}>48</li>
                                        <li onClick={() => { setminFran(49); setmostrarFranm(!mostraFranm) }}>49</li>
                                        <li onClick={() => { setminFran(50); setmostrarFranm(!mostraFranm) }}>50</li>
                                        <li onClick={() => { setminFran(51); setmostrarFranm(!mostraFranm) }}>51</li>
                                        <li onClick={() => { setminFran(52); setmostrarFranm(!mostraFranm) }}>52</li>
                                        <li onClick={() => { setminFran(53); setmostrarFranm(!mostraFranm) }}>53</li>
                                        <li onClick={() => { setminFran(54); setmostrarFranm(!mostraFranm) }}>54</li>
                                        <li onClick={() => { setminFran(55); setmostrarFranm(!mostraFranm) }}>55</li>
                                        <li onClick={() => { setminFran(56); setmostrarFranm(!mostraFranm) }}>56</li>
                                        <li onClick={() => { setminFran(57); setmostrarFranm(!mostraFranm) }}>57</li>
                                        <li onClick={() => { setminFran(58); setmostrarFranm(!mostraFranm) }}>58</li>
                                        <li onClick={() => { setminFran(59); setmostrarFranm(!mostraFranm) }}>59</li>
                                    </ul></div> : null}
                            </div>
                        </div>
                        <div className="w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo">Franja de descanso:
                                    <b>{horaDes < 10 ? '0' + horaDes : horaDes} horas con
                                        {minDes < 10 ? ' 0' + minDes : ' ' + minDes} minutos</b>
                                </label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarDes(!mostraDes)} onDoubleClick={() => sethoraDes(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Horas:
                                </div>
                                {mostraDes ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { sethoraDes(0); setmostrarDes(!mostraDes) }}>00</li>
                                        <li onClick={() => { sethoraDes(1); setmostrarDes(!mostraDes) }}>01</li>
                                        <li onClick={() => { sethoraDes(2); setmostrarDes(!mostraDes) }}>02</li>
                                        <li onClick={() => { sethoraDes(3); setmostrarDes(!mostraDes) }}>03</li>
                                        <li onClick={() => { sethoraDes(4); setmostrarDes(!mostraDes) }}>04</li>
                                        <li onClick={() => { sethoraDes(5); setmostrarDes(!mostraDes) }}>05</li>
                                        <li onClick={() => { sethoraDes(6); setmostrarDes(!mostraDes) }}>06</li>
                                        <li onClick={() => { sethoraDes(7); setmostrarDes(!mostraDes) }}>07</li>
                                        <li onClick={() => { sethoraDes(8); setmostrarDes(!mostraDes) }}>08</li>
                                        <li onClick={() => { sethoraDes(9); setmostrarDes(!mostraDes) }}>09</li>
                                        <li onClick={() => { sethoraDes(10); setmostrarDes(!mostraDes) }}>10</li>
                                        <li onClick={() => { sethoraDes(11); setmostrarDes(!mostraDes) }}>11</li>
                                        <li onClick={() => { sethoraDes(12); setmostrarDes(!mostraDes) }}>12</li>
                                    </ul></div> : null}
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarDesm(!mostraDesm)} onDoubleClick={() => setminDes(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                                {mostraDesm ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { setminDes(0); setmostrarDesm(!mostraDesm) }}>00</li>
                                        <li onClick={() => { setminDes(1); setmostrarDesm(!mostraDesm) }}>01</li>
                                        <li onClick={() => { setminDes(2); setmostrarDesm(!mostraDesm) }}>02</li>
                                        <li onClick={() => { setminDes(3); setmostrarDesm(!mostraDesm) }}>03</li>
                                        <li onClick={() => { setminDes(4); setmostrarDesm(!mostraDesm) }}>04</li>
                                        <li onClick={() => { setminDes(5); setmostrarDesm(!mostraDesm) }}>05</li>
                                        <li onClick={() => { setminDes(6); setmostrarDesm(!mostraDesm) }}>06</li>
                                        <li onClick={() => { setminDes(7); setmostrarDesm(!mostraDesm) }}>07</li>
                                        <li onClick={() => { setminDes(8); setmostrarDesm(!mostraDesm) }}>08</li>
                                        <li onClick={() => { setminDes(9); setmostrarDesm(!mostraDesm) }}>09</li>
                                        <li onClick={() => { setminDes(10); setmostrarDesm(!mostraDesm) }}>10</li>
                                        <li onClick={() => { setminDes(11); setmostrarDesm(!mostraDesm) }}>11</li>
                                        <li onClick={() => { setminDes(12); setmostrarDesm(!mostraDesm) }}>12</li>
                                        <li onClick={() => { setminDes(13); setmostrarDesm(!mostraDesm) }}>13</li>
                                        <li onClick={() => { setminDes(14); setmostrarDesm(!mostraDesm) }}>14</li>
                                        <li onClick={() => { setminDes(15); setmostrarDesm(!mostraDesm) }}>15</li>
                                        <li onClick={() => { setminDes(16); setmostrarDesm(!mostraDesm) }}>16</li>
                                        <li onClick={() => { setminDes(17); setmostrarDesm(!mostraDesm) }}>17</li>
                                        <li onClick={() => { setminDes(18); setmostrarDesm(!mostraDesm) }}>18</li>
                                        <li onClick={() => { setminDes(19); setmostrarDesm(!mostraDesm) }}>19</li>
                                        <li onClick={() => { setminDes(20); setmostrarDesm(!mostraDesm) }}>20</li>
                                        <li onClick={() => { setminDes(21); setmostrarDesm(!mostraDesm) }}>21</li>
                                        <li onClick={() => { setminDes(22); setmostrarDesm(!mostraDesm) }}>22</li>
                                        <li onClick={() => { setminDes(23); setmostrarDesm(!mostraDesm) }}>23</li>
                                        <li onClick={() => { setminDes(24); setmostrarDesm(!mostraDesm) }}>24</li>
                                        <li onClick={() => { setminDes(25); setmostrarDesm(!mostraDesm) }}>25</li>
                                        <li onClick={() => { setminDes(26); setmostrarDesm(!mostraDesm) }}>26</li>
                                        <li onClick={() => { setminDes(27); setmostrarDesm(!mostraDesm) }}>27</li>
                                        <li onClick={() => { setminDes(28); setmostrarDesm(!mostraDesm) }}>28</li>
                                        <li onClick={() => { setminDes(29); setmostrarDesm(!mostraDesm) }}>29</li>
                                        <li onClick={() => { setminDes(30); setmostrarDesm(!mostraDesm) }}>30</li>
                                        <li onClick={() => { setminDes(31); setmostrarDesm(!mostraDesm) }}>31</li>
                                        <li onClick={() => { setminDes(32); setmostrarDesm(!mostraDesm) }}>32</li>
                                        <li onClick={() => { setminDes(33); setmostrarDesm(!mostraDesm) }}>33</li>
                                        <li onClick={() => { setminDes(34); setmostrarDesm(!mostraDesm) }}>34</li>
                                        <li onClick={() => { setminDes(35); setmostrarDesm(!mostraDesm) }}>35</li>
                                        <li onClick={() => { setminDes(36); setmostrarDesm(!mostraDesm) }}>36</li>
                                        <li onClick={() => { setminDes(37); setmostrarDesm(!mostraDesm) }}>37</li>
                                        <li onClick={() => { setminDes(38); setmostrarDesm(!mostraDesm) }}>38</li>
                                        <li onClick={() => { setminDes(39); setmostrarDesm(!mostraDesm) }}>39</li>
                                        <li onClick={() => { setminDes(40); setmostrarDesm(!mostraDesm) }}>40</li>
                                        <li onClick={() => { setminDes(41); setmostrarDesm(!mostraDesm) }}>41</li>
                                        <li onClick={() => { setminDes(42); setmostrarDesm(!mostraDesm) }}>42</li>
                                        <li onClick={() => { setminDes(43); setmostrarDesm(!mostraDesm) }}>43</li>
                                        <li onClick={() => { setminDes(44); setmostrarDesm(!mostraDesm) }}>44</li>
                                        <li onClick={() => { setminDes(45); setmostrarDesm(!mostraDesm) }}>45</li>
                                        <li onClick={() => { setminDes(46); setmostrarDesm(!mostraDesm) }}>46</li>
                                        <li onClick={() => { setminDes(47); setmostrarDesm(!mostraDesm) }}>47</li>
                                        <li onClick={() => { setminDes(48); setmostrarDesm(!mostraDesm) }}>48</li>
                                        <li onClick={() => { setminDes(49); setmostrarDesm(!mostraDesm) }}>49</li>
                                        <li onClick={() => { setminDes(50); setmostrarDesm(!mostraDesm) }}>50</li>
                                        <li onClick={() => { setminDes(51); setmostrarDesm(!mostraDesm) }}>51</li>
                                        <li onClick={() => { setminDes(52); setmostrarDesm(!mostraDesm) }}>52</li>
                                        <li onClick={() => { setminDes(53); setmostrarDesm(!mostraDesm) }}>53</li>
                                        <li onClick={() => { setminDes(54); setmostrarDesm(!mostraDesm) }}>54</li>
                                        <li onClick={() => { setminDes(55); setmostrarDesm(!mostraDesm) }}>55</li>
                                        <li onClick={() => { setminDes(56); setmostrarDesm(!mostraDesm) }}>56</li>
                                        <li onClick={() => { setminDes(57); setmostrarDesm(!mostraDesm) }}>57</li>
                                        <li onClick={() => { setminDes(58); setmostrarDesm(!mostraDesm) }}>58</li>
                                        <li onClick={() => { setminDes(59); setmostrarDesm(!mostraDesm) }}>59</li>
                                    </ul></div> : null}
                            </div>
                        </div>
                        <div className="w3-panel">
                            <div className="w3-col m12 w3-left-align">
                                <label className="w3-text-indigo">Hora de fin:
                                    <b> {horaFn === 0 ? '12:' : horaFn > 12 ? horaFn - 12 + ':' : horaFn + ':'}
                                        {minFn < 10 ? '0' + minFn : minFn}
                                        {horaFn > 11 ? ' pm' : ' am'}
                                    </b></label>
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarFn(!mostraFn)} onDoubleClick={() => sethoraFn(6)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Hora:
                                </div>
                                {mostraFn ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { sethoraFn(1); setmostrarFn(!mostraFn) }}>1am</li>
                                        <li onClick={() => { sethoraFn(2); setmostrarFn(!mostraFn) }}>2am</li>
                                        <li onClick={() => { sethoraFn(3); setmostrarFn(!mostraFn) }}>3am</li>
                                        <li onClick={() => { sethoraFn(4); setmostrarFn(!mostraFn) }}>4am</li>
                                        <li onClick={() => { sethoraFn(5); setmostrarFn(!mostraFn) }}>5am</li>
                                        <li onClick={() => { sethoraFn(6); setmostrarFn(!mostraFn) }}>6am</li>
                                        <li onClick={() => { sethoraFn(7); setmostrarFn(!mostraFn) }}>7am</li>
                                        <li onClick={() => { sethoraFn(8); setmostrarFn(!mostraFn) }}>8am</li>
                                        <li onClick={() => { sethoraFn(9); setmostrarFn(!mostraFn) }}>9am</li>
                                        <li onClick={() => { sethoraFn(10); setmostrarFn(!mostraFn) }}>10am</li>
                                        <li onClick={() => { sethoraFn(11); setmostrarFn(!mostraFn) }}>11am</li>
                                        <li onClick={() => { sethoraFn(12); setmostrarFn(!mostraFn) }}>12pm</li>
                                        <li onClick={() => { sethoraFn(13); setmostrarFn(!mostraFn) }}>1pm</li>
                                        <li onClick={() => { sethoraFn(14); setmostrarFn(!mostraFn) }}>2pm</li>
                                        <li onClick={() => { sethoraFn(15); setmostrarFn(!mostraFn) }}>3pm</li>
                                        <li onClick={() => { sethoraFn(16); setmostrarFn(!mostraFn) }}>4pm</li>
                                        <li onClick={() => { sethoraFn(17); setmostrarFn(!mostraFn) }}>5pm</li>
                                        <li onClick={() => { sethoraFn(18); setmostrarFn(!mostraFn) }}>6pm</li>
                                        <li onClick={() => { sethoraFn(19); setmostrarFn(!mostraFn) }}>7pm</li>
                                        <li onClick={() => { sethoraFn(20); setmostrarFn(!mostraFn) }}>8pm</li>
                                        <li onClick={() => { sethoraFn(21); setmostrarFn(!mostraFn) }}>9pm</li>
                                        <li onClick={() => { sethoraFn(22); setmostrarFn(!mostraFn) }}>10pm</li>
                                        <li onClick={() => { sethoraFn(23); setmostrarFn(!mostraFn) }}>11pm</li>
                                        <li onClick={() => { sethoraFn(0); setmostrarFn(!mostraFn) }}>12am</li>
                                    </ul></div> : null}
                            </div>
                            <div className="w3-col m6 w3-left-align">
                                <div onClick={() => setmostrarFnm(!mostraFnm)} onDoubleClick={() => setminFn(0)} style={{ cursor: 'pointer', width: "95%" }}
                                    className="w3-text-indigo w3-hover-indigo w3-padding w3-border w3-round-large">Minuto:</div>
                                {mostraFnm ? <div className="w3-responsive w3-text-indigo w3-center" style={Tamano}>
                                    <ul className="w3-ul w3-hoverable">
                                        <li onClick={() => { setminFn(0); setmostrarFnm(!mostraFnm) }}>00</li>
                                        <li onClick={() => { setminFn(1); setmostrarFnm(!mostraFnm) }}>01</li>
                                        <li onClick={() => { setminFn(2); setmostrarFnm(!mostraFnm) }}>02</li>
                                        <li onClick={() => { setminFn(3); setmostrarFnm(!mostraFnm) }}>03</li>
                                        <li onClick={() => { setminFn(4); setmostrarFnm(!mostraFnm) }}>04</li>
                                        <li onClick={() => { setminFn(5); setmostrarFnm(!mostraFnm) }}>05</li>
                                        <li onClick={() => { setminFn(6); setmostrarFnm(!mostraFnm) }}>06</li>
                                        <li onClick={() => { setminFn(7); setmostrarFnm(!mostraFnm) }}>07</li>
                                        <li onClick={() => { setminFn(8); setmostrarFnm(!mostraFnm) }}>08</li>
                                        <li onClick={() => { setminFn(9); setmostrarFnm(!mostraFnm) }}>09</li>
                                        <li onClick={() => { setminFn(10); setmostrarFnm(!mostraFnm) }}>10</li>
                                        <li onClick={() => { setminFn(11); setmostrarFnm(!mostraFnm) }}>11</li>
                                        <li onClick={() => { setminFn(12); setmostrarFnm(!mostraFnm) }}>12</li>
                                        <li onClick={() => { setminFn(13); setmostrarFnm(!mostraFnm) }}>13</li>
                                        <li onClick={() => { setminFn(14); setmostrarFnm(!mostraFnm) }}>14</li>
                                        <li onClick={() => { setminFn(15); setmostrarFnm(!mostraFnm) }}>15</li>
                                        <li onClick={() => { setminFn(16); setmostrarFnm(!mostraFnm) }}>16</li>
                                        <li onClick={() => { setminFn(17); setmostrarFnm(!mostraFnm) }}>17</li>
                                        <li onClick={() => { setminFn(18); setmostrarFnm(!mostraFnm) }}>18</li>
                                        <li onClick={() => { setminFn(19); setmostrarFnm(!mostraFnm) }}>19</li>
                                        <li onClick={() => { setminFn(20); setmostrarFnm(!mostraFnm) }}>20</li>
                                        <li onClick={() => { setminFn(21); setmostrarFnm(!mostraFnm) }}>21</li>
                                        <li onClick={() => { setminFn(22); setmostrarFnm(!mostraFnm) }}>22</li>
                                        <li onClick={() => { setminFn(23); setmostrarFnm(!mostraFnm) }}>23</li>
                                        <li onClick={() => { setminFn(24); setmostrarFnm(!mostraFnm) }}>24</li>
                                        <li onClick={() => { setminFn(25); setmostrarFnm(!mostraFnm) }}>25</li>
                                        <li onClick={() => { setminFn(26); setmostrarFnm(!mostraFnm) }}>26</li>
                                        <li onClick={() => { setminFn(27); setmostrarFnm(!mostraFnm) }}>27</li>
                                        <li onClick={() => { setminFn(28); setmostrarFnm(!mostraFnm) }}>28</li>
                                        <li onClick={() => { setminFn(29); setmostrarFnm(!mostraFnm) }}>29</li>
                                        <li onClick={() => { setminFn(30); setmostrarFnm(!mostraFnm) }}>30</li>
                                        <li onClick={() => { setminFn(31); setmostrarFnm(!mostraFnm) }}>31</li>
                                        <li onClick={() => { setminFn(32); setmostrarFnm(!mostraFnm) }}>32</li>
                                        <li onClick={() => { setminFn(33); setmostrarFnm(!mostraFnm) }}>33</li>
                                        <li onClick={() => { setminFn(34); setmostrarFnm(!mostraFnm) }}>34</li>
                                        <li onClick={() => { setminFn(35); setmostrarFnm(!mostraFnm) }}>35</li>
                                        <li onClick={() => { setminFn(36); setmostrarFnm(!mostraFnm) }}>36</li>
                                        <li onClick={() => { setminFn(37); setmostrarFnm(!mostraFnm) }}>37</li>
                                        <li onClick={() => { setminFn(38); setmostrarFnm(!mostraFnm) }}>38</li>
                                        <li onClick={() => { setminFn(39); setmostrarFnm(!mostraFnm) }}>39</li>
                                        <li onClick={() => { setminFn(40); setmostrarFnm(!mostraFnm) }}>40</li>
                                        <li onClick={() => { setminFn(41); setmostrarFnm(!mostraFnm) }}>41</li>
                                        <li onClick={() => { setminFn(42); setmostrarFnm(!mostraFnm) }}>42</li>
                                        <li onClick={() => { setminFn(43); setmostrarFnm(!mostraFnm) }}>43</li>
                                        <li onClick={() => { setminFn(44); setmostrarFnm(!mostraFnm) }}>44</li>
                                        <li onClick={() => { setminFn(45); setmostrarFnm(!mostraFnm) }}>45</li>
                                        <li onClick={() => { setminFn(46); setmostrarFnm(!mostraFnm) }}>46</li>
                                        <li onClick={() => { setminFn(47); setmostrarFnm(!mostraFnm) }}>47</li>
                                        <li onClick={() => { setminFn(48); setmostrarFnm(!mostraFnm) }}>48</li>
                                        <li onClick={() => { setminFn(49); setmostrarFnm(!mostraFnm) }}>49</li>
                                        <li onClick={() => { setminFn(50); setmostrarFnm(!mostraFnm) }}>50</li>
                                        <li onClick={() => { setminFn(51); setmostrarFnm(!mostraFnm) }}>51</li>
                                        <li onClick={() => { setminFn(52); setmostrarFnm(!mostraFnm) }}>52</li>
                                        <li onClick={() => { setminFn(53); setmostrarFnm(!mostraFnm) }}>53</li>
                                        <li onClick={() => { setminFn(54); setmostrarFnm(!mostraFnm) }}>54</li>
                                        <li onClick={() => { setminFn(55); setmostrarFnm(!mostraFnm) }}>55</li>
                                        <li onClick={() => { setminFn(56); setmostrarFnm(!mostraFnm) }}>56</li>
                                        <li onClick={() => { setminFn(57); setmostrarFnm(!mostraFnm) }}>57</li>
                                        <li onClick={() => { setminFn(58); setmostrarFnm(!mostraFnm) }}>58</li>
                                        <li onClick={() => { setminFn(59); setmostrarFnm(!mostraFnm) }}>59</li>
                                    </ul>
                                </div> : null}
                            </div>
                        </div>
                        <div className='w3-padding w3-left-align w3-text-indigo'>
                            <label style={{ marginRight: '10px' }} className='w3-text-indigo'><b>Horario para clases</b>
                                <InputSwitch checked={habilitar} onChange={(e) => sethabilitar(e.value)} />
                            </label>
                            (Habilitar para mostrar el horario completo, de lo contrario solo se mostrará el día presente y el siguiente día)<br></br><br></br>
                            <label style={{ marginRight: '10px' }} className='w3-text-indigo'><b>Renovar horario</b>
                                <InputSwitch checked={regenerar} onChange={(e) => setregenerar(e.value)} />
                            </label>
                            (Para renovar automáticamente su horario según la fecha que desee)
                        </div>
                    </div>
                    <div className="w3-col m12 w3-panel w3-center">
                        <button type='submit' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-small"
                            onClick={validarDatos}>
                            Validar y agregar
                        </button>
                        <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue w3-small"
                            onClick={limpiarDatos} >
                            Limpiar horas
                        </button>
                    </div>
                    <div className="w3-col m12 w3-panel w3-center">
                        {franja.length > 0 ? <div>
                            <button type='submit' style={espacio} className="w3-button w3-pink w3-border w3-border-black w3-round-large w3-hover-cyan w3-large"
                                onClick={crearHorario}>
                                Crear horario*
                            </button><br></br>
                            <label className='w3-text-red'>*Recuerda dar clic en "Crear horario" para guardar los cambios</label><br></br>
                            <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={limpiarTodo} >
                                Limpiar todo
                            </button></div>
                            : <button type='reset' style={espacio} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                onClick={limpiarTodo} >
                                Limpiar todo
                            </button>}
                    </div>
                </div>
                <div>
                    {franja.length > 0 ?
                        <div>
                            <div>
                                <h1>{franja.lugar}</h1>
                            </div>
                            <div className="w3-container w3-responsive w3-margin-bottom">
                                <table style={{}} className="w3-table-all w3-centered w3-hoverable">
                                    <thead>
                                        <tr className="w3-indigo">
                                            <th>(mm/dd/aaaa)<br></br>/Hora</th>
                                            {franja[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franja[0].dia[0].fecha}</th> : null}
                                            {franja[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franja[0].dia[1].fecha}</th> : null}
                                            {franja[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franja[0].dia[2].fecha}</th> : null}
                                            {franja[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franja[0].dia[3].fecha}</th> : null}
                                            {franja[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franja[0].dia[4].fecha}</th> : null}
                                            {franja[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franja[0].dia[5].fecha}</th> : null}
                                            {franja[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franja[0].dia[6].fecha}</th> : null}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            franja.map(dato => (

                                                <tr key={dato.indice}>
                                                    <td><div className='w3-margin-top'>{dato.franja}</div></td>
                                                    {franja[0].dia[0] ? <td></td> : null}
                                                    {franja[0].dia[1] ? <td></td> : null}
                                                    {franja[0].dia[2] ? <td></td> : null}
                                                    {franja[0].dia[3] ? <td></td> : null}
                                                    {franja[0].dia[4] ? <td></td> : null}
                                                    {franja[0].dia[5] ? <td></td> : null}
                                                    {franja[0].dia[6] ? <td></td> : null}
                                                </tr>

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null}
                </div>
            </div>
        </>
    )
}
