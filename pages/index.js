import React from "react";
import Link from "next/link";
import axios from "axios";

import AuctionSlider from "../components/AuctionSlider";

const Home = ({ popularProducts, error }) => {
	if (error) {
		return <p>Error fetching data: {error}</p>;
	}

	return (
		<>
			<div className="home7-live-auction-section mb-110">
				<div className="container-one">
					<div
						className="row mb-50 wow animate fadeInDown"
						data-wow-delay="200ms"
						data-wow-duration="1500ms">
						<div className="col-lg-12 d-flex align-items-center justify-content-between flex-wrap gap-3">
							<div className="section-title2 two">
								<span>
									<i className="bi bi-arrow-right"></i>BIDDING OUR
								</span>
								<h2>
									Current <span>Auction</span>
								</h2>
							</div>
							<div className="slider-btn-grp four">
								<div className="slider-btn home7-auction-slider-prev">
									<svg
										width="11"
										height="11"
										viewBox="0 0 11 11"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M1.77219 7.97481L9.74706 -6.10352e-05L11 1.25288L3.02513 9.22775H9.74706V10.9999H0V1.25288L1.77219 1.25288V7.97481Z" />
									</svg>
								</div>
								<div className="slider-btn home7-auction-slider-next">
									<svg
										width="11"
										height="11"
										viewBox="0 0 11 11"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M9.22781 7.97481L1.25294 -6.10352e-05L0 1.25288L7.97487 9.22775H1.25294L1.25294 10.9999H11V1.25288L9.22781 1.25288V7.97481Z" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					<div
						className="auction-slider-area mb-50 wow animate fadeInDown"
						data-wow-delay="200ms"
						data-wow-duration="1500ms">
						<div className="row">
							<AuctionSlider auctions={popularProducts} />
						</div>
					</div>
					<div
						className="row wow animate fadeInUp"
						data-wow-delay="200ms"
						data-wow-duration="1500ms">
						<div className="col-lg-12 d-flex justify-content-center">
							<Link
								className="primary-btn6 transparent btn-hover"
								href="/auctions">
								View All Auction
								<svg
									width="11"
									height="11"
									viewBox="0 0 11 11"
									xmlns="http://www.w3.org/2000/svg">
									<path d="M9.22781 7.97482L1.25294 -4.57764e-05L0 1.25289L7.97487 9.22776H1.25294V11H11V1.25289H9.22781V7.97482Z" />
								</svg>
								<span></span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps() {
	const url = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8001";

	try {
		// Use axios to fetch data
		const response = await axios.get(`${url}/products`);

		// Data is available directly on response.data
		const data = response.data;

		// Filter for only popular products
		const popularProducts = data.filter(
			(auction) => auction.level === "NORMAL"
		);

		return {
			props: {
				popularProducts,
			},
		};
	} catch (error) {
		// Handle errors
		console.error("Error fetching data:", error.message);

		return {
			props: {
				popularProducts: [],
				error: error.message,
			},
		};
	}
}

export default Home;
