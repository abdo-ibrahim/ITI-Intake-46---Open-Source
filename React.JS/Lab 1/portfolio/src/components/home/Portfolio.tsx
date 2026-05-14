export default function Portfolio() {
  const projects = [
    { title: "Web Design", img: "/images/cat-01.jpg" },
    { title: "Mobile App", img: "/images/cat-02.jpg" },
    { title: "Dashboard", img: "/images/cat-03.jpg" },
    { title: "E-commerce", img: "/images/cat-04.jpg" },
    { title: "Blog Platform", img: "/images/cat-05.jpg" },
    { title: "Portfolio Site", img: "/images/cat-06.jpg" },
  ];

  return (
    <section className="py-20 px-10 md:px-20">
      <h2 className="text-4xl mb-12 text-center">Portfolio</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div key={index} className="group relative aspect-video bg-gray-200 overflow-hidden shadow-lg">
            <img src={project.img} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white font-bold uppercase tracking-widest">{project.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
