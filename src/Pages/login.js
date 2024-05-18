import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export default function Login() {
  const formInitialDetails = {
    email: "",
    password: "",
  };

  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Log In");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setButtonText("Logging In...");
    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setButtonText("Log In");

      if (response.ok) {
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: "Login successful" });
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", result.token);

        // Redirect to the home page
        window.location.href = "/";
      } else {
        setStatus({
          success: false,
          message:
            result.message || "Something went wrong, please try again later.",
        });
      }
    } catch (error) {
      setButtonText("Log In");
      setStatus({
        success: false,
        message: "Network error, please try again later.",
      });
    }
  };

  return (
    <section className="contact" id="contact" style={{ paddingTop: "200px" }}>
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <img
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                  src={contactImg}
                  alt="Contact Us"
                />
              )}
            </TrackVisibility>
          </Col>
          <Col size={12} md={6}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <h2>Log In</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col xs={12} className="px-1 mb-2">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) =>
                            onFormUpdate("email", e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} className="px-1 mb-2">
                        <input
                          type="password"
                          value={formDetails.password}
                          placeholder="Password"
                          onChange={(e) =>
                            onFormUpdate("password", e.target.value)
                          }
                        />
                      </Col>
                      <Col xs={12} className="px-1">
                        <button type="submit">{buttonText}</button>
                      </Col>
                    </Row>
                  </form>
                  {status.message && (
                    <p
                      className={
                        status.success ? "text-success" : "text-danger"
                      }
                    >
                      {status.message}
                    </p>
                  )}
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
