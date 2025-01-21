import React from 'react';

interface AnswerBoxProps {
  title: string;
  content: string;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ title, content }) => {
  return (
    <div 
      className="text-gray-300 bg-[#252a3d] rounded-lg p-4 mb-4 animate-slideIn opacity-0"
      style={{
        animation: 'slideIn 0.5s ease-out forwards'
      }}
    >
      <h2 className="text-white mb-2">{title}</h2>
      <p className="leading-relaxed">{content}</p>
    </div>
  );
};

export default AnswerBox;