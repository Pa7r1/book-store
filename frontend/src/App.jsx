//import React, { useState } from "react";
import './App.css'

function App1() {
  //solo armo estructura para tener componentes, despues de eso se agregan funcionalidades.


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

        <h1>Inicio de Sesión</h1>
        </section>

        <section className="conteiner-input" >
          <div className="conteiner" >
            <div className="formulario" >
              <form id="login-form">
                <div className="email" >
                  <label className="form-class">Email</label>
                  <input type="text" className="input-email" name="email" placeholder="Ingrese su email"/>
                </div>

                <div className="password" >
                  <label className="form-class">Contraseña</label>
                  <input type="password" className="input-password" name="password" placeholder="Ingrese contraseña" />
                  <a>¿Olvidaste tu contraseña?</a>
                </div>

                <button type="submit" className="botonlogin" >Iniciar Sesión</button>
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

export default App1;
