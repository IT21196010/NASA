import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export default function Register() {
  const formInitialDetails = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [formDetails, setFormDetails] = useState(formInitialDetails);
  const [buttonText, setButtonText] = useState("Sign Up");
  const [status, setStatus] = useState({});

  const onFormUpdate = (category, value) => {
    setFormDetails({
      ...formDetails,
      [category]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formDetails.password !== formDetails.confirmPassword) {
      setStatus({ success: false, message: "Passwords do not match" });
      return;
    }

    setButtonText("Signing Up...");
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(formDetails),
      });

      const result = await response.json();
      setButtonText("Sign Up");

      if (response.ok) {
        setFormDetails(formInitialDetails);
        setStatus({ success: true, message: "Registration successful" });
      } else {
        setStatus({
          success: false,
          message:
            result.message || "Something went wrong, please try again later.",
        });
      }
    } catch (error) {
      setButtonText("Sign Up");
      setStatus({
        success: false,
        message: "Network error, please try again later.",
      });
    }
  };

  return (
    <section className="contact" id="contact">
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
                  <h2>Sign Up</h2>
                  <form onSubmit={handleSubmit}>
                    <Row>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.firstName}
                          placeholder="First Name"
                          onChange={(e) =>
                            onFormUpdate("firstName", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="text"
                          value={formDetails.lastName}
                          placeholder="Last Name"
                          onChange={(e) =>
                            onFormUpdate("lastName", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="email"
                          value={formDetails.email}
                          placeholder="Email Address"
                          onChange={(e) =>
                            onFormUpdate("email", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="password"
                          value={formDetails.password}
                          placeholder="Password"
                          onChange={(e) =>
                            onFormUpdate("password", e.target.value)
                          }
                        />
                      </Col>
                      <Col size={12} sm={6} className="px-1">
                        <input
                          type="password"
                          value={formDetails.confirmPassword}
                          placeholder="Confirm Password"
                          onChange={(e) =>
                            onFormUpdate("confirmPassword", e.target.value)
                          }
                        />
                      </Col>
                      {/* status message */}
                      <Col size={12} className="px-1">
                        {status.message && (
                          <Col size={12} className="px-1 mt-2">
                            <p
                              className={
                                status.success
                                  ? "success bg-light px-2"
                                  : "danger bg-light px-2"
                              }
                            >
                              {status.message}
                            </p>
                          </Col>
                        )}
                        
                      </Col>

                      <button type="submit">Submit</button>
                    </Row>
                  </form>
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
