import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../../components/nav/Navigation';
import { useNavigate } from "react-router-dom";
import './Account.css';
import { Toaster, toast } from 'react-hot-toast';

function Account() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchData() {
        
            const userId = localStorage.getItem('userId');
            if (userId) {
                const user = await getUserConfiguration(userId);
                if (user) {
                    setUser(user);
                }
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    async function getUserConfiguration(id) {
        
        const endpoint = process.env.REACT_APP_APP_BASE_URL + 'Users/' + id;
        try {
            const response = await axios.get(endpoint);
            const userData = response.data;
            return {
                userName: userData.userName,
                firstName: userData.firstName,
                lastName: userData.lastName,
                fullName: userData.fullName,
                userId: userData.userId,
                password: userData.password,
            };
        } catch (error) {
            toast.error("Error retrieving user information. " + error.response.data);
            return null; // or handle the error in a way that makes sense for your application
        }
    }

    const handleSave = (user) => {
        
        const endpoint = process.env.REACT_APP_APP_BASE_URL + 'Users/' + user.userId;
        try {
            axios.put(endpoint, {
                "userId": user.userId,
                "userName": user.userName,
                "firstName": user.firstName,
                "lastName": user.lastName,
                "fullName": user.fullName,
                "password": user.password
            })
            .then(function (response) {

            })
            .catch(function (error) {
                console.log(error.response.data)
            });
        } catch (error) {
            toast.error("Error retrieving user information. " + error.response.data);
            return null; // or handle the error in a way that makes sense for your application
        }
    }

    const handleExit = () => {
        navigate("/home");
    }

    if (user === null) {
        // Handle loading state, you can return a loading spinner or any appropriate UI
        return <div>Loading...</div>;
    }

    return (<>
        <div><Toaster/></div>
        <Navigation />
        <div className="user-form-container">
          <h2>User Information</h2>
          <form className="user-form">
              <div className="form-group">
              <label className='acct-label'>Username:</label>
              <input
                  type="text"
                  name="userName"
                  className='acct-input'
                  value={user.userName}
                  onChange={handleInputChange}
              />
              </div>
              <div className="form-group">
              <label className='acct-label'>First Name:</label>
              <input
                  type="text"
                  name="firstName"
                  className='acct-input'
                  value={user.firstName}
                  onChange={handleInputChange}
              />
              </div>
              <div className="form-group">
              <label className='acct-label'>Last Name:</label>
              <input
                  type="text"
                  name="lastName"
                  className='acct-input'
                  value={user.lastName}
                  onChange={handleInputChange}
              />
              </div>
              <div className="form-group">
              <label className='acct-label'>User ID:</label>
              <input type="text" className='acct-input' name="userId" value={user.userId} readOnly />
              </div>
              <div className="form-group">
              <label className='acct-label'>Full Name:</label>
              <input type="text" className='acct-input' name="fullName" value={user.fullName} readOnly />
              </div>


              <div className="form-group">
              <button type="button" className="save-button" onClick={() => handleSave(user)}>
                  Save
              </button>
              <button type="button" className="exit-button" onClick={handleExit}>
                  Exit
              </button>
              </div>
          </form>
        </div>
        </>
      );
}

export default Account;