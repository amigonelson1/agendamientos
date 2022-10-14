import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import rutas from '../helpers/rutas'

const Titulo = {
    maxWidth: '700px',
    margin: '10px auto',
    color: '#06219C',
    lineHeight: '30px',
    textAlign: 'justify',
}


export function Ayuda() {

    window.scroll(0, 0)

    const [pagina, setpagina] = useState(1)

    const siguiente = () => {
        if (pagina < 4) { setpagina(pagina + 1) }
        if (pagina === 4) { setpagina(1) }
    }

    const anterior = () => {
        if (pagina > 1) { setpagina(pagina - 1) }
        if (pagina === 1) { setpagina(4) }
    }

    return (
        <div className='componentes w3-animate-zoom'>
            <div className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large ">
                <div className="w3-container w3-right-align w3-text-indigo">
                    <Link to={rutas.admin}>
                        <b >cerrar</b>
                    </Link>
                </div>
                <div style={{ cursor: 'pointer' }} className="w3-left w3-padding w3-text-indigo"
                    onClick={e => anterior()}><b>&#10094; anterior</b></div>
                <div style={{ cursor: 'pointer' }} className='w3-right w3-padding w3-text-indigo'
                    onClick={e => siguiente()}><b>siguiente &#10095;</b></div>
                <div style={{ marginTop: '35px' }} className="w3-container w3-panel w3-padding w3-gray w3-border w3-round-large ">
                    <div style={{ maxWidth: '800px', margin: '10px auto' }} className="w3-container w3-panel w3-padding w3-white w3-border w3-round-large">
                        {pagina === 1 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo}><b>
                                    A continuación encontrarás ayuda básica acerca de la configuración de los diferentes componentes de este aplicativo.
                                </b>
                                </h2>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(2)}>
                                    <ul><b>Página:</b>
                                        <li>Personalizar</li>
                                        <li>Imágenes</li>
                                    </ul>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(3)}>
                                    <ul><b>Horario:</b>
                                        <li>Configurar</li>
                                        <li>Ver horarios</li>
                                    </ul>
                                </div>
                                <div style={{ cursor: 'pointer' }} onClick={e => setpagina(4)}>
                                    <ul><b>Usuarios:</b>
                                        <li>Registrar</li>
                                        <li>Administrar</li>
                                        <li>Mi cuenta</li>
                                        <li>Formularios</li>
                                    </ul>
                                </div>
                            </div> : null}
                        {pagina === 2 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo} className='w3-center'><b>Página</b></h2>
                                <br></br>
                                <header><b>Personalizar</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte encontrarás todas las opciones para personalizar tu sitio web y  forma parte de los aspectos y datos importantes o relevantes que tus usuarios observan al momento de ingresar.
                                    Para editar estos datos debes dar clic en el botón ubicado en la parte superior <b>“Editar datos club”</b> o en <b>“Editar”</b> ubicado en la parte inferior, al hacer esto se te cargaran los campos con los
                                    datos ya almacenados, simplemente debes borrar o cambiar el texto del campo que desees editar, cuando estes seguro de tus cambios da clic en el botón de <b>“Actualizar”</b> para que los cambios
                                    queden guardados en la base de datos del aplicativo, en caso contrario que no desees cambiar nada simplemente da clic en el botón de <b>“Cancelar”</b> y ningún cambio se registrará.<br></br>
                                    Existen tres(3) botones switch dentro de esta configuración: <b>“Mostrar título en encabezado”</b> como su nombre lo dice, permitirá que el título se observe dentro del campo centrado en la imagen principal,
                                    si deseas mostrar imágenes con información relevante y el titulo tapa parte de esa información simplemente deshabilita lo, <b>”Mostrar presentación de imágenes”</b> mostrará un carrete de imágenes
                                    independiente de las imágenes principales de la página, habilítalo si deseas mostrar más imágenes de algún evento o información adicional y por último <b>“Mostrar clima”</b> el cual mostrará una barra
                                    que permitirá al usuario ver el clima que tiene la ciudad de Bucaramanga por defecto, se mostrará el clima por horas y por días. <Link to={rutas.adminPagina}>(ir a ...)</Link>
                                </p><br></br>
                                <header><b>Imágenes</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte encontrará dos botones, el primero  <b>“Agregar imágenes”</b> el cual permite agregar un máximo de cinco(5) archivos por selección, pero ud puede subir la cantidad de archivos en formatos:
                                    jpg, jpeg, png, jfif que desee.<br></br>
                                    <b>“Mis imágenes”</b> listara o mostrará la cantidad de imágenes que tiene ya guardadas en el aplicativo, cada archivo estará acompañado de tres iconos los cuales permitirán que ud edite su visualización
                                    o elimine dicho archivo, le recordamos que para encabezado solo se permitirá un máximo de cinco imágenes, mientras que para presentacion de imagenes ya es decisión suya de cuantos archivos desea mostrar.
                                    <Link to={rutas.adminImagenes}>(ir a ...)</Link>
                                </p><br></br>
                            </div>
                            : null}
                        {pagina === 3 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo} className='w3-center'><b>Horario</b></h2>
                                <header><b>Configurar</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte encontrará todo lo relacionado para crear y configurar sus horarios, como puede observar existen seis (6) apartados, describiremos uno a uno para mayor comprensión.<br></br>
                                    <b>Horarios presentes:</b> en esta parte solo se listaran los horarios activos, pero No todos los horarios, aquí puede editar el título de dicho horario y eliminarlo si lo decide, adicional hay dos botones tipo switch para habilitar la función de
                                    <b>“Horario clases”</b> el cual permitirá que los usuarios visualicen el horario en la semana completa, si apaga esta función sólo se visualizará el dia presente y el siguiente dia en el horario, ocultando los demás días,
                                    también está la función de <b>“autoRenovar”</b> la cual será la encargada de renovar el horario según el administrador lo convenga, esto para el caso de horarios repetitivos.<br></br>
                                    <b>Hora para apertura y cierre de solicitud de turnos:</b> habilitar esta función limitará al usuario a solo pedir turnos dentro de los horarios establecidos, pero para definir dichos horarios primero debe apagar la
                                    función para que se habiliten los campos de editar horas. Apagado los usuarios podrán pedir turnos a cualquier hora sin límite alguno.<br></br>
                                    <b>Selección de tipo de solicitud de turno:</b> se incorpora esta función para agendar los turnos de la siguiente manera, en apagado los turnos se agendaron por orden de solicitud, mientras que si está encendido se
                                    debe previo establecer un lapso de tiempo para guardar las solicitudes dentro de este lapso y se haga un sorteo para generar un único turno, esta opción está pensada para cuando se desea discriminar el orden de llegada y
                                    pensando en que no todos los usuarios deben estar compitiendo para agendar sus turnos.<br></br>
                                    <b>Opción de cancelar turno:</b> si se encuentra apagada esta función los usuarios No podrán cancelar sus turnos ya agendados, si lo habilita debe previo elegir las horas límites tanto am como pm para la cancelación de los mismos.<br></br>
                                    <b>Dia para renovar horario:</b> aquí el administrador decide en que dia y horario se actualicen los horarios que cuentan con esta función activa, recuerde que al renovarse un horario automáticamente el horario presente
                                    quedará oculto, por lo que se aconseja habilitar esta función para días domingos en horas de la noche. Si se decide cambiar el horario simplemente cambie el dia o la hora y se habilitará un botón <b>“Actualizar”</b> el cual
                                    después de elegir el día u hora debe oprimir para que se hagan efectivos los cambios<br></br>
                                    <b>Crear nuevo espacio con horario:</b> en esta parte el administrador puede crear la cantidad de espacios con su respectivo horario que desee, seleccionar primero los días para los cuales las franjas serán repetitivas, si por ejemplo los sábados las franjas
                                    son diferentes se debe generar un único horario para ese dia, lo otro a tener en cuenta es el título del horario, defina bien sus titulos para evitar futuras confusiones y pueda identificar un mismo lugar con diferentes
                                    franjas, por ejemplo para una cancha 1 puede definir un título cancha 1 semana para horarios entre semana y cancha 1 fines de semana para franjas en los fines de semana, lo anterior para diferenciar los horarios pero
                                    en un mismo lugar. Algo que sí puede hacer es definir diferentes franjas en un mismo horario, es decir, puede elegir sus primeras franjas de 45 minutos con descansos de 15 minutos y esto en horas de la mañana y
                                    para por la tarde ya las franjas pueden ser de una hora o más con o sin descanso entre franjas, el aplicativo está diseñado para calcular los tiempos y ver si se puede fraccionar, de lo contrario se le advertirá.
                                    Para lo anterior primero cree su horario con las franjas a su necesidad ya estando seguro de clic en <b>“validar y agregar”</b> y aquí ya podrá agregar otro tipo de franjas a partir de la última franja que quedó
                                    establecida. Puede fraccionar las franjas a su completa necesidad, cuando ya esté seguro de todo su horario dé clic en <b>“Crear horario”</b> para que su horario quede registrado en la base de datos. En este apartado
                                    también se encuentran los botones de <b>“Mostrar horario completo”</b> y de <b>“Renovar horario”</b> para que de una vez decida si habilitar o apagar dichas funciones.<Link to={rutas.adminHorario}>(ir a ...)</Link>
                                </p><br></br>
                                <header><b>Ver horarios</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    Aquí encontrará <b>“Mostrar horarios”</b> botón que le mostrará todos los horarios existentes, incluidos los que ya fueron desactivados, en este apartado puede aun ver, editar e incluso eliminar de forma definitiva
                                    cada horario.
                                    <b>Nota importante:</b> ud como administrador puede editar directamente cada horario sin entrar en este apartado, lo puede hacer directamente sobre los horarios visibles y así evitar confusiones con  los
                                    horarios de un mismo título pero ya con fechas vencidas.<Link to={rutas.adminTodoHorarios}>(ir a ...)</Link>
                                </p><br></br>
                            </div>
                            : null}
                        {pagina === 4 ?
                            <div className="w3-text-indigo">
                                <h2 style={Titulo} className='w3-center'><b>Usuarios</b></h2>
                                <header><b>Registrar</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    Aquí puede registrar, activar y asignar directamente el rol a sus nuevos usuarios.<Link to={rutas.adminRegistro}>(ir a ...)</Link>
                                </p><br></br>
                                <header><b>Administrar</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    En esta parte puede visualizar y editar todos los usuarios, para visualizar puede filtrar su búsqueda por tipo de roll y si está o no activo, para editar puede buscar por documento a sus usuarios o en la búsqueda
                                    dar clic en usuario que desee editar, se le abrirá un nuevo campo con la información del usuario más abajo, y encontrará los botones de <b>“editar”</b> con el cual ud puede editar ese usuario.
                                    Aquí también puede eliminarlo.<Link to={rutas.adminUsers}>(ir a ...)</Link>
                                </p><br></br>
                                <header><b>Mi cuenta</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    Mi cuenta mostrará sus datos o mostrará los datos del usuario en sesión, este apartado permite visualizar cómo lo vería un usuario normal, aquí sólo se mostrarán los campos para editar según el administrador haya
                                    definido, si ud como administrador desea editar su datos le recomendamos hacerlo en el apartado de administrar ya que en dicho apartado todos los campos si estarán habilitados.<Link to={rutas.adminMeUser}>(ir a ...)</Link>
                                </p><br></br>
                                <header><b>Formularios</b></header>
                                <p style={{ textAlign: 'justify' }}>
                                    Aquí puede configurar los campos que desea le sean solicitados al usuario nuevo al momento de registrarse y a los demás usuarios al momento de editar sus datos, los campos de Correo, Documento
                                    y Código si serán obligatorios al momento de registrarse. Recuerde que puede habilitar o deshabilitar según las necesidades o lo considere conveniente.<Link to={rutas.adminPermisos}>(ir a ...)</Link>
                                </p><br></br>
                            </div>
                            : null}
                        <div style={{ fontSize: '17px', cursor: 'pointer' }} className='w3-center w3-text-indigo'>
                            {pagina === 1 ? <b style={{ textDecoration: 'underline' }}>1</b> : <div style={{ display: 'inline' }} onClick={e => setpagina(1)}>1</div>}
                            {pagina === 2 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>2</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(2)}>2</div>}
                            {pagina === 3 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>3</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(3)}>3</div>}
                            {pagina === 4 ? <b style={{ textDecoration: 'underline', marginLeft: '8px' }}>4</b> : <div style={{ display: 'inline', marginLeft: '8px' }} onClick={e => setpagina(4)}>4</div>}
                        </div>
                        <div className="w3-container w3-center w3-text-indigo">
                            <Link to="/users/admin/">
                                <h3>
                                    <b>Cerrar</b>
                                </h3>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
