// CharacterCard.jsx
import React from "react";

const CharacterCard = ({ character }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Name</p>
          <p className="font-semibold">
            {character.firstName} {character.lastName}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Role</p>
          <p className="font-semibold">{character.role}</p>
        </div>
        <div>
          <p className="text-gray-600">Email</p>
          <p className="font-semibold">{character.email}</p>
        </div>
        <div>
          <p className="text-gray-600">Country</p>
          <p className="font-semibold">{character.country}</p>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
