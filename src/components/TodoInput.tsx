'use client'
import Button from '@/components/Button'
import { createTask, updateTask } from '@/services/api'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E'];

interface Props {
    initValue?: Todo
}

const TodoInput: React.FC<Props> = ({ initValue }) => {
    const navigate = useRouter()
    const [title, setTitle] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState<boolean>(false);


    useEffect(() => {
        if (initValue?.id) {
            setTitle(initValue.title);
            setSelectedColor(initValue.color);
        }
    }, [initValue])


    const handleCreateTodo = async () => {
        if (!title) {
            setError('Title is required .');
            return;
        }
        if (!selectedColor) {
            setError('Color is required .')
            return;
        }
        setSaving(true);
        const loadingToast = toast.loading('Creating task...');
        try {
            if (initValue) {
                const response = await updateTask({ ...initValue, title: title.trim(), color: selectedColor });
                if (response.id) {
                    setError(null);
                    setSaving(false);
                    toast.update(loadingToast, {
                        render: 'Task Saved',
                        type: 'success',
                        isLoading: false,
                        autoClose: 3000,
                    });
                    navigate.replace('/');
                } else {
                    toast.update(loadingToast, {
                        render: response.message,
                        type: 'error',
                        isLoading: false,
                        autoClose: 3000,
                    });
                }
                setSaving(false);
                return;
            }

            const response = await createTask(title.trim(), selectedColor);
            if (response?.id) {
                setError(null);
                setSaving(false);
                toast.update(loadingToast, {
                    render: 'Task Created',
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
                navigate.replace('/');
            } else {
                setSaving(false);
                toast.update(loadingToast, {
                    render: response.message,
                    type: 'success',
                    isLoading: false,
                    autoClose: 3000,
                });
            }
        } catch (error) {
            toast.update(loadingToast, {
                render: 'server error',
                type: 'error',
                isLoading: false,
                autoClose: 3000,
            });
        }
    }
    return (
        <>
            <Link href={'/'}>
                <Image src={'/arrow-left.svg'} alt="logo" height={24} width={24} />
            </Link>

            <div className='mt-12'>
                <label htmlFor='title' className="text-[#4EA8DE] font-bold text-sm block">Title</label>
                <input id='title' name='title' className='mt-3 rounded-lg shadow-[0px_2px_8px_rgba(0,0,0,0.06)] w-full border-[1px] border-[#333333] bg-[#262626] h-[52px] p-4 outline-none' value={title} onChange={e => setTitle(e.target.value)} type="text" placeholder='Ex. Brush you teethle' />

                <p className="text-[#4EA8DE] font-bold text-sm mt-6">Color</p>
                <div className='flex flex-wrap items-center gap-4 mt-3 mb-12'>
                    {colors?.map(color => <div data-testid='color_box' onClick={() => setSelectedColor(color)} key={color} className={`min-w-[52px] h-[52px] rounded-full cursor-pointer ${color === selectedColor ? 'border-[2px] border-white' : ''}`} style={{ backgroundColor: color }}></div>)}
                </div>

                <Button disabled={saving} click={handleCreateTodo} title={`${!initValue ? 'Add Task' : 'Save'}`} icon={`${initValue ? '/check_bold.svg' : '/plus.svg'}`} />

                {error && (
                    <p className='text-red-500 mt-4 text-sm font-semibold'>{error}</p>
                )}

            </div>
        </>
    )
}

export default TodoInput