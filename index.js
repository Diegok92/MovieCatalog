const express = require("express");
const path = require("path");
const fetch = require("node-fetch"); // Importar fetch para realizar solicitudes HTTP

const app = express();

// Configurar la carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Configurar la ruta para servir el archivo HTML principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// Ruta para buscar películas
app.get("/search-movie", async (req, res) => {
  const movieName = req.query.movieName;
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=API_KEY&query=${encodeURIComponent(
        movieName
      )}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error al buscar la película:", error);
    res.status(500).json({
      error:
        "Ocurrió un error al buscar la película. Por favor, inténtalo de nuevo más tarde.",
    });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express iniciado en el puerto ${PORT}`);
});
