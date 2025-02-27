import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Page from './page';
import { getTasks, updateTask, deleteTask } from '@/services/api';
import { useRouter } from 'next/navigation';

const colors = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#5856D6', '#AF52DE', '#FF2D55', '#A2845E'];


jest.mock('@/services/api', () => ({
    getTasks: jest.fn(),
    updateTask: jest.fn(),
    deleteTask: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('Page', () => {
    let mockPush: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    });

    it('should display loading state while tasks are being fetched', async () => {
        (getTasks as jest.Mock).mockResolvedValueOnce([]);

        render(<Page />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    it('should display error message if there is an error fetching tasks', async () => {
        (getTasks as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch tasks'));

        render(<Page />);
        await waitFor(() => expect(screen.getByText('Failed to fetch tasks')).toBeInTheDocument());
    });

    it('should render tasks after successfully fetching them', async () => {
        const tasks = [
            { id: '1', title: 'Task 1', completed: false, color: colors[0] },
            { id: '2', title: 'Task 2', completed: true, color: colors[1] },
        ];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);

        render(<Page />);
        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
        });
    });

    it('should handle task completion toggle', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false, color: colors[0] }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (updateTask as jest.Mock).mockResolvedValueOnce({});

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        await waitFor(() => expect(updateTask).toHaveBeenCalledWith({ ...tasks[0], completed: true }));
    });


    it('should handle task completion toggle with error', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false, color: colors[0] }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (updateTask as jest.Mock).mockRejectedValueOnce(new Error('Failed to update task'));

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);

        await waitFor(() => expect(updateTask).toHaveBeenCalledWith({ ...tasks[0], completed: true }));
    });

    it('should handle task deletion with confirm', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (deleteTask as jest.Mock).mockResolvedValueOnce({});

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        fireEvent.click(screen.getAllByTestId('delete-task')[0]);
        fireEvent.click(screen.getByTestId('delete-task-confirm'));

        await waitFor(() => expect(deleteTask).toHaveBeenCalledWith('1'));
    });

    it('should handle task deletion with confirm with error', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (deleteTask as jest.Mock).mockRejectedValueOnce(new Error('Failed to delete task'));

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        fireEvent.click(screen.getAllByTestId('delete-task')[0]);
        fireEvent.click(screen.getByTestId('delete-task-confirm'));

        await waitFor(() => expect(deleteTask).toHaveBeenCalledWith('1'));
    });


    it('should handle task deletion with cancel', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (deleteTask as jest.Mock).mockResolvedValueOnce({});

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        fireEvent.click(screen.getAllByTestId('delete-task')[0]);
        fireEvent.click(screen.getByTestId('delete-task-cancel'));

        await waitFor(() => expect(deleteTask).toHaveBeenCalledWith('1'));
    });


    it('should navigate to create task page on button click', async () => {
        const tasks = [{ id: '1', title: 'Task 1', completed: false }];

        (getTasks as jest.Mock).mockResolvedValueOnce(tasks);
        (deleteTask as jest.Mock).mockResolvedValueOnce({});

        render(<Page />);

        await waitFor(() => expect(screen.getByText('Task 1')).toBeInTheDocument());

        const createButton = screen.getByText('Create Task');
        fireEvent.click(createButton);

        expect(mockPush).toHaveBeenCalledWith('/todo/add');
    });
});
