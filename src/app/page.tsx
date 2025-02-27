'use client'
import Button from "@/components/Button";
import ConfirmModal from "@/components/ConfirmModal";
import Error from "@/components/Error";
import Loading from "@/components/Loading";
import TodoCard from "@/components/TodoCard";
import { deleteTask, getTasks, updateTask } from "@/services/api";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalVisible, setIsModalVisible] = useState<string | null>(null);
  const navigate = useRouter()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTodos(data);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, []);

  const toggleTodoCompleted = async (todo: Todo, completed: boolean) => {
    const loadingToast = toast.loading('Updating...');
    try {
      await updateTask({ ...todo, completed });

      setTodos((prevTodos) =>
        prevTodos
          ? prevTodos.map((item) =>
            item.id === todo.id ? { ...item, completed } : item
          )
          : []
      );

      toast.update(loadingToast, {
        render: 'Updated Task',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(loadingToast, {
        render: 'Failed to update task',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const deleteTodo = async () => {
    const loadingToast = toast.loading('Deleting...');
    if (!isModalVisible) return;

    try {
      await deleteTask(isModalVisible);
      setTodos((prevTodos) => prevTodos?.filter((todo) => todo.id !== isModalVisible) || []);
      setIsModalVisible(null);

      toast.update(loadingToast, {
        render: 'Task Deleted',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      toast.update(loadingToast, {
        render: 'Failed to delete task',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
      setIsModalVisible(null);
    }
  };

  if (loading) return <Loading />;

  if (error) return <Error value={error} />;

  return (
    <main className="max-w-[726px] md:mx-auto -mt-6 mx-2">
      <Button title="Create Task" click={() => navigate.push('/todo/add')} icon="/plus.svg" />

      <div className="mt-6">
        <div className="flex items-center justify-between mt-12">
          <div className="text-[#4EA8DE] font-bold text-sm flex items-center gap-2">
            <p>Tasks</p>
            <p className="bg-[#333333] text-white text-xs rounded-full py-[2px] px-2 flex items-center justify-center">{todos?.length ?? 0}</p>
          </div>
          <div className="text-[#8284FA] font-bold text-sm flex items-center gap-2">
            <p className="">Completed</p>
            <p className="bg-[#333333] text-white text-xs rounded-full py-[2px] px-2 flex items-center justify-center">{todos ? `${todos.filter((todo) => todo.completed).length} de ${todos.length}` : "0 of 0"}</p>
          </div>
        </div>
        {!todos?.[0] &&
          (
            <div className="rounded-lg border-t-[1px] border-[#333333] mt-8 px-1 flex items-center justify-center flex-col h-[226px] gap-6">
              <Image src={'/Clipboard.svg'} alt="logo" height={56} width={56} />
              <p className="text-[#808080] font-bold">You don't have any tasks registered yet.</p>
              <p className="text-[#808080] font-normal">Create tasks and organize your to-do items.</p>
            </div>
          )}

        {todos?.[0] && (
          <div className="flex flex-col gap-3 mt-8">
            {todos.map(todo => <TodoCard key={todo.id} deleteTodo={(id) => setIsModalVisible(id)} toggleTodoCompleted={toggleTodoCompleted} todo={todo} />)}
          </div>
        )}
      </div>
      {isModalVisible && <ConfirmModal onConfirm={deleteTodo} onCancel={() => setIsModalVisible(null)} />}
    </main>
  );
}

export default Page;