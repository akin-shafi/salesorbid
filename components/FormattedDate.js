// components/FormattedDate.tsx
import React from "react";
import { formatDate } from "../utils/formatDate"; // Import the formatDate function

const FormattedDate = ({ date }) => {
	return (
		<>
			<span>{formatDate(date)}</span>
		</>
	);
};

export default FormattedDate;
