import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { HeroCards } from "./components/HeroCards";
import { Pencil, Trash2 } from "lucide-react";

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];

export default function ColorView() {
  const [colors, setColors] = useState<string[]>(defaultColors);
  const [savedColors, setSavedColors] = useState<string[][]>([]);
  const [editRow, setEditRow] = useState<number | null>(null);

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors];
    newColors[index] = value;
    setColors(newColors);
  };

  const handleSave = () => {
    setSavedColors((prev) => [...prev, [...colors]]);
  };

  const handleDelete = (rowIdx: number) => {
    setSavedColors((prev) => prev.filter((_, idx) => idx !== rowIdx));
  };

  const handleEdit = (rowIdx: number) => {
    setEditRow(rowIdx);
    setColors([...savedColors[rowIdx]]);
  };

  const handleUpdate = () => {
    if (editRow !== null) {
      setSavedColors((prev) =>
        prev.map((row, idx) => (idx === editRow ? [...colors] : row))
      );
      setEditRow(null);
      setColors(defaultColors);
    }
  };

  // ...existing imports and code...

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-6xl sm:mx-auto">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12">
            <h1 className="text-2xl font-semibold text-green-400 text-center mb-6">
              Selecciona tus colores
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              {/* Colores y HeroCards */}
              <div className="flex-1">
                <div className="mt-6">
                  {colors.map((color, index) => (
                    <div className="flex items-center space-x-4 mb-4" key={index}>
                      <label htmlFor={`color-${index}`} className="text-gray-200 font-medium">
                        Color {index + 1}:
                      </label>
                      <input
                        type="color"
                        id={`color-${index}`}
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-8 h-8 rounded-full shadow-inner border-2 border-green-500 bg-[#23272e] cursor-pointer"
                      />
                      <span className="text-gray-300 font-mono">{color}</span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-8 gap-4">
                    <button
                      onClick={editRow !== null ? handleUpdate : handleSave}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline"
                    >
                      {editRow !== null ? "Actualizar" : "Guardar selección"}
                    </button>
                    <Link
                      to="/"
                      className="bg-gray-800 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline flex items-center justify-center"
                    >
                      Regresar
                    </Link>
                    <Link
                      to="/fonts"
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline"
                    >
                      Ir a Fuentes
                    </Link>
                  </div>
                </div>
              </div>
              {/* HeroCards */}
              <div className="flex-1 flex justify-center w-full mt-8 lg:mt-0">
                <HeroCards />
              </div>
            </div>
          </div>
        </div>
        {/* Tabla CRUD en un recuadro aparte debajo, con el mismo ancho */}
        <div className="relative py-3  sm:mx-auto mt-8">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12 w-full">
            <h2 className="text-lg font-semibold text-green-400 mb-4">Tus selecciones</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#23272e] border border-green-500 rounded-lg">
                <thead>
                  <tr>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <th key={idx} className="px-2 py-2 text-green-400 border-b border-green-500">
                        Color {idx + 1}
                      </th>
                    ))}
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {savedColors.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-4">
                        No hay selecciones guardadas.
                      </td>
                    </tr>
                  )}
                  {savedColors.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((color, idx) => (
                        <td key={idx} className="px-2 py-2 text-center">
                          <span
                            className="inline-block w-6 h-6 rounded-full border-2 border-green-500"
                            style={{ background: color }}
                            title={color}
                          ></span>
                          <span className="ml-2 text-xs text-gray-300">{color}</span>
                        </td>
                      ))}
                      <td className="px-2 py-2 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(rowIdx)}
                          className="p-1 rounded hover:bg-green-700"
                          title="Modificar"
                        >
                          <Pencil className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          onClick={() => handleDelete(rowIdx)}
                          className="p-1 rounded hover:bg-red-700"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}