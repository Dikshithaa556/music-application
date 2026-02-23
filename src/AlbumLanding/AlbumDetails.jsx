import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { GlobalAudioPlayer } from '../context/AudioPlayerContext';

const AlbumDetails = () => {
  let location = useLocation();
   let {songs,
     setSongs, 
     isPlaying, 
     setIsPlaying,
      currentSongIndex, 
      setCurrentSongIndex} = useContext(GlobalAudioPlayer);
//   console.log(location);

  //? Extract the album details only from the state
  let albumData = location?.state;
  console.log("Album Data:",albumData) ;

  //? Extract the song list from the album data
  let songList = albumData?.songs;
  console.log("Song List:",songList);

  //! Create one function which will handle the songs
  let handleSongChange = (index) => {
    setSongs(songList);
    setCurrentSongIndex(index);
    if(currentSongIndex === index){
        setIsPlaying(!isPlaying);
    }else{
        setIsPlaying(true);
    }
  }

  return (
   <section className='w-full min-h-[calc(100vh-70px)] flex flex-col items-center pt-10'>
    <article className='w-[95%] flex gap-2 h-[400px] bg-gray-600 px-8 py-5 rounded-md hover:bg-gray-900 hover:ring-1 hover:ring-rose-300 transition-all duration-50 ease-linear'>
        {/* Left aside section - for album thumbnail */}
        <aside className='basis-[30%]h-[350px] p-1 relative'>
            <img src={albumData?.albumThumbnail}
             alt={albumData?.albumTitle} 
             className='w-full h-[350px] object-cover rounded-md'/>
             <span className='py-1 px-4 bg-rose-200 rounded-lg absolute top-[-10px] right-[-8px]'>{albumData?.albumType}</span>
        </aside>
        {/* right aside section - for album details */}
        <aside className='basis-[70%] h-350px '>
            <h1 className='text-5xl font-bold tracking-wider px-2 py-3'>{albumData?.albumTitle}</h1>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Description:</span>
                <span className='text-gray-300'>{albumData?.albumDesc}</span>
            </p>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Release Date :</span>
                <span className='text-gray-300'>{albumData?.albumReleaseDate}</span>
            </p>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Language :</span>
                <span className='text-gray-300'>{albumData?.albumLang}</span>
            </p>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Starcast :</span>
                <span className='text-gray-300'>{albumData?.albumStarcast}</span>
            </p>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Director:</span>
                <span className='text-gray-300'>{albumData?.albumDirector}</span>
            </p>
            <p className='px-2 py-1'>
                <span className='text-lg font-semibold mr-1 text-justify'>Number of Tracks:</span>
                <span className='text-gray-300'>{albumData?.albumSongsCount}</span>
            </p>
        </aside>
    </article>
    {/* Song List Container */}
    <main className='mt-5 w-full mb-8 rounded-b-md'>
        <header className='w-full'>
            <h1 className='text-3xl font-semibold py-2 px-9'>Song Collection</h1>
        </header>
        <table className='ml-8 w-[95%] mb-10'>
            <thead>
                <tr className='bg-gray-900 rounded-top-md'>
                    <td className='py-2 px-3 text-lg font-semibold'>Track No</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Poster</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Song Name</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Song Singers</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Song Music Director</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Duration</td>
                    <td className='py-2 px-3 text-lg font-semibold'>Size</td>
                </tr>
            </thead>
            <tbody>
                {
                    songList.length > 0 ? (songList.map((song,index) => {
                       return <tr key={index} onClick={() => handleSongChange(index)} className='bg-gray-700 hover:bg-gray-950 cursor-pointer transition-all duration-75 ease-in-out hover:border-t-[1px] hover:border-b-[1px] hover:border-rose-300'>
                            <td className='text-center'>{index + 1}</td>
                            <td className='flex justify-center items-center py-2 px-2'>
                                <div>
                                    <img 
                                    src={song?.songThumbnail} 
                                    alt={song?.songTitle} 
                                    className='w-[150px] h-[150px] rounded-md' />
                                </div>
                            </td>
                            <td className='px-5'>{song?.songTitle}</td>
                            <td className='px-5'>{song?.songSingers}</td>
                            <td className='px-5'>{song?.songMusicDirector}</td>
                            <td className='px-5 text-center'>{song?.duration}</td>
                            <td className='text-center px-5'>{song?.size}</td>
                        </tr>;
                    })) : (<p className='text-center'> Song Collection not found for this album </p>)
                }
            </tbody>
            <tfoot></tfoot>
        </table>
    </main>
   </section>
  )
}

export default AlbumDetails