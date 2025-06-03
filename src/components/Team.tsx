import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Linkedin, Facebook, Instagram } from "lucide-react"

export function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "Emma Smith",
      role: "Product Manager",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: "/placeholder.svg?height=100&width=100",
      social: {
        linkedin: "#",
        facebook: "#",
        instagram: "#",
      },
    },
    {
      id: 2,
      name: "John Doe",
      role: "Tech Lead",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: "/placeholder.svg?height=100&width=100",
      social: {
        linkedin: "#",
        facebook: "#",
        instagram: "#",
      },
    },
    {
      id: 3,
      name: "Ashley Ross",
      role: "Frontend Developer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: "/placeholder.svg?height=100&width=100",
      social: {
        linkedin: "#",
        instagram: "#",
      },
    },
    {
      id: 4,
      name: "Bruce Rogers",
      role: "Backend Developer",
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
      avatar: "/placeholder.svg?height=100&width=100",
      social: {
        linkedin: "#",
        facebook: "#",
      },
    },
  ]

  return (
    <section className="section-blue py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-2 text-white dark:text-white">
          Our <span className="text-yellow-300 dark:text-blue-400">Dedicated</span> Crew
        </h2>
        <p className="text-lg text-blue-100 dark:text-slate-300 mb-12">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis dolor pariatur sit!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="card-minimal text-center bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700"
            >
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24 border-4 border-[#005CA1] dark:border-blue-400">
                  <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                  <AvatarFallback className="bg-[#005CA1] dark:bg-blue-600 text-white">
                    {member.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              <h3 className="text-xl font-bold mb-1 text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm mb-3 text-[#005CA1] dark:text-blue-400 font-medium">{member.role}</p>
              <p className="mb-4 text-gray-600 dark:text-slate-300">{member.bio}</p>
              <div className="flex justify-center space-x-3">
                {member.social.linkedin && (
                  <a href={member.social.linkedin} className="hover:opacity-80 text-[#005CA1] dark:text-blue-400">
                    <Linkedin size={20} />
                  </a>
                )}
                {member.social.facebook && (
                  <a href={member.social.facebook} className="hover:opacity-80 text-[#005CA1] dark:text-blue-400">
                    <Facebook size={20} />
                  </a>
                )}
                {member.social.instagram && (
                  <a href={member.social.instagram} className="hover:opacity-80 text-[#005CA1] dark:text-blue-400">
                    <Instagram size={20} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
