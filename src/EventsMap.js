import React, { useEffect, useRef, useState } from 'react';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import './EventsMap.css';


const EventsMap = () => {

  const [events, setEvents] = useState([]);
  const mapElement = useRef();
  const mapRef = useRef();

  useEffect(() => {
    fetch('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20')
      .then(response => response.json())
      .then(data => setEvents(data.events))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: fromLonLat([0, 0]),
        zoom: 0
      })
    });
  
    mapRef.current = map;
  }, []);


    useEffect(() => {
      const features = events
        .filter(event => event.geometries && event.geometries[0] && event.geometries[0].coordinates)
        .map(event => {
          const feature = new Feature({
            geometry: new Point(fromLonLat([event.geometries[0].coordinates[1], event.geometries[0].coordinates[0]]))
          });
          feature.setStyle(new Style({
            image: new Icon({
              src: 'https://openlayers.org/en/latest/examples/data/icon.png'
            })
          }));
          return feature;
        });
      const vectorSource = new VectorSource({
        features
      });
      const vectorLayer = new VectorLayer({
        source: vectorSource
      });
      mapRef.current.addLayer(vectorLayer);
    }, [events]);
  

  return (
    <div className='events'>
      <h1>Natural events from EONET</h1>
      <br />
      <dl>
        {events.map(event => (
          <>
            <dt key={event.id}>{event.id}: {event.title}</dt>
            {event.description && <dd><em>{event.description}</em></dd>}
    {event.link && <dd><a href={event.link} target="_blank" rel="noreferrer" className='info'>More info</a></dd>}
          </>
        ))}
      </dl>
    </div>
  );
}

export default EventsMap;
