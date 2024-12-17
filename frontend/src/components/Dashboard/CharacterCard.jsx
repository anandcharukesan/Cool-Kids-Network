import React from "react";

const CharacterCard = ({ character }) => {
  return (
    <div className="bg-white p-6 rounded shadow">
      <p>
        <strong>Name:</strong> {character.firstName} {character.lastName}
      </p>
      <p>
        <strong>Country:</strong> {character.country}
      </p>
      <p>
        <strong>Email:</strong> {character.email}
      </p>
      <p>
        <strong>Role:</strong> {character.role}
      </p>
    </div>
  );
};

export default CharacterCard;
