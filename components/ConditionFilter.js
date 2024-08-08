// import React from "react";

// const ConditionFilter = ({
// 	conditions,
// 	selectedCondition,
// 	onConditionChange,
// }) => (
// 	<select
// 		value={selectedCondition}
// 		onChange={onConditionChange}>
// 		<option value="">All Conditions</option>
// 		{conditions.map((condition) => (
// 			<option
// 				key={condition.id}
// 				value={condition.name}>
// 				{condition.name}
// 			</option>
// 		))}
// 	</select>
// );

// export default ConditionFilter;

import React, { useState } from "react";

const ConditionDropdownComponent = ({
	conditions,
	selectedCondition,
	onConditionChange,
}) => {
	// State for the dropdown visibility
	const [isOpen, setIsOpen] = useState(false);

	// Toggle dropdown visibility
	const toggleDropdown = () => {
		setIsOpen((prev) => !prev);
	};

	// Handle Condition selection
	const handleSelect = (condition) => {
		onConditionChange(condition); // Update the selected Condition in the parent component
		setIsOpen(false);
	};

	return (
		<div className="single-search-box">
			<div className="searchbox-input">
				<label>Condition</label>
				<div className="custom-select-dropdown">
					<div
						className="select-input"
						onClick={toggleDropdown}>
						<input
							type="text"
							readOnly
							value={selectedCondition || "Select Condition"}
						/>
						<i className="bi bi-chevron-down"></i>
					</div>
					{isOpen && (
						<div className="custom-select-wrap two active">
							<ul className="option-list">
								{conditions.map((condition, index) => (
									<li
										key={index}
										className="single-item"
										onClick={() => handleSelect(condition.label)}>
										<h6>{condition.label}</h6>
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

export default ConditionDropdownComponent;
