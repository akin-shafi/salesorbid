import React from "react";
import Link from "next/link"; // Ensure this import is correct
import useCategories from "../hooks/useCategories";
export default function Footer() {
	const { categories, loading, error } = useCategories();

	if (loading) return <p>Loading categories...</p>;
	if (error) return <p>Error fetching categories: {error.message}</p>;

	return (
		<footer className="style-7">
			<div className="footer-wrapper">
				<div className="container-one">
					<div className="footer-menu-wrap">
						<div className="row g-lg-4 gy-5">
							<div className="col-lg-3 col-md-6 col-sm-7 d-flex align-items-center">
								<div className="footer-logo-area">
									<div className="footer-logo">
										<img
											src="../images/footer-logo.svg"
											alt=""
										/>
									</div>
									<div className="social-area">
										<h5>Social Just You Connected Us!</h5>
										<p>All of update in social</p>
										<ul className="social-list">
											<li>
												<Link href="https://www.linkedin.com/">
													<i className="bi bi-linkedin"></i>
													<span>LinkedIn</span>
												</Link>
											</li>
											<li>
												<Link href="https://www.facebook.com/">
													<i className="bi bi-facebook"></i>
													<span>Facebook</span>
												</Link>
											</li>
											<li>
												<Link href="https://twitter.com/">
													<i className="bi bi-twitter-x"></i>
													<span>Twitter</span>
												</Link>
											</li>
											<li>
												<Link href="https://www.instagram.com/">
													<i className="bi bi-instagram"></i>
													<span>Instagram</span>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-5 d-flex justify-content-md-center justify-content-sm-end">
								<div className="footer-widget">
									<div className="widget-title">
										<h4>Category</h4>
									</div>
									<div className="menu-container">
										<ul className="widget-list">
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
									</div>
								</div>
							</div>
							<div className="col-lg-2 col-md-3 col-sm-6 d-flex justify-content-lg-center justify-content-md-end">
								<div className="footer-widget">
									<div className="widget-title">
										<h4>About</h4>
									</div>
									<div className="menu-container">
										<ul className="widget-list">
											<li>
												<Link href="how-to-buy.html">How to bid with us</Link>
											</li>
											<li>
												<Link href="how-to-sell.html">How to sell with us</Link>
											</li>
											<li>
												<Link href="about.html">About us</Link>
											</li>
											<li>
												<Link href="faq.html">F.A.Q</Link>
											</li>
											<li>
												<Link href="#">Our Brand</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-2 col-sm-6 d-flex justify-content-lg-center justify-content-md-start justify-content-sm-end">
								<div className="footer-widget">
									<div className="widget-title">
										<h4>Support</h4>
									</div>
									<div className="menu-container">
										<ul className="widget-list">
											<li>
												<Link href="support-center.html">
													Help &amp; Support
												</Link>
											</li>
											<li>
												<Link href="faq.html">FAQ Probid</Link>
											</li>
											<li>
												<Link href="contact.html">Contact Us</Link>
											</li>
											<li>
												<Link href="terms-condition.html">
													Terms of Service
												</Link>
											</li>
											<li>
												<Link href="privacy-policy.html">Our Policy</Link>
											</li>
											<li>
												<Link href="#">Sell Support</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="col-lg-3 col-sm-6 d-flex align-items-center justify-content-md-end justify-content-start">
								<div className="newletter-and-payment-wrap">
									<div className="newletter-area">
										<h4>Join Our Newsletter &amp; More information.</h4>
										<form>
											<div className="form-inner">
												<input
													type="email"
													placeholder="Email Address"
												/>
												<button type="submit">
													<i className="bi bi-arrow-right"></i>
												</button>
											</div>
										</form>
									</div>
									<div className="payment-area">
										<h6>Secured Payment Gateways</h6>
										<ul className="payment-options">
											<li>
												<img
													src="../images/home1/icon/visa.svg"
													alt=""
												/>
											</li>
											<li>
												<img
													src="../images/home1/icon/master-card.svg"
													alt=""
												/>
											</li>
											<li>
												<img
													src="../images/home1/icon/american-express.svg"
													alt=""
												/>
											</li>
											<li>
												<img
													src="../images/home1/icon/maestro.svg"
													alt=""
												/>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom">
						<div className="copyright-area">
							<p>
								©Copyright 2024 <Link href="index.html">Probid</Link> | Design
								By
								<Link href="https://www.egenslab.com/">Egens Lab</Link>
							</p>
						</div>
						<div className="footer-bottom-right">
							<ul>
								<li>
									<Link href="support-center.html">Support Center</Link>
								</li>
								<li>
									<Link href="terms-condition.html">
										Terms &amp; Conditions
									</Link>
								</li>
								<li>
									<Link href="privacy-policy.html">Privacy Policy</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
