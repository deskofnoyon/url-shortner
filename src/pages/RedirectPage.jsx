import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const RedirectPage = () => {
	const [item, setItem] = useState({});
	const { shortId } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		const existingUrls = JSON.parse(localStorage.getItem("shortLinks")) || [];
		const actualItem = existingUrls.find((link) => link.shortId === shortId);
		// console.log(actualItem);
		setItem(actualItem);
		let newUrl;
		if (actualItem) {
			console.log(actualItem.longUrl.split("/"));
			const protocol = actualItem.longUrl.split("/")[0].includes("http:");
			const protocolSecure = actualItem.longUrl
				.split("/")[0]
				.includes("https:");

			console.log(protocol, protocolSecure);
			if (protocol || protocolSecure) {
				newUrl = actualItem.longUrl;
			} else {
				newUrl = "http://" + actualItem.longUrl;
				// console.log(newUrl);
			}

			window.open(newUrl, "_parent");
		} else {
			navigate("/404");
		}
	}, [shortId, navigate]);

	return (
		<div className="dark:text-white text-xl">
			Redirecting.... to {item.shortUrl}
		</div>
	);
};

export default RedirectPage;
