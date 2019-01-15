import ReactDOM from 'react-dom';
import React from 'react';
import App from 'client/App';

window.onload = () => {
  ReactDOM.render(<App />, document.getElementById('appRoot'));
}
