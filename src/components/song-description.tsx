"use client";
import { abi } from "@/contract/abi";
import { useStateContext } from "@/state-provider";
import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useReadContract } from "wagmi";

const SongDescription = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { currentSong, setCurrentSong } = useStateContext();

  const { data: creatorData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getCreatorInfo",
    args: [currentSong?.creator],
  });
  if (currentSong)
    return (
      <div className="w-full h-full bg-[#121212] max-w-96 rounded-md p-4">
        <div className="h-10 w-full bg-transparent flex items-center justify-between">
          <p className="text-lg font-semibold">Song title</p>
          <button
            onClick={() => {
              setCurrentSong(undefined);
            }}
          >
            <IoClose size={26} />
          </button>
        </div>
        <div className="w-full h-fit rounded-md overflow-hidden pt-2">
          <Image
            src={currentSong.songImage}
            alt="img"
            width={10}
            height={10}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="h-16 w-full pt-4">
          <p className="text-2xl font-semibold">{currentSong.songName}</p>
          <p className="text-base text-[#b3b3b3]">
            {(creatorData as any).creatorName}
          </p>
        </div>
      </div>
    );
};

export default SongDescription;
