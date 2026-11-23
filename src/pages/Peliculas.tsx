import { useEffect, useState } from "react";
import { getPeliculas, createPelicula, type Pelicula } from "../services/peliculaService";

export default function Peliculas() {
  // Estados principales
  const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados del formulario
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number>(5);

  // Cargar datos con async/await
  const loadPeliculas = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getPeliculas();
      setPeliculas(data);
    } catch (err) {
      setError("No se pudieron cargar los datos de la API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeliculas();
  }, []);

  // Registrar nuevo item
  const handleSave = async () => {
    if (!title.trim()) {
      alert("Ingresa un título");
      return;
    }

    try {
      setError("");
      const nuevaPelicula = await createPelicula({
        title: title,
        rating: Number(rating),
      });

      setPeliculas([...peliculas, nuevaPelicula]);
      setTitle("");
      setRating(5);
    } catch (err) {
      setError("No se pudo registrar el elemento");
    }
  };

  return (
    <div>
      <h2>Peliculas</h2>

      <h3 style={{ marginTop: "15px", marginBottom: "10px" }}>Registrar Película / Producto</h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
        <button onClick={handleSave}>Guardar</button>
      </div>

      <h3 style={{ marginBottom: "10px" }}>Lista de Películas</h3>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ paddingLeft: "20px" }}>
        {peliculas.map((item, index) => (
          <li key={item.id ?? index} style={{ marginBottom: "15px" }}>
            <strong>{item.title}</strong>
            <br />
            Rating: ⭐ {item.rating}
          </li>
        ))}
      </ul>
    </div>
  );
}