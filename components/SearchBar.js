import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
	const [query, setQuery] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	useEffect(() => {
		let isMounted = true; // Track whether the component is still mounted

		if (query.length > 2) {
			setLoading(true);

			// Fetch suggestions when query length is greater than 2
			fetch(`http://localhost:8001/search/suggestions?query=${query}`)
				.then((response) => response.json())
				.then((data) => {
					if (isMounted) {
						setSuggestions(data);
						setLoading(false);
					}
				})
				.catch((error) => {
					if (isMounted) {
						console.error("Error fetching suggestions:", error);
						setSuggestions([]);
						setLoading(false);
					}
				});
		} else {
			setSuggestions([]);
			setLoading(false);
		}

		return () => {
			isMounted = false; // Cleanup function to set isMounted to false
		};
	}, [query]);

	const handleSuggestionClick = (title) => {
		router.push(`/auctions?title=${encodeURIComponent(title)}`);
		setQuery("");
		setSuggestions([]);
	};

	return (
		<>
			{/* <div className="form-inner">
				<input
					type="text"
					placeholder="Search your product..."
				/>
				<button className="search-btn">
					<i className="bi bi-search"></i>
				</button>
			</div> */}

			<input
				type="text"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				placeholder="Search for auctions..."
			/>
			<button className="search-btn">
				<i className="bi bi-search"></i>
			</button>
			{suggestions.length > 0 && (
				<ul className="suggestions-list">
					{loading && <p className="loading-text">Loading...</p>}
					{suggestions.map((suggestion, index) => (
						<li
							key={index}
							onClick={() => handleSuggestionClick(suggestion)}>
							{suggestion}
						</li>
					))}
					{suggestions.length === 0 && !loading && (
						<p className="no-suggestions">No suggestions available</p>
					)}
				</ul>
			)}
			<style jsx>{`
				.search-container {
					position: relative;
				}
				.search-container input {
					padding: 10px;
					width: 300px;
				}
				.suggestions-list {
					position: absolute;
					top: 100%;
					left: 0;
					width: 100%;
					max-height: 200px;
					overflow-y: auto;
					background: white;
					border: 1px solid #ccc;
					box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
					list-style: none;
					padding: 0;
					margin: 0;
				}
				.suggestions-list li {
					padding: 10px;
					cursor: pointer;
				}
				.suggestions-list li:hover {
					background-color: #f0f0f0;
				}
				.loading-text {
					padding: 10px;
					text-align: center;
					color: #888;
				}
				.no-suggestions {
					padding: 10px;
					text-align: center;
					color: #888;
				}
			`}</style>
		</>
	);
}
