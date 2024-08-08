import React, { useState, useEffect } from "react";
import { ColumnIcon } from "../SvgIcons/Icon";

// Utility function to format the time in YYYY-MM-DD HH:mm:ss format
const formatTime = (date) => {
	const options = {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		hour12: false,
	};
	return new Intl.DateTimeFormat("en-GB", options).format(date);
};

const Countdown = ({ endTime }) => {
	const [timeLeft, setTimeLeft] = useState(null);
	const [isClient, setIsClient] = useState(false);

	// Check if we're on the client side
	useEffect(() => {
		setIsClient(true);
	}, []);

	useEffect(() => {
		if (!isClient) return;

		const calculateTimeLeft = () => {
			const deadline = new Date(endTime).getTime();
			const now = new Date().getTime();
			const timeLeft = deadline - now;

			return {
				days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
				hours: Math.floor(
					(timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				),
				minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
				seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
			};
		};

		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearInterval(interval);
	}, [endTime, isClient]);

	if (!isClient || timeLeft === null) {
		return <p>Loading...</p>;
	}

	const formattedEndTime = formatTime(new Date(endTime));

	return (
		<>
			<div className="countdown-timer">
				<ul data-countdown={timeLeft}>
					<li
						className="times"
						data-days={timeLeft.days}>
						{timeLeft.days} <span>Days</span>
					</li>
					<li className="colon">
						<ColumnIcon />
					</li>
					<li
						className="times"
						data-hours={timeLeft.hours}>
						{timeLeft.hours} <span>Hours</span>
					</li>
					<li className="colon">
						<ColumnIcon />
					</li>
					<li
						className="times"
						data-minutes={timeLeft.minutes}>
						{timeLeft.minutes} <span>Minutes</span>
					</li>
					<li className="colon">
						<ColumnIcon />
					</li>
					<li
						className="times"
						data-seconds={timeLeft.seconds}>
						{timeLeft.seconds} <span>Seconds</span>
					</li>
				</ul>
			</div>
			{/* <div className="end-time mt-4">
				<p>End Time: {formattedEndTime}</p>
			</div> */}
		</>
	);
};

export default Countdown;
