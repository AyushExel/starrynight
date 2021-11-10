import React from "react";
import { Carousel } from "react-bootstrap";

function HomeCaraousel() {
  var examples = [
    "home/styled2.jpg",
    "home/styled1.jpg",
    "home/styled3.jpg",
    "home/styled4.jpg",
  ];
  return (
    <div className="w-50 mx-auto p-5" style={{ width: "40em", height: "35em" }}>
      <Carousel interval={2000}>
        {examples.map(function (path) {
          console.log(path);
          return (
            <Carousel.Item>
              <img className="d-block" src={path} alt="" />
              <Carousel.Caption></Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
}

export default HomeCaraousel;
