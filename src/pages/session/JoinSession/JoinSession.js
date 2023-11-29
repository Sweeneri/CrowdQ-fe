import React, { useEffect, useState } from 'react';
import './JoinSession.css'
import Navigation from '../../../components/nav/Navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';

const JoinSession = () =>{

  const [rows,setRows] = useState(null);

  useEffect(() => {
      async function fetchData() {
        await getPublicSessions();
      }
      fetchData();
  }, []);
  async function getPublicSessions() {
      const endpoint = process.env.REACT_APP_APP_BASE_URL + 'Sessions/GetPublicSessions';
      try {
          const response = await axios.get(endpoint);
          
          showSessions(response.data)
      } catch (error) {
        toast.error(error.response ? error.response.data : "Error getting sessions.");
          return null; // or handle the error in a way that makes sense for your application
      }
  }

  function showSessions(data) {
    const rowsTemp = [];
    for (let i = 0; i < data.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rowsTemp.push(<tr key={i}>
          <td><a type='button' className='join-btn' href={data[i].id}>Join</a></td>
          <td>{data[i].name}</td>
          <td>{data[i].address}</td>
          <td>{data[i].description}</td>
        </tr>);
    }

    setRows(rowsTemp);
  }
  
  if (rows === null) {
    // Handle loading state, you can return a loading spinner or any appropriate UI
    return <div>Loading...</div>;
  }
    return (<>
      <div><Toaster/></div>
      <Navigation />
      <div className="session-form space-on-sides-mb">
        <h2>Join a Session</h2>
        <table className='session-table'>
          <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Description</th>
                </tr>
          </thead>
          <tbody>
                {rows}
          </tbody>
        </table>
      </div>
    </>);
  };
export default JoinSession;