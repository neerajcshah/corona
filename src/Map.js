import React from "react";
import { withStyles } from '@material-ui/core/styles';

import { Map, CircleMarker, TileLayer } from 'react-leaflet';

export default class Leaflet extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const position = [36.7, -119.4];
    const zoom = 5;
    return (
      <Map center={position} zoom={zoom}>
        <TileLayer
          url={"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution={'&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'}
        />
        {this.props.data.map((row, i) => {

          if (row[this.props.date] <= 0) {
            // No cases on this date
            return;
          }
          if (row["Lat"] != null && row["Long"] != null) {
            return (
              <CircleMarker
                key={i}
                center={[row["Lat"], row["Long"]]}
                radius={Math.sqrt(row[this.props.date])}
                fillOpacity={0.5}
                fillColor={"red"}
                stroke={false}
              />)
          }
        }
        )}
      </Map>)
  }
}
