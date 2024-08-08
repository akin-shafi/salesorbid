import React from "react";
import PropTypes from "prop-types";

const PageCount = ({ itemCount, itemsPerPage, currentPage }) => {
	const startItem = (currentPage - 1) * itemsPerPage + 1;
	const endItem = Math.min(currentPage * itemsPerPage, itemCount);

	return (
		<div className="auction-grid-title-section mb-40">
			<h6>
				Showing {startItem}–{endItem} of {itemCount} results
			</h6>
		</div>
	);
};

// Prop types validation
PageCount.propTypes = {
	itemCount: PropTypes.number.isRequired,
	itemsPerPage: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
};

export default PageCount;
