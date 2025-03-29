import { Github } from "lucide-react";
import React from "react";
import { Link } from "react-router";

export default function About() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-white  px-6">
      <div className="bg-whites p-6 md:p-10 rounded-2xl shadow-lg max-w-2xl w-full my-5">
        <h1 className="text-3xl font-bold text-gray-900  text-center">
          Dev: HIMANSHU KHAIRNAR
        </h1>
        <section className="mt-6 space-y-4 text-gray-700    ">
          <h2 className="text-2xl font-semibold text-primary">About Me</h2>
          <p>
            I am a <strong>full-stack web developer</strong> passionate about
            building <strong>high-performance, scalable applications</strong>{" "}
            using{" "}
            <strong>
              Next.js, the MERN stack, and modern web technologies
            </strong>
            . I specialize in crafting{" "}
            <strong>seamless user experiences</strong> with
            <strong>React, Tailwind CSS, and Firebase</strong>, and I have
            strong expertise in backend development using{" "}
            <strong>MongoDB and Appwrite</strong>.
          </p>
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
            collaborating with a team of experienced developers. This internship
            provided valuable industry exposure and strengthened my ability to
            work in a professional environment. I was paid{" "}
            <strong>₹8,000 per month</strong> during my tenure, reflecting my
            contributions to the company.
          </p>
          <p>
            Whether it's developing{" "}
            <strong>
              SaaS products, interactive blogs, or unique web experiences
            </strong>
            , I always strive to push the boundaries of innovation. I'm
            constantly learning and exploring new technologies to stay ahead in
            the ever-evolving world of web development. 🚀
          </p>
          <div className="flex flex-col space-y-4 mt-4 w-60 my-5">
            <Link
              to="https://portfolio-himasnhu-khairnars-projects.vercel.app/"
              target="_blank"
              className="inline-flex items-center justify-center bg-primary hover:bg-yellows text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-300"
            >
              <span className="mr-2">🌐</span>
              Visit My Portfolio
            </Link>

            <Link
              to="https://github.com/Himanshu-Khairnar"
              target="_blank"
              className="inline-flex items-center justify-center bg-primary hover:bg-yellows text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-300"
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
