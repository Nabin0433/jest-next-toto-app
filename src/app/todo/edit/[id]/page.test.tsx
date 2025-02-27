import { render, screen, waitFor } from '@testing-library/react';
import EditTodo from './page';
import { getTask } from '@/services/api';
import { use } from 'react';

jest.mock('@/services/api', () => ({
  getTask: jest.fn(),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  use: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('EditTodo', () => {
  it('should render Loading state initially', async () => {
    (use as jest.Mock).mockReturnValue({ id: '1' });
    const mockParams = Promise.resolve({ id: '1' });
    render(<EditTodo params={mockParams} />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should render the task once it is fetched successfully', async () => {
    (use as jest.Mock).mockReturnValue({ id: '1' });
    (getTask as jest.Mock).mockResolvedValue({
      id: '1',
      title: 'Test Task',
      color: '#FF3B30',
      completed: false,
    });

    const mockParams = Promise.resolve({ id: '1' });

    render(<EditTodo params={mockParams} />);

    await waitFor(() => {
      const titleElement = screen.getByDisplayValue(/Test Task/i);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('should render the error', async () => {
    (use as jest.Mock).mockReturnValue({ id: '1' });
    (getTask as jest.Mock).mockResolvedValue({
      message:"Error"
    });

    const mockParams = Promise.resolve({ id: '1' });

    render(<EditTodo params={mockParams} />);

    await waitFor(() => {
      const titleElement = screen.getByText(/Error/i);
      expect(titleElement).toBeInTheDocument();
    });
  });

  it('should render the error for API failure', async () => {
    (use as jest.Mock).mockReturnValue({ id: '1' });
    (getTask as jest.Mock).mockRejectedValue(new Error('Failed to fetch task'));
  
    const mockParams = Promise.resolve({ id: '1' });
  
    render(<EditTodo params={mockParams} />);
  
    await waitFor(() => {
      const errorMessage = screen.getByText(/Error fetching task or invalid task id/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
