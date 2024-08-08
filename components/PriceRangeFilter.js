import React, { useState, useEffect } from "react";
import {
	Box,
	Text,
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderThumb,
	VStack,
	Button,
} from "@chakra-ui/react";
import { MdGraphicEq } from "react-icons/md"; // Import icon

const PriceRangeFilter = ({
	minPrice = 0,
	maxPrice = 10000,
	onPriceChange,
}) => {
	const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
	const [localPriceRange, setLocalPriceRange] = useState([minPrice, maxPrice]);

	// Update local price range when props change
	useEffect(() => {
		setLocalPriceRange([minPrice, maxPrice]);
	}, [minPrice, maxPrice]);

	const handleSliderChange = (values) => {
		setLocalPriceRange(values);
	};

	const handleFilterClick = () => {
		setPriceRange(localPriceRange);
		onPriceChange(localPriceRange);
	};

	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("en-NG", {
			style: "currency",
			currency: "NGN", // Change this to your desired currency
		}).format(amount);
	};

	return (
		<Box
			borderWidth="1px"
			borderRadius="md"
			p={4}
			bg="white"
			boxShadow="md">
			<Text
				fontSize="lg"
				mb={4}
				fontWeight="bold"
				color="gray.700">
				Price Range
			</Text>
			<VStack
				spacing={4}
				align="stretch">
				<RangeSlider
					aria-label={["min", "max"]}
					colorScheme="green"
					defaultValue={[minPrice, maxPrice]}
					min={minPrice}
					max={maxPrice}
					onChangeEnd={handleSliderChange}>
					<RangeSliderTrack bg="red.100">
						<RangeSliderFilledTrack bg="green" />
					</RangeSliderTrack>
					<RangeSliderTrack>
						<RangeSliderFilledTrack />
					</RangeSliderTrack>
					<RangeSliderThumb index={0}>
						<Box
							color="green"
							as={MdGraphicEq}
							cursor="crosshair"
						/>
					</RangeSliderThumb>
					<RangeSliderThumb index={1}>
						<Box
							color="green"
							as={MdGraphicEq}
							cursor="crosshair"
						/>
					</RangeSliderThumb>
				</RangeSlider>
				<Box
					display="flex"
					justifyContent="space-between"
					color="gray.600">
					<Text>{formatCurrency(localPriceRange[0])}</Text>
					<Text>{formatCurrency(localPriceRange[1])}</Text>
				</Box>
				<Button
					colorScheme="green"
					onClick={handleFilterClick}>
					Filter
				</Button>
			</VStack>
		</Box>
	);
};

export default PriceRangeFilter;
