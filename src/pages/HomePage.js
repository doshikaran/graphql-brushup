import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const CountryList = gql`
  {
    countries {
      name
      capital
      currency
      emoji
      continent {
        name
      }
    }
  }
`;
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: "bold",
  },
}));
function HomePage() {
  const { data, error, loading } = useQuery(CountryList); 

  return (
    <div className=" p-10">
      <div className=" flex items-center justify-between mb-5">
        <h1 className=" uppercase tracking-wider font-bold">
          List of Countries
        </h1>
        <Link to="/search">
          <button className=" bg-gray-200 p-2 rounded-md hover:bg-black hover:text-white">
            Search
          </button>
        </Link>
      </div>

      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}

        <div>
          {/* // <div key={key}>
                //   <h1>{country.name}</h1>
                //   <h1>{country.emoji}</h1>
                //   <h1 className=" text-green-600">{country.capital}</h1>
                //   <p className=" text-yellow-200">{country.continent.name}</p>
                //   <h1>{country.currency}</h1>
                // </div> */}
          <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead stickyHeader>
                <TableRow>
                  <StyledTableCell>COUNTRY</StyledTableCell>
                  <StyledTableCell>FLAG</StyledTableCell>
                  <StyledTableCell>CAPITAL</StyledTableCell>
                  <StyledTableCell>CONTINENT</StyledTableCell>
                  <StyledTableCell>CURRENCY</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.countries.map((country, key) => {
                    return (
                      <TableRow key={key} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell  scope="row">{country.name}</TableCell>
                        <TableCell>{country.emoji}</TableCell>
                        <TableCell>{country.capital}</TableCell>
                        <TableCell>{country.continent.name}</TableCell>
                        <TableCell>{country.currency}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
