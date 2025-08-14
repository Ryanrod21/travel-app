'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Plane from '../../public/plane.jpg';
import Beach from '../../public/beach.jpg';
import Paris from '../../public/Paris.jpg';
import Food from '../../public/food.jpg';
import { ArrowBigRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LandingPage() {
  const router = useRouter();

  const sections = [
    {
      image: Plane,
      alt: 'Airplane symbolizing travel and exploration',
      text: 'Discover your next unforgettable destination — explore amazing places and find the perfect spot for your next adventure. Start planning your journey today and see where your wanderlust takes you!',
      imageFrom: 'left',
    },
    {
      image: Beach,
      alt: 'Beach vacation getaway',
      text: 'Relax on pristine beaches, feel the warm sand between your toes, and let the sound of the waves melt your stress away. Your dream coastal escape is just a click away.',
      imageFrom: 'right',
    },
    {
      image: Paris,
      alt: 'Mountain hiking adventure',
      text: "Embark on unforgettable adventures and discover the destinations of your dreams. From breathtaking natural wonders to the world's most iconic landmarks, explore every corner of the globe and create memories that will last a lifetime.",
      imageFrom: 'left',
    },
    {
      image: Food,
      alt: 'A table of Food',
      text: "Visit your destination to embark on a delicious journey discovering authentic foods and flavors unique to each country's culture. Savor traditional dishes, explore vibrant markets, and immerse yourself in the rich culinary heritage that makes every meal a memorable experience.",
      imageFrom: 'right',
    },
  ];

  const refs = useRef([]);
  if (refs.current.length !== sections.length + 1) {
    refs.current = Array(sections.length + 1)
      .fill(null)
      .map(() => React.createRef());
  }

  const [visible, setVisible] = useState(
    Array(sections.length + 1).fill(false)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute('data-index'));
          setVisible((prev) => {
            const newState = [...prev];
            newState[index] = entry.isIntersecting;
            return newState;
          });
        });
      },
      { threshold: 0.3 }
    );

    refs.current.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-center space-y-32 py-20 bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 overflow-x-hidden">
      {/* Heading */}
      <div
        ref={refs.current[0]}
        data-index="0"
        className="transition-all duration-1000 ease-out transform text-center pt-14 flex flex-col gap-3"
      >
        <h1
          className={`text-3xl md:text-8xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ease-out 
          ${visible[0] ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        >
          Welcome to
        </h1>
        <h1
          className={`text-3xl md:text-8xl font-extrabold tracking-wider bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-transparent transition-all duration-1000 ease-out 
          ${visible[0] ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        >
          FutureTravels
        </h1>
      </div>

      {/* Sections */}
      {sections.map((section, i) => {
        const imageFromLeft = section.imageFrom === 'left';
        const index = i + 1;

        return (
          <div
            key={i}
            ref={refs.current[index]}
            data-index={index}
            className={`flex flex-col md:flex-row ${
              imageFromLeft ? '' : 'md:flex-row-reverse'
            } items-center gap-12 max-w-full`}
          >
            {/* Image */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                visible[index]
                  ? 'translate-x-0 opacity-100'
                  : imageFromLeft
                  ? '-translate-x-32 opacity-0'
                  : 'translate-x-32 opacity-0'
              }`}
            >
              <Image
                src={section.image}
                alt={section.alt}
                className="rounded-xl shadow-lg w-full max-w-[300px] md:max-w-[800px] h-auto object-contain"
              />
            </div>

            {/* Text */}
            <div
              className={`transition-all duration-1000 ease-out transform ${
                visible[index]
                  ? 'translate-x-0 opacity-100'
                  : imageFromLeft
                  ? 'translate-x-32 opacity-0'
                  : '-translate-x-32 opacity-0'
              }`}
            >
              <p className="text-xl md:text-2xl max-w-md text-center px-4 md:text-left">
                {section.text}
              </p>
            </div>
          </div>
        );
      })}

      {/* Button */}
      <button
        className="cursor-pointer w-full max-w-[280px] md:max-w-[380px] px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white rounded-md transition-all flex items-center justify-center"
        onClick={() => router.push('/home')}
      >
        Start Your Journey Now
        <ArrowBigRight className="h-7 w-8 ml-2" />
      </button>
    </div>
  );
}
