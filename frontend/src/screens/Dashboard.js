import React, { useState, useEffect } from 'react'
import { Container, Alert } from 'react-bootstrap';
import AlertBox from '../components/AlertBox'
import StyleTransferCarousel from './StyleTransfer';
import HomeCaraousel from './Home';


function Dashboard() {

    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            setIsAuth(true);
        }
    }, []);

    return (
        <Container>
            <HomeCaraousel />
            {isAuth !== true ? (
                <AlertBox variant='danger' children='login to try' className="w-50" />
            ) : (
                <div>
                    <StyleTransferCarousel />
                </div>
            )}
        </Container>

    )
}

export default Dashboard