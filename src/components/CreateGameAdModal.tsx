import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useEffect } from 'react';
import axios from 'axios';
import { Input } from './Form';


export function CreateGameAdModal() {

    async function handleAddGame(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData)

        //validações Simples
        if (!data.name) {
            return alert('Digite Todos os Campos')
        }
        if (!data.banner) {
            return alert('Digite Todos os Campos')
        }

        try {
            await axios.post("http://localhost:3333/games", {
                title: data.name,
                banner: data.banner,
            })

            alert("Anuncio criado com sucesso")
        }
        catch (err) {
            console.log(err)
            alert('Erro ao criar o anúncio');
        }
    }

    return (
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/40 inset-0 fixed " />
            <Dialog.Content className="fixed bg-[#2a2634] py-8 px-10 
          text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          rounded-lg w-[480px] shadow-black/30">
                <Dialog.Title className="text-3xl font-black text-center" >Adicione um novo Game a nossa lista!</Dialog.Title>
                <form onSubmit={handleAddGame} className='nt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Nome do Game: </label>
                        <Input name='name' id='name' placeholder="Nome do game que deseja adicionar a nossa lista" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="banner">Link da capa do game: </label>
                        <Input name='banner' id='banner' placeholder="Link do endereço da imagem!" />
                    </div>
                    <footer className='mt-4 flex justify-between gap-4'>
                        <Dialog.Close
                            type='button'
                            className='bg-zinc-500 rounded-md px-5 h-12 font-semibold hover:bg-zinc-600'
                        >
                            Cancelar
                        </Dialog.Close>

                        <button
                            type='submit'
                            className='bg-violet-500 rounded-md px-5 h-12 font-semibold flex items-center gap-3 hover:bg-violet-600'
                        >
                         Adicionar Game a Lista
                        </button>

                    </footer>

                </form>


            </Dialog.Content>
        </Dialog.Portal>
    )
}