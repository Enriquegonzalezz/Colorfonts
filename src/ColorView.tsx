"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { HeroCards } from "./components/HeroCards"
import { Pencil, Trash2 } from "lucide-react"

const defaultColors = ["#000000", "#FFFFFF", "#005CA1", "#facc15", "#61DAFB"]

export default function ColorView() {
  const [colors, setColors] = useState<string[]>(defaultColors)
  const [savedColors, setSavedColors] = useState<string[][]>([])
  const [editRow, setEditRow] = useState<number | null>(null)

  const handleColorChange = (index: number, value: string) => {
    const newColors = [...colors]
    newColors[index] = value
    setColors(newColors)
  }

  const handleSave = () => {
    setSavedColors((prev) => [...prev, [...colors]])
  }

  const handleDelete = (rowIdx: number) => {
    setSavedColors((prev) => prev.filter((_, idx) => idx !== rowIdx))
  }

  const handleEdit = (rowIdx: number) => {
    setEditRow(rowIdx)
    setColors([...savedColors[rowIdx]])
  }

  const handleUpdate = () => {
    if (editRow !== null) {
      setSavedColors((prev) => prev.map((row, idx) => (idx === editRow ? [...colors] : row)))
      setEditRow(null)
      setColors(defaultColors)
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-6xl sm:mx-auto">
          <div className="relative px-4 py-10 bg-white border border-gray-200 shadow-lg rounded-lg sm:p-12">
            <h1 className="text-2xl font-semibold text-[#005CA1] text-center mb-6">Selecciona tus colores</h1>
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
              <div className="flex-1">
                <div className="mt-6">
                  {colors.map((color, index) => (
                    <div className="flex items-center space-x-4 mb-4" key={index}>
                      <label htmlFor={`color-${index}`} className="text-gray-700 font-medium">
                        Color {index + 1}:
                      </label>
                      <input
                        type="color"
                        id={`color-${index}`}
                        value={color}
                        onChange={(e) => handleColorChange(index, e.target.value)}
                        className="w-8 h-8 rounded border-2 border-[#005CA1] cursor-pointer"
                      />
                      <span className="text-gray-600 font-mono">{color}</span>
                    </div>
                  ))}
                  <div className="flex justify-between mt-8 gap-4">
                    <button
                      onClick={editRow !== null ? handleUpdate : handleSave}
                      className="bg-[#005CA1] hover:bg-[#004080] text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      {editRow !== null ? "Actualizar" : "Guardar selección"}
                    </button>
                    <Link
                      to="/"
                      className="bg-white hover:bg-gray-50 text-[#005CA1] border border-[#005CA1] font-medium py-2 px-4 rounded transition-colors flex items-center justify-center"
                    >
                      Regresar
                    </Link>
                    <Link
                      to="/fonts"
                      className="bg-[#005CA1] hover:bg-[#004080] text-white font-medium py-2 px-4 rounded transition-colors"
                    >
                      Ir a Fuentes
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center w-full mt-8 lg:mt-0">
                <HeroCards />
              </div>
            </div>
          </div>
        </div>

        <div className="relative py-3 sm:mx-auto mt-8">
          <div className="relative px-4 py-10 bg-white border border-gray-200 shadow-lg rounded-lg sm:p-12 w-full">
            <h2 className="text-lg font-semibold text-[#005CA1] mb-4">Tus selecciones</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead>
                  <tr>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <th key={idx} className="px-2 py-2 text-[#005CA1] border-b border-gray-200">
                        Color {idx + 1}
                      </th>
                    ))}
                    <th className="px-2 py-2 text-[#005CA1] border-b border-gray-200">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {savedColors.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-500 py-4">
                        No hay selecciones guardadas.
                      </td>
                    </tr>
                  )}
                  {savedColors.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.map((color, idx) => (
                        <td key={idx} className="px-2 py-2 text-center">
                          <span
                            className="inline-block w-6 h-6 rounded border-2 border-gray-300"
                            style={{ background: color }}
                            title={color}
                          ></span>
                          <span className="ml-2 text-xs text-gray-600">{color}</span>
                        </td>
                      ))}
                      <td className="px-2 py-2 flex gap-2 justify-center">
                        <button
                          onClick={() => handleEdit(rowIdx)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Modificar"
                        >
                          <Pencil className="w-4 h-4 text-[#005CA1]" />
                        </button>
                        <button
                          onClick={() => handleDelete(rowIdx)}
                          className="p-1 rounded hover:bg-gray-100 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
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
  )
}
