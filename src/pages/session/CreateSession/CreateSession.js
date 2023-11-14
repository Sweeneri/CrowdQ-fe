import React, { Component, useState } from 'react';
import './CreateSession.css'
import Navigation from '../../../components/nav/Navigation';
import axios from 'axios';

const CreateSession = () =>{
    const [formData, setFormData] = useState({
      name: '',
      shortCode: '',
      isPublic: false,
      address: '',
      city: '',
      state: '',
      zipcode: '',
      description: ''
    });
  
    const handleChange = (e) => {
      const { name, value, type, checked } = e.target;
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform action with formData, e.g., send it to an API endpoint
      console.log(formData);
      var endpoint = process.env.REACT_APP_APP_BASE_URL + 'Sessions';
      debugger;
      axios.post(endpoint, {
        name: formData.name,
        shortCode: formData.shortCode,
        isPublic: formData.isPublic,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        description: formData.description,
      })
      .then(function (response) {

      })
      .catch(function (error) {
        alert(error.response ? error.response.data : "Error Creating Session!");
      });
    };
  
    return (<>
      <Navigation />
      <div className="session-form">
        <h2>Create a Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Short Code:
            <input type="text" name="shortCode" value={formData.shortCode} onChange={handleChange} required />
          </label>
          <br />
          <label>
            Public:
            <input type="checkbox" name="isPublic" checked={formData.isPublic} onChange={handleChange} />
          </label>
          <br />
          <label>
            Address:
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
          </label>
          <br />
          <label>
            City:
            <input type="text" name="city" value={formData.city} onChange={handleChange} />
          </label>
          <br />
          <label>
            State:
            <input type="text" name="state" value={formData.state} onChange={handleChange} />
          </label>
          <br />
          <label>
            Zipcode:
            <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
          </label>
          <br />
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
          </label>
          <br />
          <button type="submit">Create Session</button>
        </form>
      </div>
    </>);
  };
export default CreateSession;