import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "Básico",
      price: "$9",
      period: "/mes",
      description: "Perfecto para empezar",
      features: ["Hasta 5 proyectos", "2GB de almacenamiento", "Soporte por email", "Actualizaciones básicas"],
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "/mes",
      description: "Para equipos en crecimiento",
      features: [
        "Proyectos ilimitados",
        "50GB de almacenamiento",
        "Soporte prioritario",
        "Todas las funciones",
        "Integraciones avanzadas",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "/mes",
      description: "Para grandes organizaciones",
      features: [
        "Todo de Pro",
        "500GB de almacenamiento",
        "Soporte 24/7",
        "Funciones personalizadas",
        "Gerente de cuenta dedicado",
      ],
      popular: false,
    },
  ]

  return (
    <section className="section-white py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Get <span className="text-[#005CA1] dark:text-blue-400">Unlimited</span> Access
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-300 text-center mb-12">
          Elige el plan perfecto para tus necesidades
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`card-minimal relative ${
                plan.popular
                  ? "bg-white dark:bg-slate-800 border-2 border-yellow-300 dark:border-blue-400 shadow-xl scale-105"
                  : "bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-yellow-400 dark:bg-blue-600 text-gray-900 dark:text-white px-4 py-1 rounded-full text-sm font-medium">
                    Más Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-gray-600 dark:text-slate-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-[#005CA1] dark:text-blue-400">{plan.price}</span>
                  <span className="text-gray-500 dark:text-slate-400">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <Check className="h-5 w-5 mr-3 text-[#005CA1] dark:text-blue-400" />
                    <span className="text-gray-700 dark:text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#005CA1] dark:bg-blue-600 text-white hover:bg-[#004080] dark:hover:bg-blue-700"
                    : "bg-white dark:bg-slate-700 text-[#005CA1] dark:text-blue-400 border border-[#005CA1] dark:border-blue-400 hover:bg-[#005CA1] hover:text-white dark:hover:bg-blue-600 dark:hover:text-white"
                }`}
              >
                Comenzar ahora
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
