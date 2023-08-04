import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import DeleteUrlModal from "./DeleteUrlModal";
import UpdateUrlModal from "./UpdateUrlModal";
import { MdContentCopy } from "react-icons/md";
import { Link } from "react-router-dom";

const URLList = () => {
	const [links, setLinks] = useState([]);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [selectedLink, setSelectedLink] = useState(null); // State to store the link to be deleted
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [selectedLinkForUpdate, setSelectedLinkForUpdate] = useState(null); // State to store the link to be updated

	useEffect(() => {
		const existingLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];

		// Sort the links array by timestamp in descending order (latest to oldest)
		const sortedLinks = existingLinks.sort(
			(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
		);

		setLinks(sortedLinks);
	}, []);
	// console.log(links);

	const handleDeleteButtonClick = (link) => {
		setSelectedLink(link);
		setShowDeleteModal(true);
	};

	const handleDelete = () => {
		// Perform delete operation here (remove the link from localStorage)
		const existingLinks = JSON.parse(localStorage.getItem("shortLinks")) || [];
		const updatedLinks = existingLinks.filter(
			(link) => link.shortId !== selectedLink.shortId
		);

		const sortedLinks = updatedLinks.sort(
			(a, b) => new Date(b.timestamp) - new Date(a.timestamp)
		);

		// Save the updated links back to local storage
		localStorage.setItem("shortLinks", JSON.stringify(sortedLinks));

		// After deletion, close the modal and update the links
		setShowDeleteModal(false);
		setLinks(updatedLinks);
		toast.success("Successfully Deleted", { position: "top-right" });
	};

	const handleCancelDelete = () => {
		setShowDeleteModal(false);
	};

	const handleUpdateButtonClick = (link) => {
		setSelectedLinkForUpdate(link);
		setShowUpdateModal(true);
	};

	const handleUpdate = (link, updatedUrl) => {
		// Find the index of the link in the array
		const linkIndex = links.findIndex((item) => item.shortId === link.shortId);

		// Create a copy of the links array
		const updatedLinks = [...links];

		// Update the long URL of the selected link
		updatedLinks[linkIndex].longUrl = updatedUrl;

		// Save the updated links back to local storage
		localStorage.setItem("shortLinks", JSON.stringify(updatedLinks));

		// After updating, close the modal and update the links
		setShowUpdateModal(false);
		setLinks(updatedLinks);
		toast.success("Successfully Updated", { position: "top-right" });
	};

	const handleCopyToClipboard = (shortUrl) => {
		try {
			// Try using the Clipboard API (for modern browsers)
			navigator.clipboard.writeText(shortUrl);
			toast.success("Successfully copied!", { position: "top-right" });
		} catch (error) {
			// Fallback for unsupported browsers (e.g., mobile devices)
			const tempInput = document.createElement("input");
			tempInput.value = shortUrl;
			document.body.appendChild(tempInput);
			tempInput.select();
			tempInput.setSelectionRange(0, 99999);
			document.execCommand("copy");
			document.body.removeChild(tempInput);

			toast.success("Successfully copied!", { position: "top-right" });
		}
	};

	return (
		<>
			{links?.length > 0 && (
				<div className="p-2 md:p-0">
					<h2 className="text-xl font-medium mb-1 dark:text-white">
						URL List:
					</h2>
					<div className="space-y-1 rounded grid grid-cols-1">
						{links.map((link) => (
							<div
								href={link.longUrl}
								key={link.shortId}
								className="w-full flex flex-col md:flex-row space-y-2 md:space-y-0 justify-between bg-white dark:bg-slate-400/40 p-3 border-2 dark:border-primary/20 rounded-md hover:border-primary duration-200
                    "
							>
								<div className="dark:text-white w-full">
									<p>
										<span className="font-medium">Short URL: </span>
										<Link
											to={`url/${link.shortId}`}
											className="underline text-primary"
										>
											{link.shortUrl}
										</Link>
									</p>

									<p className="">
										<span className="font-medium">Long Url: </span>
										{link.longUrl}
									</p>
								</div>
								<div className="flex items-center space-x-1">
									<button
										onClick={() => handleCopyToClipboard(link.shortUrl)}
										title="Copy to clipboard"
										className="p-2 rounded bg-gray-200 hover:bg-gray-300 text-sm duration-100 active:scale-95"
									>
										<MdContentCopy />
									</button>
									<button
										onClick={() => handleUpdateButtonClick(link)}
										className="bg-blue-400 px-2 py-1 rounded text-white text-sm duration-100 active:scale-95"
									>
										Update
									</button>
									<button
										onClick={() => handleDeleteButtonClick(link)}
										className="bg-red-400 px-2 py-1 rounded text-white text-sm duration-100 active:scale-95"
									>
										Delete
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{showDeleteModal && (
				<DeleteUrlModal onDelete={handleDelete} onCancel={handleCancelDelete} />
			)}

			{showUpdateModal && (
				<UpdateUrlModal
					link={selectedLinkForUpdate}
					onUpdate={handleUpdate}
					onCancel={() => setShowUpdateModal(false)}
				/>
			)}
		</>
	);
};

export default URLList;
