import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";

export default function FontsView() {
  const [fontFiles, setFontFiles] = useState<(File | null)[]>([null, null]);
  const [fontUrls, setFontUrls] = useState<(string | null)[]>([null, null]);
  const [sizes, setSizes] = useState({ paragraph: 16, subtitle: 24, title: 32 });
  const [savedFonts, setSavedFonts] = useState<
    { fontFiles: (File | null)[]; fontUrls: (string | null)[]; sizes: { paragraph: number; subtitle: number; title: number } }[]
  >([]);
  const [editRow, setEditRow] = useState<number | null>(null);

  // Refs for file inputs to reset them
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  // Handle font file upload and create object URL for preview
  const handleFileChange = (index: number, file: File | null) => {
    const newFiles = [...fontFiles];
    const newUrls = [...fontUrls];
    newFiles[index] = file;
    if (file) {
      newUrls[index] = URL.createObjectURL(file);
    } else {
      newUrls[index] = null;
    }
    setFontFiles(newFiles);
    setFontUrls(newUrls);
  };

  // Font size change
  const handleSizeChange = (key: keyof typeof sizes, value: number) => {
    setSizes(prev => ({ ...prev, [key]: value }));
  };

  // Save fonts and sizes
  const handleSave = () => {
    setSavedFonts(prev => [
      ...prev,
      {
        fontFiles: [...fontFiles],
        fontUrls: [...fontUrls],
        sizes: { ...sizes },
      },
    ]);
    setFontFiles([null, null]);
    setFontUrls([null, null]);
    setSizes({ paragraph: 16, subtitle: 24, title: 32 });
    fileInputRefs.forEach(ref => ref.current && (ref.current.value = ""));
  };

  // Delete row
  const handleDelete = (rowIdx: number) => {
    setSavedFonts(prev => prev.filter((_, idx) => idx !== rowIdx));
  };

  // Edit row
  const handleEdit = (rowIdx: number) => {
    setEditRow(rowIdx);
    setFontFiles([...savedFonts[rowIdx].fontFiles]);
    setFontUrls([...savedFonts[rowIdx].fontUrls]);
    setSizes({ ...savedFonts[rowIdx].sizes });
    fileInputRefs.forEach((ref, idx) => ref.current && (ref.current.value = ""));
  };

  // Update row
  const handleUpdate = () => {
    if (editRow !== null) {
      setSavedFonts(prev =>
        prev.map((row, idx) =>
          idx === editRow
            ? { fontFiles: [...fontFiles], fontUrls: [...fontUrls], sizes: { ...sizes } }
            : row
        )
      );
      setEditRow(null);
      setFontFiles([null, null]);
      setFontUrls([null, null]);
      setSizes({ paragraph: 16, subtitle: 24, title: 32 });
      fileInputRefs.forEach(ref => ref.current && (ref.current.value = ""));
    }
  };

  // Font family names for preview
  const fontFamily1 = fontUrls[0] ? `'Font1', sans-serif` : "sans-serif";
  const fontFamily2 = fontUrls[1] ? `'Font2', serif` : "serif";

  // Dynamic style for font-face
  const fontFaceStyle = `
    ${fontUrls[0] ? `
      @font-face {
        font-family: 'Font1';
        src: url('${fontUrls[0]}');
      }
    ` : ""}
    ${fontUrls[1] ? `
      @font-face {
        font-family: 'Font2';
        src: url('${fontUrls[1]}');
      }
    ` : ""}
  `;

  // Font size controls
  const renderSizeControl = (label: string, key: keyof typeof sizes, min: number, max: number) => (
    <div className="flex items-center gap-2">
      <label className="text-gray-200 text-sm w-20">{label}:</label>
      <button
        type="button"
        className="p-1 rounded border border-green-500 text-green-400 hover:bg-green-700"
        onClick={() => handleSizeChange(key, Math.max(min, sizes[key] - 1))}
      >
        <ChevronDown size={16} />
      </button>
      <input
        placeholder="Size"
        type="number"
        min={min}
        max={max}
        value={sizes[key]}
        onChange={e => handleSizeChange(key, Number(e.target.value))}
        className="w-14 px-2 py-1 rounded bg-[#141414] border border-green-500 text-gray-100 text-center"
      />
      <button
        type="button"
        className="p-1 rounded border border-green-500 text-green-400 hover:bg-green-700"
        onClick={() => handleSizeChange(key, Math.min(max, sizes[key] + 1))}
      >
        <ChevronUp size={16} />
      </button>
      <span className="text-xs text-gray-400 ml-2">px</span>
    </div>
  );

  return (
    <>
      <style>{fontFaceStyle}</style>
      <Navbar />
      <div className="min-h-screen bg-[#141414] py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12">
            <h1 className="text-2xl font-semibold text-green-400 text-center mb-6">
              Sube tus fuentes y define tamaños
            </h1>
            <div className="mt-6 flex flex-col items-center gap-6">
              <div className="flex flex-col gap-4">
                {[0, 1].map(idx => (
                  <div className="flex items-center space-x-4" key={idx}>
                    <label htmlFor={`font-file-${idx}`} className="text-gray-200 font-medium">
                      Fuente {idx + 1}:
                    </label>
                    <input
                      ref={fileInputRefs[idx]}
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
                {renderSizeControl("Párrafo", "paragraph", 8, 72)}
                {renderSizeControl("Subtítulo", "subtitle", 8, 72)}
                {renderSizeControl("Título", "title", 8, 100)}
              </div>
              <div className="flex justify-between mt-8 w-full">
                <button
                  type="button"
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
            {/* PREVIEW */}
            <div className="mt-10 bg-[#181b20] border border-green-700 rounded-2xl p-6 shadow-lg">
              <h2 className="text-green-400 text-lg font-semibold mb-4">Vista previa</h2>
              <div className="space-y-4">
                <div>
                  <span className="text-gray-400 text-xs">Título</span>
                  <div
                    style={{
                      fontFamily: fontFamily2,
                      fontSize: `${sizes.title}px`,
                      fontWeight: 700,
                      color: "#fff",
                    }}
                  >
                    ¡Este es un título con tu fuente 2!
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Subtítulo</span>
                  <div
                    style={{
                      fontFamily: fontFamily2,
                      fontSize: `${sizes.subtitle}px`,
                      fontWeight: 500,
                      color: "#b3e5fc",
                    }}
                  >
                    Este es un subtítulo con tu fuente 2
                  </div>
                </div>
                <div>
                  <span className="text-gray-400 text-xs">Párrafo</span>
                  <div
                    style={{
                      fontFamily: fontFamily1,
                      fontSize: `${sizes.paragraph}px`,
                      fontWeight: 400,
                      color: "#e0e0e0",
                    }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque.
                  </div>
                </div>
              </div>
            </div>
            {/* END PREVIEW */}
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
                          type="button"
                          onClick={() => handleEdit(rowIdx)}
                          className="p-1 rounded hover:bg-green-700"
                          title="Modificar"
                        >
                          <Pencil className="w-4 h-4 text-green-400" />
                        </button>
                        <button
                          type="button"
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
