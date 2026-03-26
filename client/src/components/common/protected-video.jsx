import { useRef, useState, useEffect } from "react";

const ProtectedVideo = ({ src, className = "" }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true); // ← default muted

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const blockContext = (e) => e.preventDefault();
    const blockDrag = (e) => e.preventDefault();
    const blockKeys = (e) => {
      if (
        (e.ctrlKey && ["s", "u", "p"].includes(e.key.toLowerCase())) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c"].includes(e.key.toLowerCase()))
      ) {
        e.preventDefault();
      }
    };

    video.addEventListener("contextmenu", blockContext);
    video.addEventListener("dragstart", blockDrag);
    document.addEventListener("keydown", blockKeys);
    video.removeAttribute("controls");

    return () => {
      video.removeEventListener("contextmenu", blockContext);
      video.removeEventListener("dragstart", blockDrag);
      document.removeEventListener("keydown", blockKeys);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };
    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  // ── Sync muted state to video element ──
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
  }, [isMuted]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    videoRef.current?.pause();
    if (videoRef.current) videoRef.current.currentTime = 0;
    setIsPlaying(false);
    setProgress(0);
  };

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) { video.play(); setIsPlaying(true); }
    else { video.pause(); setIsPlaying(false); }
  };

  // ── Toggle mute without affecting play state ──
  const toggleMute = (e) => {
    e.stopPropagation(); // prevent triggering togglePlay
    setIsMuted((prev) => !prev);
  };

  const ext = src?.split(".").pop()?.toLowerCase() || "mp4";

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Transparent overlay — blocks right-click, handles play toggle */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
        onClick={togglePlay}
        style={{ cursor: "pointer" }}
      />

      <video
        ref={videoRef}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        muted       // default muted (JS overrides via useEffect)
        loop
        playsInline
        preload="metadata"
        controlsList="nodownload nofullscreen noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
      >
        <source src={src} type={`video/${ext}`} />
      </video>

      {/* ── Mute / Unmute button ── */}
      <button
        onClick={toggleMute}
        className={`
          absolute bottom-3 right-3 z-30
          bg-black/50 backdrop-blur-sm
          rounded-full p-2
          text-white transition-all duration-300
          hover:bg-black/70 hover:scale-110
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
      >
        {isMuted ? (
          // Muted icon
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707A1 1 0 0112 5v14a1 1 0 01-1.707.707L5.586 15z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/>
          </svg>
        ) : (
          // Unmuted icon
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15.536 8.464a5 5 0 010 7.072M12 6v12m-6.414-9H4a1 1 0 00-1 1v4a1 1 0 001 1h1.586l4.707 4.707A1 1 0 0012 19V5a1 1 0 00-1.707-.707L5.586 9z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.07 4.93a10 10 0 010 14.14"/>
          </svg>
        )}
      </button>

      {/* ── Play indicator ── */}
      {!isPlaying && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="bg-black/40 backdrop-blur-sm rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
      )}

      {/* ── Progress bar ── */}
      <div className={`absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/20 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
        <div className="h-full bg-white transition-all duration-100" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default ProtectedVideo;