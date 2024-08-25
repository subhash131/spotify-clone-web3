"use client";
import { SongResponse } from "@/components/songs-list";
import React, { createContext, useContext, useState } from "react";

type State = {
  currentSong: (SongResponse & { playing: boolean }) | undefined;
  setCurrentSong: React.Dispatch<
    React.SetStateAction<(SongResponse & { playing: boolean }) | undefined>
  >;
  setIsSubscribed: React.Dispatch<React.SetStateAction<boolean>>;
  isSubscribed: boolean;
};

const Context = createContext<State>({
  currentSong: undefined,
  setCurrentSong: () => {},
  setIsSubscribed: () => {},
  isSubscribed: false,
});

export const useStateContext = () => useContext(Context);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<
    SongResponse & { playing: boolean }
  >();
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{ currentSong, setCurrentSong, isSubscribed, setIsSubscribed }}
    >
      {children}
    </Context.Provider>
  );
};

export default StateProvider;
