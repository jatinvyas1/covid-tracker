import { MenuItem,Select,FormControl, Card, CardContent } from '@material-ui/core';
import './App.css';
import {useState,useEffect} from 'react';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from "./Table";
import LineGraph from './LineGraph';
function App() {

  const [countries,setCountries] = useState([]);
  const [country,setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  const onCountryChange  = async (event)=>{
  const countryCode = event.target.value;
  const url = countryCode === "worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
  await fetch(url)
      .then(result=>result.json())
      .then(data =>{
        setCountryInfo(data);
        setCountry(countryCode);
      })
    }
  useEffect(()=>{
    const fetchinitialData = async ()=>{
      await fetch("https://disease.sh/v3/covid-19/all")
      .then(result=>result.json())
      .then(data=>{
        setCountryInfo(data);
      })
    }
    fetchinitialData();
  },[])
  useEffect(() => {
    const fetchCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then(result =>result.json())
      .then(data =>{
        const countries = data.map((country)=>({
            value:country.countryInfo.iso2,
            name:country.country
        }));
        // Sorted according to active cases
        setTableData(data.sort((a,b) => {return (a.cases<b.cases?1:-1)}));
        setCountries(countries); 
      })
    }
    fetchCountriesData();
  }, []) //To be used only once

  return (
    <div className="app">
      <div className="app__left">
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
            <InfoBox title="Covid Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
            <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
            <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <Map/>
      </div>
      <Card className="app__right">
        <CardContent>
        <h1>Live cases by country</h1>
        <Table countries={tableData}/>
        <br/>
        <h2>Daily Worldwide Cases</h2>
        <br/>
        <LineGraph casesType="cases"/>
        </CardContent>
      </Card>

      
      
    </div>
  );
}

export default App;
