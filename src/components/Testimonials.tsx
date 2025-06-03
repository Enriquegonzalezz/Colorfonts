import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe React",
      username: "@john_Doe",
      content: "This landing page is awesome!",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "John Doe React",
      username: "@john_Doe2",
      content:
        "Lorem ipsum dolor sit amet,exercitation. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "John Doe React",
      username: "@john_Doe1",
      content:
        "Lorem ipsum dolor sit amet,empor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "John Doe React",
      username: "@john_Doe3",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "John Doe React",
      username: "@john_Doe4",
      content:
        "Lorem ipsum dolor sit amet, tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 6,
      name: "John Doe React",
      username: "@john_Doe5",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <section className="section-white py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">
          Discover Why <span className="text-[#005CA1] dark:text-blue-400">People Love</span> This Landing Page
        </h2>
        <p className="text-lg text-gray-600 dark:text-slate-300 mb-12">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non unde error facere hic reiciendis illo
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="card-minimal bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3 border-2 border-[#005CA1] dark:border-blue-400">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback className="bg-[#005CA1] dark:bg-blue-600 text-white">
                    {testimonial.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-slate-400">{testimonial.username}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-slate-300">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
