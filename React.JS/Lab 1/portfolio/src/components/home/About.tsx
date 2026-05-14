import { Button } from "../ui/button";

export default function About() {
  return (
    <section className="py-20 px-10 md:px-20 text-center">
      <div className="container">
        <h2 className="text-4xl font-serif text-gray-800 mb-4">About me</h2>
        <div className="">
          <p className="text-gray-600 leading-relaxed mb-6">
            My name is Abdulrahman Ibrahim, a Computer Engineering graduate (July 2025), and I am currently enrolled in the 9-month program at the Information Technology Institute (ITI). I’m applying for the Front-End Developer position and would
            love to join your team. I’ve built several full-stack projects using React.js, Next.js, TypeScript, Node.js, and MongoDB. I’ve also solved over 1000 problems on Codeforces and LeetCode, which greatly improved my problem-solving skills.
          </p>
          <Button asChild className="bg-[#333] py-6 hover:bg-black text-white px-8">
            <a href="/Abdulrahman_Ibrahim_Full_Stack_CV.pdf" download="Abdulrahman_Ibrahim_Full_Stack_CV.pdf">
              Download Resume
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
