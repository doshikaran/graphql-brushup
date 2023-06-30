import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import {BiArrowBack} from 'react-icons/bi'

const SearchACountry = gql`
  query Country($code: ID!)
  {
    country(code: $code) {
      name
      emoji
      capital
      continent {
        name
      }
      languages {
        name
        native
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
    <div>

    <div>
      <Link to ="/"><BiArrowBack/></Link>
      <p>Search for your country</p>
    </div>
      
      <div>
        <input onChange={inputChange} placeholder="Enter your country code" />
        <button onClick={searchCountry}>Search</button>
      </div>

      <div>
        {data && (
          <div>
            <h1>{data.country.name}</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
