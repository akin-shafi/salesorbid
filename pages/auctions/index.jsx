import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import AuctionCard from "@/components/AuctionCard";
import CategoryFilter from "@/components/CategoryFilter";
import CountryFilter from "@/components/CountryFilter";
import ConditionFilter from "@/components/ConditionFilter";
import Pagination from "@/components/Pagination";
import PageCount from "@/components/PageCount";
import FilterInfo from "@/components/FilterInfo";

const AuctionsPage = ({ initialFilteredAuctions, categories, countries, conditions, error }) => {
    const router = useRouter();
    const {
        query: { categoryId, countryId, condition, minPrice, maxPrice }
    } = router;

    const [selectedCategory, setSelectedCategory] = useState(categoryId ? Number(categoryId) : null);
    const [selectedCountryId, setSelectedCountryId] = useState(countryId ? Number(countryId) : null);
    const [selectedCondition, setSelectedCondition] = useState(condition || null);
    const [minPriceRange, setMinPriceRange] = useState(minPrice || "");
    const [maxPriceRange, setMaxPriceRange] = useState(maxPrice || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [appliedFilters, setAppliedFilters] = useState({
        categoryId: selectedCategory,
        countryId: selectedCountryId,
        condition: selectedCondition,
        minPrice: minPriceRange,
        maxPrice: maxPriceRange
    });

    useEffect(() => {
        if (categoryId) setSelectedCategory(Number(categoryId));
        if (countryId) setSelectedCountryId(Number(countryId));
        if (minPrice) setMinPriceRange(minPrice);
        if (maxPrice) setMaxPriceRange(maxPrice);
    }, [categoryId, countryId, minPrice, maxPrice]);

    const handleApplyFilters = () => {
        setAppliedFilters({
            categoryId: selectedCategory,
            countryId: selectedCountryId,
            condition: selectedCondition,
            minPrice: minPriceRange,
            maxPrice: maxPriceRange
        });
    };

    const filteredAuctions = useMemo(() => {
        return initialFilteredAuctions.filter((auction) => {
            return (
                (appliedFilters.categoryId ? auction.categoryId === appliedFilters.categoryId : true) &&
                (appliedFilters.countryId ? auction.countryId === appliedFilters.countryId : true) &&
                (appliedFilters.condition ? auction.condition === appliedFilters.condition : true) &&
                (appliedFilters.minPrice ? auction.startingPrice >= appliedFilters.minPrice : true) &&
                (appliedFilters.maxPrice ? auction.startingPrice <= appliedFilters.maxPrice : true)
            );
        });
    }, [initialFilteredAuctions, appliedFilters]);

    const totalPages = Math.ceil(filteredAuctions.length / itemsPerPage);

    useEffect(() => {
        const query = {};
        if (appliedFilters.categoryId) query.categoryId = appliedFilters.categoryId;
        if (appliedFilters.countryId) query.countryId = appliedFilters.countryId;
        if (appliedFilters.condition) query.condition = appliedFilters.condition;
        if (appliedFilters.minPrice) query.minPrice = appliedFilters.minPrice;
        if (appliedFilters.maxPrice) query.maxPrice = appliedFilters.maxPrice;

        router.push({
            pathname: "/auctions",
            query
        }, undefined, { shallow: true });
    }, [appliedFilters]);

    const clearFilters = () => {
        setSelectedCategory(null);
        setSelectedCountryId(null);
        setSelectedCondition(null);
        setMinPriceRange("");
        setMaxPriceRange("");
        setAppliedFilters({
            categoryId: null,
            countryId: null,
            condition: null,
            minPrice: "",
            maxPrice: ""
        });
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleCountryChange = (countryId) => {
        setSelectedCountryId(countryId);
    };

    const handleMinPriceChange = (e) => {
        setMinPriceRange(e.target.value);
    };

    const handleMaxPriceChange = (e) => {
        setMaxPriceRange(e.target.value);
    };

    const selectedCategoryName = categories.find(category => category.id === selectedCategory)?.name || '';
    const selectedCountryName = countries.find(country => country.id === selectedCountryId)?.name || '';
    const selectedConditionName = conditions.find(cond => cond.id === selectedCondition)?.name || '';

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <div className="auction-grid-sidebar-section pt-50 mb-50">
                <div className="container">
                    <div className="row gy-5">
                        <div className="col-xl-3 order-xl-1 order-2">
                            <div className="auction-sidebar">
                                <form>
                                    <div className="single-widget mb-30">
                                        <CategoryFilter
                                            categories={categories}
                                            selectedCategory={selectedCategory}
                                            setSelectedCategory={setSelectedCategory}
                                        />
                                    </div>
                                    <div className="single-widget mb-30">
                                        <CountryFilter
                                            countries={countries}
                                            selectedCountry={selectedCountryId}
                                            onCountryChange={handleCountryChange}
                                        />
                                    </div>
                                    <div className="single-widget mb-30">
                                        <ConditionFilter
                                            conditions={conditions}
                                            selectedCondition={selectedCondition}
                                            onConditionChange={setSelectedCondition}
                                        />
                                    </div>
                                    <div className="single-widget mb-30">
                                        <div className="price-filter">
                                            <label htmlFor="minPrice">Min Price:</label>
                                            <input
                                                type="number"
                                                id="minPrice"
                                                className="border form-control"
                                                value={minPriceRange}
                                                onChange={handleMinPriceChange}
                                            />
                                            <label htmlFor="maxPrice">Max Price:</label>
                                            <input
                                                type="number"
                                                id="maxPrice"
                                                className="border form-control"
                                                value={maxPriceRange}
                                                onChange={handleMaxPriceChange}
                                            />
                                            <div>
                                                <button
                                                    type="button"
                                                    className="btn btn-dark w-100 mt-3"
                                                    onClick={handleApplyFilters}
                                                >
                                                    Apply
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-xl-9 order-xl-2 order-1">
                            <div className="list-grid-product-wrap">
                                <div className="row g-4 mb-60">
                                    <div className="border-bottom d-flex justify-content-between align-items-center">
                                        <h4>All Auctions</h4>
                                        <div className="align-items-center">
                                            <PageCount
                                                itemCount={filteredAuctions.length}
                                                itemsPerPage={itemsPerPage}
                                                currentPage={currentPage}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div>
                                            <FilterInfo
                                                selectedCategoryName={selectedCategoryName}
                                                selectedCountryName={selectedCountryName}
                                                selectedConditionName={selectedConditionName}
                                                onClearFilters={clearFilters}
                                            />
                                        </div>
                                    </div>
                                    {filteredAuctions
                                        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                                        .map((auction) => (
                                            <AuctionCard
                                                key={auction.id}
                                                auction={auction}
                                            />
                                        ))}
                                </div>
                            </div>
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getServerSideProps(context) {
    const { categoryId = "", condition = "", countryId = "", minPrice = "", maxPrice = "" } = context.query;

    try {
        const auctionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/filter?category=${categoryId}&condition=${condition}&country=${countryId}&minPrice=${minPrice}&maxPrice=${maxPrice}`);
        const categoryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/category-list`);
        const countryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/country/country-list`);
        const conditionResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/conditions`);

        if (!auctionResponse.ok || !categoryResponse.ok || !countryResponse.ok || !conditionResponse.ok) {
            throw new Error("Network response was not ok");
        }

        const initialFilteredAuctions = await auctionResponse.json();
        const categories = await categoryResponse.json();
        const countries = await countryResponse.json();
        const conditions = await conditionResponse.json();

        return {
            props: {
                initialFilteredAuctions,
                categories,
                countries,
                conditions
            }
        };
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return {
            props: {
                initialFilteredAuctions: [],
                categories: [],
                countries: [],
                conditions: [],
                error: error.message
            }
        };
    }
}

export default AuctionsPage;
