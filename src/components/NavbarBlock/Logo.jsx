import React from 'react'
import BattlefieldLogo from '../../assets/download.png'

const Logo = () => {
  return (
    <aside className='basis-[15%]'>
        <figure className='w-full h-full flex justify-center items-center'>
            <img src={BattlefieldLogo} alt="BattleFieldMusicLogo"
            className='w-[120px] h-[60px]' />
        </figure>
    </aside>
  )
}

export default Logo