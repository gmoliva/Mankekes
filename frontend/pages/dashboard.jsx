import { Button, Container, Heading, HStack, Input, Stack, Table, Thead, Tr, Td, Th, Tbody } from '@chakra-ui/react'
import React from 'react'
import { useRouter } from 'next/router'



const adminDashboard = () => {
    const router = useRouter()
    return (
        <div>
            <h1>This is the admin landing page</h1>         
                <Button colorScheme={"teal"} onClick={() => router.push('./usuarios/crear')} >Crear usuario</Button> 
                <Button colorScheme={"teal"} onClick={() => router.push('./mostrar')}>Ver empleados</Button>
        </div>
    )
}

export default adminDashboard