import { render, screen, fireEvent } from '@testing-library/react';
import TodoCard from './TodoCard';

describe('TodoCard', () => {
    const mockToggleTodoCompleted = jest.fn();
    const mockDeleteTodo = jest.fn();

    const todo = {
        id: '1',
        title: 'Test Todo',
        completed: false,
        color: 'blue',
    };

    it('should render the todo card correctly', () => {
        render(<TodoCard todo={todo} toggleTodoCompleted={mockToggleTodoCompleted} deleteTodo={mockDeleteTodo} />);

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).not.toBeChecked();
    });

    it('should toggle todo completion when checkbox is clicked', async () => {
        render(<TodoCard todo={{ ...todo, completed: true }} toggleTodoCompleted={mockToggleTodoCompleted} deleteTodo={mockDeleteTodo} />);

        const checkbox = screen.getByRole('checkbox');

        fireEvent.click(checkbox);
        expect(mockToggleTodoCompleted).toHaveBeenCalledWith({ ...todo, completed: true }, false);

        const taskIncomplete = screen.getByTestId('task-incomplete');
        fireEvent.click(taskIncomplete);
        expect(mockToggleTodoCompleted).toHaveBeenCalledWith({ ...todo, completed: true }, false);
    });


    it('should call deleteTodo when delete button is clicked', () => {
        render(<TodoCard todo={todo} toggleTodoCompleted={mockToggleTodoCompleted} deleteTodo={mockDeleteTodo} />);

        const deleteButton = screen.getByTestId('delete-task');
        fireEvent.click(deleteButton);

        expect(mockDeleteTodo).toHaveBeenCalledWith(todo.id);
    });

    it('should navigate to the edit page when the todo title is clicked', () => {
        render(<TodoCard todo={todo} toggleTodoCompleted={mockToggleTodoCompleted} deleteTodo={mockDeleteTodo} />);

        const todoTitleLink = screen.getByText('Test Todo').closest('a');
        expect(todoTitleLink).toHaveAttribute('href', `/todo/edit/${todo.id}`);
    });
});
