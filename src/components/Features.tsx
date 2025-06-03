export function Features() {
  const features = [
    {
      id: 1,
      title: "Diseño responsivo",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
      image: "/images/design-responsive.png",
    },
    {
      id: 2,
      title: "Interface intuitiva",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      title: "UX amigable",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi nesciunt est nostrum omnis ab sapiente.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const tabs = [
    "Dark/Light theme",
    "Reviews",
    "Features",
    "Pricing",
    "Contact form",
    "Our team",
    "Responsive design",
    "Newsletter",
    "Minimalist",
  ]

  return (
    <section className="features-section py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-2 text-white dark:text-white">
          Many <span className="text-yellow-300 dark:text-blue-400">Great Features</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-2 my-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className="features-button px-4 py-2 rounded-full text-sm font-medium transition-colors"
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature) => (
            <div key={feature.id} className="features-card card-minimal flex flex-col items-center">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{feature.title}</h3>
              <p className="text-center mb-6 text-gray-600 dark:text-slate-300">{feature.description}</p>
              <img src={feature.image || "/placeholder.svg"} alt={feature.title} className="w-40 h-40 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
