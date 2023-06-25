import React, { useEffect, useRef, useState } from "react";
import { fromLonLat } from "ol/proj";
import Map from "ol/Map";
import View from "ol/View";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { Vector as VectorSource } from "ol/source";
import { Vector as VectorLayer } from "ol/layer";
import Style from "ol/style/Style";
import Icon from "ol/style/Icon";
import "ol/ol.css";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import "./EventsMap.css";
import WorldviewChart from "./WorldviewChart";
import "./WorldviewChart.css"

const EventsMap = () => {
  const [events, setEvents] = useState([]);
  const mapElement = useRef();
  const mapRef = useRef();

  useEffect(() => {
    fetch("https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=10")
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    const map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 0,
      }),
    });

    mapRef.current = map;
  }, []);

  useEffect(() => {
    const features = events
      .filter(
        (event) =>
          event.geometries &&
          event.geometries[0] &&
          event.geometries[0].coordinates
      )
      .map((event) => {
        const feature = new Feature({
          geometry: new Point(
            fromLonLat([
              event.geometries[0].coordinates[1],
              event.geometries[0].coordinates[0],
            ])
          ),
        });
        feature.setStyle(
          new Style({
            image: new Icon({
              src: "https://openlayers.org/en/latest/examples/data/icon.png",
            }),
          })
        );
        return feature;
      });
    const vectorSource = new VectorSource({
      features,
    });
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    mapRef.current.addLayer(vectorLayer);
  }, [events]);

  return (
    <div className="events">
      <h1>EONET Natural Events</h1>
      <br />
      <table className="event-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Date</th>
            <th>Informations</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event.id}>
              <td>{event.id}</td>
              <td>{event.title}</td>
              <td>{event.categories[0].title}</td>
              <td>{event.closed ? "Closed" : "Open"}</td>
              <td>{event.geometry[0].date}</td>
              <td>
                <a href={"https://worldview.earthdata.nasa.gov/?v=-74.49772148027829,-68.24663443553358,-24.569690815301943,-42.65851871973321&l=Reference_Features_15m,Reference_Labels_15m,Coastlines_15m(hidden),MODIS_Aqua_Sea_Ice(hidden),MODIS_Terra_Sea_Ice(hidden),VIIRS_SNPP_Brightness_Temp_BandI5_Night(hidden),VIIRS_NOAA20_Brightness_Temp_BandI5_Night(hidden),VIIRS_NOAA20_Brightness_Temp_BandI5_Day(hidden),MODIS_Aqua_Brightness_Temp_Band31_Night(hidden),MODIS_Terra_Brightness_Temp_Band31_Night(hidden),VIIRS_SNPP_DayNightBand_ENCC(hidden),VIIRS_SNPP_DayNightBand_At_Sensor_Radiance(hidden),VIIRS_SNPP_DayNightBand_AtSensor_M15(hidden),MODIS_Aqua_Brightness_Temp_Band31_Day(hidden),VIIRS_SNPP_Brightness_Temp_BandI5_Day(hidden),MODIS_Terra_Brightness_Temp_Band31_Day(hidden),VIIRS_NOAA20_CorrectedReflectance_TrueColor(hidden),BlueMarble_NextGeneration(hidden),VIIRS_SNPP_CorrectedReflectance_TrueColor(hidden),MODIS_Aqua_CorrectedReflectance_TrueColor(hidden),MODIS_Terra_CorrectedReflectance_TrueColor&lg=false&cm=spy&s=-53.0735,-10.7699&t=2023-05-12-T00%3A00%3A00Z"} target="_blank" rel="noreferrer">
                  More Info
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <WorldviewChart />
    </div>
  );
          }

export default EventsMap;
