import React from 'react';
import { RoutesQ } from './Routes';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster, toast } from 'react-hot-toast';

function App() {
  axios.defaults.headers.common['accept'] = 'text/plain' // for all requests
  axios.defaults.headers.common['Content-Type'] = 'application/json' // for all requests
  axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:3000' // for all requests

  return (
    <RoutesQ />
  );
}

export default App;
