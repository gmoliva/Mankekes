import { useState } from 'react'
import { Button, Container, Heading, HStack, Stack,Select, FormControl, FormLabel,Input} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import {createUsuario} from '../../data/usuarios'
import  Swal  from 'sweetalert2'

const usuarios = () => {

    const [Usuario, setProduct] = useState({
        rut:'',
        nombre:'',
        domicilio:'',
        email:'',
        numero:'',
        tipoUsuario:'',
        estadoUsuario:''
    })

    const router = useRouter()

    //console.log(Usuario)

    const handleChange = (e) => {
        setProduct({
            ...Usuario,
            [e.target.name]: e.target.value
        })  
    }

    const submitProduct = (e) => {
        e.preventDefault()
        createUsuario(Usuario).then(res => {
            //console.log(res.data.name)
        })

        Swal.fire({
            title: 'Se creo un nuevo usuario',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
            router.push('../dashboard')
            }
        })
    }

    return (
        <Container maxW="container.xl" mt={10}>
            <Heading as={"h1"} size={"2xl"} textAlign={"center"}>Crear Usuario</Heading>
            <Stack spacing={4} mt={10}>
                <FormControl id="rut"> 
                    <FormLabel>RUT</FormLabel>
                    <Input name="rut" placeholder="01.234.567-8" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="nombre"> 
                    <FormLabel>Nombre</FormLabel>
                    <Input name={"nombre"} placeholder="Norman Vergara" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="domicilio"> 
                    <FormLabel>Domicilio</FormLabel>
                    <Input name={"domicilio"} placeholder="Calle falsa 123" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="email"> 
                    <FormLabel>Email</FormLabel>
                    <Input name={"email"} placeholder="mail@gmail.com" type="text" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="numero"> 
                    <FormLabel>Numero de contacto</FormLabel>
                    <Input name={"numero"} placeholder="912345678" type="number" onChange = {handleChange}/>
                </FormControl> 

                <FormControl id="tipoUsuario">
                    <h1>Tipo de usuario</h1>
                    <Select name={"tipoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='0'>Administrador</option>
                        <option name={"tipoUsuario"} onChange = {handleChange} value='1'>Conserje</option>
                    </Select>
                </FormControl> 

                <FormControl id="estadoUsuario"> 
                    <h1>Estado del usuario</h1>
                    <Select name={"estadoUsuario"} onChange = {handleChange} placeholder='Seleccione el tipo de usuario'>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='0'>Empleado</option>
                        <option name={"estadoUsuario"} onChange = {handleChange} value='1'>Desvinculado de la empresa</option>
                    </Select>
                </FormControl> 

                </Stack>
            <HStack>
                <Button colorScheme="blue" mt={10} mb={10} onClick={submitProduct}>Crear</Button>
                <Button colorScheme="red" mt={10} mb={10} onClick={() => router.push('/')}>Cancelar</Button>
            </HStack>
        </Container>
    )
}

export default usuarios

//<h1>Tipo de usuario</h1>
//<Select placeholder='Seleccione el tipo de usuario'>
//<option value='0'>Administrador</option>
//<option value='1'>Conserje</option>
//</Select>


/* 
<InputForm label="RUT"  name="rut" placeholder="01.234.567-8" type="text" onChange = {handleChange} />    
<InputForm label="Email"  name="email" placeholder="mail@gmail.com" type="text" onChange = {handleChange} />
<InputForm label="Numero de contacto"  name="ncontacto" placeholder="912345678" type="number" onChange = {handleChange}/>
<InputForm label="Tipo de usuario"  name="tipo" placeholder="0" type="number" onChange = {handleChange}/>
<InputForm label="Estado del usuario"  name="estado" placeholder="1" type="number" onChange = {handleChange}/> */