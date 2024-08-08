import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import CountryFilter from "@/components/CountryFilter";
import ConditionFilter from "@/components/ConditionFilter";
import AuctionList from "@/components/AuctionList";
import AuctionCard from "@/components/AuctionCard";

import Pagination from "@/components/Pagination";
import PriceRangeFilter from "@/components/PriceRangeFilter";

const ViewAll = ({ initialFilteredAuctions }) => {
	const router = useRouter();
	const { categoryId = "", condition = "", country = "" } = router.query;

	const [selectedCategory, setSelectedCategory] = useState(categoryId);
	const [selectedCountry, setSelectedCountry] = useState(country);
	const [selectedCondition, setSelectedCondition] = useState(condition);
	const [filteredAuctions, setFilteredAuctions] = useState(
		initialFilteredAuctions
	);
	const [categories, setCategories] = useState([]);
	const [countries, setCountries] = useState([]);
	const [conditions, setConditions] = useState([]);

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(6); // Adjust items per page as needed
	const [priceRange, setPriceRange] = useState([0, 10000]);

	const handlePriceChange = (values) => {
		console.log("Selected price range:", values);
		setPriceRange(values);
	};

	useEffect(() => {
		const fetchOptions = async () => {
			try {
				const [categoriesResponse, countriesResponse, conditionsResponse] =
					await Promise.all([
						fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/category-list`),
						fetch(`${process.env.NEXT_PUBLIC_API_URL}/country/country-list`),
						fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conditions`),
					]);
				if (
					!categoriesResponse.ok ||
					!countriesResponse.ok ||
					!conditionsResponse.ok
				) {
					throw new Error("Failed to fetch options");
				}
				const categoriesData = await categoriesResponse.json();
				const countriesData = await countriesResponse.json();
				const conditionsData = await conditionsResponse.json();
				setCategories(categoriesData.categories);
				setCountries(countriesData.countries);
				setConditions(conditionsData);

				console.log("categoriesData", categoriesData);
				console.log("countriesData", countriesData);
				console.log("conditionsData", conditionsData);
			} catch (error) {
				console.error("Error fetching options:", error.message);
			}
		};

		fetchOptions();
	}, []);

	useEffect(() => {
		const fetchFilteredAuctions = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_API_URL}/products?category=${selectedCategory}&condition=${selectedCondition}&country=${selectedCountry}`
				);
				if (!response.ok) {
					throw new Error("Failed to fetch");
				}
				const data = await response.json();
				setFilteredAuctions(data);
			} catch (error) {
				console.error("Error fetching filtered auctions:", error.message);
				setFilteredAuctions([]);
			}
		};

		fetchFilteredAuctions();
	}, [selectedCategory, selectedCountry, selectedCondition, currentPage]);

	useEffect(() => {
		setSelectedCategory(categoryId || "");
		setSelectedCountry(country || "");
		setSelectedCondition(condition || "");
	}, [categoryId, condition, country]);

	const handleCategoryChange = (event) => {
		const newCategory = event.target.value;
		setSelectedCategory(newCategory);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, categoryId: newCategory },
		});
	};

	const handleCountryChange = (event) => {
		const newCountry = event.target.value;
		setSelectedCountry(newCountry);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, country: newCountry },
		});
	};

	const handleConditionChange = (event) => {
		const newCondition = event.target.value;
		setSelectedCondition(newCondition);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, condition: newCondition },
		});
	};

	const handleBidClick = (auctionId) => {
		router.push(`/auctions/${auctionId}`);
	};

	const filteredItems = filteredAuctions.filter((auction) => {
		const categoryMatch =
			!selectedCategory || auction.category === selectedCategory;
		const countryMatch =
			!selectedCountry || auction.country === selectedCountry;
		const conditionMatch =
			!selectedCondition || auction.condition === selectedCondition;
		const priceMatch =
			auction.price >= priceRange[0] && auction.price <= priceRange[1];
		return categoryMatch && countryMatch && conditionMatch && priceMatch;
	});

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

	return (
		<>
			<div className="auction-grid-sidebar-section pt-50 mb-50">
				<div className="container">
					<div className="row gy-5">
						<div className="col-xl-3 order-xl-1 order-2">
							<div className="auction-sidebar">
								<div className="single-widget mb-30">
									<h5 className="widget-title">Category</h5>
									<div className="checkbox-container">
										<CategoryFilter
											categories={categories}
											selectedCategory={selectedCategory}
											onCategoryChange={handleCategoryChange}
										/>
									</div>
								</div>
								<div className="single-widget mb-30">
									<CountryFilter
										countries={countries}
										selectedCountry={selectedCountry}
										onCountryChange={handleCountryChange}
									/>
								</div>
								<div className="single-widget mb-30">
									<ConditionFilter
										conditions={conditions}
										selectedCondition={selectedCondition}
										onConditionChange={handleConditionChange}
									/>
								</div>
								<div className="single-widget mb-30">
									<PriceRangeFilter
										minPrice={10000}
										maxPrice={1000000}
										onPriceChange={handlePriceChange}
									/>
								</div>
							</div>
						</div>
						<div className="col-xl-9 order-xl-2 order-1">
							{/* <AuctionList
								auctions={filteredItems.slice(
									(currentPage - 1) * itemsPerPage,
									currentPage * itemsPerPage
								)}
								onBidClick={handleBidClick}
							/> */}

							{filteredItems
								.slice(
									(currentPage - 1) * itemsPerPage,
									currentPage * itemsPerPage
								)
								.map((auction) => (
									<AuctionCard
										key={auction.id}
										auction={auction}
									/>
								))}

							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								onPageChange={(page) => setCurrentPage(page)}
							/>
							<Link href="/">Back to Home</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps(context) {
	const { categoryId = "", condition = "", country = "" } = context.query;

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_API_URL}/products?category=${categoryId}&condition=${condition}&country=${country}`
		);
		if (!response.ok) {
			throw new Error("Network response was not ok");
		}
		const data = await response.json();
		return {
			props: {
				initialFilteredAuctions: data,
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error.message);
		return {
			props: {
				initialFilteredAuctions: [],
				error: error.message,
			},
		};
	}
}

export default ViewAll;
