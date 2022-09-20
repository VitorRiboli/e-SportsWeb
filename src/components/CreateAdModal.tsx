import * as Dialog from '@radix-ui/react-dialog';
import { FormEvent, useEffect, useState } from 'react';
import { Input } from './Form';
import { Check, GameController } from 'phosphor-react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { Game } from '../App';
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import axios from 'axios';




export function CreateAdModal() {

    const [games, setGames] = useState<Game[]>([]);
    const [weekDays, setWeekDays] = useState<string[]>([]); //captura os dias da semana do form
    const [useVoiceChannel, setUseVoiceChannel] = useState(false) //captura a entrada do checkbox, valor boolean

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(res => {
                setGames(res.data)
            })
    }, []);

    async function handleCreateAd(e: FormEvent) {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData)

        // validação para não enviar nenhum dado vazio
        if (!data.name) {
            return alert('Digite Todos os Campos')
        }

        try {
            //Criação do ADS na API
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hoursStart: data.hoursStart,
                hoursEnd: data.hoursEnd,
                useVoiceChannel: useVoiceChannel
            })


            alert('Anúncio criado com sucesso');
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
                <Dialog.Title className="text-3xl font-black text-center" >Publique um anúncio</Dialog.Title>

                <form onSubmit={handleCreateAd} className='nt-8 flex flex-col gap-4'>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='game' className='font-semibold'>Qual o Game?</label>
                        <select
                            name='game'
                            id='game'
                            className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none'
                            defaultValue=""
                        >
                            <option disabled value="" key="">Selecione o Game que deseja jogar!</option>
                            {games.map(game => {
                                return <option key={game.id} value={game.id} >{game.title}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name">Seu Nome ou Nickname:</label>
                        <Input name='name' id='name' placeholder="Seu nome dentro do Game?" />
                    </div>

                    <div className='grid grid-cols-2 gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                            <Input name='yearsPlaying' id='yearsPlaying' type="number" placeholder='De boa se for ZERO' />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="discord">Qual seu discord</label>
                            <Input name='discord' id='discord' placeholder='Usuário DC' />
                        </div>
                    </div>

                    <div className='flex gap-6'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="weekDays">Dias em que Joga?</label>

                            <div>
                                <ToggleGroup.Root
                                    type='multiple'
                                    className='grid grid-cols-4 gap-2'
                                    value={weekDays}
                                    onValueChange={setWeekDays}
                                >
                                    <ToggleGroup.Item value='0' title='Domingo' className={`w-8 h-8 rounded ${weekDays.includes("0") ? 'bg-violet-500' : 'bg-zinc-900'}`}>D</ToggleGroup.Item>
                                    <ToggleGroup.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Segunda">S</ToggleGroup.Item>
                                    <ToggleGroup.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes("2") ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Terça">T</ToggleGroup.Item>
                                    <ToggleGroup.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes("3") ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quarta">Q</ToggleGroup.Item>
                                    <ToggleGroup.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes("4") ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quita">Q</ToggleGroup.Item>
                                    <ToggleGroup.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes("5") ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sexta">S</ToggleGroup.Item>
                                    <ToggleGroup.Item value='6' className={`w-8 h-8 rounded ${weekDays.includes("6") ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sabado">S</ToggleGroup.Item>
                                </ToggleGroup.Root>
                            </div>
                        </div>

                        <div className='flex flex-col gap-2 flex-1'>
                            <label htmlFor="hoursStart">Em que hora do dia?</label>
                            <div className='grid grid-cols-2 gap-2'>
                                <Input name='hoursStart' id='hoursStart' type="time" placeholder='De' />
                                <Input name='hoursEnd' id='hoursEnd' type="time" placeholder='Até' />
                            </div>
                        </div>
                    </div>

                    <label className='mt-2 flex items-center gap-2 text-sm '>
                        <Checkbox.Root
                            checked={useVoiceChannel}
                            onCheckedChange={(checked) => {
                                if (checked === true) {
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }}
                            className='w-6 h-6 rounded p-1 bg-zinc-900 '
                        >
                            <Checkbox.Indicator>
                                <Check className='w-4 h-4 text-emerald-400' />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Utiliza o Chat de Voz?
                    </label>

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
                            <GameController size={24} />
                            Encontrar um Parceiro
                        </button>

                    </footer>

                </form>

            </Dialog.Content>
        </Dialog.Portal>
    )
}