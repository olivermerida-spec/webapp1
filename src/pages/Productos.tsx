import { useEffect, useState } from "react";
import { getProducts, createProduct, type Product } from "../services/productService";

export default function Productos() {
  // Estados para la lista, carga y errores
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Estados para el formulario de registro
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(10);

  // Funcion para cargar productos al iniciar
  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Funcion para guardar un nuevo producto (POST)
  const handleSave = async () => {
    if (!title.trim()) {
      alert("Ingresa el nombre del producto");
      return;
    }

    try {
      setError("");
      const nuevoProducto = await createProduct({
        title: title,
        price: Number(price),
      });

      // Agregamos el producto creado a la lista en pantalla
      setProducts([...products, nuevoProducto]);
      setTitle("");
      setPrice(10);
    } catch (err) {
      setError("No se pudo registrar el producto");
    }
  };

  return (
    <div>
      <h2>Productos</h2>

      <h3 style={{ marginTop: "15px", marginBottom: "10px" }}>Registrar Producto</h3>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Nombre producto"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <button onClick={handleSave}>Guardar</button>
      </div>

      <h3 style={{ marginBottom: "10px" }}>Lista de Productos</h3>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul style={{ paddingLeft: "20px" }}>
        {products.map((item, index) => (
          <li key={item.id ?? index} style={{ marginBottom: "15px" }}>
            <strong>{item.title}</strong>
            <br />
            Precio: ${item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}