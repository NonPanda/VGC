import React from 'react';

export default function Block({position, width, height }) {
  return (
    <div
      className="absolute bg-red-500 border border-white m-0 p-0"
      style={{

        left: position.x,
        top: position.y,
        width: width,
        height: height,
      }}
    ></div>
  );
}
