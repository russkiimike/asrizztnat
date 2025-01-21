import React from 'react';

interface ImageBoxProps {
  imageSrc: string;
  altText: string;
  caption: string;
  show: boolean;
}

const ImageBox: React.FC<ImageBoxProps> = ({
  imageSrc,
  altText,
  caption,
  show,
}) => {
  return (
    <div className="flex flex-col justify-end">
      <div
        className={`bg-[#252a3d] rounded-lg self-center w-60 mb-5 overflow-hidden transform transition-all duration-1000 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <img src={imageSrc} alt={altText} className="w-60 h-60 object-fit" />
      </div>
      <div
        className={`bg-[#252a3d] rounded-lg overflow-hidden w-70 transform transition-all duration-1000 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <div className="p-4">
          <p className="text-gray-300">{caption}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageBox;
