import React, { useState } from "react";
import SearchBar from "./SearchBar";
import {
	EmailIcon,
	CallIcon,
	LanguageIcon,
	AccountIcon,
} from "./SvgIcons/Icon";
import MenuLargeScreen from "./MenuLargeScreen";
import MenuSmallScreen from "./MenuSmallScreen";
import Logo from "./Logo";

export default function Header() {
	const [activeDropdown, setActiveDropdown] = useState(null);
	const [isMenuVisible, setMenuVisible] = useState(false);
	const handleDropdownToggle = (dropdown) => {
		if (window.innerWidth < 992) {
			// Only toggle on small screens
			setActiveDropdown((prev) => (prev === dropdown ? null : dropdown));
		}
	};

	const toggleMenu = () => {
		setMenuVisible((prevState) => !prevState);
	};

	return (
		<>
			<div className="header-topbar-area two">
				<div className="topbar-area style-6">
					<div className="container">
						<div className="topbar-wrap">
							<div className="topbar-left">
								<ul className="contact-area">
									<li>
										<a href="#">
											<EmailIcon />
											<span className="__cf_email__">info@email.com</span>
										</a>
									</li>
									<li>
										<a href="#">
											<CallIcon />
											Customer support
										</a>
									</li>
								</ul>
							</div>
							<div className="topbar-right">
								<ul>
									<li>
										<a href="how-to-buy.html">HOW TO BID</a>
									</li>
									<li>
										<a href="how-to-sell.html">SELL YOUR ITEM</a>
									</li>
								</ul>
								<div className="language-area">
									<div className="language-btn">
										<LanguageIcon />
										<span>Language</span>
									</div>
									<ul className="language-list">
										<li>
											<a href="#">English</a>
										</li>
										<li>
											<a href="#">Deutsch</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
				<header className="header-area style-1 three d-flex flex-nowrap align-items-center justify-content-between">
					<div className="nav-left">
						<div className="company-logo">
							<Logo />
						</div>

						<div className={`main-menu ${isMenuVisible ? "show-menu" : ""}`}>
							<div className="mobile-logo-area d-lg-none d-flex justify-content-center align-items-center">
								<div className="mobile-logo-wrap">
									<Logo />
								</div>
							</div>

							<MenuLargeScreen />
							<MenuSmallScreen
								activeDropdown={activeDropdown}
								handleDropdownToggle={handleDropdownToggle}
							/>

							<ul className="contact-area d-lg-none d-flex">
								<li>
									<a href="#">
										<EmailIcon />
										<span className="__cf_email__">info@email.com</span>
									</a>
								</li>
								<li>
									<a href="#">
										<CallIcon />
										Customer support
									</a>
								</li>
							</ul>
							<form className="d-lg-none d-flex">
								<div className="search-container form-inner">
									<SearchBar />
								</div>
							</form>
							<div className="btn-area d-lg-none d-flex">
								<a
									href="#"
									className="login-btn btn-hover">
									<AccountIcon />
									My Account
									<span></span>
								</a>
							</div>
						</div>
					</div>
					<div className="nav-right d-flex justify-content-end align-items-center">
						<form className="d-xl-flex d-none">
							<div className="search-container form-inner">
								<SearchBar />
							</div>
						</form>
						<div className="search-bar d-xl-none d-lg-block d-none">
							<div className="search-btn">
								<i className="bi bi-search"></i>
							</div>
							<div className="search-input">
								<div className="search-close"></div>
								<form>
									<div className="search-group">
										<div className="search-container form-inner2">
											<SearchBar />
										</div>
									</div>
								</form>
							</div>
						</div>
						<a
							href="#"
							className="login-btn btn-hover d-lg-flex d-none">
							<AccountIcon />
							My Account
							<span></span>
						</a>
						<div
							className={`sidebar-button mobile-menu-btn ${
								isMenuVisible ? "active" : ""
							}`}
							onClick={toggleMenu}>
							<span></span>
						</div>
					</div>
				</header>
			</div>
		</>
	);
}
