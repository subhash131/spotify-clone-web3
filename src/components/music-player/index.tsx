"use client";
import Image from "next/image";
import React from "react";
import Player from "./player";
import Controls from "./controls";
import { useStateContext } from "@/state-provider";
import { useReadContract } from "wagmi";
import { abi } from "@/contract/abi";

const MusicPlayer = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { currentSong } = useStateContext();

  const { data: creatorData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getCreatorInfo",
    args: [currentSong?.creator],
  });

  return (
    <div className="w-full h-full bg-transparent flex items-center justify-between px-3">
      <div className="flex w-full h-full gap-6">
        {currentSong && (
          <Image
            src={currentSong.songImage}
            alt="img"
            width={10}
            height={10}
            className="size-16 rounded-md"
          />
        )}
        <div className="w-full h-full flex items-start flex-col justify-center">
          <p className="text-base font-semibold">{currentSong?.songName}</p>
          <p className="text-xs text-[#b3b3b3]">
            {(creatorData as any)?.creatorName}
          </p>
        </div>
      </div>
      <Player />
      <Controls />
    </div>
  );
};

export default MusicPlayer;
