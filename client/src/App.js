import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API'

const App = () => {
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3
  });

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/lukelin1991/ckc14ljw8140q1iqojbvfjdss"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewPortChange={setViewport}
    >
      {
        logEntries.map(entry => (
          <React.Fragment key={entry._id} >
            <Marker 
              latitude={entry.latitude} 
              longitude={entry.longitude} 
            >
              <div
                onClick={() => setShowPopup({
                  [entry._id]: true,
                })}
              
              >
                <img
                  className="marker"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  src="https://i.imgur.com/y0G5YTX.png"
                  alt="marker"
                />
            </Marker>
            {
              showPopup[entry._id] ? (
                <Popup
                  latitude={entry.latitude}
                  longitude={entry.longitude}
                  closeButton={true}
                  closeOnClick={false}
                  dynamicPosition={true}
                  onClose={() => setShowPopup({})}
                  anchor="top"
                >
                  <div className="popup">
                    <h3>{entry.title}</h3>
                    <p>{entry.comments}</p>
                    <small>Visited on: {new Date(entry.visitDate).toLocaleDateString()}</small>
                    {entry.image && <img src={entry.image} alt={entry.title} />}
                  </div>
                </Popup>
              ) : null
            }
          </React.Fragment>
        ))
      }
    </ReactMapGL>
  
  )
};

export default App;