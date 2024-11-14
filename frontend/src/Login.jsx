//import React, { useState } from "react";
import { useState } from 'react';
import './Login.css'

function Login() {
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [contraseña, setContraseña] = useState("")
  const [telefono, setTelefono] = useState("")
  const [iddireccion, setIdDireccion] = useState("")


  // Controla el enví de las funciones del formulario y la api
  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("envio de formulario exitoso")

  try { const response = await fetch("http://localhost:3000/api/usuario/register", {
    method: "POST",
    headers: {"Content-Type": "application/json"},

    body: JSON.stringify({
      nombre,
      apellido,
      username,
      email,
      contraseña,
      telefono,
      iddireccion,
    })
  })

const datos = await response.json()
console.log("Estado de la respuesta:", response.status);
console.log("Respuesta de la API:", datos);

if (response.ok) {
  console.log("Su registro fue exitoso:", datos)
} else {
  console.error("Error al registrarse", datos)
}
} catch (error) {
  console.log("Error en la solicitud", error)
}
}

  return (
    <>

      <div className="conteiner-label" >
        <section>
          <div className="primerlinea" >
            <a className ="login" >Inicio</a>
            <span className="separador" >&gt;</span>
            <a className="iniciosesion">Mi Cuenta</a>
            <span>&gt;</span>
            <a className="login" >Login</a>

          </div>

        <h1>Registrar cuenta</h1>
        </section>

        <section className="conteiner-input" >
          <div className="conteiner" >
            <div className="formulario" >

              <form id="login-form" onSubmit={handleRegister}>
                <div className="label" >

                  <label className='form-class'>Nombre</label>
                  <input type="text" placeholder='Ingrese nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} />

                  <label className='form-class'>Apellido</label>
                  <input type="text" placeholder='Ingrese apellido' value={apellido} onChange={(e) => setApellido(e.target.value)} />

                  <label className="form-class">Email</label>
                  <input type="text" placeholder="Ingrese su email" value={email} onChange={(e) => setEmail(e.target.value)}/>

                  <label className='form-class'>Username</label>
                  <input type="text" placeholder='Ingrese username' value={username} onChange={(e) => setUsername(e.target.value)} />

                  <label className='form-class'>Contraseña</label>
                  <input type="password" placeholder='Ingrese contraseña' value={contraseña} onChange={(e) => setContraseña(e.target.value)} /> <br />
                  <a href='#'>¿Olvidaste tu contraseña?</a> <br />

                  <label className='form-class'>Teléfono</label>
                  <input type="text" placeholder='Ingrese número tel.' value={telefono} onChange={(e) => setTelefono(e.target.value)} />

                  <label className='form-class'>Dirección</label>
                  <input type="text" placeholder='Ingrese dirección' value={iddireccion} onChange={(e) => setIdDireccion(e.target.value)} />
                </div>

                <button type="submit" className="botonlogin" >Registrarse</button>
              </form>
              <p>¿No tenés cuenta todavía? <a href="#">Crear Cuenta</a> </p>
            </div>
          </div>
        </section>

        <footer className="footer" >
          <div className="informacioncontacto" >
            <h3>CONTÁCTANOS</h3>
            <p>3804-645979</p>
            <p>pepeloquito@yahoo.com.ar</p>
            <p>Se puede ingresar mas informacion con otros p</p>
          </div>

          <div className="redes-sociales">
            <a className="icono-insta" href='#'>Instagram [icono]</a>
            <br />
            <a className="icono-face" href='#'>Facebook [icono]</a>
          </div>
        </footer>
      </div>



    </>
  );
}

export default Login;


