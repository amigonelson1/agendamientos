import React, { Fragment } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import { ConfigEmpresa } from '../componentes/ConfigEmpresa';
import { MenuInicio } from '../componentes/MenuInicio';
import { RegistroUsers } from '../componentes/RegistroUsers';
import { Busqueda } from '../componentes/Busqueda';
import { Ayuda } from '../componentes/Ayuda';
import { ConfHorario } from '../componentes/ConfHorario';
import { RegistroUsersAdmin } from '../componentes/RegistroUsersAdmin';
import { NotFoundPage } from '../componentes/NotFoundPage';
import roles from '../helpers/roles';
import { MenuAdmin } from '../componentes/MenuAdmin';
import { MenuProf } from '../componentes/MenuProf';
import { MenuCanc } from '../componentes/MenuCanc';
import { MenuSocio } from '../componentes/MenuSocio';
import rutas from '../helpers/rutas';
import useAuth from '../auth/useAuth';
import Redireccionar from './Redireccionar';
import { EditDatos } from '../componentes/EditDatos';
import NewPassword from '../componentes/NewPassword';
import Permisos from '../componentes/Permisos';
import Imagenes from '../componentes/Imagenes';
import { Acerca } from '../componentes/Acerca';
import { TodoHorarios } from '../componentes/TodoHorarios';
import { Cuerpo } from '../componentes/Cuerpo';
import Anuario from '../componentes/Anuario';
import Historial from '../componentes/Historial';

export function Rutas() {

    const { roll } = useAuth();

    return (
        <Fragment>
            <Routes>
                <Route path={rutas.home} element={!roll ? (<MenuInicio />) : (<Redireccionar />)} >
                    <Route path={rutas.registro} element={!roll ? (<RegistroUsers />) : (<Redireccionar />)} />
                    <Route path={rutas.home} element={(<Cuerpo />)} />
                </Route>
                <Route path={rutas.password} element={!roll ? (<NewPassword />) : (<Redireccionar />)} ></Route>
                <Route path={rutas.admin} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<MenuAdmin />) : (<Redireccionar />)} >
                    <Route path={rutas.adminPagina} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<ConfigEmpresa />) : (<Redireccionar />)} />
                    <Route path={rutas.adminImagenes} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Imagenes />) : (<Redireccionar />)} />
                    <Route path={rutas.adminHorario} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<ConfHorario />) : (<Redireccionar />)} />
                    <Route path={rutas.adminTodoHorarios} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<TodoHorarios />) : (<Redireccionar />)} />
                    <Route path={rutas.adminAnuario} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Anuario />) : (<Redireccionar />)} />
                    <Route path={rutas.adminHistorial} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Historial />) : (<Redireccionar />)} />
                    <Route path={rutas.adminPermisos} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Permisos />) : (<Redireccionar />)} />
                    <Route path={rutas.adminRegistro} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<RegistroUsersAdmin />) : (<Redireccionar />)} />
                    <Route path={rutas.adminUsers} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Busqueda />) : (<Redireccionar />)} />
                    <Route path={rutas.adminMeUser} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<EditDatos />) : (<Redireccionar />)} />
                    <Route path={rutas.adminAyuda} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Ayuda />) : (<Redireccionar />)} />
                    <Route path={rutas.adminAcerca} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.admin ? (<Acerca />) : (<Redireccionar />)} />
                    <Route path={rutas.admin} element={(<Cuerpo />)} />
                </Route>
                <Route path={rutas.profesor} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.profesor ? (<MenuProf />) : (<Redireccionar />)} >
                    <Route path={rutas.profesorUser} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.profesor ? (<EditDatos />) : (<Redireccionar />)} />
                    <Route path={rutas.profesor} element={(<Cuerpo />)} />
                </Route>
                <Route path={rutas.canchero} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.canchero ? (<MenuCanc />) : (<Redireccionar />)} >
                    <Route path={rutas.cancheroUser} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.canchero ? (<EditDatos />) : (<Redireccionar />)} />
                    <Route path={rutas.canchero} element={(<Cuerpo />)} />
                </Route>
                <Route path={rutas.socio} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.socio ? (<MenuSocio />) : (<Redireccionar />)} >
                    <Route path={rutas.socioUser} element={!roll ? (<Navigate to={rutas.home} />) : roll === roles.socio ? (<EditDatos />) : (<Redireccionar />)} />
                    <Route path={rutas.socio} element={(<Cuerpo />)} />
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Fragment>
    )
}