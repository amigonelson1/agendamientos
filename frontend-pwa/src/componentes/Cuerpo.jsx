import React from 'react'
import { Encabezado } from './Encabezado';
import { TextoInformativo } from './TextoInformativo';
import { Horario } from './Horario';


export function Cuerpo() {
    return (
        <>
            <Encabezado />
            <TextoInformativo />
            <Horario />
        </>
    )
}
