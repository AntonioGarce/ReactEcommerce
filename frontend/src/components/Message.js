import React from 'react';
import Alert from 'react-bootstrap/Alert';

function Message({text}) {
    return (
      <Alert variant="danger">
        <Alert.Heading>{text}</Alert.Heading>
        <p>
          {text}
        </p>
      </Alert>
    );
}

export default Message