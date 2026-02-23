import React, { useEffect, useState } from 'react'
import { __DB } from '../backend/firebaseconfig'
import { collection, getDocs } from 'firebase/firestore';
import { FaMusic } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import Spinner from '../helper/Spinner';

const PopularAlbums = () => {

    let[albums, setAlbums] = useState(null);

    //! Now we will fetch the albums from the database
    

    useEffect(() => {
        let fetchAlbums = async() => {
            let albumCollectionRef = collection(__DB, "music_albums");
            let getAlbums = await getDocs(albumCollectionRef);
            console.log(getAlbums);

            //! Now we will extract the required data
            let albumData = getAlbums.docs.map((album) => ({
                ...album?.data(),
                songs : album?.data()?.songs || []
            }))
            console.log("Album Data :" , albumData);
            setAlbums(albumData);
        }
        //! Call the function
        fetchAlbums();
    },[])
    
  return (
    <section className='w-[80vw]'>
        {albums ? ( <article>
            <header className='w-full p-5 flex items-center gap-3'>
                <span className='text-3xl'><FaMusic/></span>
                <h1 className='text-3xl font-bold'>Popular Albums</h1>
            </header>
            <main className='w-full '>
                
                    <div className='px-6 flex  items-center gap-5'>
                    {albums.map((album,index) => {
                        return <NavLink 
                        to={`album-details/${album?.albumTitle}`}
                         key={index}
                         state={album} >
                            <div className='w-[270px] h-[360px] bg-black/50 p-4 rounded-lg hover:bg-black hover:ring-1 hover:ring[wheat]'>
                                <img src={album?.albumThumbnail} alt={album?.albumTitle} 
                                className='w-full h-[250px] object-cover rounded-md hover:scale-105 transition-all duration-100 ease-linear'/>
                                <h1 className='py-2 px-20 bg-black mt-2 rounded text-xl font-semibold'>{album?.albumTitle}</h1>
                            </div>
                        </NavLink>
                    })}
                </div>

                

            </main>
        </article>) : (<section className='w-[100%] h-[100vh] flex top-0 left-[7%]'>
            <Spinner/>
        </section>)}
       
        
    </section>
  )
}

export default PopularAlbums