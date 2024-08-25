"use client";
import { abi } from "@/contract/abi";
import Image from "next/image";
import React from "react";
import { useReadContract } from "wagmi";
import { SongResponse } from ".";

const Card = ({ creator, songImage, songId, songName }: SongResponse) => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const { data: creatorData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getCreatorInfo",
    args: [creator],
  });
  return (
    <div
      className="w-44 h-60 transition-all flex flex-col gap-2 hover:bg-[#1f1f1f] rounded-md cursor-pointer p-3 overflow-hidden"
      data-song-id={songId}
    >
      <Image
        src={songImage}
        alt="image"
        width={10}
        height={10}
        className="w-full h-40 rounded-lg object-cover bg-black pointer-events-none"
      />
      <div className="flex flex-col w-full h-full gap-0 pointer-events-none">
        <p>{songName}</p>
        <p className="text-xs text-[#b3b3b3]">
          {(creatorData as any)?.creatorName}
        </p>
      </div>
    </div>
  );
};

export default Card;
