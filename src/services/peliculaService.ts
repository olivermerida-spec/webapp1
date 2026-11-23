
export type Pelicula = {
  id?: number;
  title: string;
  rating: number;
};

const URL = "https://dummyjson.com/products";

// GET -> OBTENER LISTA
export const getPeliculas = async (): Promise<Pelicula[]> => {
  try {
    const response = await fetch(URL);

    if (!response.ok) {
      throw new Error("Error al obtener las películas");
    }

    const data = await response.json();
    // DummyJSON devuelve el array dentro de data.products
    return data.products;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// POST -> REGISTRAR NUEVO
export const createPelicula = async (pelicula: Pelicula): Promise<Pelicula> => {
  try {
    const response = await fetch(`${URL}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pelicula),
    });

    if (!response.ok) {
      throw new Error("Error al registrar película");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};