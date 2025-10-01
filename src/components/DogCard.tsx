import React from "react";

type DogBreedType = {
  id: string;
  name: string;
  image: {
    id: string;
    width: number;
    height: number;
    url: string;
  };
};

type Props = {};

const DogCard = () => {
  return <div>DogCard</div>;
};

export default DogCard;
