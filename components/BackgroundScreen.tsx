
import React from 'react';

interface BackgroundScreenProps {
  videoSrc: string;
  noiseTextureSrc: string;
}

export const BackgroundScreen: React.FC<BackgroundScreenProps> = ({ videoSrc, noiseTextureSrc }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {/* Video Player */}
      <video
        src={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.8) saturate(1.5)' }} // Apply original brightness/saturation
      />
      {/* Noise/Grain Overlay - opacity 0.12 matches the direct style on the original noise element */}
      <div
        className="absolute opacity-[0.12] bg-repeat bg-[length:256px_256px]"
        style={{
          backgroundImage: `url(${noiseTextureSrc})`,
          inset: '-200%', 
          width: '400%',   
          height: '400%',
        }}
      />
      {/* Optional: Dark vignette overlay for better text contrast if video is too bright */}
      <div className="absolute inset-0 w-full h-full bg-black/20"></div>
    </div>
  );
};
