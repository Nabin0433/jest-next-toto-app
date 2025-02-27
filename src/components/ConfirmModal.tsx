import React from 'react';

interface ConfirmModalProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white text-gray-600 p-6 rounded-lg shadow-md w-96">
                <h2 className="text-lg font-semibold">Are you sure you want to delete this task?</h2>
                <div className="flex justify-end gap-4 mt-4">
                    <button
                        data-testid="delete-task-cancel"
                        onClick={onCancel}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-200"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
                        data-testid="delete-task-confirm"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
