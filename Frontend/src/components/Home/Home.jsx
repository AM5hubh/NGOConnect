import React from 'react';
import CarouselComponent from '../CarouselComponent/CarouselComponent.jsx';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to My Website</h1>
      </header> */}
      <main className="p-4">
        <CarouselComponent />
        {/* <section className="mt-8 text-center">
          <h2 className="text-2xl font-semibold">About Us</h2>
          <p className="mt-4 text-lg">
            This is a sample homepage created using React and Tailwind CSS.
          </p>
        </section> */}
      </main>
      
    </div>
  );
};

export default Home;