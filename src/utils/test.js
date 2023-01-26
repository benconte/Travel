rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2023, 2, 25);
    }
  }
}

import React, { useState, useContext, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import check from "../../utils/check.svg";
// import trash from "../../utils/trash.svg";
import { AppContext } from "../../context/MainContext";
import { addDoc, getDocs } from "firebase/firestore";
import { colRef } from "../../firebase";

export default function ImgMediaCard({ country, countries }) {
  const { theme } = useContext(AppContext);
  const [isVisited, setIsVisited] = useState(false);

  // Function that adds a comma after thousandths for population
  const addCommas = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const visitCountry = async () => {
    await addDoc(colRef, {
      name: country.name.common,
      population: country.population,
      region: country.region,
      capital: country.capital,
      currencies: country.currencies,
      domain: country.tld,
      languages: country.languages,
      borderCountries: country.borders,
      flag: country.flags.svg,
    }).then(() => {
      setIsVisited(true);
    });
  };

  useEffect(() => {
    // checking if the current country is in to visit. If it is add a checkmark
    getDocs(colRef)
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          if (doc.data().name === country.name.common) {
            setIsVisited(true);
          }
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [country, countries]);

  return (
    <Link to={`/country/${country.name.common}`}>
      <Card
        // sx={{ maxWidth: 340 }}
        className="w-full"
        style={{
          backgroundColor: `${theme.cardBackground}`,
          borderRadius: "12px",
          boxShadow: "0 0 #000",
          border: "none",
          // width: 340,
        }}
      >
        <CardMedia className="w-full">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full h-40 object-cover rounded-xl"
          />
        </CardMedia>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={`${theme.primaryText} truncate`}
          >
            {country.name.common}
          </Typography>
          <Typography
            variant="body2"
            className="flex flex-col justify-start gap-2"
          >
            <span className={`${theme.secondaryText}`}>
              Population: {addCommas(country.population)}
            </span>
            <span className={`${theme.secondaryText} truncate`}>
              Capital: {country.capital}
            </span>
            <span className={`${theme.secondaryText}`}>Currency:random</span>
          </Typography>
        </CardContent>
        <CardActions>
          <div className="w-full flex justify-end gap-2">
            {/* <button
            type="button"
            className="border-none p-3 rounded-full bg-[#D9D9D9]"
          >
            <img src={trash} alt="Delete" className="w-[16px] h-[16px]" />
          </button> */}
            <button
              type="button"
              onClick={() => visitCountry()}
              className={`border-none p-3 rounded-full ${
                isVisited ? "bg-[var(--green)]" : "bg-[#D9D9D9]"
              }`}
            >
              <img src={check} alt="Check" className={`w-[16px] h-[16px]`} />
            </button>
          </div>
        </CardActions>
      </Card>
    </Link>
  );
}
