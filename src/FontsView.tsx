import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Pencil, Trash2 } from "lucide-react";

export default function FontsView() {
  const [fontFiles, setFontFiles] = useState<(File | null)[]>([null, null]);
  const [sizes, setSizes] = useState<{ paragraph: number; subtitle: number; title: number }>({
    paragraph: 16,
    subtitle: 24,
    title: 32,
  });
  const [savedFonts, setSavedFonts] = useState<
    { fontFiles: (File | null)[]; sizes: { paragraph: number; subtitle: number; title: number } }[]
  >([]);
  const [editRow, setEditRow] = useState<number | null>(null);

  const handleFileChange = (index: number, file: File | null) => {
    const newFiles = [...fontFiles];
    newFiles[index] = file;
    setFontFiles(newFiles);
  };

  const handleSizeChange = (key: keyof typeof sizes, value: number) => {
    setSizes(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setSavedFonts(prev => [
      ...prev,
      {
        fontFiles: [...fontFiles],
        sizes: { ...sizes },
      },
    ]);
    setFontFiles([null, null]);
    setSizes({ paragraph: 16, subtitle: 24, title: 32 });
  };

  const handleDelete = (rowIdx: number) => {
    setSavedFonts(prev => prev.filter((_, idx) => idx !== rowIdx));
  };

  const handleEdit = (rowIdx: number) => {
    setEditRow(rowIdx);
    setFontFiles([...savedFonts[rowIdx].fontFiles]);
    setSizes({ ...savedFonts[rowIdx].sizes });
  };

  const handleUpdate = () => {
    if (editRow !== null) {
      setSavedFonts(prev =>
        prev.map((row, idx) =>
          idx === editRow
            ? { fontFiles: [...fontFiles], sizes: { ...sizes } }
            : row
        )
      );
      setEditRow(null);
      setFontFiles([null, null]);
      setSizes({ paragraph: 16, subtitle: 24, title: 32 });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12">
            <h1 className="text-2xl font-semibold text-green-400 text-center mb-6">
              Sube tus fuentes y define tamaños
            </h1>
            <div className="mt-6 flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                {[0, 1].map(idx => (
                  <div className="flex items-center space-x-4" key={idx}>
                    <label htmlFor={`font-file-${idx}`} className="text-gray-200 font-medium">
                      Fuente {idx + 1}:
                    </label>
                    <input
                      id={`font-file-${idx}`}
                      type="file"
                      accept=".ttf,.otf,.woff,.woff2"
                      onChange={e => handleFileChange(idx, e.target.files?.[0] || null)}
                      className="file:bg-green-600 file:hover:bg-green-700 file:text-white file:font-bold file:rounded file:border-none file:px-3 file:py-2 bg-[#23272e] border-2 border-green-500 text-gray-100 cursor-pointer w-56"
                    />
                    {fontFiles[idx] && (
                      <span className="text-xs text-gray-300">{fontFiles[idx]?.name}</span>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-2 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="flex justify-between items-center w-[40%]">
                    <label htmlFor="size-paragraph" className="text-gray-200 text-sm ">
                      Párrafo:
                    </label>
                    <input
                      id="size-paragraph"
                      type="number"
                      min={8}
                      max={72}
                      value={sizes.paragraph}
                      onChange={e => handleSizeChange("paragraph", Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-[#141414] border border-green-500 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex justify-between items-center w-[40%]">
                    <label htmlFor="size-subtitle" className="text-gray-200 text-sm">
                      Subtítulo:
                    </label>
                    <input
                      id="size-subtitle"
                      type="number"
                      min={8}
                      max={72}
                      value={sizes.subtitle}
                      onChange={e => handleSizeChange("subtitle", Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-[#141414] border border-green-500 text-gray-100"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex justify-between items-center w-[40%]">
                    <label htmlFor="size-title" className="text-gray-200 text-sm">
                      Título:
                    </label>
                    <input
                      id="size-title"
                      type="number"
                      min={8}
                      max={100}
                      value={sizes.title}
                      onChange={e => handleSizeChange("title", Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-[#141414] border border-green-500 text-gray-100"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-8">
                <button
                  onClick={editRow !== null ? handleUpdate : handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline"
                >
                  {editRow !== null ? "Actualizar" : "Guardar selección"}
                </button>
                <Link
                  to="/"
                  className="bg-gray-800 hover:bg-gray-700 text-gray-100 font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline"
                >
                  Regresar
                </Link>
                <Link
                  to="/colors"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded border border-green-500 focus:outline-none focus:shadow-outline"
                >
                  Ir a Colores
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Tabla CRUD en un recuadro aparte debajo, con el mismo ancho */}
        <div className="relative py-3 sm:max-w-xl sm:mx-auto mt-8">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12 w-full">
            <h2 className="text-lg font-semibold text-green-400 mb-4">Tus selecciones</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#23272e] border border-green-500 rounded-lg">
                <thead>
                  <tr>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Fuente 1</th>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Fuente 2</th>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Párrafo</th>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Subtítulo</th>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Título</th>
                    <th className="px-2 py-2 text-green-400 border-b border-green-500">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {savedFonts.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center text-gray-400 py-4">
                        No hay selecciones guardadas.
                      </td>
                    </tr>
                  )}
                  {savedFonts.map((row, rowIdx) => (
                    <tr key={rowIdx}>
                      {row.fontFiles.map((file, idx) => (
                        <td key={idx} className="px-2 py-2 text-center">
                          {file ? (
                            <span className="text-xs text-gray-300">{file.name}</span>
                          ) : (
                            <span className="text-xs text-gray-500">No seleccionado</span>
                          )}
                        </td>
                      ))}
                      <td className="px-2 py-2 text-center text-gray-300">{row.sizes.paragraph}</td>
                      <td className="px-2 py-2 text-center text-gray-300">{row.sizes.subtitle}</td>
                      <td className="px-2 py-2 text-center text-gray-300">{row.sizes.title}</td>
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