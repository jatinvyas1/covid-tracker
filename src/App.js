import { MenuItem,Select,FormControl } from '@material-ui/core';
import './App.css';
import {useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const onCountryChange  = async (event)=>{
    const countryCode = event.target.value;
    setCountry(countryCode);
    
  }
  useEffect(() => {
    const fetchCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(result =>result.json())
      .then(data =>{
        const countries = data.map((country)=>({
            value:country.countryInfo.iso2,
            name:country.country
        }))
        setCountries(countries);
      })
    }
    fetchCountriesData();
  }, []) //To be used only once

  return (
    <div className="app">
      <div className="app__header">
        <h1>Covid 19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select
            variant="outlined"
            value={country}
            onChange={onCountryChange}
          > 
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)
            }
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="india" cases="234" total="123455" />
        <InfoBox title="india" cases="234" total="123455" />
      </div>
      <Map/>
    </div>
  );
}

export default App;
