import React from "react";
import Link from "next/link";
import Countdown from "./shared/Countdown";
import FormattedDate from "./FormattedDate";
import { EyeIcon, MaceIcon, FavoriteIcon } from "./SvgIcons/Icon";

const AuctionCard = ({ auction }) => {
	return (
		<div
			className="col-lg-4 col-md-6 item wow animate fadeInDown mb-4"
			data-wow-delay="200ms"
			data-wow-duration="1500ms">
			<div className="auction-card style-7">
				<div className="auction-card-img-wrap">
					<Link
						href="auction-details.html"
						className="card-img">
						<img
							src={auction.imageUrl}
							alt={auction.title}
						/>
					</Link>
					<div className="batch">
						<span className={auction.status.toLowerCase()}>
							<MaceIcon />
							{auction.status}
						</span>
						<div className="code-no">
							<span className="code">{auction.condition}</span>
						</div>
					</div>
					<ul className="view-and-favorite-area">
						<li>
							<a href="#">
								<FavoriteIcon />
							</a>
						</li>
						<li>
							<a href="#">
								<EyeIcon />
							</a>
						</li>
					</ul>
					<Countdown endTime={auction.endTime} />
					
					{/* {auction.endTime} */}
				</div>
				<div className="auction-card-content">
					<FormattedDate date={auction.endTime} />
					<h6>
						<Link href="auction-details.html">{auction.title}</Link>
					</h6>
					<div className="price-and-code-area">
						<div className="price">
							<span>Current Bid at:</span>
							<strong>$ {auction.startingPrice}</strong>
						</div>
						<div className="code">
							<span>Lot # {auction.lotNumber}</span>
						</div>
					</div>
					<div className="author-and-btn-area  d-flex justify-content-between">
						<div className="">
							<Link
								title="Maverick Dylan"
								href="/"
								className="author-area">
								<div className="author-img">
									<img
										src="../images/home1/auction-card-author-img1.png"
										alt=""
									/>
								</div>
								<div className="author-content">
									<h6 className="text-truncate">Maverick Dylan</h6>
								</div>
							</Link>
						</div>
						<div className="">
							{auction.status.toLowerCase() === "upcoming" ? (
								<Link
									href={`/auctions/notify-me/${auction.id}`} // Different link for upcoming status
									className="bid-btn-2">
									Notify Me
								</Link>
							) : (
								<Link
									href={`/auctions/${auction.id}`} // Default link
									className="bid-btn">
									Bid Now
								</Link>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuctionCard;
