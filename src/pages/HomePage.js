import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";

const CountryList = gql`
  {
    countries {
      name
      capital
      currency
      emoji
      continent{
        name
      }
    }
  }
`;
function HomePage() {
  const { data, error, loading } = useQuery(CountryList);

  return (
    <div>
      <h1>List of Countries</h1>
      <Link to="/search">Search</Link>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        <div>
          {data &&
            data.countries.map((country, key) => {
              return (
                <div key={key}>
                  <h1>{country.name}</h1>
                  <h1 className=" text-green-600">{country.capital}</h1>
                  <p className=" text-yellow-200">{country.continent.name}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
