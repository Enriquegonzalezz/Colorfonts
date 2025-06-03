import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Pencil, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

const defaultColors = ["#000000", "#FFFFFF", "#F596D3", "#D247BF", "#61DAFB"];

// HeroCardPreview con estructura igual a HeroCards, pero colores dinámicos
function HeroCardPreview({ colors }: { colors: string[] }) {
  return (
    <div
      className="w-full max-w-[340px] rounded-2xl border-4 shadow-lg p-0 mx-auto transition-all"
      style={{
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        color: colors[2],
        borderColor: colors[3],
        boxShadow: `0 0 20px 2px ${colors[4]}55`,
      }}
    >
      <div className="flex flex-row items-center gap-4 p-6 pb-2">
        <Avatar>
          <AvatarImage alt="" src="https://github.com/" />
          <AvatarFallback style={{ background: colors[1], color: colors[2] }}>EG</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-bold text-lg" style={{ color: colors[2] }}>Enrique Gonzalez</span>
          <span className="text-sm" style={{ color: colors[2] }}>@kikegonza</span>
        </div>
      </div>
      <div className="px-6 pb-4" style={{ color: colors[2] }}>
        Funciona perfecto!
      </div>
      <div className="px-6 pb-4 flex flex-col items-start">
        <Badge
          style={{
            background: colors[3],
            color: colors[1],
            border: `1px solid ${colors[4]}`,
          }}
        >
          el mas popular
        </Badge>
        <div className="mt-2">
          <span className="text-3xl font-bold" style={{ color: colors[2] }}>$0</span>
          <span className="ml-2 text-muted-foreground" style={{ color: colors[2] }}> /month</span>
        </div>
        <div className="mt-2 text-sm" style={{ color: colors[2] }}>
          Lorem ipsum dolor sit, amet ipsum consectetur adipisicing elit.
        </div>
      </div>
      <div className="px-6 pb-4">
        <Button
          className="w-full"
          style={{
            background: colors[3],
            color: colors[1],
            border: `2px solid ${colors[4]}`,
          }}
        >
          Empezar prueba ahora
        </Button>
      </div>
      <hr className="w-4/5 m-auto mb-4 border-green-500" />
      <div className="px-6 pb-6">
        <div className="space-y-2">
          {["4 Team member", "4 GB Storage", "Upto 6 pages"].map((benefit) => (
            <span key={benefit} className="flex items-center text-sm" style={{ color: colors[2] }}>
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ background: colors[4] }}
              ></span>
              {benefit}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

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

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] py-6 flex flex-col justify-center items-center sm:py-12">
        <div className="relative py-3 sm:max-w-6xl sm:mx-auto">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12">
            <h1 className="text-2xl font-semibold text-green-400 text-center mb-6">
              Selecciona tus colores
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              {/* Colores */}
              <div className="flex-1">
                <div className="mt-6 w-full flex flex-col items-center">
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
              {/* HeroCard Preview con estructura igual a HeroCards */}
              <div className="flex-1 flex flex-col items-center w-full mt-8 lg:mt-0">
                <HeroCardPreview colors={colors} />
              </div>
            </div>
          </div>
        </div>
        {/* Tabla CRUD en un recuadro aparte debajo, con el mismo ancho */}
        <div className="relative py-3 sm:max-w-6xl sm:mx-auto mt-8">
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