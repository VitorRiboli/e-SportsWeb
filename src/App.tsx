import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import '../src/styles/main.css';
import logoImg from './assets/logo.svg';
import { CreateAdBanner } from './components/CreateAdBanner';
import { GameCard } from './components/GameCard';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';
import { CreateGameAd } from './components/CreateGameAd';
import { CreateGameAdModal } from './components/CreateGameAdModal';


export interface Game {
  id: string;
  title: string;
  banner: string;
  _count: {
    ads: number;
  };
}

function App() {

  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(res => {
        setGames(res.data)
      })
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>DUO</span> está aqui!
      </h1>


      <div className='flex flex-wrap justify-center gap-6 mt-10 mb-6 pl-10 pr-10'>

        {games.map(game => {
          return (
            <GameCard
              key={game.id}
              title={game.title}
              bannerUrl={game.banner}
              adsCount={game._count.ads}
            />
            
          )
        })}
      </div>

      <div className='w-full pl-10 pr-10'>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
      </div>

      <div className='w-full p-10'>
        <Dialog.Root>
          <CreateGameAd />
          <CreateGameAdModal />
        </Dialog.Root>
      </div>





    </div>
  )
}

export default App
