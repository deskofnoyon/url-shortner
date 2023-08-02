import { useState } from "react";

const UpdateUrlModal = ({ link, onUpdate, onCancel }) => {
	const [updatedUrl, setUpdatedUrl] = useState(link.longUrl);

	const handleChange = (event) => {
		setUpdatedUrl(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		// Call the onUpdate function with the updated URL
		onUpdate(link, updatedUrl);
	};

	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 p-2">
			<div className="bg-white dark:bg-slate-300/40 p-4 rounded-md shadow-lg w-full max-w-md">
				<h2 className="text-lg font-semibold mb-4">Update Long URL</h2>
				<form onSubmit={handleSubmit}>
					<input
						className="w-full px-2 py-1 border rounded-md mb-2 "
						type="text"
						value={updatedUrl}
						onChange={handleChange}
					/>
					<div className="flex justify-end">
						<button
							type="button"
							onClick={onCancel}
							className="bg-gray-300 px-3 py-1 rounded-md mr-2"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="bg-primary text-white px-3 py-1 rounded-md"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UpdateUrlModal;
