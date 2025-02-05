export default function LogoutConfirmation({ onConfirm, onCancel }) {
    return (
        <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Confirm Logout</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onConfirm}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                    Logout
                </button>
                <button
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
