import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom';
import rutas from '../helpers/rutas';
import { Calendar } from 'primereact/calendar';
import swal from 'sweetalert';
import { Toast } from 'primereact/toast';

export default function Anuario() {

    const toast = useRef(null);
    const [date, setDate] = useState(new Date(2022, 0, 1))
    const [titulo, settitulo] = useState('')
    const [tablaMes, setTabla] = useState([])

    const Limpiar = () => {
        setDate(new Date(2022, 0, 1))
        settitulo('')
        setTabla([])
    }


    //funcion para crear la tabla del mes
    const Tabla = () => {
        if (titulo === '') {
            swal('Sin Título', 'Por favor defina un título primero para este calendario', 'info')
            return;
        }
        let anuario = []
        anuario['Titulo'] = titulo;
        let semanario = []
        let semana = []
        let anio = '';
        let mes = '';
        let totalDias = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        let diaInicio = date.getDay()
        anio = date.getFullYear()
        if (date.getMonth() === 0) { mes = 'Enero' }
        if (date.getMonth() === 1) { mes = 'Febrero' }
        if (date.getMonth() === 2) { mes = 'Marzo' }
        if (date.getMonth() === 3) { mes = 'Abril' }
        if (date.getMonth() === 4) { mes = 'Mayo' }
        if (date.getMonth() === 5) { mes = 'Junio' }
        if (date.getMonth() === 6) { mes = 'Julio' }
        if (date.getMonth() === 7) { mes = 'Agosto' }
        if (date.getMonth() === 8) { mes = 'Septiembre' }
        if (date.getMonth() === 9) { mes = 'Octubre' }
        if (date.getMonth() === 10) { mes = 'Noviembre' }
        if (date.getMonth() === 11) { mes = 'Diciembre' }
        anuario['Anio'] = anio;
        anuario['Mes'] = mes;
        let dias = diaInicio;
        let diadia = 1
        if (diadia === 1) {
            for (let i = 0; i < 7; i++) {
                if (dias === i) {
                    semana['Dia' + i] = diadia;
                    diadia = diadia + 1
                    dias = dias + 1;
                }
                else {
                    semana['Dia' + i] = null
                }
            }
            semanario.push(semana)
            semana = []
        }
        if (diaInicio < 5) {
            for (let i = 1; i < 5; i++) {
                for (let j = 0; j < 7; j++) {
                    if (diadia <= totalDias) {
                        semana['Dia' + j] = diadia;
                        diadia = diadia + 1
                        dias = dias + 1;
                    }
                    else {
                        semana['Dia' + j] = null
                    }
                }
                semanario.push(semana)
                semana = []
            }
        }
        else {
            for (let i = 1; i < 6; i++) {
                for (let j = 0; j < 7; j++) {
                    if (diadia <= totalDias) {
                        semana['Dia' + j] = diadia;
                        diadia = diadia + 1
                        dias = dias + 1;
                    }
                    else {
                        semana['Dia' + j] = null
                    }
                }
                semanario.push(semana)
                semana = []
            }
        }
        anuario['Semanario'] = semanario
        setTabla(anuario)
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
    //console.log(tablaMes)

    const Generar = () => {
        toast.current.show({ severity: 'info', summary: 'Aun sin funcionabilidad', detail: 'Lo sentimos, función aún no habilitada, pendiente para la siguiente versión.', life: 5000 });
        Limpiar()
    }

    const CrearMensualidad = () => {
        return (
            <>
                {tablaMes.Titulo !== undefined ?
                    <div className='w3-white w3-border w3-round-large' style={{ marginBottom: '20px' }}>
                        <div className='w3-center w3-text-indigo'>
                            <h1 style={{ marginBottom: '-20px' }}>{tablaMes.Titulo}</h1>
                            <h3 style={{ marginBottom: '-5px' }}>{tablaMes.Mes} - {tablaMes.Anio}</h3>
                        </div>
                        <div className="w3-container w3-responsive w3-margin-bottom">
                            <table style={{}} className="w3-table-all w3-centered w3-hoverable">
                                <thead>
                                    <tr className="w3-indigo">
                                        <th>Domingo</th>
                                        <th>Lunes</th>
                                        <th>Martes</th>
                                        <th>Miércoles</th>
                                        <th>Jueves</th>
                                        <th>Viernes</th>
                                        <th>Sábado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tablaMes.Semanario.map((dato, indice) => (
                                            <tr key={indice}>
                                                <td>{dato.Dia0}</td>
                                                <td>{dato.Dia1}</td>
                                                <td>{dato.Dia2}</td>
                                                <td>{dato.Dia3}</td>
                                                <td>{dato.Dia4}</td>
                                                <td>{dato.Dia5}</td>
                                                <td>{dato.Dia6}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className='w3-center w3-margin-bottom'>
                            <button className="w3-button w3-red w3-border w3-border-black w3-round-large w3-hover-cyan"
                                onClick={Generar}>
                                Generar
                            </button>
                        </div>
                    </div>
                    : null}
            </>
        )
    }

    return (
        <>
            <Toast ref={toast} />
            <div className='componentes w3-animate-zoom'>
                <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large w3-text-indigo">
                    <div className="w3-container w3-right-align w3-text-indigo">
                        <Link to={rutas.admin}>
                            <b >cerrar</b>
                        </Link>
                    </div>
                    <div className="w3-panel w3-gray w3-text-indigo w3-center w3-border w3-round-large">
                        <h2><b>Ajuste del anuario</b></h2>
                    </div>
                    <div className="w3-col m6 w3-panel w3-left-align">
                        <label><b>Por favor seleccione el año y mes a generar:</b><br />
                            <Calendar value={date} onChange={(e) => setDate(e.value)} view="month" dateFormat="mm/yy" yearNavigator yearRange="2022:2040" />
                        </label>
                    </div>
                    <div className="w3-col m6 w3-panel w3-left-align">
                        <label className="w3-text-indigo"><b>Título del lugar, localidad</b></label>
                        <input type="text" required maxLength="50" className="w3-input w3-border w3-round-large w3-animate-input w3-text-indigo"
                            placeholder="título" title="escriba aquí el título de este anuario, a qué o quién sera dedicado"
                            onChange={e => tituloAMay(e.target.value)} value={titulo} />
                    </div>
                    <div className='w3-center w3-col m12'>
                        <button className="w3-button w3-indigo w3-border w3-border-black w3-round-large w3-hover-cyan w3-small"
                            onClick={Tabla}>
                            Previsualizar
                        </button>
                    </div>
                </div>
                <CrearMensualidad />
            </div>
        </>
    )
}
