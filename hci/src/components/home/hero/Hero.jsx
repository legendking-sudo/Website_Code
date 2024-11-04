import React, { useState } from "react";
import Heading from "../../common/Heading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./hero.css";

const Hero = () => {
  // State to keep track of selected filters
  const [selectedFilters, setSelectedFilters] = useState([]);

  // Array of filter options
  const filters = [
    "Near Metro Station",
    "Near Airport",
    "Sea Facing",
    "Ground Floor",
    "Swimming Pool Needed",
    "Parking",
    "Near Park or Garden",
  ];

  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prevSelected) =>
      prevSelected.includes(filter)
        ? prevSelected.filter((item) => item !== filter) // Remove if already selected
        : [...prevSelected, filter] // Add if not selected
    );
  };

  return (
    <>
      <section className="hero">
        <div className="container">
          <Heading
            title="Search Your Next Home"
            subtitle="Find new & featured property located in your local city."
          />

          <form className="flex">
            <div className="box">
              <span>City/Street</span>
              <input type="text" placeholder="Location" />
            </div>
            <div className="box">
              <span>Property Type</span>
              <input type="text" placeholder="Property Type" />
            </div>
            <div className="box">
              <span>Price Range</span>
              <input type="text" placeholder="Price Range" />
            </div>
            <div className="box advanced-filter">
              <h4>Advance Filter</h4>
              <div className="dropdown">
                {filters.map((filter) => (
                  <span
                    key={filter}
                    className={`filter-option ${selectedFilters.includes(filter) ? "selected" : ""}`}
                    onClick={() => toggleFilter(filter)}
                  >
                    {filter}
                  </span>
                ))}
              </div>
            </div>
            <button className="btn1">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Hero;
