import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Pencil, Trash2, ChevronUp, ChevronDown } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FontsView() {
  const [fontFiles, setFontFiles] = useState<(File | null)[]>([null, null]);
  const [fontUrls, setFontUrls] = useState<(string | null)[]>([null, null]);
  const [sizes, setSizes] = useState({ paragraph: 16, subtitle: 24, title: 32 });
  const navigate = useNavigate();
  const FONT_BASE_URL = "http://localhost:3000/public/fonts/";

  type FontRow = {
    id: number;
    fuente_1: string;
    fuente_2: string;
    tamano_1: number;
    tamano_2: number;
    tamano_3: number;
  };

  const [savedFonts, setSavedFonts] = useState<FontRow[]>([]);
  const [editRow, setEditRow] = useState<number | null>(null);

  // Refs for file inputs to reset them
  const fileInputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];


  useEffect(() => {
    const fetchFonts = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const res = await axios.get("http://localhost:3000/fonts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        // Si tu backend devuelve un solo objeto, usa [res.data]
        setSavedFonts(Array.isArray(res.data) ? res.data : [res.data]);
      } catch (error) {
        navigate("/login");
        console.error("Error al obtener las fuentes:", error);
      }
    };
    fetchFonts();
  }, []);
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
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const formData = new FormData();
      if (fontFiles[0]) formData.append("fuente_1", fontFiles[0]);
      if (fontFiles[1]) formData.append("fuente_2", fontFiles[1]);
      formData.append("tamano_1", sizes.paragraph.toString());
      formData.append("tamano_2", sizes.subtitle.toString());
      formData.append("tamano_3", sizes.title.toString());

      await axios.post("http://localhost:3000/fonts/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      // Refresca la lista
      const res = await axios.get("http://localhost:3000/fonts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedFonts(Array.isArray(res.data) ? res.data : [res.data]);
      setFontFiles([null, null]);
      setFontUrls([null, null]);
      setSizes({ paragraph: 16, subtitle: 24, title: 32 });
      fileInputRefs.forEach(ref => ref.current && (ref.current.value = ""));
    } catch (error) {
      navigate("/login");
      console.error("Error al guardar las fuentes:", error);
    }
  };

  // Delete row
  const handleDelete = async (fontId: number) => {
    try {
      const token = localStorage.getItem("access_token");
      await axios.delete(`http://localhost:3000/fonts/delete/${fontId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedFonts(prev => prev.filter(row => row.id !== fontId));
    } catch (error) {
      navigate("/login");
      console.error("Error al eliminar la fuente:", error);
    }
  };

  // Edit row
  const handleEdit = (rowIdx: number) => {
    setEditRow(rowIdx);
    const row = savedFonts[rowIdx];
    setSizes({
      paragraph: row.tamano_1,
      subtitle: row.tamano_2,
      title: row.tamano_3,
    });
    // No puedes recuperar los archivos originales, pero puedes mostrar los nombres
    setFontFiles([null, null]);
    setFontUrls([row.fuente_1, row.fuente_2]);
    fileInputRefs.forEach((ref, idx) => ref.current && (ref.current.value = ""));
  };

  const handleUpdate = async () => {
    if (editRow !== null) {
      try {
        console.log("Editando fila:", editRow);
        console.log("Datos de la fila:", savedFonts[editRow]);
        console.log("tamano 1", sizes.paragraph);
        console.log("tamano 2", sizes.subtitle);
        console.log("tamano 3", sizes.title);
        const token = localStorage.getItem("access_token");
        const fontId = savedFonts[editRow].id;
        /*const formData = new FormData();
        if (fontFiles[0]) formData.append("fuente_1", fontFiles[0]);
        if (fontFiles[1]) formData.append("fuente_2", fontFiles[1]);
        formData.append("tamano_1", sizes.paragraph.toString());
        formData.append("tamano_2", sizes.subtitle.toString());
        formData.append("tamano_3", sizes.title.toString());*/

        // Para guardar o actualizar (sin archivos)
        await axios.put(
          `http://localhost:3000/fonts/update/${fontId}`,
          {
            tamano_1: sizes.paragraph,
            tamano_2: sizes.subtitle,
            tamano_3: sizes.title,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        // Refresca la lista
        const res = await axios.get("http://localhost:3000/fonts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedFonts(Array.isArray(res.data) ? res.data : [res.data]);
        setEditRow(null);
        setFontFiles([null, null]);
        setFontUrls([null, null]);
        setSizes({ paragraph: 16, subtitle: 24, title: 32 });
        fileInputRefs.forEach(ref => ref.current && (ref.current.value = ""));
      } catch (error) {
        console.error("Error al actualizar las fuentes:", error);
      }
    }
  };

  const previewFontUrl1 =
    fontUrls[0] && fontFiles[0]
      ? fontUrls[0]
      : editRow !== null && savedFonts[editRow]?.fuente_1
      ? `${FONT_BASE_URL}${savedFonts[editRow].fuente_1}`
      : null;

  const previewFontUrl2 =
    fontUrls[1] && fontFiles[1]
      ? fontUrls[1]
      : editRow !== null && savedFonts[editRow]?.fuente_2
      ? `${FONT_BASE_URL}${savedFonts[editRow].fuente_2}`
      : null;


  const fontFamily1 = previewFontUrl1 ? "'Font1', sans-serif" : "sans-serif";
  const fontFamily2 = previewFontUrl2 ? "'Font2', serif" : "serif";    
  // Dynamic style for font-face
  const fontFaceStyle = `
  ${previewFontUrl1 ? `
    @font-face {
      font-family: 'Font1';
      src: url('${previewFontUrl1}');
    }
  ` : ""}
  ${previewFontUrl2 ? `
    @font-face {
      font-family: 'Font2';
      src: url('${previewFontUrl2}');
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
                      name={`fuente_${idx + 1}`}
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
                 {savedFonts.map((row, rowIdx) => {
                  const fontUrl1 = row.fuente_1 ? `${FONT_BASE_URL}${row.fuente_1}` : null;
                  const fontUrl2 = row.fuente_2 ? `${FONT_BASE_URL}${row.fuente_2}` : null;
                  return (
                    <tr key={row.id}>
                      <td className="px-2 py-2 text-center">
                        {row.fuente_1}
                        {fontUrl1 && (
                          <a
                            href={fontUrl1}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-green-400 underline"
                          >
                            Ver fuente
                          </a>
                        )}
                      </td>
                      <td className="px-2 py-2 text-center">
                        {row.fuente_2}
                        {fontUrl2 && (
                          <a
                            href={fontUrl2}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-green-400 underline"
                          >
                            Ver fuente
                          </a>
                        )}
                      </td>
                      <td className="px-2 py-2 text-center text-gray-300">{row.tamano_1}</td>
                      <td className="px-2 py-2 text-center text-gray-300">{row.tamano_2}</td>
                      <td className="px-2 py-2 text-center text-gray-300">{row.tamano_3}</td>
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
                          onClick={() => handleDelete(row.id)}
                          className="p-1 rounded hover:bg-red-700"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4 text-red-400" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
