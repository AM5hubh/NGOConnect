import React from "react";
import { ArrowRight, Heart, Globe, Users } from "lucide-react";

function About() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8">About NGOConnect</h1>

      <div className=" mx-auto">
        <p className="text-lg mb-6">
          NGOConnect is a revolutionary platform designed to bridge the gap
          between non-governmental organizations (NGOs) and donors. Our mission
          is to create a seamless connection that empowers both parties to make
          a lasting impact on the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-red-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Globe className="mr-2" /> Our Vision
            </h2>
            <p>
              A world where every NGO has the resources they need to create
              positive change, and every donor can easily support causes they're
              passionate about.
            </p>
          </div>

          <div className="bg-green-200 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Users className="mr-2" /> Our Mission
            </h2>
            <p>
              To create a transparent, efficient, and user-friendly platform
              that connects NGOs with donors, facilitating meaningful
              partnerships and maximizing social impact.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">How We Bridge the Gap</h2>
        <ul className="list-none space-y-4 mb-8">
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-1 text-blue-500" />
            <span>
              Providing a centralized platform for NGOs to showcase their
              projects and impact
            </span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-1 text-blue-500" />
            <span>
              Offering tools for donors to discover and support causes aligned
              with their values
            </span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-1 text-blue-500" />
            <span>
              Ensuring transparency in fund allocation and project progress
            </span>
          </li>
          <li className="flex items-start">
            <ArrowRight className="mr-2 mt-1 text-blue-500" />
            <span>Facilitating communication between NGOs and donors</span>
          </li>
        </ul>

        <div className="bg-blue-600 p-6 rounded-lg mb-8 text-white">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Heart className="mr-2" /> Join Us in Making a Difference
          </h2>
          <p className="mb-4">
            Whether you're an NGO looking to expand your reach or a donor
            seeking to make a meaningful impact, NGOConnect is here to help you
            achieve your goals.
          </p>
          <button className="bg-[#c0adcc] hover:bg-green-600 text-black hover:text-white hover:scale-95 transition-transform duration-300 font-bold py-2 px-4 rounded">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;
