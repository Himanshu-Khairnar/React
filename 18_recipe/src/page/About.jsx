import { Github } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-md max-w-2xl w-full my-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
          Dev: HIMANSHU KHAIRNAR
        </h1>

        <section className="mt-8 space-y-6 text-gray-700 text-base leading-relaxed">
          <div>
            <h2 className="text-2xl font-semibold text-blue-600 mb-2">
              About Me
            </h2>
            <p>
              I am a <strong>full-stack web developer</strong> passionate about
              building <strong>high-performance, scalable applications</strong>{" "}
              using{" "}
              <strong>
                Next.js, the MERN stack, and modern web technologies
              </strong>
              . I specialize in crafting{" "}
              <strong>seamless user experiences</strong> with{" "}
              <strong>React, Tailwind CSS, and Firebase</strong>, and I have
              strong expertise in backend development using{" "}
              <strong>MongoDB and Appwrite</strong>.
            </p>
          </div>

          <p>
            Authentication and security are crucial aspects of my work, and I
            enjoy implementing <strong>NextAuth.js</strong> for smooth
            authentication flows. Beyond coding, I love{" "}
            <strong>debugging and problem-solving</strong>, ensuring that
            applications run efficiently and flawlessly.
          </p>

          <p>
            I completed a <strong>6-month internship</strong> at{" "}
            <strong>Softel Technologies Inc.</strong>, where I worked on
            real-world projects, enhancing my skills in full-stack development.
            My role involved developing and optimizing web applications while
            collaborating with a team of experienced developers. I was paid{" "}
            <strong>₹8,000 per month</strong> during my tenure, reflecting my
            contributions to the company.
          </p>

          <p>
            Whether it's developing <strong>SaaS products</strong>,{" "}
            <strong>interactive blogs</strong>, or{" "}
            <strong>unique web experiences</strong>, I always strive to push the
            boundaries of innovation. I'm constantly learning and exploring new
            technologies to stay ahead in the ever-evolving world of web
            development. 🚀
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="https://portfolio-himasnhu-khairnars-projects.vercel.app/"
              target="_blank"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              <span className="mr-2">🌐</span>
              Visit My Portfolio
            </Link>

            <Link
              to="https://github.com/Himanshu-Khairnar"
              target="_blank"
              className="inline-flex items-center justify-center bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub Account
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
