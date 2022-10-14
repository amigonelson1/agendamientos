import React, { useState, useEffect, useRef } from 'react'
import swal from 'sweetalert';
import useAuth from '../auth/useAuth';
import axios from 'axios'
import roles from "../helpers/roles";
import rutas from '../helpers/rutas';
import { ProgressSpinner } from 'primereact/progressspinner';
import { ProgressBar } from 'primereact/progressbar';
import { InputSwitch } from 'primereact/inputswitch';


export function CrearTablaHorario({ horario }) {

    const color = '#b7faf0'
    const selectSocio = useRef();
    const selectSocio2 = useRef();
    const selectSocio3 = useRef();
    const selectSocio4 = useRef();
    const selectSocio22 = useRef();
    const selectSocio33 = useRef();
    const selectSocio44 = useRef();
    const selectProfesor = useRef();
    const selectCanchero = useRef();
    const [envio, setenvio] = useState(false);
    const { user, roll, upDateDates, datosempresa, updatedates } = useAuth();
    const [franjas, setfranjas] = useState(horario)
    const [idhorario, setidhorario] = useState('')
    const [dia, setdia] = useState('')
    const [indice, setindice] = useState(0)
    const [preautor, setpreautor] = useState('')
    const [codigo, setcodigo] = useState('')
    const [autor1, setautor1] = useState('')
    const [socio, setsocio] = useState('')
    const [socio2, setsocio2] = useState('')
    const [socio3, setsocio3] = useState('')
    const [socio4, setsocio4] = useState('')
    const [autor2, setautor2] = useState('')
    const [autor3, setautor3] = useState('')
    const [autor4, setautor4] = useState('')
    const [fecha, setfecha] = useState('')
    const [turno, setturno] = useState('')
    const [turnoEdit, setturnoedit] = useState('')
    const [preprofesor, setpreprofesor] = useState('')
    const [idpreprofesor, setidpreprofesor] = useState('')
    const [colorProfesor, setcolorprofesor] = useState('')
    const [idProfesor, setidprofesor] = useState('')
    const [profesor, setprofesor] = useState('')
    const [precanchero, setprecanchero] = useState('')
    const [idprecanchero, setidprecanchero] = useState('')
    const [canchero, setcanchero] = useState('')
    const [idCanchero, setidcanchero] = useState('')
    const [solicita, setsolicita] = useState('')
    const [socios, setsocios] = useState([])
    const [profesores, setprofesores] = useState([])
    const [verprof, setverprof] = useState([])
    const [cancheros, setcancheros] = useState([])
    const [haycita, sethaycita] = useState(false)
    const [demanda, setdemanda] = useState(false)
    const [asistencia, setasistencia] = useState(false)
    const [fechaControl, setfechacontrol] = useState(new Date().setDate(new Date().getDate() + 1))
    const [fechaControl2, setfechacontrol2] = useState(new Date().setDate(new Date().getDate() - 1))


    useEffect(() => {
        if (envio) { document.getElementById('id02').style.display = 'block' }
        if (!envio) { document.getElementById('id02').style.display = 'none' }
    }, [envio])


    useEffect(() => {
        setfranjas(horario)
        document.getElementById('id05').style.display = 'none';
        document.getElementById('id06').style.display = 'none';
        document.getElementById('id07').style.display = 'none';
        document.getElementById('id08').style.display = 'none';
        document.getElementById('id02').style.display = 'none';
    }, [horario])

    useEffect(() => {
        let ignore = false
        const traerProfesores = async () => {
            setenvio(true);
            try {
                const res = await axios.get(rutas.server + 'api/profesor');
                if (!ignore) {
                    setverprof(res.data)
                    setenvio(false);
                }
            }
            catch (e) {
                if (!ignore) {
                    setenvio(false);
                    swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
                }
            }
        }
        traerProfesores()
        return () => { ignore = true };
    }, [horario, updatedates])

    useEffect(() => {
        const tiempo = setTimeout(() => {
            setfechacontrol(new Date().setDate(new Date().getDate() + 1))
            setfechacontrol2(new Date().setDate(new Date().getDate() - 1))
        }, 21600000);
        return () => { clearTimeout(tiempo); }
    });

    const agendar = (id, indiceDia, dia, indice, fecha, turno, idProfe, profe, idCanche, canche, aut1, soc1, soc2, soc3, soc4) => {
        if (!user) { swal('Upss', 'Para solicitar o agendar por favor inicia sesión', 'info'); return }
        if (roll === roles.admin) {
            traerDatos();
            traerCanchero(idCanche)
            traerProfesor(idProfe)
            if (aut1 !== null && aut1 !== '') {
                mostrarPreautor(soc1, soc2, soc3, soc4)
                sethaycita(true)
            }
            document.getElementById('id05').style.display = 'block';
        }
        if (roll === roles.socio) {
            traerDatos();
            traerAutor(user.id, 1)
            if (aut1 !== null && aut1 !== '') {
                if (user.id.toString() !== aut1.toString()) { swal('Franja ya asignada', 'Por favor elige un turno diferente, este turno no está disponible.', 'info'); return }
                else {
                    mostrarPreautor(soc1, soc2, soc3, soc4)
                    sethaycita(true)
                }
            }
            document.getElementById('id06').style.display = 'block';
        }
        if (roll === roles.canchero) {
            validarAsistencia(id, indice, indiceDia)
            if (aut1 === null || aut1 === '') { swal('Franja sin asignar', 'No puedes editar este registro ya que este turno no ha sido solicitado.', 'info'); return }
            if (idCanche === null) { swal('No estás asociado a esta franja', 'No puedes editar este registro ya que no estas asociado para este turno.', 'info'); return }
            if (idCanche !== null && idCanche !== '') {
                if (aut1 !== null && aut1 !== '') {
                    if (user.id.toString() !== idCanche.toString()) { swal('No estás asociado a este turno', 'No puedes editar este registro ya que no estás asociado para este turno.', 'info'); return }
                    else {
                        mostrarPreautor(soc1, soc2, soc3, soc4)
                        document.getElementById('id08').style.display = 'block';
                    }
                }
                else {
                    swal('Franja sin asignar', 'Esta franja aun no ha sido solicitada.', 'info');
                    return;
                }
            }
            else {
                swal('Sin asignar', 'No existe o no estas asignado a esta franja.', 'info');
                return;
            }

        }
        if (roll === roles.profesor) {
            validarAsistencia(id, indice, indiceDia)
            traerCanchero(idCanche)
            traerProfesor(user.id)
            if (idProfe !== null && idProfe !== '') {
                if (aut1 !== null && aut1 !== '') {
                    if (user.id.toString() !== idProfe.toString()) { swal('No estás asociado a este turno', 'No puedes editar este registro ya que no estás asociado para este turno.', 'info'); return }
                    else {
                        mostrarPreautor(soc1, soc2, soc3, soc4)
                        document.getElementById('id08').style.display = 'block';
                    }
                }
                else {
                    swal('Franja sin asignar', 'Esta franja aun no ha sido solicitada.', 'info');
                    return;
                }
            }
            else {
                document.getElementById('profesor').style.display = 'block';
            }

        }
        if (profe !== null) {
            if (profe !== '') { setsolicita('Clase') }
            else { setsolicita('Turno') }
        }
        else { setsolicita('Turno') }
        ajustarTurno(turno)
        setidhorario(id);
        setdia(dia)
        setindice(indice)
        setfecha(fecha)
        setturno(turno)
        setpreprofesor(profe)
        setprecanchero(canche)
        setidprecanchero(idCanche)
        setidpreprofesor(idProfe)
    }


    const traerDatos = async () => {
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users', {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setsocios(res.data.filter(user => user.rol[0].name === roles.socio && user.activo === true))
            setprofesores(res.data.filter(user => user.rol[0].name === roles.profesor && user.activo === true))
            setcancheros(res.data.filter(user => user.rol[0].name === roles.canchero && user.activo === true))
            //setprofesores(res.data.filter(user => user.rol[0].name === roles.profesor))
            //setcancheros(res.data.filter(user => user.rol[0].name === roles.canchero))
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const mostrarPreautor = (a, b, c, d) => {
        if (roll !== roles.socio) { setpreautor(a + ' - ' + b + ' - ' + c + ' - ' + d) }
        else { setpreautor(b + ' - ' + c + ' - ' + d) }
    }

    const traerAutor = async (id, n) => {
        if (id === '') {
            if (n === 1) {
                setautor1('')
                setsocio('')
                setcodigo('')
            }
            if (n === 2) {
                setautor2('')
                setsocio2('')
            }
            if (n === 3) {
                setautor3('')
                setsocio3('')
            }
            if (n === 4) {
                setautor4('')
                setsocio4('')
            }
            return;
        }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            if (n === 1) {
                if (id === autor2 || id === autor3 || id === autor4) {
                    swal('Ya seleccionado', 'Debes elegir un solicitante diferente para este campo', 'info');
                    setautor2('')
                    setsocio2('')
                    selectSocio.current.value = ''
                    return;
                }
                else {
                    setautor1(res.data.message._id)
                    setsocio(res.data.message.nombre)
                    setcodigo(res.data.message.codigo)
                    setenvio(false);
                }
            }
            if (n === 2) {
                if (autor1 === '') {
                    swal('Sin titular', 'Debes elegir al titular o solicitante 1 primero.', 'info');
                    setautor2('')
                    setsocio2('')
                    selectSocio2.current.value = ''
                    selectSocio22.current.value = ''
                    return;
                }
                else {
                    if (id === autor1 || id === autor3 || id === autor4) {
                        swal('Ya seleccionado', 'Debes elegir un solicitante diferente para este campo.', 'info');
                        setautor2('')
                        setsocio2('')
                        selectSocio2.current.value = ''
                        selectSocio22.current.value = ''
                        return;
                    }
                    else {
                        setautor2(res.data.message._id)
                        setsocio2(res.data.message.nombre)
                        setenvio(false);
                    }
                }
            }
            if (n === 3) {
                if (autor2 === '') {
                    swal('Sin solicitante 2', 'Debes elegir al solicitante 2 primero.', 'info');
                    setautor3('')
                    setsocio3('')
                    selectSocio3.current.value = ''
                    selectSocio33.current.value = ''
                    return;
                }
                else {
                    if (id === autor1 || id === autor2 || id === autor4) {
                        swal('Ya seleccionado', 'Debes elegir un solicitante diferente para este campo.', 'info');
                        setautor3('')
                        setsocio3('')
                        selectSocio3.current.value = ''
                        selectSocio33.current.value = ''
                        return;
                    }
                    else {
                        setautor3(res.data.message._id)
                        setsocio3(res.data.message.nombre)
                        setenvio(false);
                    }
                }
            }
            if (n === 4) {
                if (autor3 === '') {
                    swal('Sin solicitante 3', 'Debes elegir al solicitante 3 primero.', 'info');
                    setautor4('')
                    setsocio4('')
                    selectSocio4.current.value = ''
                    selectSocio44.current.value = ''
                    return;
                }
                else {
                    if (id === autor1 || id === autor2 || id === autor3) {
                        swal('Ya seleccionado', 'Debes elegir un solicitante diferente para este campo.', 'info');
                        setautor4('')
                        setsocio4('')
                        selectSocio4.current.value = ''
                        selectSocio44.current.value = ''
                        return;
                    }
                    else {
                        setautor4(res.data.message._id)
                        setsocio4(res.data.message.nombre)
                        setenvio(false);
                    }
                }
            }
        }
        catch (e) {
            setenvio(false);
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo.', 'warning')
        }
    }

    const traerCanchero = async (id) => {
        if (id === null) { setidcanchero(''); setcanchero(''); return }
        if (id === '') { setidcanchero(''); setcanchero(''); return }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setcanchero(res.data.message.nombre)
            setidcanchero(res.data.message._id)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const traerProfesor = async (id) => {
        if (id === null) { setidprofesor(''); setprofesor(''); setcolorprofesor(''); return }
        if (id === '') { setidprofesor(''); setprofesor(''); setcolorprofesor(''); return }
        setenvio(true);
        try {
            const res = await axios.get(rutas.server + 'api/users/' + id, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setprofesor(res.data.message.nombre)
            setidprofesor(res.data.message._id)
            setcolorprofesor(res.data.message.color)
            setenvio(false);
        }
        catch (e) {
            setenvio(false);
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const limpiarDatos = () => {
        setautor1('')
        setsocio('')
        setsocio2('')
        setsocio3('')
        setsocio4('')
        setautor2('')
        setautor3('')
        setautor4('')
        setcanchero('')
        setprofesor('')
        setsocios([])
        setprofesores([])
        setsocios([])
        setcancheros([])
        setsolicita('')
        sethaycita(false)
        setpreprofesor('')
        setidpreprofesor('')
        setcolorprofesor('')
        setprecanchero('')
        setidprecanchero('')
        setpreautor('')
        setfecha('')
        setturno('')
        setdemanda(false)
        setidprofesor('')
        setidcanchero('')
        setcodigo('')
        setturnoedit('')
        setdia('')
        setasistencia(false)
    }


    const pedirCita = async () => {
        var hoy = new Date();
        var day = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
        if (autor1 === '') { swal('¿Autor 1?', 'Debes seleccionar por lo menos un autor o solicitante para este turno', 'info'); return }
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/solicitud/' + idhorario, {
                dia: dia,
                indice: indice,
                autor1: autor1,
                codigoAutor1: codigo,
                socio1: socio,
                socio2: socio2,
                socio3: socio3,
                socio4: socio4,
                autor2: autor2,
                autor3: autor3,
                autor4: autor4,
                horaSolicitud: (day + ' ' + hora),
                solicita: solicita,
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            if (datosempresa.aleatorio) {
                swal('Excelente', 'Se ha registrado con éxito tu solicitud, recuerda que debes esperar el tiempo de la aleatoriedad para verificar si aplicaste.', 'success');
            }
            else { swal('Excelente', 'Se ha registrado con éxito tu agenda', 'success'); }
            limpiarDatos();
            upDateDates();
            document.getElementById('id05').style.display = 'none';
            document.getElementById('id06').style.display = 'none';
        }
        catch (e) {
            setenvio(false)
            if (e.request.status === 400) {
                swal('Ya usaste un turno de alta demanda', 'Lo sentimos, pero por políticas no puedes pedir turno de alta demanda seguido, por favor espera a que algún turno se libere o solicita tu turno para la siguiente fecha disponible.', 'warning')
                return
            }
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const cancelarCita = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/solicitud/' + idhorario, {
                dia: dia,
                indice: indice,
                autor1: '',
                codigoAutor1: '',
                socio1: '',
                socio2: '',
                socio3: '',
                socio4: '',
                autor2: '',
                autor3: '',
                autor4: '',
                horaSolicitud: '',
                solicita: 'cancelar'
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            setenvio(false)
            swal('Bien', 'Se ha cancelado la cita seleccionada', 'success');
            limpiarDatos();
            upDateDates();
            document.getElementById('id05').style.display = 'none';
            document.getElementById('id06').style.display = 'none';
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const actualizarProfesor = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/configuracion/' + idhorario, {
                dia: dia,
                indice: indice,
                profesor: profesor,
                idProfesor: idProfesor,
                canchero: canchero,
                idCanchero: idCanchero,
                colorProfesor: colorProfesor
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            limpiarDatos();
            upDateDates();
            setenvio(false)
            swal('Listo', 'Hemos actualizado estos datos', 'info')
        }
        catch {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }

    const prepedirCita = () => {
        if (!user.activo) { swal('Usuario inactivo', 'Para gestionar turnos y demás, debes estar activo en el sistema, por favor contacta con el administrador.', 'info'); return }
        if (autor1 === '') { swal('Falta Titular', 'Por favor elige el titular o solicitante 1 para continuar.', 'info'); return }
        if (user.role !== roles.admin) {
            if (datosempresa.apertura) {
                var turn = 0
                if (turno.slice(5).substring(0, 2) === 'am') { turn = turno.substring(0, 2) * 60 + Number(turno.slice(3).substring(0, 2)) }
                if (turno.slice(5).substring(0, 2) === 'pm') {
                    if (turno.substring(0, 2) === '12') { turn = turno.substring(0, 2) * 60 + Number(turno.slice(3).substring(0, 2)) }
                    else { turn = turno.substring(0, 2) * 60 + Number(turno.slice(3).substring(0, 2)) + 720 }
                }
                var ahora = new Date().getHours() * 60 + new Date().getMinutes()
                var apAm = (new Date(datosempresa.aperturaAm).getHours() * 60 + new Date(datosempresa.aperturaAm).getMinutes())
                var apPm = (new Date(datosempresa.aperturaPm).getHours() * 60 + new Date(datosempresa.aperturaPm).getMinutes())
                var cierrAm = (new Date(datosempresa.cierreAm).getHours() * 60 + new Date(datosempresa.cierreAm).getMinutes())
                var cierrPm = (new Date(datosempresa.cierrePm).getHours() * 60 + new Date(datosempresa.cierrePm).getMinutes())
                var hoy = new Date();
                var manan = new Date().setDate(new Date().getDate() + 1);
                var day = (hoy.getMonth() + 1) + '/' + hoy.getDate() + '/' + hoy.getFullYear();
                var manana = new Date(manan).toLocaleDateString('en-US')
                if (new Date(fecha).getTime() < new Date(day).getTime()) { swal('Fecha inválida', 'No se pueden agendar turnos ya con fechas vencidas', 'info'); return }
                if (new Date(fecha).getTime() === new Date(day).getTime()) {
                    if (ahora > turn) {
                        swal('Turno ya no es válido', 'No se pueden agendar un turno pasada la hora del mismo', 'info'); return
                    }
                }
                if (new Date(fecha).getTime() > new Date(manana).getTime()) { swal('Turno aún no válido', 'No se puede agendar turno con más de un día de anticipación', 'info'); return }
                if ((ahora < apAm || ahora > cierrAm) && (ahora < apPm || ahora > cierrPm)) { swal('Hora inválida', 'No se puede agendar turno fuera del horario establecido.', 'info'); return }
            }
        }
        swal({
            title: 'Solicitar turno',
            text: 'Para agendar este turno por favor clic en: "Continuar".',
            icon: 'info', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                pedirCita()
            }
        })
    }


    const preAsistio = () => {
        if (!user.activo) { swal('Inactivo', 'Para gestionar este turno debes estar habilitado, por favor comunícate con el administrador.', 'info'); return }
        var hoy = new Date();
        var day = (hoy.getMonth() + 1) + '/' + hoy.getDate() + '/' + hoy.getFullYear();
        var hora = hoy.getHours() + ':' + hoy.getMinutes();
        if (new Date().getTime() < (new Date(fecha).getTime())) { swal('El usuario aun no asiste a este turno', 'No se puede validar la asistencia antes de la fecha del turno', 'info'); return }
        if (fecha === day) {
            if (turnoEdit > hora) {
                swal('El usuario aun no asiste a este turno', 'No se puede validar la asistencia antes de la hora del turno', 'info');
                return
            }
        }
        swal({
            title: 'Asistencia',
            text: 'Para validar la asistencia del usuario a este turno, por favor clic en: "Continuar".',
            icon: 'info', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                Asistio()
            }
        })
    }


    const Asistio = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/asistio/' + idhorario, {
                dia: dia,
                indice: indice,
                asistio: true
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            limpiarDatos();
            setenvio(false)
            document.getElementById('id08').style.display = 'none';
            swal('Listo', 'Quedó registrada la asistencia del usuario a este turno', 'info')
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const precancelarCita = () => {
        if (!user.activo) { swal('Usuario inactivo', 'Para gestionar turnos y demás, debes estar activo en el sistema, por favor contacta con el administrador.', 'info'); return }
        if (user.role !== roles.admin) {
            var hoy = new Date();
            var manan = new Date().setDate(new Date().getDate() + 1);
            var day = (hoy.getMonth() + 1) + '/' + hoy.getDate() + '/' + hoy.getFullYear();
            var manana = new Date(manan).toLocaleDateString('en-US')
            var hora = hoy.getHours() + ':' + hoy.getMinutes();
            if ((new Date(day).getTime() > (new Date(fecha).getTime()))) {
                swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la fecha límite.', 'error');
                return
            }
            if ((new Date(day).getTime() === (new Date(fecha).getTime()))) {
                if (turno.slice(5).substring(0, 2) === 'am') { swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la hora límite.', 'error'); return }
                if (turno.slice(5).substring(0, 2) === 'pm') {
                    if (new Date(datosempresa.horaAm).getHours() + ':' + new Date(datosempresa.horaAm).getMinutes() < new Date().getHours() + ':' + new Date().getMinutes()) {
                        swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la hora límite.', 'error');
                        return;
                    }
                }
                if (hora > turnoEdit) { swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la hora límite.', 'error'); return }
            }
            if (new Date(day).getTime() < (new Date(fecha).getTime())) {
                if (new Date(manana).getTime() === (new Date(fecha).getTime())) {
                    if ((new Date(day).getTime() < (new Date(fecha).getTime()))) {
                        if (turno.slice(5).substring(0, 2) === 'am') {
                            if (new Date(datosempresa.horaAm).getHours() + ':' + new Date(datosempresa.horaAm).getMinutes() < new Date().getHours() + ':' + new Date().getMinutes()) {
                                swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la hora límite.', 'error');
                                return;
                            }
                        }
                        if (turno.slice(5).substring(0, 2) === 'pm') {
                            if (new Date(datosempresa.horaPm).getHours() + ':' + new Date(datosempresa.horaPm).getMinutes() < new Date().getHours() + ':' + new Date().getMinutes()) {
                                swal('No se puede cancelar turno', 'Para cancelar cualquier turno, debe hacerse antes de la hora límite.', 'error');
                                return;
                            }
                        }
                    }
                }
            }
        }
        swal({
            title: 'Cancelar turno',
            text: 'Para cancelar este turno por favor clic en: "Continuar".',
            icon: 'warning', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                cancelarCita()
            }
        })
    }


    const preactualizarProfesor = () => {
        if (!user.activo) { swal('Usuario inactivo', 'Para gestionar turnos y demás, debes estar activo en el sistema, por favor contacta con el administrador.', 'info'); return }
        swal({
            title: '¿Actualizar estos datos?',
            text: 'Para actualizar estos datos por favor clic en: "Continuar".',
            icon: 'info', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                actualizarProfesor()
            }
        })
    }


    const granDemanda = (id, indice, dem) => {
        if (roll === roles.admin) {
            document.getElementById('id07').style.display = 'block';
            setidhorario(id);
            setindice(indice);
            setdemanda(dem)
        }
    }

    const cambiarDemanda = async () => {
        setenvio(true)
        try {
            await axios.put(rutas.server + 'api/horario/granDemanda/' + idhorario, {
                indice: indice,
                granDemanda: !demanda
            }, {
                headers: {
                    'x-access-token': user.token,
                    'Content-Type': 'application/json'
                }
            });
            document.getElementById('id07').style.display = 'none';
            if (!demanda) { swal('Listo', 'Se ha cambiado esta franja como franja de "Gran demanda"', 'info') }
            else { swal('Listo', 'Se ha cambiado esta franja como franja "Sin demanda"', 'info') }
            limpiarDatos();
            upDateDates();
            setenvio(false)
        }
        catch (e) {
            setenvio(false)
            swal('Upss', 'Algo no salio bien, por favor intenta de nuevo', 'warning')
        }
    }


    const ajustarTurno = (turn) => {
        let minute = (turn.slice(3)).substring(0, 2)
        let houre = 0
        if ((turn.slice(5)).substring(0, 2) === 'am') {
            if (turn.substring(0, 2) === 12) houre = 0
            else houre = turn.substring(0, 2)
        }
        else houre = parseInt(turn.substring(0, 2)) + 12;
        setturnoedit(houre + ':' + minute)
    }


    const validarAsistencia = async (id, indi, diaa) => {
        try {
            const respu = await axios.get(rutas.server + 'api/horario/' + id)
            setasistencia(respu.data.horario.horario[indi].dia[diaa].asistio)
        }
        catch (e) {
            swal('Upss', 'Al parecer tuvimos un inconveniente, por favor intenta de nuevo', 'info')
        }
    }


    const preAsignar = () => {
        if (!user.activo) { swal('Usuario inactivo', 'Para gestionar turnos y demás, debes estar activo en el sistema, por favor contacta con el administrador.', 'info'); return }
        swal({
            title: 'Guardar registro',
            text: 'Para actualizar estos datos por favor clic en: "Continuar".',
            icon: 'info', //success , warning, info, error
            buttons: ['Cancelar', 'Continuar'],
        }).then(respuesta => {
            if (respuesta) {
                if (idProfesor) {
                    actualizarProfesor()
                }
                else {
                    traerProfesor(user.id)
                    limpiarDatos()
                    document.getElementById('profesor').style.display = 'none';
                    swal('Upss', 'Algo no anda bien, por favor intenta de nuevo', 'warning')
                }
            }
        })
    }


    const HorarioApertura = () => {
        let apAm = 0
        let apPm = 0
        let cieAm = 0
        let ciePm = 0
        let apmAm = 0
        let apmPm = 0
        let ciemAm = 0
        let ciemPm = 0
        if (new Date(datosempresa.aperturaAm).getHours() < 10) { apAm = '0' + new Date(datosempresa.aperturaAm).getHours() }
        else { apAm = new Date(datosempresa.aperturaAm).getHours() }
        if (new Date(datosempresa.aperturaAm).getMinutes() < 10) { apmAm = '0' + new Date(datosempresa.aperturaAm).getMinutes() }
        else { apmAm = new Date(datosempresa.aperturaAm).getMinutes() }
        if (new Date(datosempresa.aperturaAm).getHours() > 11) { apmAm = apmAm + 'pm' }
        else { apmAm = apmAm + 'am' }
        if (new Date(datosempresa.aperturaAm).getHours() > 12) { apAm = '0' + (apAm - 12) }
        if (new Date(datosempresa.cierreAm).getHours() < 10) { cieAm = '0' + new Date(datosempresa.cierreAm).getHours() }
        else { cieAm = new Date(datosempresa.cierreAm).getHours() }
        if (new Date(datosempresa.cierreAm).getMinutes() < 10) { ciemAm = '0' + new Date(datosempresa.cierreAm).getMinutes() }
        else { ciemAm = new Date(datosempresa.cierreAm).getMinutes() }
        if (new Date(datosempresa.cierreAm).getHours() > 11) { ciemAm = ciemAm + 'pm' }
        else { ciemAm = ciemAm + 'am' }
        if (new Date(datosempresa.cierreAm).getHours() > 12) { cieAm = '0' + (cieAm - 12) }
        if (new Date(datosempresa.aperturaPm).getHours() < 10) { apPm = '0' + new Date(datosempresa.aperturaPm).getHours() }
        else { apPm = new Date(datosempresa.aperturaPm).getHours() }
        if (new Date(datosempresa.aperturaPm).getMinutes() < 10) { apmPm = '0' + new Date(datosempresa.aperturaPm).getMinutes() }
        else { apmPm = new Date(datosempresa.aperturaPm).getMinutes() }
        if (new Date(datosempresa.aperturaPm).getHours() > 11) { apmPm = apmPm + 'pm' }
        else { apmPm = apmPm + 'am' }
        if (new Date(datosempresa.aperturaPm).getHours() > 12) { apPm = '0' + (apPm - 12) }
        if (new Date(datosempresa.cierrePm).getHours() < 10) { ciePm = '0' + new Date(datosempresa.cierrePm).getHours() }
        else { ciePm = new Date(datosempresa.cierrePm).getHours() }
        if (new Date(datosempresa.cierrePm).getMinutes() < 10) { ciemPm = '0' + new Date(datosempresa.cierrePm).getMinutes() }
        else { ciemPm = new Date(datosempresa.cierrePm).getMinutes() }
        if (new Date(datosempresa.cierrePm).getHours() > 11) { ciemPm = ciemPm + 'pm' }
        else { ciemPm = ciemPm + 'am' }
        if (new Date(datosempresa.cierrePm).getHours() > 12) { ciePm = '0' + (ciePm - 12) }

        return (
            <div>{apAm + ':' + apmAm + ' a ' + cieAm + ':' + ciemAm + ' y de ' + apPm + ':' + apmPm + ' a ' + ciePm + ':' + ciemPm} </div>
        )
    }


    if (franjas) {
        if (franjas) {
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
                    {/*bloque para usuarios admin*/}
                    <div id="id05" className="w3-modal">
                        <div style={{ maxWidth: '900px', margin: '-50px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id05').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                {haycita ? <div className='w3-padding w3-pale-green w3-text-indigo w3-round-large'>
                                    Esta franja ya está asignada a:<br></br>
                                    <b style={{ fontSize: '20px' }}>{preautor}</b>
                                </div> : null}
                                {preprofesor ? <b>Profesor : {preprofesor}</b> : null}<br></br>
                                {precanchero ? <b>Canchero : {precanchero}</b> : null}<br></br>
                                {dia + '\u00A0\u00A0'}{fecha + '\u00A0\u00A0'}{turno}
                            </header>
                            <div className="w3-panel w3-text-indigo">
                                <div className='w3-col m6 w3-padding'>
                                    {socios.length > 0 ?
                                        <>
                                            <label>Titular: <b></b>
                                                <select ref={selectSocio} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 1)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            <label>Solicitante 2: <b></b>
                                                <select ref={selectSocio2} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 2)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            <label>Solicitante 3: <b></b>
                                                <select ref={selectSocio3} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 3)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            <label>Solicitante 4: <b></b>
                                                <select ref={selectSocio4} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 4)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label> </>
                                        : null}
                                    <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                        {haycita ? <div>
                                            <button style={{ marginLeft: '25px', marginTop: '10px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => prepedirCita()}>
                                                Reasignar solicitantes
                                            </button><button style={{ marginLeft: '25px', marginTop: '10px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => precancelarCita()}>
                                                Cancelar turno
                                            </button>
                                        </div>
                                            : <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                                onClick={e => prepedirCita()}>
                                                Agendar turno
                                            </button>}
                                    </div>
                                </div>
                                <div className='w3-col m6 w3-padding'>
                                    {profesores.length > 0 ?
                                        <label>Profesor: <b></b>
                                            <select ref={selectProfesor} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                onChange={e => { setidprofesor(e.target.value); traerProfesor(e.target.value) }}>
                                                <option defaulvalue={idpreprofesor} value={idpreprofesor}>{preprofesor}</option>
                                                <option value={''}>*Quitar profesor</option>
                                                {profesores.map(prof =>
                                                    <option key={prof._id} value={prof._id}>{prof.nombre}</option>
                                                )};
                                            </select>
                                        </label> : null}
                                    {cancheros.length > 0 ?
                                        <label>Canchero: <b></b>
                                            <select ref={selectCanchero} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                onChange={e => { setidcanchero(e.target.value); traerCanchero(e.target.value) }}>
                                                <option defaulvalue={idprecanchero} value={idprecanchero}>{precanchero}</option>
                                                <option value={''}>*Quitar canchero</option>
                                                {cancheros.map(fbb =>
                                                    <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                )};
                                            </select>
                                        </label>
                                        : null}
                                    <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                            onClick={e => preactualizarProfesor()}>
                                            Actualizar
                                        </button>
                                    </div>
                                    Si no se muestra algún profesor, canchero o socio por favor verifique que se encuentre activo.
                                    Usuarios inactivos no serán listados.
                                </div>
                                <div style={{ marginBottom: '15px' }} className='w3-col w3-padding w3-center '>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id05').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Bloque para mostrar modal de asignar si es franja de gran demanda*/}
                    <div id="id07" className="w3-modal">
                        <div style={{ maxWidth: '600px' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id07').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                franja: {turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                <label style={{ marginLeft: '25px' }}><b>Franja de gran demanda</b>
                                    <InputSwitch checked={demanda} onChange={e => { cambiarDemanda() }} />
                                </label>
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id07').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*bloque para usuarios socios*/}
                    <div id="id06" className="w3-modal">
                        <div style={{ maxWidth: '600px' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id06').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                <h3>Solicitud de: <b>{solicita}</b></h3>
                                {user ? <div>
                                    {haycita ?
                                        <div className='w3-padding w3-pale-green w3-text-indigo w3-round-large'>
                                            <b>{user.nombre}</b><br></br>
                                            ya tienes asignado este turno junto a:<br></br>
                                            <b>{preautor}</b>
                                        </div>
                                        : <div>
                                            Solicitud a nombre de <b style={{ fontSize: '20px' }}>{user.nombre}</b>.
                                        </div>}
                                </div>
                                    : null}
                                {preprofesor ? <div>Profesor: <b style={{ fontSize: '20px' }}>{preprofesor}</b> </div> : null}
                                {precanchero ? <div>Canchero: <b style={{ fontSize: '20px' }}>{precanchero}</b> </div> : null}
                                {dia + '\u00A0\u00A0'}{fecha + '\u00A0\u00A0'}{turno}
                                {datosempresa.apertura ?
                                    <div>Horario para solicitar turnos:
                                        <HorarioApertura />
                                    </div>
                                    : null}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                {haycita ? null
                                    : <div>
                                        Otros participantes:<br></br><br></br>
                                        <>
                                            <label>Solicitante 2: <b></b>
                                                <select ref={selectSocio22} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 2)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            <label>Solicitante 3: <b></b>
                                                <select ref={selectSocio33} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 3)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                            <label>Solicitante 4: <b></b>
                                                <select ref={selectSocio44} className="w3-select w3-border w3-round-large w3-hover-light-gray w3-text-indigo"
                                                    onChange={e => traerAutor(e.target.value, 4)}>
                                                    <option defaultValue={''} value={''}>Ninguno</option>
                                                    {socios.map(fbb =>
                                                        <option key={fbb._id} value={fbb._id}>{fbb.nombre}</option>
                                                    )};
                                                </select>
                                            </label>
                                        </>
                                    </div>}
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    {haycita ?
                                        <div>
                                            {datosempresa.cancelar ?
                                                <button style={{ marginLeft: '25px', marginBottom: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-red"
                                                    onClick={e => precancelarCita()}>
                                                    Cancelar turno
                                                </button>
                                                : null}
                                        </div>
                                        : <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan"
                                            onClick={e => prepedirCita()}>
                                            Solicitar
                                        </button>}
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id06').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Bloque para habilitar asistencia*/}
                    <div id="id08" className="w3-modal">
                        <div style={{ maxWidth: '600px', margin: '100px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('id08').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                franja asignada a:<br></br>
                                <b style={{ fontSize: '20px' }}>{preautor}</b><br></br>
                                franja: {turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    {asistencia ?
                                        <div>
                                            <b>Este usuario ya tiene asistencia registrada.</b><br></br><br></br>
                                        </div> :
                                        <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                            onClick={e => { preAsistio() }}>
                                            Asistencia
                                        </button>}
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('id08').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Bloque para habilitar profesor*/}
                    <div id="profesor" className="w3-modal">
                        <div style={{ maxWidth: '600px', margin: '100px auto' }} className="w3-modal-content w3-animate-opacity w3-card-4">
                            <header className="w3-container w3-indigo w3-center">
                                <span className="w3-button w3-display-topright"
                                    onClick={e => { document.getElementById('profesor').style.display = 'none'; limpiarDatos() }}        >
                                    &times;
                                </span>
                                {user ? <h3><b>Bienvenido: {user.nombre}</b></h3> : null}
                                {precanchero ? <div>Canchero: <b>{precanchero}</b> </div> : null}
                                franja: {turno}
                            </header>
                            <div style={{ margin: '20px auto', maxWidth: '400px' }} className="w3-panel w3-text-indigo">
                                <div style={{ marginBottom: '25px' }} className='w3-padding w3-center'>
                                    <div>
                                        <b>¿Te asignarás a este turno?.</b><br></br><br></br>
                                    </div>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { preAsignar() }}>
                                        Confirmar
                                    </button>
                                    <button style={{ marginLeft: '25px' }} className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-blue"
                                        onClick={e => { document.getElementById('profesor').style.display = 'none'; limpiarDatos() }}>
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/*bloque para montar el horario*/}
                    { // bloque para mostrar horario de clases con users logueados
                        franjas.mostrarTodo === true && roll ?
                            <div className="w3-text-indigo w3-center w3-panel">
                                <div className="w3-text-indigo w3-left-align w3-panel">
                                    <table >
                                        <thead >
                                            <tr>
                                                <th colSpan="2">
                                                    Profesor(es):
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {verprof.map(prof =>
                                                <tr key={prof._id}>
                                                    <td >
                                                        {prof.nombre}
                                                    </td >
                                                    <td bgcolor={prof.color} width='80px'>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <h1>{franjas.lugar}</h1>
                                </div>
                                <div className="w3-container w3-responsive w3-margin-bottom">
                                    <table className="w3-table-all w3-centered w3-hoverable">
                                        <thead>
                                            <tr className="w3-indigo">
                                                <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                {franjas.horario[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</th> : null}
                                                {franjas.horario[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</th> : null}
                                                {franjas.horario[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</th> : null}
                                                {franjas.horario[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</th> : null}
                                                {franjas.horario[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</th> : null}
                                                {franjas.horario[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</th> : null}
                                                {franjas.horario[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                franjas.horario.map((dato, index) => (
                                                    <tr key={dato.indice} title="Clíck para agendar turno">
                                                        {dato.granDemanda ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><b>alta demanda<br></br>{dato.franja}</b></td>
                                                            : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>}
                                                        {franjas.horario[index].dia[0] ? franjas.horario[index].granDemanda && !dato.dia[0].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[1] ? franjas.horario[index].granDemanda && !dato.dia[1].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }} >
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }} >
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[2] ? franjas.horario[index].granDemanda && !dato.dia[2].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[3] ? franjas.horario[index].granDemanda && !dato.dia[3].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[4] ? franjas.horario[index].granDemanda && !dato.dia[4].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[5] ? franjas.horario[index].granDemanda && !dato.dia[5].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[6] ? franjas.horario[index].granDemanda && !dato.dia[6].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                    : null}</td> : null}
                                                    </tr>

                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                    {//bloque para mostrar el horario limitado a solo dos días fuera del admin
                        franjas.mostrarTodo === false && roll ?
                            <div>
                                {roll === roles.admin ?//bloque para admin para ver toda la franja
                                    <div className="w3-text-indigo w3-center w3-panel">
                                        <div className="w3-text-indigo w3-left-align w3-panel">
                                            <table >
                                                <thead >
                                                    <tr>
                                                        <th colSpan="2">
                                                            Profesor(es):
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {verprof.map(prof =>
                                                        <tr key={prof._id}>
                                                            <td >
                                                                {prof.nombre}
                                                            </td >
                                                            <td bgcolor={prof.color} width='80px'>
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <h1>{franjas.lugar}</h1>
                                        </div>
                                        <div className="w3-container w3-responsive w3-margin-bottom">
                                            <table className="w3-table-all w3-centered w3-hoverable">
                                                <thead>
                                                    <tr className="w3-indigo">
                                                        <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                        {franjas.horario[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</th> : null}
                                                        {franjas.horario[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</th> : null}
                                                        {franjas.horario[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</th> : null}
                                                        {franjas.horario[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</th> : null}
                                                        {franjas.horario[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</th> : null}
                                                        {franjas.horario[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</th> : null}
                                                        {franjas.horario[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</th> : null}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        franjas.horario.map((dato, index) => (
                                                            <tr key={dato.indice} title="Clíck para agendar turno">
                                                                {dato.granDemanda ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><b>alta demanda<br></br>{dato.franja}</b></td>
                                                                    : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>}
                                                                {franjas.horario[index].dia[0] ? franjas.horario[index].granDemanda && !dato.dia[0].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                        {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                        {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[1] ? franjas.horario[index].granDemanda && !dato.dia[1].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }} >
                                                                        {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }} >
                                                                        {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[2] ? franjas.horario[index].granDemanda && !dato.dia[2].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                        {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                        {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[3] ? franjas.horario[index].granDemanda && !dato.dia[3].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                        {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                        {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[4] ? franjas.horario[index].granDemanda && !dato.dia[4].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                        {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                        {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[5] ? franjas.horario[index].granDemanda && !dato.dia[5].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                        {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                        {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[6] ? franjas.horario[index].granDemanda && !dato.dia[6].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                        {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                        onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                        {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                            </tr>

                                                        ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    : //Bloque para limitar el horario para usuarios diferentes a admin
                                    <div className="w3-text-indigo w3-center w3-panel">
                                        <div>
                                            <h1>{franjas.lugar}</h1>
                                        </div>
                                        <div className="w3-container w3-responsive w3-margin-bottom">
                                            <table className="w3-table-all w3-centered w3-hoverable">
                                                <thead>
                                                    <tr className="w3-indigo">
                                                        <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                        {franjas.horario[0].dia[0] && fechaControl > (new Date(franjas.horario[0].dia[0].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[0].fecha).getTime()) ? <th><b>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[1] && fechaControl > (new Date(franjas.horario[0].dia[1].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[1].fecha).getTime()) ? <th><b>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[2] && fechaControl > (new Date(franjas.horario[0].dia[2].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[2].fecha).getTime()) ? <th><b>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[3] && fechaControl > (new Date(franjas.horario[0].dia[3].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[3].fecha).getTime()) ? <th><b>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[4] && fechaControl > (new Date(franjas.horario[0].dia[4].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[4].fecha).getTime()) ? <th><b>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[5] && fechaControl > (new Date(franjas.horario[0].dia[5].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[5].fecha).getTime()) ? <th><b>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</b></th> : null}
                                                        {franjas.horario[0].dia[6] && fechaControl > (new Date(franjas.horario[0].dia[6].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[6].fecha).getTime()) ? <th><b>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</b></th> : null}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        franjas.horario.map((dato, index) => (

                                                            <tr key={dato.indice} title="Clíck para agendar turno">
                                                                {dato.granDemanda ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><b>alta demanda<br></br>{dato.franja}</b></td>
                                                                    : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div>
                                                                    </td>}
                                                                {franjas.horario[index].dia[0] && fechaControl > (new Date(dato.dia[0].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[0].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[0].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                        {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1, dato.dia[0].socio1, dato.dia[0].socio2, dato.dia[0].socio3, dato.dia[0].socio4) }}>
                                                                        {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[0].socio1}<br />{dato.dia[0].socio2 ? <div><b>Inv:</b> {dato.dia[0].socio2}<br /></div> : null}{dato.dia[0].socio3 ? <div><b>Inv2:</b> {dato.dia[0].socio3}<br /></div> : null}{dato.dia[0].socio4 ? <div><b>Inv3:</b> {dato.dia[0].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[1] && fechaControl > (new Date(dato.dia[1].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[1].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[1].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }}>
                                                                        {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1, dato.dia[1].socio1, dato.dia[1].socio2, dato.dia[1].socio3, dato.dia[1].socio4) }}>
                                                                        {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[1].socio1}<br />{dato.dia[1].socio2 ? <div><b>Inv:</b> {dato.dia[1].socio2}<br /></div> : null}{dato.dia[1].socio3 ? <div><b>Inv2:</b> {dato.dia[1].socio3}<br /></div> : null}{dato.dia[1].socio4 ? <div><b>Inv3:</b> {dato.dia[1].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[2] && fechaControl > (new Date(dato.dia[2].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[2].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[2].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                        {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1, dato.dia[2].socio1, dato.dia[2].socio2, dato.dia[2].socio3, dato.dia[2].socio4) }}>
                                                                        {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[2].socio1}<br />{dato.dia[2].socio2 ? <div><b>Inv:</b> {dato.dia[2].socio2}<br /></div> : null}{dato.dia[2].socio3 ? <div><b>Inv2:</b> {dato.dia[2].socio3}<br /></div> : null}{dato.dia[2].socio4 ? <div><b>Inv3:</b> {dato.dia[2].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[3] && fechaControl > (new Date(dato.dia[3].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[3].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[3].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                        {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1, dato.dia[3].socio1, dato.dia[3].socio2, dato.dia[3].socio3, dato.dia[3].socio4) }}>
                                                                        {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[3].socio1}<br />{dato.dia[3].socio2 ? <div><b>Inv:</b> {dato.dia[3].socio2}<br /></div> : null}{dato.dia[3].socio3 ? <div><b>Inv2:</b> {dato.dia[3].socio3}<br /></div> : null}{dato.dia[3].socio4 ? <div><b>Inv3:</b> {dato.dia[3].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[4] && fechaControl > (new Date(dato.dia[4].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[4].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[4].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                        {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1, dato.dia[4].socio1, dato.dia[4].socio2, dato.dia[4].socio3, dato.dia[4].socio4) }}>
                                                                        {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[4].socio1}<br />{dato.dia[4].socio2 ? <div><b>Inv:</b> {dato.dia[4].socio2}<br /></div> : null}{dato.dia[4].socio3 ? <div><b>Inv2:</b> {dato.dia[4].socio3}<br /></div> : null}{dato.dia[4].socio4 ? <div><b>Inv3:</b> {dato.dia[4].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[5] && fechaControl > (new Date(dato.dia[5].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[5].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[5].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                        {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1, dato.dia[5].socio1, dato.dia[5].socio2, dato.dia[5].socio3, dato.dia[5].socio4) }}>
                                                                        {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[5].socio1}<br />{dato.dia[5].socio2 ? <div><b>Inv:</b> {dato.dia[5].socio2}<br /></div> : null}{dato.dia[5].socio3 ? <div><b>Inv2:</b> {dato.dia[5].socio3}<br /></div> : null}{dato.dia[5].socio4 ? <div><b>Inv3:</b> {dato.dia[5].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                                {franjas.horario[index].dia[6] && fechaControl > (new Date(dato.dia[6].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[6].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[6].colorProfesor ?
                                                                    <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                        {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                            : null}</td> :
                                                                    <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                        onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1, dato.dia[6].socio1, dato.dia[6].socio2, dato.dia[6].socio3, dato.dia[6].socio4) }}>
                                                                        {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo w3-left-align'><b>Tit:</b> {dato.dia[6].socio1}<br />{dato.dia[6].socio2 ? <div><b>Inv:</b> {dato.dia[6].socio2}<br /></div> : null}{dato.dia[6].socio3 ? <div><b>Inv2:</b> {dato.dia[6].socio3}<br /></div> : null}{dato.dia[6].socio4 ? <div><b>Inv3:</b> {dato.dia[6].socio4}<br /></div> : null}</div>
                                                                            : null}</td> : null}
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                            : null
                    }
                    { // bloque para mostrar horario de clases sin loguearse
                        franjas.mostrarTodo === true && !roll ?
                            <div className="w3-text-indigo w3-center w3-panel">
                                <div>
                                    <h1>{franjas.lugar}</h1>
                                </div>
                                <div className="w3-container w3-responsive w3-margin-bottom">
                                    <table className="w3-table-all w3-centered w3-hoverable">
                                        <thead>
                                            <tr className="w3-indigo">
                                                <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                {franjas.horario[0].dia[0] ? <th>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</th> : null}
                                                {franjas.horario[0].dia[1] ? <th>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</th> : null}
                                                {franjas.horario[0].dia[2] ? <th>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</th> : null}
                                                {franjas.horario[0].dia[3] ? <th>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</th> : null}
                                                {franjas.horario[0].dia[4] ? <th>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</th> : null}
                                                {franjas.horario[0].dia[5] ? <th>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</th> : null}
                                                {franjas.horario[0].dia[6] ? <th>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                franjas.horario.map((dato, index) => (
                                                    <tr key={dato.indice} title="Clíck para agendar turno">
                                                        {dato.granDemanda ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><b>alta demanda<br></br>{dato.franja}</b></td>
                                                            : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div></td>}
                                                        {franjas.horario[index].dia[0] ? franjas.horario[index].granDemanda && !dato.dia[0].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[1] ? franjas.horario[index].granDemanda && !dato.dia[1].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }} >
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }} >
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[2] ? franjas.horario[index].granDemanda && !dato.dia[2].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[3] ? franjas.horario[index].granDemanda && !dato.dia[3].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[4] ? franjas.horario[index].granDemanda && !dato.dia[4].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[5] ? franjas.horario[index].granDemanda && !dato.dia[5].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[6] ? franjas.horario[index].granDemanda && !dato.dia[6].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                    </tr>

                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                    {//bloque para mostrar el horario limitado a solo dos días sin loguearse
                        franjas.mostrarTodo === false && !roll ?
                            <div className="w3-text-indigo w3-center w3-panel">
                                <div>
                                    <h1>{franjas.lugar}</h1>
                                </div>
                                <div className="w3-container w3-responsive w3-margin-bottom">
                                    <table className="w3-table-all w3-centered w3-hoverable">
                                        <thead>
                                            <tr className="w3-indigo">
                                                <th>(mm/dd/aaaa):<br></br>/Hora:</th>
                                                {franjas.horario[0].dia[0] && fechaControl > (new Date(franjas.horario[0].dia[0].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[0].fecha).getTime()) ? <th><b>Lunes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[0].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[1] && fechaControl > (new Date(franjas.horario[0].dia[1].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[1].fecha).getTime()) ? <th><b>Martes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[1].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[2] && fechaControl > (new Date(franjas.horario[0].dia[2].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[2].fecha).getTime()) ? <th><b>Miércoles<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[2].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[3] && fechaControl > (new Date(franjas.horario[0].dia[3].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[3].fecha).getTime()) ? <th><b>Jueves<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[3].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[4] && fechaControl > (new Date(franjas.horario[0].dia[4].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[4].fecha).getTime()) ? <th><b>Viernes<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[4].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[5] && fechaControl > (new Date(franjas.horario[0].dia[5].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[5].fecha).getTime()) ? <th><b>Sábado<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[5].fecha}</b></th> : null}
                                                {franjas.horario[0].dia[6] && fechaControl > (new Date(franjas.horario[0].dia[6].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[6].fecha).getTime()) ? <th><b>Domingo<br></br>{franjas.length === 0 ? '' : franjas.horario[0].dia[6].fecha}</b></th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                franjas.horario.map((dato, index) => (

                                                    <tr key={dato.indice} title="Clíck para agendar turno">
                                                        {dato.granDemanda ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><b>alta demanda<br></br>{dato.franja}</b></td>
                                                            : <td style={{ border: 'black 1px solid', height: '55px', verticalAlign: 'middle' }} onClick={e => { granDemanda(franjas._id, dato.indice, dato.granDemanda) }}><div className='w3-margin-top'>{dato.franja}</div>
                                                            </td>}
                                                        {franjas.horario[index].dia[0] && fechaControl > (new Date(dato.dia[0].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[0].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[0].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[0].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 0, 'lunes', dato.indice, dato.dia[0].fecha, dato.dia[0].turno, dato.dia[0].idProfesor, dato.dia[0].profesor, dato.dia[0].idCanchero, dato.dia[0].canchero, dato.dia[0].autor1) }}>
                                                                {dato.dia[0].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[1] && fechaControl > (new Date(dato.dia[1].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[1].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[1].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }}>
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[1].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 1, 'martes', dato.indice, dato.dia[1].fecha, dato.dia[1].turno, dato.dia[1].idProfesor, dato.dia[1].profesor, dato.dia[1].idCanchero, dato.dia[1].canchero, dato.dia[1].autor1) }}>
                                                                {dato.dia[1].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[2] && fechaControl > (new Date(dato.dia[2].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[2].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[2].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[2].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 2, 'miercoles', dato.indice, dato.dia[2].fecha, dato.dia[2].turno, dato.dia[2].idProfesor, dato.dia[2].profesor, dato.dia[2].idCanchero, dato.dia[2].canchero, dato.dia[2].autor1) }}>
                                                                {dato.dia[2].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[3] && fechaControl > (new Date(dato.dia[3].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[3].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[3].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[3].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 3, 'jueves', dato.indice, dato.dia[3].fecha, dato.dia[3].turno, dato.dia[3].idProfesor, dato.dia[3].profesor, dato.dia[3].idCanchero, dato.dia[3].canchero, dato.dia[3].autor1) }}>
                                                                {dato.dia[3].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[4] && fechaControl > (new Date(dato.dia[4].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[4].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[4].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[4].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 4, 'viernes', dato.indice, dato.dia[4].fecha, dato.dia[4].turno, dato.dia[4].idProfesor, dato.dia[4].profesor, dato.dia[4].idCanchero, dato.dia[4].canchero, dato.dia[4].autor1) }}>
                                                                {dato.dia[4].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[5] && fechaControl > (new Date(dato.dia[5].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[5].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[5].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[5].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 5, 'sabado', dato.indice, dato.dia[5].fecha, dato.dia[5].turno, dato.dia[5].idProfesor, dato.dia[5].profesor, dato.dia[5].idCanchero, dato.dia[5].canchero, dato.dia[5].autor1) }}>
                                                                {dato.dia[5].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                        {franjas.horario[index].dia[6] && fechaControl > (new Date(dato.dia[6].fecha).getTime()) && fechaControl2 < (new Date(franjas.horario[0].dia[6].fecha).getTime()) ? franjas.horario[index].granDemanda && !dato.dia[6].colorProfesor ?
                                                            <td bgcolor={color} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> :
                                                            <td bgcolor={dato.dia[6].colorProfesor} style={{ border: 'black 1px solid' }}
                                                                onClick={e => { agendar(franjas._id, 6, 'domingo', dato.indice, dato.dia[6].fecha, dato.dia[6].turno, dato.dia[6].idProfesor, dato.dia[6].profesor, dato.dia[6].idCanchero, dato.dia[6].canchero, dato.dia[6].autor1) }}>
                                                                {dato.dia[6].autor1 ? <div className='w3-white w3-round-large w3-margin-top w3-text-indigo '><b>Agendado</b></div>
                                                                    : null}</td> : null}
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            : null
                    }
                </>
            )
        }
        else {
            return (
                <div>Franjas vacia</div>
            )
        }
    }
    else {
        return null
    }
}
