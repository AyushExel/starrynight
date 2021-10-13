import { Carousel } from "react-responsive-carousel";
import { Container } from "react-bootstrap";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import React, { useState, useEffect } from "react";
import AlertBox from "../components/AlertBox";
import Loader from "../components/Loader";

function StyleTransferCarousel() {
  const [isAuth, setIsAuth] = useState(false);
  const [styledImages, setStyledImages] = useState([]);
  const [models, setModels] = useState([]);
  const [content, setContent] = useState([]);
  const [contentBase64, setContentBase64] = useState("stary.jpg");
  const [loader, setLoader] = useState(false);
  const [styled, setStyled] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setIsAuth(true);
    }
  }, []);

  const handleImageChange = (e) => {
    setContent(e.target.files[0]);
    setContentBase64(URL.createObjectURL(e.target.files[0]));
  };

  // Get available feed forward models
  async function getModels() {
    try {
      const response = await axios.get("style_transfer/models/");
      var models_list = [];
      for (const [key, value] of Object.entries(response.data)) {
        models_list = models_list.concat(value);
      }
      setModels(models_list);
    } catch (error) {
      console.error(error);
    }
  }
  const getStyledImage = async (model) => {
    var formData = new FormData();
    formData.append("image", content);
    formData.append("style", model);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post(
        "/style_transfer/stylev2/",
        formData,
        config
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  async function getStyledImages() {
    var styledImageDict = [];
    var data = getStyledImage(models);
    data.then((data) => {
      for (const model in data) {
        styledImageDict = styledImageDict.concat({
          image: "data:image/png;base64," + data[model],
          model: model,
        });
      }
      console.log(data);
      setLoader(false);
      setStyledImages(styledImageDict);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    getModels();
  };

  useEffect(() => {
    if (models.length !== 0 && !styled) {
      setStyled(true);
      getStyledImages();
      setLoader(true);
    }
  }, [models]);

  function LoaderIfNotStyled() {
    if (loader == true) {
      return <Loader />;
    } else return <div></div>;
  }
  const style = {
    width: "50em",
    height: "50em",
  };

  return (
    <Container>
      {isAuth !== true ? (
        <AlertBox variant="danger" children="login to continue" />
      ) : (
        <div className="mx-auto p-5" style={style}>
          <LoaderIfNotStyled />
          {!styled ? (
            <div>
              <img
                src={contentBase64}
                style={{ width: "40em", height: "35em" }}
                alt=""
              />
              <form onSubmit={handleSubmit}>
                <input
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={handleImageChange}
                  required
                />
                <input type="submit" />
              </form>
            </div>
          ) : (
            <Carousel thumbWidth={100} className="mx-auto">
              {styledImages.map(function (styledImageDict) {
                return (
                  <div>
                    <img src={styledImageDict.image} alt="" />
                    <p className="legend">{styledImageDict.model}</p>
                  </div>
                );
              })}
            </Carousel>
          )}
        </div>
      )}
    </Container>
  );
}

export default StyleTransferCarousel;
