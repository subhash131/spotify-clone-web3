"use client";
import { abi } from "@/contract/abi";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSearch } from "react-icons/io5";
import { toast } from "sonner";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
} from "wagmi";

const Navbar = () => {
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  const { address } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [registerPopup, setRegisterPopup] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  const { data: userData } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "getUserInfo",
    args: [address],
  });
  const { data: subscriptionFee } = useReadContract({
    abi,
    address: `0x${contractAddress}`,
    functionName: "subscriptionPrice",
  });

  const { writeContract } = useWriteContract();

  const toggleRegister = () => {
    setRegisterPopup((prev) => !prev);
  };

  const handleRegister = () => {
    const userName = usernameRef.current?.value;
    if (!userName) {
      toast.error("Please enter the username!!");
      return;
    }
    writeContract({
      abi,
      address: `0x${contractAddress}`,
      functionName: "registerUser",
      args: [userName],
    });
    toggleRegister();
  };

  const handleSubscribe = () => {
    writeContract({
      abi,
      address: `0x${contractAddress}`,
      functionName: "subscribe",
      value: BigInt(subscriptionFee as string),
    });
  };

  return (
    <div className="h-16 flex justify-between items-center w-full bg-black px-6">
      <div className="w-full h-full flex items-center justify-start">
        <div className="rounded-full bg-black flex items-center justify-center">
          <Image
            src="/image.png"
            alt="logo"
            width={10}
            height={10}
            className="w-12 h-12 object-cover"
          />
        </div>
      </div>
      <div className="flex h-full items-center justify-center w-full gap-4">
        <button className="h-12 w-12 bg-[#1F1F1F] cursor-pointer relative group rounded-full flex items-center justify-center hover:scale-105 transition-transform">
          <GoHomeFill fill="white" size={28} />
          <p className="absolute -bottom-8 group-hover:visible invisible  px-2 py-1 text-xs bg-[#1f1f1f] rounded-md">
            Home
          </p>
        </button>
        <div className="w-[30rem] h-14 bg-[#1f1f1f] hover:border border-[#4c4c4c] hover:bg-[#323232] rounded-full transition-all flex items-center justify-center group px-4">
          <IoSearch
            className="text-[#4c4c4c] group-hover:text-[#dedede]"
            size={28}
          />
          <input
            className="w-full h-full bg-transparent outline-none pl-2 text-lg"
            placeholder="what do you want to play?"
          />
        </div>
      </div>
      <div className="w-full h-full flex items-center justify-end gap-10">
        <button
          className="bg-white hover:scale-105 disabled:hover:scale-100 w-fit px-4 py-2 transition-transform rounded-full text-black text-xs font-semibold"
          disabled={userData && (userData as any).isSubscribed}
          onClick={handleSubscribe}
        >
          {userData && (userData as any).isSubscribed
            ? "Enjoy Music"
            : "Subscribe"}
        </button>
        {address ? (
          <>
            {userData && (userData as any).username ? (
              <button className="h-12 w-12 bg-[#1f1f1f] cursor-pointer relative group rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <div className="bg-orange-400 size-8 rounded-full grid place-content-center">
                  {(userData as any).username.substring(0, 1).toUpperCase()}
                </div>
                <button
                  className="absolute -bottom-6 group-hover:visible invisible  px-2 py-1 text-xs bg-[#1f1f1f] rounded-md"
                  onClick={() => disconnect()}
                >
                  logout
                </button>
              </button>
            ) : (
              <div className="relative">
                <button
                  className="bg-white hover:scale-105 w-fit px-4 py-2 transition-transform rounded-full text-black text-xs font-semibold "
                  onClick={toggleRegister}
                >
                  Register
                </button>
                {registerPopup && (
                  <div className="absolute top-10 h-24 w-80 flex flex-col items-start gap-2 right-4 rounded-lg bg-[#1f1f1f] p-4">
                    <input
                      className="outline-none bg-transparent text-lg w-full"
                      placeholder="user name..."
                      ref={usernameRef}
                    />
                    <div className="flex gap-2">
                      <button
                        className="bg-white hover:scale-105 w-fit px-4 py-2 transition-transform rounded-full text-black text-xs font-semibold "
                        type="button"
                        onClick={handleRegister}
                      >
                        Submit
                      </button>
                      <button
                        className="bg-[#121212] text-white hover:scale-105 w-fit px-4 py-2 transition-transform rounded-full text-xs font-semibold "
                        type="button"
                        onClick={toggleRegister}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <>
            {connectors.map((connector) => {
              if (connector.type === "metaMask")
                return (
                  <button
                    className="bg-white hover:scale-105 w-fit px-4 py-2 transition-transform rounded-full text-black text-xs font-semibold"
                    onClick={() => connect({ connector })}
                  >
                    Connect Wallet
                  </button>
                );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
