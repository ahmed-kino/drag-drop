import React, { useState } from "react";
import ImageDropzone from "./ImageDropzone";

const Main: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (image: File) => {
    setImage(image);
  };

  return (
    <div>
      <ImageDropzone onImageChange={handleImageChange} />
      {image && <p>Uploaded image: {image.name}</p>}
    </div>
  );
};

export default Main;
