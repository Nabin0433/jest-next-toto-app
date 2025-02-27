import { render, screen, fireEvent } from '@testing-library/react';
import ConfirmModal from './ConfirmModal';

describe('ConfirmModal Component', () => {

    it('should render the modal with correct elements', () => {
        render(<ConfirmModal onConfirm={() => { }} onCancel={() => { }} />);

        expect(screen.getByText('Are you sure you want to delete this task?')).toBeInTheDocument();
        expect(screen.getByTestId('delete-task-cancel')).toBeInTheDocument();
        expect(screen.getByTestId('delete-task-confirm')).toBeInTheDocument();
    });

    it('should trigger onCancel function when Cancel button is clicked', () => {
        const mockCancel = jest.fn();
        const mockConfirm = jest.fn();

        render(<ConfirmModal onConfirm={mockConfirm} onCancel={mockCancel} />);

        const cancelButton = screen.getByTestId('delete-task-cancel');
        fireEvent.click(cancelButton);

        expect(mockCancel).toHaveBeenCalledTimes(1);
        expect(mockConfirm).not.toHaveBeenCalled();
    });

    it('should trigger onConfirm function when Confirm button is clicked', () => {
        const mockCancel = jest.fn();
        const mockConfirm = jest.fn();

        render(<ConfirmModal onConfirm={mockConfirm} onCancel={mockCancel} />);

        const confirmButton = screen.getByTestId('delete-task-confirm');
        fireEvent.click(confirmButton);

        expect(mockConfirm).toHaveBeenCalledTimes(1);
        expect(mockCancel).not.toHaveBeenCalled();
    });
});
