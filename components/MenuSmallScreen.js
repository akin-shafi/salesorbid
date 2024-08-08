// MobileMenu.js
import React from "react";

const MobileMenu = ({ activeDropdown, handleDropdownToggle }) => {
	return (
		<ul className="menu-list d-block d-lg-none">
			<li>
				<a
					href="/"
					className="drop-down">
					Home
				</a>
			</li>
			{["Categories", "Shipping", "About Us"].map((item, index) => (
				<li
					key={index}
					className={`menu-item-has-children ${
						activeDropdown === item ? "active" : ""
					}`}
					onClick={() => handleDropdownToggle(item)}>
					<a
						href="#"
						className="drop-down">
						{item}
					</a>
					<i
						className={`bi ${
							activeDropdown === item ? "bi-dash" : "bi-plus"
						} dropdown-icon`}></i>
					<ul
						className={`sub-menu ${
							activeDropdown === item ? "d-block" : "d-none"
						}`}>
						{item === "Categories" && (
							<>
								<li>
									<a href="/auctions">Marine Equipment</a>
								</li>
								<li>
									<a href="/auctions">IT Equipment</a>
								</li>
								<li>
									<a href="/auctions">Agricultural Equipment</a>
								</li>
								<li>
									<a href="/auctions">Vehicles</a>
								</li>
							</>
						)}
						{item === "Shipping" && (
							<>
								<li>
									<a href="#">Shipping Calculator</a>
								</li>
								<li>
									<a href="#">Ground Transportation</a>
								</li>
								<li>
									<a href="#">Ocean Transportation</a>
								</li>
								<li>
									<a href="#">Vessel Tracking</a>
								</li>
							</>
						)}
						{item === "About Us" && (
							<>
								<li>
									<a href="/about">About us</a>
								</li>
								<li>
									<a href="category.html">Join us on WhatsApp</a>
								</li>
								<li>
									<a href="how-to-sell.html">Authorized Dealer</a>
								</li>
								<li>
									<a href="faq.html">Faqs</a>
								</li>
							</>
						)}
					</ul>
				</li>
			))}
			<li>
				<a
					href="contact.html"
					className="drop-down">
					Contact
				</a>
			</li>
		</ul>
	);
};

export default MobileMenu;
