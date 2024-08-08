// const data = {
// 	auctions: [
// 		{
// 			id: 1,
// 			title: "Antique Pocket Watch",
// 			description: "Rare vintage pocket watch from the 1800s.",
// 			price: 500,
// 			endDate: "2023-12-31",
// 			seller: "John Doe",
// 			category: "Collectibles",
// 			country: "Algeria",
// 			condition: "Used",
// 			popular: true,
// 		},
// 		{
// 			id: 2,
// 			title: "Original Artwork",
// 			description: "Abstract painting by a renowned artist.",
// 			price: 1200,
// 			endDate: "2023-11-15",
// 			seller: "Jane Smith",
// 			category: "Art",
// 			country: "Angola",
// 			condition: "Refurbished",
// 			popular: false,
// 		},
// 		// Add more auction items here
// 	],
// 	categories: [
// 		{ id: 1, name: "Art" },
// 		{ id: 2, name: "Collectibles" },
// 		{ id: 3, name: "Music" },
// 		{ id: 4, name: "Car" },
// 	],
// 	countries: [
// 		{ id: 1, name: "Algeria" },
// 		{ id: 2, name: "Angola" },
// 		{ id: 3, name: "Benin" },
// 		{ id: 4, name: "Botswana" },
// 	],
// 	conditions: [
// 		{ id: 1, name: "New" },
// 		{ id: 2, name: "Used" },
// 		{ id: 3, name: "Refurbished" },
// 	],
// };

// // Function to get paginated auctions
// function getPaginatedAuctions(page = 1, limit = 6) {
// 	const startIndex = (page - 1) * limit;
// 	const endIndex = startIndex + limit;
// 	const paginatedItems = data.auctions.slice(startIndex, endIndex);

// 	return {
// 		items: paginatedItems,
// 		total: data.auctions.length,
// 	};
// }

// // Example of how to use the function
// const page = 1; // Page number from query parameter
// const limit = 6; // Limit per page from query parameter
// const result = getPaginatedAuctions(page, limit);

// console.log(result);
