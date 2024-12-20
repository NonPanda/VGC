import React from 'react';

export default function Block({position, width, height }) {
  return (
    <div
      className="absolute bg-primary border-2 border-secondary"
      style={{

        left: position.x,
        top: position.y,
        width: width,
        height: height,
      }}
    ></div>
  );
}
