import React, { Component, useState } from 'react';
import axios from 'axios';
import { Image } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

function ImageUploadv2() {
    const [content, setContent] = useState('')
    const [image, setImage] = useState('kwality.jpg')
    let history = useHistory();

    const handleImageChange = (e) => {
        setContent(e.target.files[0])
        setImage(URL.createObjectURL(e.target.files[0]))
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        /*
            var formData = new FormData()
            formData.append('image', content)
            try {
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                console.log(formData)
                const { data } = await axios.post('/style_transfer/stylev2/', formData, config)
                setImage("data:image/png;base64," + data.image)
            } catch (error) {
                console.log(error)
            }*/


        history.push({
            pathname: '/style_transfer',
            state: { content: content }
        });

    };

    return (
        <div className="App">
            <Image src={image} />
            <form onSubmit={handleSubmit}>
                <input type="file"
                    id="image"
                    accept="image/png, image/jpeg" onChange={handleImageChange} required />
                <input type="submit" />
            </form>
        </div>
    );

}
export default ImageUploadv2;
