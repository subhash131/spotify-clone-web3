import React from "react";
import { IoVolumeLow, IoVolumeMedium, IoVolumeHigh } from "react-icons/io5";

const Controls = () => {
  return (
    <div className="w-full h-full flex items-center justify-end gap-4">
      <button>
        <IoVolumeLow size={24} />
        {false && (
          <>
            <IoVolumeMedium size={24} />
            <IoVolumeHigh size={24} />
          </>
        )}
      </button>
      <input
        type="range"
        className="h-[5px] accent-white cursor-pointer hover:accent-[#1DB954] active:brightness-150 transition-colors mr-10"
      />
    </div>
  );
};

export default Controls;
