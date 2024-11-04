import React, { useEffect, useState } from "react";
// Import the FontAwesomeIcon component and specific icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as solidHeart, faHeart as regularHeart, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const RecentCard = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/properties-information", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        setProperties(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    }
    fetchData();
  }, []);

  const [likedProperties, setLikedProperties] = useState(new Set());

  const toggleLike = (id) => {
    setLikedProperties((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {properties.map((property) => (
          <div className="bg-white rounded-lg shadow-md overflow-hidden w-80" key={property._id}>
            <div className="h-40">
              <img 
                className="object-cover w-full h-full" 
                src={property.imageurl} 
                alt={property.title} 
              />
            </div>
            <div className="p-4">
              <h5 className="text-lg font-bold">{property.title}</h5>
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faLocationDot} className="text-gray-600" />
                  <span className="ml-1 text-gray-600">{property.location}</span>
                </div>
                <div className="flex items-center">
                  <FontAwesomeIcon 
                    icon={likedProperties.has(property._id) ? solidHeart : regularHeart} 
                    className={`cursor-pointer ${likedProperties.has(property._id) ? 'text-red-500' : 'text-gray-600'}`} 
                    onClick={() => toggleLike(property._id)} 
                  />
                </div>
              </div>
              <p className="mt-1 text-gray-600">Type: <span className="font-semibold">{property.propertyType}</span></p>
              <p className="mt-2 text-gray-600">{property.description}</p>
              <div className="mt-4 bg-green-100 p-2 rounded">
                <span className="text-gray-700 font-semibold">${property.price}</span>
                <span className="text-gray-500"> / month</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCard;
