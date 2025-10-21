import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface BackgroundMusicProps {
  src: string;
  title?: string;
}

const BackgroundMusic = ({ src, title = "Background Music" }: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Try to autoplay on first user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasUserInteracted && audioRef.current) {
        setHasUserInteracted(true);
        // Note: Most browsers will still block autoplay
        audioRef.current.play().catch(() => {
          // Autoplay failed, user will need to click play button
        });
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
      }
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, [hasUserInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Handle play promise rejection
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
      />

      {/* Music control button - fixed position */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-card border rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              title={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 rounded-full hover:bg-accent transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <span className="text-xs text-muted-foreground px-2 hidden sm:inline">
              {title}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BackgroundMusic;