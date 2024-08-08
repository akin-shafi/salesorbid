import React from "react";
import Link from "next/link"; // Ensure this import is correct
import useCategories from "../hooks/useCategories";

export default function LargeScreenMenu() {
	const { categories, loading, error } = useCategories();

	if (loading) return <p>Loading categories...</p>;
	if (error) return <p>Error fetching categories: {error.message}</p>;

	return (
		<ul className="menu-list d-none d-lg-block">
			<li>
				<Link
					href="/"
					className="drop-down">
					Home
				</Link>
			</li>
			<li className="menu-item-has-children">
				<Link
					href="/"
					className="drop-down">
					Categories
				</Link>
				<i className="bi bi-plus dropdown-icon"></i>
				<ul className="sub-menu">
					
					{categories.length === 0 ? (
                        <li>No categories available</li>
                    ) : (
                        categories.map((category) => (
                            <li key={category.id}>
                                <Link href={`/auctions?categoryId=${category.id}`}>
                                    {category.name}
                                </Link>
                            </li>
                        ))
                    )}
					
				</ul>
			</li>

			<li className="menu-item-has-children">
				<Link
					href="/"
					className="drop-down">
					Shipping
				</Link>
				<i className="bi bi-plus dropdown-icon"></i>
				<ul className="sub-menu">
					<li>
						<Link href="/">Shipping Calculator</Link>
					</li>
					<li>
						<Link href="/">Ground Transportation</Link>
					</li>
					<li>
						<Link href="/">Ocean Transportation</Link>
					</li>
					<li>
						<Link href="/">Vessel Tracking</Link>
					</li>
				</ul>
			</li>
			<li className="menu-item-has-children">
				<Link
					href="/"
					className="drop-down">
					About Us
				</Link>
				<i className="bi bi-plus dropdown-icon"></i>
				<ul className="sub-menu">
					<li>
						<Link href="/about">About us</Link>
					</li>
					<li>
						<Link href="/category">Join us on WhatsApp</Link>
					</li>
					<li>
						<Link href="/how-to-sell">Authorized Dealer</Link>
					</li>
					<li>
						<Link href="/faq">Faqs</Link>
					</li>
				</ul>
			</li>
			<li>
				<Link
					href="/contact"
					className="drop-down">
					Contact
				</Link>
			</li>
		</ul>
	);
}
