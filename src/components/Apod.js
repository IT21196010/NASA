import React, { useState, useEffect } from 'react';
import colorSharp from "../assets/img/color-sharp.png";
const apiKey = 'pP00nwXPb5DmVHpLGxOqjL85f4z9sgQdaY8uO099'; 

export default function Picture ()  {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    const fetchApodData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=pP00nwXPb5DmVHpLGxOqjL85f4z9sgQdaY8uO099`);
        const data = await response.json();
        setApodData(data);
      } catch (error) {
        console.error('Error fetching APOD data:', error);
      }
    };

    fetchApodData();
  }, []);

  return (
    <section className="apod" id="apod">
      <div className="container">
        <div className="apod-bx wow zoomIn">
          <h2>Picture Of The Day</h2>
          {apodData && (
            <>
              <img src={apodData.url} alt="Astronomy Picture of the Day" style={{ maxWidth: '80%', height: '10' }}  />
              <p><strong>Date:</strong> {apodData.date}</p>
              <p><strong>Description:</strong> {apodData.explanation}</p>
            </>
          )}
        </div>

        <div className='main_image_picture'>
          {/* Additional content */}
        </div>
      </div>
      <img className="background-image-left" src={colorSharp} alt="Image" />
    </section>
  );
};
