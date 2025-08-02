import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const ContactUs = () => {
  const form = useRef();
  const [formState, setFormState] = useState({
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const sendEmail = (e) => {
    e.preventDefault();
    setFormState({ ...formState, loading: true });

    emailjs
      .sendForm(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        form.current,
        { publicKey: contactConfig.YOUR_PUBLIC_KEY }
      )
      .then(
        () => {
          setFormState({
            loading: false,
            alertmessage: "Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.",
            variant: "success",
            show: true,
          });
          form.current.reset();
        },
        (error) => {
          setFormState({
            loading: false,
            alertmessage: "Wystąpił błąd. Prosimy skontaktować się telefonicznie.",
            variant: "danger",
            show: true,
          });
          document.getElementsByClassName("co_alert")[0].scrollIntoView();
        }
      );
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Kontakt</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Kontakt</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formState.variant}
              className={`rounded-0 co_alert ${formState.show ? "d-block" : "d-none"}`}
              onClose={() => setFormState({ ...formState, show: false })}
              dismissible
            >
              <p className="my-0">{formState.alertmessage}</p>
            </Alert>
          </Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Skontaktuj się z nami</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") ? (
                <p>
                  <strong>Telefon:</strong> {contactConfig.YOUR_FONE}
                </p>
              ) : (
                ""
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form ref={form} onSubmit={sendEmail} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control"
                    id="name"
                    name="user_name"
                    placeholder="Imię"
                    type="text"
                    required
                  />
                </Col>
                <Col lg="6" className="form-group">
                  <input
                    className="form-control rounded-0"
                    id="email"
                    name="user_email"
                    placeholder="Email"
                    type="email"
                    required
                  />
                </Col>
              </Row>
              <textarea
                className="form-control rounded-0"
                id="message"
                name="message"
                placeholder="Wiadomość"
                rows="5"
                required
              ></textarea>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit">
                    {formState.loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
      <div className={formState.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};