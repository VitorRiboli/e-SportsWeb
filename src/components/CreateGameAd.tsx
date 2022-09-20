import * as Dialog from '@radix-ui/react-dialog';
import { MagnifyingGlassPlus } from 'phosphor-react';

export function CreateGameAd() {
    return (
        <div className="pt-1 bg-nlw-gradient self-stretch mt-8 rounded-lg overflow-hidden">
            <div className="bg-[#2a2634] px-8 py-6 flex justify-between items-center">
                <div>
                    <strong className='text-2xl text-white font-blank block'>Não achou um game da sua preferencia?</strong>
                    <span className='text-zinc-400 block'>Adicione um novo game a nossa lista, e depois publique um anúncio!</span>
                </div>
                <Dialog.Trigger className='py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-lg flex items-center gap-3'>
                    <MagnifyingGlassPlus size={24} />
                    Adiciona Novo Game
                </Dialog.Trigger>
            </div>
        </div>


    )
}