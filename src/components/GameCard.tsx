import 'keen-slider/keen-slider.min.css'

interface GameCardProps {
    bannerUrl: string;
    title: string;
    adsCount: number;
}

export function GameCard(props: GameCardProps) {
    return (
        <div className={`relative rounded-lg overflow-hidden w-40`}>

            <img src={props.bannerUrl} alt="" />

            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0'>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.adsCount} {props.adsCount > 1 ? 'Anúncios' : 'Anúncio'}</span>
            </div>
        </div>
    )
}