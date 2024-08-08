import React from "react";
import PropTypes from "prop-types";

const CategoryFilter = ({
	categories = [],
	selectedCategory,
	setSelectedCategory,
}) => {
	const handleSelect = (categoryId) => {
		setSelectedCategory(categoryId);
	};

	return (
		<div className="checkbox-container">
			<h5 className="widget-title">Category</h5>
			<ul>
				<li key="all">
					<label className="containerss">
						<input
							type="radio"
							checked={selectedCategory === null}
							onChange={() => handleSelect(null)}
						/>
						<span className="checkmark"></span>
						<span>All Categories</span>
					</label>
				</li>
				{categories.map((category) => (
					<li key={category.id}>
						<label className="containerss">
							<input
								type="radio"
								checked={selectedCategory === category.id}
								onChange={() => handleSelect(category.id)}
							/>
							<span className="checkmark"></span>
							<span>{category.name}</span>
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

// Prop types validation
CategoryFilter.propTypes = {
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	selectedCategory: PropTypes.number,
	setSelectedCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
