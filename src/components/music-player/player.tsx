"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { TfiControlShuffle } from "react-icons/tfi";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPause,
  FaPlay,
  FaRepeat,
} from "react-icons/fa6";
import { useStateContext } from "@/state-provider";

const Player = () => {
  const { currentSong, setCurrentSong } = useStateContext();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [progress, setProgress] = useState(0);

  function formatDuration(seconds: number) {
    if (!seconds) return "0:00";
    // Calculate minutes and seconds
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    // Format seconds to always be two digits
    const formattedSecs = secs.toString().padStart(2, "0");

    // Return the formatted duration as min:sec
    return `${minutes}:${formattedSecs}`;
  }

  const handleControls = (e: React.MouseEvent) => {
    const role = (e.target as HTMLAudioElement).getAttribute("data-role");
    switch (role) {
      case "play-pause":
        if (currentSong?.playing) {
          setCurrentSong((prev) => prev && { ...prev, playing: false });
        } else {
          setCurrentSong((prev) => prev && { ...prev, playing: true });
        }
        break;
    }
  };
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime =
      (Number((e.target as HTMLInputElement).value) / 100) *
      audioRef.current.duration;
    audioRef.current.currentTime = newTime;
  };
  useEffect(() => {
    if (currentSong?.playing) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [currentSong]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime =
        audioRef.current &&
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(newTime || 0);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    audioRef.current.src = currentSong.songUrl;
    audioRef.current.play();
    setCurrentSong((prev) => prev && { ...prev, playing: true });
  }, [currentSong?.songUrl]);

  return (
    <div className="w-full h-full flex items-center justify-center flex-col">
      {currentSong && (
        <audio className="size-0" ref={audioRef} id={currentSong.songUrl}>
          <source src={currentSong.songUrl}></source>
        </audio>
      )}

      <div className="w-full h-fit flex gap-6 items-center justify-center">
        <button onClick={handleControls}>
          <TfiControlShuffle className="pointer-events-none" />
        </button>
        <button onClick={handleControls}>
          <FaBackwardStep className="pointer-events-none" />
        </button>
        <button onClick={handleControls} data-role="play-pause">
          {currentSong?.playing ? (
            <FaPause className="pointer-events-none" />
          ) : (
            <FaPlay className="pointer-events-none" />
          )}
        </button>
        <button onClick={handleControls}>
          <FaForwardStep className="pointer-events-none" />
        </button>
        <button onClick={handleControls}>
          <FaRepeat className="pointer-events-none" />
        </button>
      </div>
      <div className="flex w-full gap-2 text-xs items-center justify-center pt-2">
        <p>{formatDuration(progress)}</p>
        <input
          type="range"
          className="h-[5px] w-96 accent-white cursor-pointer hover:accent-[#1DB954] active:brightness-150 transition-colors"
          min={0}
          max={100}
          value={progress}
          onChange={handleSeek}
        />
        <p>{formatDuration(Number(audioRef.current?.duration))}</p>
      </div>
    </div>
  );
};

export default Player;
