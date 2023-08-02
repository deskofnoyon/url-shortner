const DeleteUrlModal = ({ onDelete, onCancel }) => {
	return (
		<div className="fixed inset-0 flex justify-center items-center bg-opacity-90 bg-black">
			<div className="bg-white dark:bg-slate-300/40 rounded-md p-5 ">
				<p className="text-lg font-medium dark:text-white">
					Are you sure you want to delete this link?
				</p>
				<div className="flex justify-end mt-4">
					<button
						className="bg-red-400 px-3 py-1 rounded text-white mr-2"
						onClick={onDelete}
					>
						Delete
					</button>
					<button className="bg-gray-200 px-3 py-1 rounded" onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteUrlModal;
