"use client";
import { SongResponse } from "@/components/songs-list";
import React, { createContext, useContext, useState } from "react";

type State = {
  currentSong: (SongResponse & { playing: boolean }) | undefined;
  setCurrentSong: React.Dispatch<
    React.SetStateAction<(SongResponse & { playing: boolean }) | undefined>
  >;
};

const Context = createContext<State>({
  currentSong: undefined,
  setCurrentSong: () => {},
});

export const useStateContext = () => useContext(Context);

const StateProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentSong, setCurrentSong] = useState<
    SongResponse & { playing: boolean }
  >();
  return (
    <Context.Provider value={{ currentSong, setCurrentSong }}>
      {children}
    </Context.Provider>
  );
};

export default StateProvider;
