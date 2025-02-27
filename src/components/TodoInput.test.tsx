import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TodoInput from '@/components/TodoInput';
import { createTask, updateTask } from '@/services/api';
import { useRouter } from 'next/navigation';

jest.mock('@/services/api', () => ({
    createTask: jest.fn(),
    updateTask: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        loading: jest.fn(),
        update: jest.fn(),
    },
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('TodoInput Component', () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
        (useRouter as jest.Mock).mockReturnValue({ replace: mockNavigate });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render input fields and button', () => {
        render(<TodoInput />);

        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        expect(screen.getByText(/Color/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Task/i })).toBeInTheDocument();
    });

    it('should show error when title is empty and submit is clicked', async () => {
        render(<TodoInput />);

        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

        await waitFor(() => {
            expect(screen.getByText(/Title is required/i)).toBeInTheDocument();
        });
    });

    it('should show error when color is not selected and submit is clicked', async () => {
        render(<TodoInput />);

        const titleInput = screen.getByLabelText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Test Task' } });

        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));

        await waitFor(() => {
            expect(screen.getByText(/Color is required/i)).toBeInTheDocument();
        });
    });

    it('should create task when valid input is provided', async () => {
        (createTask as jest.Mock).mockResolvedValue({ id: '1' });
    
        render(<TodoInput />);
    
        const titleInput = screen.getByLabelText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    
        const color_box = screen.getAllByTestId('color_box');
        fireEvent.click(color_box[0]);
    
        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
    
        await waitFor(() => {
            expect(createTask).toHaveBeenCalledWith('Test Task', expect.any(String));
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });
    
    
    it('should show error when valid input is provided but API returns error for catch', async () => {
        (createTask as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    
        render(<TodoInput />);
    
        const titleInput = screen.getByLabelText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    
        const color_box = screen.getAllByTestId('color_box');
        fireEvent.click(color_box[0]);
    
        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
    
        await waitFor(() => {
            expect(createTask).toHaveBeenCalledWith('Test Task', expect.any(String));
        });
    });
    

    it('should show error when valid input is provided but API returns error', async () => {
        (createTask as jest.Mock).mockResolvedValueOnce({ message: 'error' });
    
        render(<TodoInput />);
    
        const titleInput = screen.getByLabelText(/Title/i);
        fireEvent.change(titleInput, { target: { value: 'Test Task' } });
    
        const color_box = screen.getAllByTestId('color_box');
        fireEvent.click(color_box[0]);
    
        fireEvent.click(screen.getByRole('button', { name: /Add Task/i }));
    
        await waitFor(() => {
            expect(createTask).toHaveBeenCalledWith('Test Task', expect.any(String));
        });
    });
    
    
    it('should update task when editing an existing task', async () => {
        (updateTask as jest.Mock).mockResolvedValue({ id: '1' });
        const initValue = { id: '1', title: 'Old Task', color: '#FF9500', completed: false };

        render(<TodoInput initValue={initValue} />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Task' } });
        fireEvent.click(screen.getByRole('button', { name: /Save/i }));

        await waitFor(() => {
            expect(updateTask).toHaveBeenCalledWith({ ...initValue, title: 'Updated Task', color: '#FF9500' });
            expect(mockNavigate).toHaveBeenCalledWith('/');
        });
    });

    it('should show error on update task when editing an existing task', async () => {
        (updateTask as jest.Mock).mockResolvedValue({ message: 'error' });
        const initValue = { id: '1', title: 'Old Task', color: '#FF9500', completed: false };

        render(<TodoInput initValue={initValue} />);

        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Updated Task' } });
        fireEvent.click(screen.getByRole('button', { name: /Save/i }));

        await waitFor(() => {
            expect(updateTask).toHaveBeenCalledWith({ ...initValue, title: 'Updated Task', color: '#FF9500' });
        });
    });
});
