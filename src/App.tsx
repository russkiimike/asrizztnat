import React, { useState, useEffect } from 'react';
import { X, Headset, Mic, Keyboard } from 'lucide-react';
import AnswerBox from './components/AnswerBox';
import ImageBox from './components/ImageBox';
import Skeleton from './components/Skeleton';
import { responseDatabase } from './components/ResponseDb';

// VideoBox Component remains unchanged
const VideoBox = ({
  videoSrc,
  thumbnailSrc,
  caption,
  show,
}: {
  videoSrc: string;
  thumbnailSrc?: string;
  caption: string;
  show: boolean;
}) => {
  return (
    <div
      className={`transition-opacity duration-500 w-60 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <video
        className="w-full rounded-lg"
        poster={thumbnailSrc}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <p className="text-center text-gray-400 mt-2">{caption}</p>
    </div>
  );
};

const getRandomResponse = () => {
  const allResponses = [
    ...responseDatabase.progressResponses,
    ...responseDatabase.muscleMapResponses,
    ...responseDatabase.streakResponses,
    ...responseDatabase.memeResponses,
  ];
  const randomIndex = Math.floor(Math.random() * allResponses.length);
  return allResponses[randomIndex];
};

function App() {
  const [inputMode, setInputMode] = useState<'voice' | 'keyboard'>('voice');
  const [showMedia, setShowMedia] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentResponse] = useState(() => getRandomResponse());

  useEffect(() => {
    // Simulate loading time
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    // Show media after loading
    const mediaTimer = setTimeout(() => {
      setShowMedia(true);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(mediaTimer);
    };
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      window.location.reload();
    };
    document.addEventListener('visibilitychange', handleRefresh);
    window.addEventListener('beforeunload', handleRefresh);
    return () => {
      document.removeEventListener('visibilitychange', handleRefresh);
      window.removeEventListener('beforeunload', handleRefresh);
    };
  }, []);

  // Determine if response has video or image
  const isVideo = 'videoSrc' in currentResponse;

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3">
        <button className="p-2">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-white">GymStreak</span>
          <span className="text-blue-500 font-semibold">AI</span>
        </div>
        <button className="p-2">
          <Headset className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 pb-32 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Show me my aura</h1>

        {isLoading ? (
          <Skeleton />
        ) : (
          <>
            <AnswerBox title="Answer" content={currentResponse.content} />
            {isVideo ? (
              <VideoBox
                videoSrc={currentResponse.videoSrc}
                thumbnailSrc={currentResponse.thumbnailSrc}
                caption={currentResponse.caption}
                show={showMedia}
              />
            ) : (
              <ImageBox
                imageSrc={currentResponse.imageSrc}
                altText={currentResponse.imageAlt}
                caption={currentResponse.imageCaption}
                show={showMedia}
              />
            )}
          </>
        )}
      </div>

      {/* Input Area - Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#1a1f2e] max-w-3xl mx-auto">
        <div className="bg-[#252a3d] rounded-full p-3 flex items-center gap-3 border border-[#3a4055]">
          <button className="p-2" onClick={() => setInputMode('keyboard')}>
            <Keyboard className="w-6 h-6 text-gray-400" />
          </button>
          <input
            type="text"
            placeholder="Ask follow up"
            className="flex-1 bg-transparent outline-none text-white"
          />
          <button
            className="bg-blue-500 p-2 rounded-full"
            onClick={() => setInputMode('voice')}
          >
            <Mic className="w-6 h-6" />
          </button>
        </div>
        {/* Home Indicator */}
        <div className="mt-4 flex justify-center">
          <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default App;