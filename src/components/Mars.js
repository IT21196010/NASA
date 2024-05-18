import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

const Mars = () => {
  const [roverPhotos, setRoverPhotos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedCamera, setSelectedCamera] = useState(""); // State to store selected camera

  useEffect(() => {
    const fetchRoverPhotos = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as YYYY-MM-DD
        const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${formattedDate}&api_key=4rrEAFieTzq8smHv0LjiqrWPSD8eLNPq6UBsRQfg${selectedCamera ? `&camera=${selectedCamera}` : ""}`;
        const response = await fetch(url);
        const data = await response.json();
        setRoverPhotos(data.photos);
      } catch (error) {
        console.error('Error fetching Curiosity Rover photos:', error);
      }
    };

    fetchRoverPhotos();
  }, [selectedDate, selectedCamera]);

  return (
    <section className="project" id="projects">
      <Container>
        <Row>
          <Col size={12}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                  <h2>Explore The Mars Rovers</h2>
                  <div className="form-group-wrapper">
                    <div className="form-group">
                      <Form.Label>Select Date:</Form.Label>
                      <br />
                      <DatePicker selected={selectedDate} onChange={date => setSelectedDate(date)} />
                    </div>
                    <div className="form-group">
                      <Form.Label>Select Camera:</Form.Label>
                      <Form.Control as="select" onChange={(e) => setSelectedCamera(e.target.value)}>
                        <option value="">All Cameras</option>
                        <option value="FHAZ">Front Hazard Avoidance Camera</option>
                        <option value="RHAZ">Rear Hazard Avoidance Camera</option>
                        <option value="MAST">Mast Camera</option>
                        <option value="CHEMCAM">Chemistry and Camera Complex</option>
                        {/* Add more cameras as needed */}
                      </Form.Control>
                    </div>
                  </div>
                  <div className="rover-photos">
                    <Row>
                      {roverPhotos.map((photo, index) => (
                        <Col key={index} sm={6} md={4} lg={3}>
                          <Card className="rover-photo">
                            <Card.Img variant="top" src={photo.img_src} style={{ maxWidth: '100%', height: 'auto' }} />
                            <Card.Body>
                              <Card.Title>{photo.camera.full_name}</Card.Title>
                              <Card.Text>{photo.earth_date}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Mars;
