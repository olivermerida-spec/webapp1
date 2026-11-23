const pacientesList = [
  { id: 1, nombre: "Juan Pérez", edad: 45 },
  { id: 2, nombre: "María López", edad: 32 }
];

export default function Pacientes() {
  return (
    <>
      <h2>Pacientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Edad</th>
          </tr>
        </thead>
        <tbody>
          {pacientesList.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.edad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}