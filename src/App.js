import React, { useState, useEffect } from "react";
import "./App.scss";

// const fetcher = (url) => fetch(url).then((res) => res.json());

const locationsPath =
  "https://gw.selinatech.com/locations/api/locations?includeUpcomingLocations=true&content=false";
const eventsPath = "https://gw.selinatech.com/events/events/aggregated/";

function App() {
  const [eventsList, setEventsList] = useState([]);
  const [id, setId] = useState(null);

  const [locationData, setLocationData] = useState(null);

  console.log(eventsList);
  // array of { location id: "", events: [ location ] }
  // const { data, error } = useSWR(locationsPath, fetcher);

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

  useEffect(() => {
    fetch(locationsPath)
      .then((response) => response.json())
      .then((data) => setLocationData(data));
  }, []);

  useEffect(() => {
    fetch(`${eventsPath}${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("eff ", eventsList);
        setEventsList({ [id]: data });
      });
  }, [id]);

  // on each request add new ul
  return (
    <div className="App">
      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__listlogo">
            <svg viewBox="0 0 640 512" width="100" title="infinity">
              <path d="M471.1 96C405 96 353.3 137.3 320 174.6 286.7 137.3 235 96 168.9 96 75.8 96 0 167.8 0 256s75.8 160 168.9 160c66.1 0 117.8-41.3 151.1-78.6 33.3 37.3 85 78.6 151.1 78.6 93.1 0 168.9-71.8 168.9-160S564.2 96 471.1 96zM168.9 320c-40.2 0-72.9-28.7-72.9-64s32.7-64 72.9-64c38.2 0 73.4 36.1 94 64-20.4 27.6-55.9 64-94 64zm302.2 0c-38.2 0-73.4-36.1-94-64 20.4-27.6 55.9-64 94-64 40.2 0 72.9 28.7 72.9 64s-32.7 64-72.9 64z" />
            </svg>
          </li>
          <li className="nav__listitem">
            Countries
            <ul className="nav__listitemdrop">
              {locationData &&
                locationData.map((item) => (
                  <li
                    key={item.id}
                    onClick={() => {
                      setId(item.id);
                    }}
                  >
                    {item.country.name}
                  </li>
                ))}
            </ul>
            {id && eventsList && eventsList[id] && (
              <ul class="nav__listitemevent">
                {eventsList[id].map((event) => (
                  <li key={event.id}>{event.name}</li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      <main className="main">
        <p>asd</p>
        {/* <img src="https://s3.amazonaws.com/ts-prod-assets.tripleseat.com/assets/028/729/838/Web_and_App-Selina_Milfontes_12-2021_Wellness__camilabugni_Camila_Bugni_11.jpg" /> */}
      </main>
      <footer className="footer">
        {JSON.stringify(eventsList)}
      </footer>
    </div>
  );
}

export default App;
