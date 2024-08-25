import MusicPlayer from "@/components/music-player";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import SongDescription from "@/components/song-description";
import SongsList from "@/components/songs-list";

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-black text-white">
      <Navbar />
      <div className="flex h-full gap-2">
        <Sidebar />
        <div className="w-full h-[calc(100vh-10rem)] flex gap-2">
          <SongsList />
          <SongDescription />
        </div>
      </div>
      <div className="fixed bottom-0 h-20 w-full bg-black">
        <MusicPlayer />
      </div>
    </main>
  );
}
