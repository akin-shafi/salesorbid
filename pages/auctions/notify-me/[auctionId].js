import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { FavoriteIcon, QuestionIcon } from "@/components/SvgIcons/Icon";
import Countdown from "@/components/shared/Countdown";

export default function NotifyMe() {
	const router = useRouter();
	const { auctionId } = router.query;
	console.log("router.query", auctionId)
	const [auction, setAuction] = useState(null);
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [mainImage, setMainImage] = useState(""); // State for the main image

	useEffect(() => {
		if (auctionId) {
			// Fetch auction details based on auctionId
			const fetchAuction = async () => {
				try {
					const response = await axios.get(
						`${process.env.NEXT_PUBLIC_API_URL}/products/${auctionId}`
					);
					setAuction(response.data);
					setMainImage(response.data.productImages[0]?.url || ""); // Set the initial main image
				} catch (error) {
					console.error("Error fetching auction details:", error);
				}
			};

			fetchAuction();
		}
	}, [auctionId]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/notify-me`, {
				auctionId,
				email,
			});
			setMessage(
				"Thank you! You will be notified when this product is available."
			);
			setEmail("");
		} catch (error) {
			setMessage("Something went wrong. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleImageClick = (imageUrl) => {
		setMainImage(imageUrl);
	};

	if (!auction) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<div className="auction-details-section style-2 pt-110 mb-110">
				<div className="container-fluid">
					<div className="row gy-5">
						<div className="col-xl-7">
							<div className="auction-details-img">
								<ul
									className="nav nav-pills order-xl-1 order-2"
									id="v-pills-tab"
									role="tablist"
									aria-orientation="vertical">
									{auction.productImages.map((image, index) => (
										<li
											className="nav-item"
											role="presentation"
											key={image.id}>
											<button
												className={`nav-link ${index === 0 ? "active" : ""}`}
												id={`v-pills-img${index + 1}-tab`}
												data-bs-toggle="pill"
												data-bs-target={`#v-pills-img${index + 1}`}
												type="button"
												role="tab"
												aria-controls={`v-pills-img${index + 1}`}
												aria-selected={index === 0}
												tabIndex="-1"
												onClick={() => handleImageClick(image.url)}>
												<img
													src={image.url}
													alt={`Sub image ${index + 1}`}
												/>
											</button>
										</li>
									))}
								</ul>
								<div
									className="tab-content order-xl-2 order-1"
									id="v-pills-tabContent">
									{auction.productImages.map((image, index) => (
										<div
											className={`tab-pane fade ${
												index === 0 ? "show active" : ""
											}`}
											id={`v-pills-img${index + 1}`}
											role="tabpanel"
											aria-labelledby={`v-pills-img${index + 1}-tab`}
											key={image.id}>
											<div className="auction-details-tab-img">
												<img
													src={mainImage}
													alt={auction.title}
												/>
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
						<div className="col-xl-5">
							<div className="auction-details-content">
								<div className="batch">
									<span>Lot: # {auction.lotNumber}</span>
								</div>
								<h1>{auction.title}</h1>
								<p>{auction.description}</p>
								<div className="price-area">
									<span>Start Bid at:</span>
									<strong>${auction.startingPrice}</strong>
								</div>
								<div className="coundown-area">
									<h6>Auction Will Be Start:</h6>
									<div className="countdown-timer">
										<Countdown endTime={auction.endTime} />
									</div>
									<span>
										<strong>Ending On:</strong>{" "}
										{new Date(auction.endTime).toLocaleString()}
									</span>
								</div>
								<div className="notify-area">
									<h6>Get Notified Now:</h6>
									<form
										className="notify-form-and-btn-area"
										onSubmit={handleSubmit}>
										<div className="form-inner">
											<input
												type="email"
												placeholder="Your Email Address"
												value={email}
												onChange={(e) => setEmail(e.target.value)}
												required
											/>
										</div>
										<button
											type="submit"
											className="primary-btn btn-hover"
											disabled={isSubmitting}>
											{isSubmitting ? "Submitting..." : "Notify Me"}
											<span></span>
										</button>
									</form>
								</div>
								<div className="payment-method">
									<h6>Guaranteed Safe Checkout</h6>
									<ul className="payment-card-list">
										<li>
											<img
												className="main"
												src="/images/inner-pages/payment-img1.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img2.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img3.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img4.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img5.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img6.svg"
												alt=""
											/>
										</li>
										<li>
											<img
												className="sub"
												src="/images/inner-pages/payment-img7.svg"
												alt=""
											/>
										</li>
									</ul>
								</div>
								<ul className="question-and-wishlist-area">
									<li>
										<a href="contact.html">
											<span>
												<QuestionIcon />
											</span>
											Ask a question
										</a>
									</li>
									<li>
										<a href="#">
											<span>
												<FavoriteIcon />
											</span>
											Add to wishlist
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
