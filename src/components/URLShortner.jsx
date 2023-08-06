import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdContentCopy, MdOutlineContentPaste } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const URLShortner = () => {
	const [longUrl, setLongUrl] = useState("");
	const [shortUrl, setShortUrl] = useState("");
	const [error, setError] = useState("");
	const [pasteValue, setPasteValue] = useState("");

	useEffect(() => {
		if (pasteValue) {
			setLongUrl(pasteValue);
		}
	}, [pasteValue]);

	const handleChange = (event) => {
		setLongUrl(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (!longUrl.trim()) {
			setError("Please enter a valid URL"); // Show error message for empty input
			return;
		}

		// Generate short URL (you can use shortid or nanoid library)
		const shortId = generateShortId();
		const curretProtocol = window.location.protocol;
		const curretHost = window.location.host;
		const shortLink = `${curretProtocol}//${curretHost.toString()}/${shortId}`;

		// Get existing data from local storage
		const existingData = JSON.parse(localStorage.getItem("shortLinks")) || [];

		// Update the array with the new link
		const updatedData = [
			...existingData,
			{
				shortId,
				longUrl,
				shortUrl: shortLink,
				timestamp: new Date().toLocaleString(),
			},
		];

		// Save the updated data back to local storage
		localStorage.setItem("shortLinks", JSON.stringify(updatedData));

		// Update state with the short URL
		setShortUrl(shortLink);
		toast.success("Successfully Created", { position: "top-right" });

		// Reset the form after submission
		setError("");
		setLongUrl("");
		setPasteValue("");
	};

	const generateShortId = () => {
		// Implementation of generating a short ID, you can use shortid or nanoid library
		// For simplicity, let's use a random number here
		return Math.random().toString(36).substr(2, 7);
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

	const handlePasteClick = async () => {
		try {
			const pastedValue = await navigator.clipboard.readText();
			setPasteValue(pastedValue);
		} catch (error) {
			console.error("Failed to paste: ", error);
		}
	};

	return (
		<>
			<div className="mb-5">
				<h1 className="text-3xl md:text-4xl text-center mb-5 text-primary font-bold">
					URL Shortner
				</h1>
				<div className="bg-white dark:bg-slate-400/20 backdrop-blur-lg md:shadow-lg rounded-md p-2 md:p-5 border border-gray-100 dark:border-primary/10">
					<h1 className="text-2xl md:text-3xl font-bold text-center mb-4 dark:text-white">
						Paste the URL to be shortened
					</h1>
					<form className="flex mb-2 relative" onSubmit={handleSubmit}>
						<input
							className={` basis-[70%] md:basis-[80%] px-3 py-3 rounded-l dark:border-primary/40 border-primary/20 outline-none hover:border-primary border-2 border-r-0 dark:bg-gray-200/30 dark:text-white dark:focus:text-white
							 ${
								error && "border-red-400"
							}`}
							type="text"
							value={longUrl}
							onChange={handleChange}
							placeholder="Enter Long URL"
						/>
						{longUrl ? (
							<button
								onClick={() => setLongUrl("")}
								type="button"
								className="bg-white dark:bg-transparent dark:text-white p-1 duration-100 active:scale-95 absolute right-[7.5rem] md:right-[8.5rem] top-3 text-lg"
							>
								<AiOutlineDelete className="" />
							</button>
						) : (
							<button
								onClick={handlePasteClick}
								type="button"
								className="bg-white dark:bg-transparent dark:text-white p-1 duration-100 active:scale-95 absolute right-[7.5rem] md:right-[8.5rem] top-3 text-lg"
							>
								<MdOutlineContentPaste className="" />
							</button>
						)}
						<button
							className="font-semibold basis-[30%] md:basis-[20%] bg-primary px-3 py-1 text-white rounded-r text-sm md:text-base"
							type="submit"
						>
							Shorten Link
						</button>
					</form>
					{error && <p className="text-red-500 text-center text-sm">{error}</p>}
					<p className="text-center w-full max-w-lg mx-auto my-2 dark:text-gray-200">
						URL Shortner is a free tool to shorten URLs and generate short
						links. URL shortener allows to create a shortened link making it
						easy to share
					</p>
					{shortUrl && (
						<div className="flex flex-col items-start md:flex-row md:items-center justify-between bg-slate-100 px-2 py-2 rounded-md w-full">
							<div className="space-x-3">
								<span className="font-medium">Short Url:</span>
								<Link
									to={`/url/${shortUrl.split("/")[3]}`}
									className="underline cursor-pointer text-primary"
								>
									{shortUrl}
								</Link>
							</div>

							<button
								onClick={() => handleCopyToClipboard()}
								title="Click copy to clipboard"
								className="ml-auto inline-block p-2 rounded bg-gray-200 hover:bg-gray-300 text-sm duration-100 active:scale-95"
							>
								<MdContentCopy />
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default URLShortner;
