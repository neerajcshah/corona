import React from 'react';
import logo from './logo.svg';
import './App.css';
import Papa from "papaparse";
import axios from "axios";
import Grid from '@material-ui/core/Grid';

import Leaflet from "./Map.js";
import DateSlider from "./DateSlider.js";

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      covid_data: ([]),
      date: "1/22/20",
    };
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const parsedUrl = App.pullUrl().then(result => Papa.parse(result, { header: true }));
    parsedUrl.then(result => {
      this.setState({ covid_data: result.data });
    });
  }

  static pullUrl() {
    return axios.get("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
      .then(response => { return response.data })
  }

  handleDateChange(selectedDate) {
    this.setState({ date: selectedDate });
  };

  render() {
    return (
      <div className="App">
        <Grid container justify="center" spacing={3}>
          <Grid item xs={12}>
            <Leaflet
              data={this.state.covid_data}
              date={this.state.date}
            />
          </Grid>
          <Grid item xs={8}>
            {this.state.date}
            <DateSlider
              handleDateChange={this.handleDateChange}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default App;
