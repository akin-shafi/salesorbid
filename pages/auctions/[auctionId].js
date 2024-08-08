import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Import from 'next/router' instead of 'next/navigation'
import Link from "next/link";

const AuctionDetails = ({ initialAuction }) => {
	const router = useRouter();
	const { query, isReady } = router; // Use query and isReady from router

	const [auction, setAuction] = useState(initialAuction);

	// Fetch auction data only when router is ready and auctionId is available
	useEffect(() => {
		const fetchAuction = async () => {
			if (!isReady || !query.auctionId) return;
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_URL}/products/${query.auctionId}`
			);
			const data = await response.json();
			setAuction(data);
		};

		fetchAuction();
	}, [query.auctionId, isReady]);

	if (!auction) return <p>Loading...</p>;

	return (
		<div>
			<h1>{auction.title}</h1>
			<p>Price: {auction.price}</p>
			<p>Description: {auction.description}</p>
			<p>Category: {auction.category}</p>
			<p>Condition: {auction.condition}</p>
			<p>Country: {auction.country}</p>
			{/* Add more details as needed */}
			<Link href="/auctions">Back to Auctions</Link>
		</div>
	);
};

export async function getServerSideProps(context) {
	const { auctionId } = context.query;

	if (!auctionId) {
		return {
			notFound: true, // Handle case where auctionId is not provided
		};
	}

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products/${auctionId}`
		);
		if (!response.ok) {
			throw new Error("Failed to fetch");
		}
		const data = await response.json();

		return {
			props: {
				initialAuction: data,
			},
		};
	} catch (error) {
		console.error("Error fetching auction data:", error.message);
		return {
			props: {
				initialAuction: null,
			},
		};
	}
}

export default AuctionDetails;
