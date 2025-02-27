import { render, screen } from '@testing-library/react';
import Loading from './Loading';

describe('Loading', () => {

    it('should display "Loading..." text', () => {
        render(<Loading />);

        const loadingText = screen.getByText('Loading...');
        expect(loadingText).toBeInTheDocument();
    });

    it('should be centered in the viewport', () => {
        render(<Loading />);

        const loadingDiv = screen.getByText('Loading...').parentElement;
        expect(loadingDiv).toHaveClass('flex');
        expect(loadingDiv).toHaveClass('items-center');
        expect(loadingDiv).toHaveClass('justify-center');
    });
});
