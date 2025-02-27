import { render, screen } from '@testing-library/react';
import Error from './Error';

describe('Error Component', () => {
    it('should render the error message correctly', () => {
        const errorMessage = "Something went wrong";

        render(<Error value={errorMessage} />);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('should apply the correct styles', () => {
        const errorMessage = "Something went wrong";

        render(<Error value={errorMessage} />);

        const errorText = screen.getByText(errorMessage);

        expect(errorText).toHaveClass('text-red-600');
    });
});
