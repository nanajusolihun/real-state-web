/* eslint-disable no-sequences */
/* eslint-disable no-unreachable */
import React, { useState, useEffect, createContext } from "react";

import { housesData } from "../data";

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Properties type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [loading, setLoading] = useState(false);

  // Return all countries
  useEffect(() => {
    const allCountries = houses.map((houses) => {
      return houses.country;
    });
    // remove duplicate countries
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, [houses]);

  // Return all properties
  useEffect(() => {
    const allProperties = houses.map((houses) => {
      return houses.type;
    });
    // remove duplicate countries
    const uniqueProperties = ["Property (any)", ...new Set(allProperties)];

    // set countries state
    setProperties(uniqueProperties);
  }, [houses]);

  // handle click search
  const handleClick = () => {
    setLoading(true);
    const isDefault = (str) => {
      return str.split(" ").includes("(any)")
    };

    const minPrice = parseInt(price.split(" ")[0]);
    const maxPrice = parseInt(price.split(" ")[2]);

    // eslint-disable-next-line array-callback-return
    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice
      ) {
        return house;
      }
      // if all values are default
      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return house;
      }

      // if country is not default
      if(!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      // if property is not default
      if(isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.type === property;
      }

      // if price is not default
      if(isDefault(country) && isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // if country & property is not default
      if(!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country &&  house.type === property;
      }

      // if country & price is not default
      if(!isDefault(country) && isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // property & price is not default
      if(isDefault(country) && !isDefault(property) && !isDefault(price)) {
        if(housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
      setLoading(false);
    }, 1000)

    
  }

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        setCountries,
        property,
        setProperty,
        properties,
        setProperties,
        price,
        setPrice,
        houses,
        setHouses,
        loading,
        setLoading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
