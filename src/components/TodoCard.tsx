import Link from 'next/link';
import React from 'react'

interface TodoCardProps {
    todo: Todo;
    toggleTodoCompleted: (todo: Todo, completed: boolean) => void;
    deleteTodo: (id: string) => void;
}
const TodoCard: React.FC<TodoCardProps> = ({ todo, toggleTodoCompleted, deleteTodo }) => {
    return (
        <div className="flex items-start justify-between gap-3 bg-[#262626] rounded-lg p-4 border-[1px] border-[#333333] shadow-[0px_2px_8px_0px_#0000000F]">
            <div className="relative w-5 cursor-pointer">
                <input
                    onChange={(e) => toggleTodoCompleted(todo, e.target.checked)}
                    type="checkbox"
                    checked={todo.completed}
                    className="h-5 w-5 appearance-none border-2 border-[#4EA8DE] rounded-full cursor-pointer checked:bg-[#5E60CE] checked:border-[#5E60CE] transition-all"
                />
                {todo.completed && (
                    <span data-testid="task-incomplete" onClick={() => toggleTodoCompleted(todo, !todo.completed)} className="absolute inset-0 -top-1 flex items-center justify-center">
                        <svg width="10" height="7" viewBox="0 0 10 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.43071 0.342139L4.09877 4.67408L1.6163 2.19161L0.780396 3.02751L4.09877 6.34589L9.26661 1.17804L8.43071 0.342139Z" fill="#F2F2F2" />
                        </svg>
                    </span>
                )}
            </div>
            <Link className='w-full flex items-center justify-center' href={`/todo/edit/${todo.id}`}>
                <p className={`${todo.completed ? 'text-[#808080] line-through' : 'text-[#F2F2F2]'} font-normal text-base`}>{todo.title}</p>
            </Link>
            <div data-testid='delete-task' className="hover:text-red-400 transition-all p-[2px] hover:bg-gray-600/20 w-7 cursor-pointer" onClick={() => deleteTodo(todo.id)}>
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hover:fill-red-400 transition-all"
                >
                    <path
                        d="M14.2021 9.98547H12.8716V15.5073H14.2021V9.98547Z"
                        fill="currentColor"
                    />
                    <path
                        d="M11.4623 9.98547H10.1318V15.5073H11.4623V9.98547Z"
                        fill="currentColor"
                    />
                    <path
                        d="M18.478 7.16712C18.4754 7.03061 18.4295 6.89846 18.3469 6.78975C18.2642 6.68104 18.1492 6.6014 18.0184 6.56232C17.9596 6.53782 17.8974 6.52252 17.8339 6.51696H14.2868C14.1525 6.07791 13.8808 5.69355 13.5117 5.42047C13.1426 5.14739 12.6956 5 12.2365 5C11.7774 5 11.3304 5.14739 10.9613 5.42047C10.5922 5.69355 10.3205 6.07791 10.1862 6.51696H6.63911C6.58068 6.51814 6.52269 6.52729 6.46674 6.54418H6.45162C6.31318 6.58701 6.19334 6.67547 6.11163 6.79515C6.02992 6.91483 5.99117 7.05866 6.00169 7.20319C6.01222 7.34771 6.0714 7.48441 6.16958 7.59099C6.26776 7.69757 6.39916 7.76774 6.54234 7.79006L7.25298 17.5334C7.26382 17.9127 7.41693 18.2741 7.68191 18.5458C7.94688 18.8175 8.30435 18.9797 8.68332 19H15.7867C16.1662 18.9804 16.5244 18.8186 16.79 18.5468C17.0556 18.2751 17.2092 17.9132 17.22 17.5334L17.9277 7.79914C18.0802 7.77797 18.22 7.70232 18.3212 7.58615C18.4223 7.46999 18.478 7.32116 18.478 7.16712ZM12.2365 6.21456C12.3661 6.21458 12.4943 6.24146 12.6129 6.29351C12.7316 6.34556 12.8382 6.42164 12.926 6.51696H11.547C11.6346 6.42135 11.7411 6.34507 11.8599 6.29299C11.9786 6.24092 12.1069 6.21421 12.2365 6.21456ZM15.7867 17.7904H8.68332C8.60168 17.7904 8.47467 17.6573 8.45955 17.4457L7.75798 7.81123H16.715L16.0135 17.4457C15.9984 17.6573 15.8714 17.7904 15.7867 17.7904Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>
    )
}

export default TodoCard