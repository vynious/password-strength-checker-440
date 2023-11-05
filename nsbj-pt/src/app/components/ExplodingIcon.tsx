import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Position {
  x: number;
  y: number;
}

const ExplodingIcon: React.FC = () => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [isVisible, setIsVisible] = useState(true); // New state variable
  const totalIcons = 1000; // Total number of icons you want to display
  const duration = 2; // Duration in seconds
  const interval = duration * 1000 / totalIcons; // Calculating the interval time based on total icons and duration

  useEffect(() => {
    const generatePosition = (): Position => {
      const x = Math.random() * (window.innerWidth - 100); // considering image width
      const y = Math.random() * (window.innerHeight - 100); // considering image height
      return { x, y };
    };

    const spawnInterval = setInterval(() => {
      setPositions((prev) => [...prev, generatePosition()]);
    }, interval);

    const durationTimeout = setTimeout(() => {
      clearInterval(spawnInterval); // Clear interval after the specified duration
      setIsVisible(false); // Hide the modal after the animation duration
    }, duration * 1000);

    return () => {
      clearInterval(spawnInterval); // Clear interval if component unmounts early
      clearTimeout(durationTimeout); // Clear the timeout if the component unmounts early
    };
  }, []);

  if (!isVisible) return null; // Don't render the modal if isVisible is false

  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
      {positions.map((pos, index) => (
        <div
          key={index}
          className="absolute animate-explode" // Tailwind class for animation
          style={{ top: `${pos.y}px`, left: `${pos.x}px` }}
        >
          <Image src="/cool.png" width={100} height={100} alt="corgi" />
        </div>
      ))}
    </div>
  );
};

export default ExplodingIcon;
