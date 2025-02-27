import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {

    it('should render the button with the provided title and icon', () => {
        render(<Button click={() => { }} title="Test Button" icon="/test-icon.svg" />);

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();

        const title = screen.getByText('Test Button');
        expect(title).toBeInTheDocument();

        const icon = screen.getByAltText('logo');
        expect(icon).toBeInTheDocument();
    });

    it('should trigger the click event when clicked', () => {
        const mockClick = jest.fn();
        render(<Button click={mockClick} title="Test Button" />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockClick).toHaveBeenCalledTimes(1);
    });

    it('should not trigger the click event if the button is disabled', () => {
        const mockClick = jest.fn();
        render(<Button click={mockClick} title="Test Button" disabled={true} />);

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockClick).not.toHaveBeenCalled();
    });

    it('should render the button with the disabled state', () => {
        render(<Button click={() => { }} title="Test Button" disabled={true} />);

        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });
});
