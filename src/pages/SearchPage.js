import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

const SearchACountry = gql`
  query Country($code: ID!) {
    country(code: $code) {
      name
      emoji
      capital
      continent {
        name
      }
      languages {
        name
      }
      currency
      phone
    }
  }
`;
function SearchPage() {
  const [countrySearch, setCountrySearch] = useState("");
  const [searchCountry, { data, error, loading }] = useLazyQuery(
    SearchACountry,
    {
      variables: { code: countrySearch.toUpperCase() },
    }
  );

  const inputChange = (event) => {
    setCountrySearch(event.target.value);
  };

  return (
    <div className=" p-10">
      <div className=" flex items-center gap-x-20 mb-5">
        <Link to="/">
          <BiArrowBack />
        </Link>
        <p className=" uppercase tracking-widest font-semibold">
          Search for your country
        </p>
      </div>

      <div className=" p-5 flex items-center justify-center gap-x-5">
        <input
          className=" p-2 outline-none rounded-md w-1/3 bg-gray-100 border border-black focus:bg-white"
          onChange={inputChange}
          placeholder="Enter your country code"
        />
        <button
          className=" p-2 rounded-md bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
          onClick={searchCountry}
        >
          Search
        </button>
      </div>

      <div className="flex items-center justify-center mt-10 p-5">
        {data && data.country && (
          <div className=" bg-gray-100 p-10 rounded-md">
            <div className=" flex items-center justify-center gap-x-10">
              <h1 className=" uppercase tracking-widest font-bold text-2xl">
                {data.country.name}
              </h1>
              <h1 className=" ">{data.country.emoji}</h1>
            </div>

            <h1 className=" mt-5 tracking-widest text-sm font-light">
              The capital of {data.country.name} is {data.country.capital}
            </h1>
            <h1 className=" mt-5 tracking-widest text-sm font-light">
              {" "}
              Its located in the continent of {data.country.continent.name}
            </h1>

            {/* {data.country.languages.map((language) => (
        <div key={language.name}>
          <h1>{language.name}</h1>
          <h1>{language.native}</h1>
        </div>
      ))} */}

            <h1 className=" mt-5 tracking-widest text-sm font-light">
              The currency of the country is {data.country.currency}
            </h1>
            <h1 className=" mt-5 tracking-widest text-sm font-light">
              Phone code: +{data.country.phone}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
