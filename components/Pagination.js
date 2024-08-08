import React from "react";
import PropTypes from "prop-types";
import { ArrowLeft, ArrowRight } from "./SvgIcons/Icon";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const handlePageClick = (page) => {
		if (page > 0 && page <= totalPages) {
			onPageChange(page);
		}
	};

	return (
		<div className="row">
			<div
				className="col-lg-12 d-flex justify-content-center wow animate fadeInUp"
				data-wow-delay="400ms"
				data-wow-duration="1500ms">
				<div className="inner-pagination-area">
					<ul className="paginations">
						<li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(currentPage - 1);
								}}>
								<ArrowLeft />
							</a>
						</li>
						{Array.from({ length: totalPages }, (_, index) => (
							<li
								key={index + 1}
								className={`page-item ${
									currentPage === index + 1 ? "active" : ""
								}`}>
								<a
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handlePageClick(index + 1);
									}}>
									{index + 1}
								</a>
							</li>
						))}
						<li
							className={`page-item ${
								currentPage === totalPages ? "disabled" : ""
							}`}>
							<a
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handlePageClick(currentPage + 1);
								}}>
								<ArrowRight />
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

// Prop types validation
Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
