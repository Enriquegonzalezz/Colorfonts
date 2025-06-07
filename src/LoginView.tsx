import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

export default function LoginView() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simula llamada a backend (reemplaza con tu lógica real)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Validación ficticia de ejemplo
      if (formData.email === "test@example.com" && formData.password === "123456") {
        alert("Login exitoso");
        // Aquí podrías redirigir o actualizar estado global
      } else {
        throw new Error("Credenciales inválidas");
      }
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] py-6 flex flex-col justify-center items-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
          <div className="absolute inset-0 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-[#23272e] border-2 border-green-500 shadow-lg rounded-3xl sm:p-12">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-semibold text-green-400 mb-2">Login to your account</h1>
              <p className="text-gray-400">Welcome back! Please login to continue.</p>
            </div>

            {error && (
              <div className="p-3 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-sm mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#23272e] border-green-500 text-gray-200 placeholder-gray-500 w-full"
                  placeholder="Email address"
                  required
                  style={{
                    paddingTop: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderWidth: '2px'
                  }}
                />
                <span className="text-xs text-gray-500 block mt-1 ml-1">Enter your email</span>
              </div>

              <div className="space-y-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="bg-[#23272e] border-green-500 text-gray-200 placeholder-gray-500 w-full"
                  placeholder="Password"
                  required
                  minLength={6}
                  style={{
                    paddingTop: '1.25rem',
                    paddingBottom: '1.25rem',
                    borderWidth: '2px'
                  }}
                />
                <span className="text-xs text-gray-500 block mt-1 ml-1">At least 6 characters</span>
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white border-2 border-green-500 py-5 font-medium"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-pulse flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center pt-6">
              <div className="relative flex items-center justify-center mb-6">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <p className="text-gray-400 text-sm">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-green-400 hover:underline font-medium"
                  style={{ textShadow: '0 0 5px rgba(74, 222, 128, 0.3)' }}
                >
                  Sign up now
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
