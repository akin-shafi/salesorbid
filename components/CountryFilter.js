import React, { useState } from "react";
import PropTypes from "prop-types";

const CountryFilter = ({
	countries = [],
	selectedCountry,
	onCountryChange,
}) => {
	// State for dropdown visibility
	const [isOpen, setIsOpen] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	// Handle country selection
	const handleSelect = (countryId) => {
		onCountryChange(countryId); // Pass the selected country ID back to the parent component
		setIsOpen(false);
	};

	return (
		<div className="single-search-box">
			<div className="searchbox-input">
				<label>Country</label>
				<div className="custom-select-dropdown">
					<div
						className="select-input"
						onClick={toggleDropdown}>
						<input
							type="text"
							readOnly
							value={
								countries.find((country) => country.id === selectedCountry)
									?.name || "Select Country"
							}
						/>
						<i className="bi bi-chevron-down"></i>
					</div>
					{isOpen && (
						<div className="custom-select-wrap two active">
							<ul className="option-list">
								{countries.map((country) => (
									<li
										key={country.id} // Use unique id for key
										className="single-item"
										onClick={() => handleSelect(country.id)}>
										<h6>{country.name}</h6>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

// Prop types validation
CountryFilter.propTypes = {
	countries: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			name: PropTypes.string.isRequired,
		})
	).isRequired,
	selectedCountry: PropTypes.number, // Expecting a number for country ID
	onCountryChange: PropTypes.func.isRequired,
};

export default CountryFilter;
