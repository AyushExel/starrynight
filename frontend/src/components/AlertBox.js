import React from 'react'
import { Alert } from 'react-bootstrap'

function AlertBox({ variant, children }) {
    return (
        <Alert variant={variant}>
            {children}
        </Alert>
    )
}

export default AlertBox