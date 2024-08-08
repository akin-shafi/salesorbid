import React, { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import Link from "next/link";

const Home = () => {
	const { popularProducts, loading, error } = useFetch();

	if (loading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>Error fetching data: {error.message}</p>;
	}

	return (
		<div>
			<h1>Popular Products</h1>
			<ul>
				{popularProducts.map((product) => (
					<li key={product.id}>
						{product.name} ({product.price})
					</li>
				))}
			</ul>
			<Link href="">View All</Link>
		</div>
	);
};

export default Home;
