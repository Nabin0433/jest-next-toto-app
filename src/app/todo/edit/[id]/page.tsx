'use client'
import Error from '@/components/Error';
import Loading from '@/components/Loading';
import TodoInput from '@/components/TodoInput'
import { getTask } from '@/services/api';
import React, { use, useEffect, useState } from 'react';

const EditTodo = ({ params }: { params: Promise<{ id: string }> }) => {
    const [task, setTask] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = use(params);
    
    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const taskData = await getTask(id as string);
                    if (taskData?.id) {
                        setTask(taskData);
                    } else {
                        setError(taskData?.message || 'faild to fetch');
                    }
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                    setError('Error fetching task or invalid task id');
                }
            };

            fetchTask();
        }
    }, [id]);

    if (loading) return <Loading />;

    if (error && !loading) return <Error value={error} />;

    return (
        <main className='max-w-[726px] md:mx-auto mt-8 md:mt-20 mx-2'>
            {task && !loading && <TodoInput initValue={task} />}
            {!task && !loading && <p>invalid id</p>}
        </main>
    )
}

export default EditTodo;
