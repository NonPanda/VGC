import React from 'react';

const Popup = ({ game, isOpen, closePopup }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      onClick={closePopup}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full z-50"
        onClick={(e) => e.stopPropagation()} // Prevents the popup from closing when clicking inside
      >
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={closePopup} className="text-black text-3xl font-bold">
            &times;
          </button>
        </div>

        {/* Game Title */}
        <h2 className="text-3xl font-semibold mb-6 text-center">{game.name}</h2>

        {/* Instructions GIF */}
        <div className="mb-6">
          <img
            src={game.instructionsGif}
            alt={`${game.name} Instructions`}
            className="w-full sm:w-1/2 h-auto rounded-lg mx-auto"
          />
        </div>

        {/* Instructions Text */}
        <div className="mb-4">
          <p className="text-lg text-center">{game.instructions}</p>
        </div>

        {/* Controls List */}
        <div>
          <p className="text-xl font-semibold mb-2">Controls:</p>
          <ul className="list-disc pl-6 text-lg">
            {game.controls.map((control, index) => (
              <li key={index}>{control}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Popup;
