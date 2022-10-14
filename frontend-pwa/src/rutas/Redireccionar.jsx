import useAuth from '../auth/useAuth';
import roles from '../helpers/roles';
import rutas from '../helpers/rutas';
import { Navigate } from 'react-router-dom'

export default function Redireccionar() {

    const { roll } = useAuth();

    if (roll === roles.admin) { return <Navigate to={rutas.admin} /> }
    if (roll === roles.profesor) { return <Navigate to={rutas.profesor} /> }
    if (roll === roles.canchero) { return <Navigate to={rutas.canchero} /> }
    if (roll === roles.socio) { return <Navigate to={rutas.socio} /> }

}
