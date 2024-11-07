import React, { useState } from "react";

function App() {
  const [q, setQ] = useState("");
  const [resultados, setResultados] = useState(null);
  const [error, setError] = useState("");

  const localhost = "http://localhost:3000/librosControlers/";
  const buscarLibros = async () => {
    setError("");
    setResultados(null);

    const response = await fetch(`${localhost}/search?q=${q}`);
    if (!response.ok) {
      throw new Error(
        "No se encontraron resultados o hubo un error en la búsqueda"
      );
    }

    const data = await response.json();
    setResultados(data);
  };

  return (
    <div>
      <h1>Buscador de Libros</h1>

      <div>
        <input
          type="text"
          placeholder="Buscar por nombre, autor o ISBN"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <button onClick={buscarLibros}>Buscar</button>
      </div>
      <div>
        {resultados ? (
          <pre
            style={{
              background: "#f4f4f4",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            {JSON.stringify(resultados, null, 2)}
          </pre>
        ) : (
          <p>No hay resultados para mostrar.</p>
        )}
      </div>
    </div>
  );
}

export default App;
