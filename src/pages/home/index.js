import React, { useEffect, useState } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  const carouselImages = [
    process.env.PUBLIC_URL + "/assets/images/koparka.jpg",
    process.env.PUBLIC_URL + "/assets/images/row.jpg",
    process.env.PUBLIC_URL + "/assets/images/1.jpg",
    process.env.PUBLIC_URL + "/assets/images/2.jpg",
    process.env.PUBLIC_URL + "/assets/images/3.jpg",
    process.env.PUBLIC_URL + "/assets/images/4.jpg",
    process.env.PUBLIC_URL + "/assets/images/5.jpg",
    process.env.PUBLIC_URL + "/assets/images/6.jpg",
    process.env.PUBLIC_URL + "/assets/images/7.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000); // change every 4s
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          {/* Text first on both mobile and desktop */}
          <div className="text order-1 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                        introdata.animated.fourth,
                        introdata.animated.fifth,
                        introdata.animated.sixth,
                        introdata.animated.seventh,
                        introdata.animated.eighth,
                        introdata.animated.ninth,
                      ],
                      delay: 50,
                      cursor: "",
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      Nasze Realizacje
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Kontakt
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel second on both mobile and desktop */}
          <div className="carousel-container order-2 order-lg-2 h-100">
            {carouselImages.map((img, i) => (
              <div
                key={i}
                className={`carousel-slide ${
                  i === currentIndex ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            ))}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
