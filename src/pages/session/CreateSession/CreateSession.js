import React, { useState } from 'react';
import './CreateSession.css'
import Navigation from '../../../components/nav/Navigation';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';

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
    const navigate = useNavigate();


    function goToSession(id) {
      navigate("/session/" + id);
    }
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
      let userId = localStorage.getItem('userId');

      if(userId == null) {
        toast.error("You must create an account to start a session!",{position: 'bottom-right'});
        return;
      }

      axios.post(endpoint, {
        name: formData.name,
        shortCode: formData.shortCode,
        isPublic: formData.isPublic,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipcode: formData.zipcode,
        description: formData.description,
        creatorUserId: userId
      })
      .then(function (response) {
        toast.success('Session saved successfully!', {
          duration: 4000,
          position: 'bottom-right',
        
          // Styling
          style: {background: 'rgb(54, 163, 247)'},
          className: '',
        
          // Custom Icon
          icon: '👏',
        
          // Change colors of success/error/loading icon
          iconTheme: {
            primary: '#000',
            secondary: '#fff',
          },
        
          // Aria
          ariaProps: {
            role: 'status',
            'aria-live': 'polite',
          },
        });
        setTimeout(() => {
          if(response.data.id != null) {
            goToSession(response.data.id)
          }
        }, 2000)
      })
      .catch(function (error) {
        toast.error(error.response ? error.response.data : "Error Creating Session!");
      });
    };
  
    return (<>
      <div><Toaster/></div>
      <Navigation />
      <div className="session-form space-on-sides-mb">
        <h2>Start a Session</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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
          <button type="submit">Create</button>
        </form>
      </div>
    </>);
  };
export default CreateSession;