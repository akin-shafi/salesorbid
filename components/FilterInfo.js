import React from "react";
import PropTypes from "prop-types";

const FilterInfo = ({
    selectedCategoryName,
    selectedCountryName,
    selectedConditionName,
    onClearFilters,
}) => {
    return (
        <div className="filter-info">
            <div className="tags-container">
                <div className="tag">
                    <strong>Category:</strong> {selectedCategoryName || "All Categories"}
                </div>
                <div className="tag">
                    <strong>Country:</strong> {selectedCountryName || "All Countries"}
                </div>
                <div className="tag">
                    <strong>Condition:</strong> {selectedConditionName || "All Conditions"}
                </div>
                {(selectedCategoryName || selectedCountryName || selectedConditionName) && (
                    <button className="clear-filters" onClick={onClearFilters}>
                        Clear Filters
                    </button>
                )}
            </div>
        </div>
    );
};

// Prop types validation
FilterInfo.propTypes = {
    selectedCategoryName: PropTypes.string,
    selectedCountryName: PropTypes.string,
    selectedConditionName: PropTypes.string,
    onClearFilters: PropTypes.func.isRequired,
};

export default FilterInfo;
