"use client";
import React from "react";
import Card from "./card";
import { useReadContract } from "wagmi";
import { abi } from "@/contract/abi";
import { useStateContext } from "@/state-provider";

export type SongResponse = {
  creator: string;
  songId: string;
  songImage: string;
  songName: string;
  songUrl: string;
};

const SongsList = () => {
  const { setCurrentSong } = useStateContext();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { data: songData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getAllSongs",
  });

  const handleSongPlay = (e: React.MouseEvent<HTMLDivElement>) => {
    const songs = songData as Array<SongResponse> | undefined;
    const songId = (e.target as HTMLDivElement).getAttribute("data-song-id");
    if (songs && songs.length > 0) {
      songs.forEach((song) => {
        if (song.songId.toString() === songId) {
          setCurrentSong({ ...song, playing: true });
        }
      });
    }
  };

  return (
    <div
      className="w-full h-full rounded-md grid [grid-template-columns:repeat(auto-fill,minmax(160px,1fr))] overflow-y-scroll bg-[#121212] pb-20"
      onClick={handleSongPlay}
    >
      {(songData as SongResponse[])?.map(
        ({ creator, songImage, songName, songId, songUrl }) => {
          return (
            <Card
              creator={creator}
              songImage={songImage}
              songName={songName}
              songId={songId}
              songUrl={songUrl}
              key={`${songId}-${songImage}`}
            />
          );
        }
      )}
    </div>
  );
};

export default SongsList;
