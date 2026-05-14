export default function Skills() {
  const skills = [
    { name: "React", level: "90%" },
    { name: "JavaScript", level: "85%" },
    { name: "Node.js", level: "75%" },
    { name: "TypeScript", level: "80%" },
    { name: "MongoDB", level: "70%" },
    { name: "CSS", level: "80%" },
    { name: "Tailwind CSS", level: "85%" },
    { name: "Next.js", level: "80%" },
    { name: "Git & GitHub", level: "85%" },
    { name: "C++", level: "70%" },
    { name: "PHP", level: "65%" },
    { name: "Python", level: "75%" },
    { name: "Redux Toolkit", level: "80%" },
    { name: "Express", level: "70%" },
  ];

  return (
    <section className="py-20 bg-[#333] text-white px-10 md:px-20 text-center">
      <h2 className="text-4xl mb-4">Skills</h2>
      <p className="max-w-2xl mx-auto mb-12 text-gray-400">Here are some of the technologies I work with every day to build modern software.</p>

      <div className="grid md:grid-cols-2 gap-x-20 gap-y-6 text-left">
        {skills.map((skill) => (
          <div key={skill.name} className="flex items-center gap-4">
            <span className="w-24 uppercase text-sm">{skill.name}</span>
            <div className="flex-1 h-8 bg-gray-500 overflow-hidden">
              <div className="h-full bg-gray-300" style={{ width: skill.level }}></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
