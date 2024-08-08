// components/AuctionList.js
import React from "react";

const AuctionList = ({ auctions, onBidClick }) => {
	return (
		<ul>
			{auctions.map((auction) => (
				<li key={auction.id}>
					{auction.title} ({auction.price})
					<button onClick={() => onBidClick(auction.id)}>Bid</button>
				</li>
			))}
		</ul>
	);
};

export default AuctionList;
