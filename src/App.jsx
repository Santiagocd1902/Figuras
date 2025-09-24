import { useState } from "react";
import "./App.css";

function App() {
  // Lista de figuras (Triángulo primero, Círculo último)
  const shapes = [
    { name: "Triángulo", sides: 3 },
    { name: "Cuadrado", sides: 4 },
    { name: "Pentágono", sides: 5 },
    { name: "Hexágono", sides: 6 },
    { name: "Heptágono", sides: 7 },
    { name: "Octágono", sides: 8 },
    { name: "Círculo", sides: 1 },
  ];

  const [index, setIndex] = useState(0);
  const [color, setColor] = useState("#d8bfd8"); // morado claro por defecto

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % shapes.length);
  };

  // Generar clipPath según la figura
  const getClipPath = (shape) => {
    if (shape.sides === 1) {
      return "circle(50% at 50% 50%)"; // círculo
    }
    if (shape.sides === 4) {
      return "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"; // cuadrado perfecto
    }
    // otros polígonos regulares
    return `polygon(${Array.from({ length: shape.sides }, (_, i) => {
      const angle = (i * 2 * Math.PI) / shape.sides - Math.PI / 2;
      const x = 50 + 45 * Math.cos(angle);
      const y = 50 + 45 * Math.sin(angle);
      return `${x}% ${y}%`;
    }).join(",")})`;
  };

  const shapeStyle = {
    margin: "20px auto",
    width: "200px",
    height: "200px",
    background: color,
    transition: "all 0.5s ease",
    clipPath: getClipPath(shapes[index]),
    // ❌ Quitamos el borde negro
  };

  const buttonStyle = {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "14px",
    cursor: "pointer",
    borderRadius: "6px",
    border: "1px solid #ccc",
    background: "white",
    color: "#333",
    transition: "all 0.3s ease",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>{shapes[index].name}</h1>

      <div style={shapeStyle}></div>

      <button
        onClick={handleNext}
        style={{
          ...buttonStyle,
          background: "#6a5acd", // morado más fuerte
          color: "white",
        }}
      >
        Cambiar figura
      </button>

      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => setColor("#d8bfd8")} // morado claro
          style={{ ...buttonStyle, background: "#d8bfd8" }}
        >
          Morado claro
        </button>
        <button
          onClick={() => setColor("#add8e6")} // azul claro
          style={{ ...buttonStyle, background: "#add8e6" }}
        >
          Azul claro
        </button>
        <button
          onClick={() => setColor("#ffb6c1")} // rosa
          style={{ ...buttonStyle, background: "#ffb6c1" }}
        >
          Rosa
        </button>
      </div>
    </div>
  );
}

export default App;
