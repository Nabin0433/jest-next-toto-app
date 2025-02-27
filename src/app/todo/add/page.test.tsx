import { render, screen } from '@testing-library/react';
import AddTodo from './page'; 

jest.mock('@/components/TodoInput', () => () => <div>Mocked TodoInput</div>);

describe('AddTodo', () => {
    it('should render TodoInput', () => {
        render(<AddTodo />);
        expect(screen.getByText(/Mocked TodoInput/i)).toBeInTheDocument();
    });
});
