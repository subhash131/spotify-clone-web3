"use client";
import React, { useRef, useState } from "react";
import { VscLibrary } from "react-icons/vsc";
import { IoAddOutline } from "react-icons/io5";
import { toast } from "sonner";
import { abi } from "@/contract/abi";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { TbUpload } from "react-icons/tb";

const Sidebar = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  const creatorRef = useRef<HTMLInputElement>(null);
  const { writeContract } = useWriteContract();
  const { address } = useAccount();
  const [creatorPopup, setCreatorPopup] = useState(false);
  const [uploadPopup, setUploadPopup] = useState(false);
  const [songDetails, setSongDetails] = useState({
    name: "",
    songUrl: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSongDetails((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const { data: creatorData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getCreatorInfo",
    args: [address],
  });

  const handleBecomeCreator = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const creatorName = creatorRef.current?.value;
    if (!creatorName) {
      toast.error("Please enter your creator name!!");
      return;
    }
    writeContract({
      abi,
      address: `0x${contractAddress}`,
      functionName: "registerCreator",
      args: [creatorName],
    });
    setCreatorPopup((prev) => !prev);
  };

  const handleUploadSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!songDetails.imageUrl || !songDetails.name || !songDetails.songUrl) {
      toast.error("Please enter song details!!");
      return;
    }
    writeContract({
      abi,
      address: `0x${contractAddress}`,
      functionName: "uploadSong",
      args: [songDetails.name, songDetails.songUrl, songDetails.imageUrl],
    });
    setUploadPopup((prev) => !prev);
  };
  return (
    <div className="w-20 h-[calc(100vh-10rem)] bg-[#121212] ml-1 rounded-lg flex items-center py-2 flex-col relative">
      <button className="w-14 h-14 grid place-content-center rounded-md">
        <VscLibrary size={28} className="text-[#b3b3b3]" />
      </button>
      {!(creatorData as any)?.creatorName ? (
        <button
          className="w-14 h-14 grid place-content-center rounded-md relative group"
          onClick={() => {
            setCreatorPopup((prev) => !prev);
          }}
        >
          <p className="py-1 px-2 absolute group-hover:visible invisible left-14 text-xs w-fit text-nowrap top-4 bg-[#1f1f1f] rounded-md  ">
            Become Creator
          </p>
          <IoAddOutline size={28} className="text-[#b3b3b3]" />
        </button>
      ) : (
        <button
          className="w-14 h-14 grid place-content-center rounded-md relative group"
          onClick={() => {
            setUploadPopup((prev) => !prev);
          }}
        >
          <p className="py-1 px-2 absolute group-hover:visible invisible left-14 text-xs w-fit text-nowrap top-4 bg-[#1f1f1f] rounded-md  ">
            upload song
          </p>
          <TbUpload size={28} className="text-[#b3b3b3]" />
        </button>
      )}
      {!(creatorData as any)?.creatorName && creatorPopup && (
        <div className="left-2 top-32 flex flex-col items-start absolute bg-[#1f1f1f] w-44 h-fit gap-2 rounded-md p-2 justify-between cursor-pointer">
          <input
            className="outline-none bg-transparent text-lg w-full"
            placeholder="Creator name..."
            ref={creatorRef}
          />
          <button
            className="bg-white hover:scale-105 w-fit px-4 py-1 transition-transform rounded-full text-black text-xs font-semibold "
            type="button"
            onClick={handleBecomeCreator}
          >
            Submit
          </button>
        </div>
      )}
      {uploadPopup && (
        <div
          className="left-2 top-32 flex flex-col items-start absolute bg-[#1f1f1f] w-96
         h-fit gap-2 rounded-md p-2 justify-between cursor-pointer"
        >
          <input
            className="outline-none bg-transparent text-base w-full"
            placeholder="Song name..."
            onChange={handleChange}
            value={songDetails.name}
            name="name"
          />
          <input
            className="outline-none bg-transparent text-xs w-full"
            placeholder="Song image url.."
            value={songDetails.imageUrl}
            onChange={handleChange}
            name="imageUrl"
          />
          <input
            className="outline-none bg-transparent text-xs w-full"
            placeholder="Song url..."
            value={songDetails.songUrl}
            onChange={handleChange}
            name="songUrl"
          />

          <button
            className="bg-white hover:scale-105 w-fit px-4 py-1 transition-transform rounded-full text-black text-xs font-semibold "
            type="button"
            onClick={handleUploadSong}
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
