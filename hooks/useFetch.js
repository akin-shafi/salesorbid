
export async function fetchPopularProducts() {
	try {
		const response = await fetch("http://localhost:3000/auctions");
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		// Process the popular product data (e.g., update state or render UI)
		console.log("Popular Products:", data);
	} catch (error) {
		console.error("Error fetching popular products:", error);
	}
}

// Call the function to fetch popular products
