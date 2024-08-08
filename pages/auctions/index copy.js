import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CategoryFilter from "@/components/CategoryFilter";
import CountryFilter from "@/components/CountryFilter";
import ConditionFilter from "@/components/ConditionFilter";
// import AuctionList from "@/components/AuctionList";
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
	const [itemsPerPage] = useState(6);
	const [priceRange, setPriceRange] = useState([0, 10000]);

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

				const [categoriesData, countriesData, conditionsData] =
					await Promise.all([
						categoriesResponse.json(),
						countriesResponse.json(),
						conditionsResponse.json(),
					]);

				setCategories(categoriesData.categories);
				setCountries(countriesData.countries);
				setConditions(conditionsData);
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
					`${process.env.NEXT_PUBLIC_API_URL}/products?category=${selectedCategory}&condition=${selectedCondition}&country=${selectedCountry}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
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
	}, [
		selectedCategory,
		selectedCountry,
		selectedCondition,
		priceRange,
		currentPage,
	]);

	useEffect(() => {
		setSelectedCategory(categoryId || "");
		setSelectedCountry(country || "");
		setSelectedCondition(condition || "");
	}, [categoryId, condition, country]);

	const handleCategoryChange = (newCategory) => {
		setSelectedCategory(newCategory);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, categoryId: newCategory },
		});
	};

	const handleCountryChange = (newCountry) => {
		setSelectedCountry(newCountry);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, country: newCountry },
		});
	};

	const handleConditionChange = (newCondition) => {
		setSelectedCondition(newCondition);
		router.push({
			pathname: "/auctions",
			query: { ...router.query, condition: newCondition },
		});
	};

	const handlePriceChange = (values) => {
		setPriceRange(values);
	};

	const filteredItems = filteredAuctions.filter((auction) => {
		const categoryMatch =
			!selectedCategory || auction.categoryId.toString() === selectedCategory;
		const countryMatch =
			!selectedCountry || auction.countryId.toString() === selectedCountry;
		const conditionMatch =
			!selectedCondition || auction.condition === selectedCondition;
		const priceMatch =
			auction.startingPrice >= priceRange[0] &&
			auction.startingPrice <= priceRange[1];
		return categoryMatch && countryMatch && conditionMatch && priceMatch;
	});

	const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

	return (
		<div className="auction-grid-sidebar-section pt-50 mb-50">
			<div className="container">
				<div className="row gy-5">
					<div className="col-xl-3 order-xl-1 order-2">
						<div className="auction-sidebar">
							<div className="single-widget mb-30">
								<h5 className="widget-title">Category</h5>
								<CategoryFilter
									categories={categories}
									selectedCategory={selectedCategory}
									onCategoryChange={handleCategoryChange}
								/>
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
									minPrice={0}
									maxPrice={10000}
									onPriceChange={handlePriceChange}
								/>
							</div>
						</div>
					</div>
					<div className="col-xl-9 order-xl-2 order-1">
						<div className="row">
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
						</div>
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
