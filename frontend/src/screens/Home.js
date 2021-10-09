import React, { useState, useEffect } from 'react'
import { Carousel } from 'react-bootstrap';

function HomeCaraousel() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} interval={2000} className="w-50">
            <Carousel.Item>
                <img
                    className="d-block"
                    src="home/styled1.png"
                    alt="Styled image 1"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block"
                    src="home/styled2.png"
                    alt="Styled image 2"
                />

                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block"
                    src="home/styled3.png"
                    alt="Styled image 3"
                />

                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default HomeCaraousel;