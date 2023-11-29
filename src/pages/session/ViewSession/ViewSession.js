import React, { useEffect, useState } from 'react';
import './ViewSession.css'
import Navigation from '../../../components/nav/Navigation';
import SongRequestModal from '../../../components/modals/SongRequestModal';
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css'; // Import the Font Awesome CSS
import { Container, Button, Table, Badge } from 'react-bootstrap';
import { Toaster, toast } from 'react-hot-toast';


const ViewSession = () =>{

  const [thumbsUpClicked, setThumbsUpClicked] = useState(false);
  const [thumbsDownClicked, setThumbsDownClicked] = useState(false);

  const [sessionData,setSessionData] = useState(null);
  const [creatorUserName,setCreatorUserName] = useState(null);
  const [rows,setRows] = useState(null);
  const { id } = useParams();

  const [currentSession, setCurrentSession] = useState('Session A');
  const [songList, setSongList] = useState([
    { id: 3, title: 'Sunshine', artist: 'Alice in Chains' },
    { id: 2, title: 'Hangar 18', artist: 'Megadeth' },
    { id: 1, title: 'Juice', artist: 'Steve Vai' },
    // Add more songs as needed
  ]);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  
  const modalClosed = () => {
    setShowModal(false);

    getSession(id)
  }

  useEffect(() => {
      async function fetchData() {
        await getSession(id);
      }
      fetchData();
  }, []);
  async function getSession(id) {
      const endpoint = process.env.REACT_APP_APP_BASE_URL + 'Sessions/'+id;
      try {
          const response = await axios.get(endpoint);
          showSession(response.data)
      } catch (error) {
          toast.error(error.response ? error.response.data : "Error getting sessions.");
          return null; // or handle the error in a way that makes sense for your application
      }
  }

  const handleThumbsUpClick = () => {
    setThumbsUpClicked(!thumbsUpClicked);
    setThumbsDownClicked(false);
    // Additional logic for thumbs up click
  };

  const handleThumbsDownClick = () => {
    setThumbsDownClicked(!thumbsDownClicked);
    setThumbsUpClicked(false);
    // Additional logic for thumbs down click
  };

  const handleSongRequest = (title, artist) => {
    
    // Here you can add authentication logic to check the username and password
    // For example, send a request to your server to validate the credentials.
    debugger
    var endpoint = process.env.REACT_APP_APP_BASE_URL + 'Sessions/RequestSong'
    axios.post(endpoint, {
      requestTitle: title,
      requestAuthor: artist,
      creatorUserId: localStorage.getItem('userId') ? parseInt(localStorage.getItem('userId'),0) : 0,
      sessionId: sessionData.id
    })
    .then(function (response) {
      getSession(id);
      toast.success("Song Requested Successfully!", {position: "bottom-right"})
    })
    .catch(function (error) {
      toast.error(error.response ? error.response.data : "Error Requesting Song!");
    });
  };

  function showSession(data) {
    setSessionData(data.session);
    setCreatorUserName(data.creatorUserName);

    let requests = data.requests;
    const rowsTemp = [];
    for (let i = 0; i < requests.length; i++) {
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
        rowsTemp.push(<tr key={i}>
          <td className='min-width-100'>
              <div className="two-sided-button">
                <button
                  className={`thumbs-button ${thumbsUpClicked ? 'active' : ''}`}
                  onClick={handleThumbsUpClick}
                >
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <span className="vote-count">{requests[i].upvoteCount}</span>
                </button>

                <button
                  className={`thumbs-button ${thumbsDownClicked ? 'active' : ''}`}
                  onClick={handleThumbsDownClick}
                >
                  <FontAwesomeIcon icon={faThumbsDown} />
                </button>
              </div>
          </td>
          <td>{requests[i].requestTitle}</td>
          <td>{requests[i].requestAuthor}</td>
        </tr>);
    }

    if(rowsTemp.length === 0) {
      rowsTemp.push(<tr><td></td><td>No songs have been requested...yet</td><td></td></tr>)
    }

    debugger;
    setRows(rowsTemp);
  }


  
  if (sessionData === null) {
    // Handle loading state, you can return a loading spinner or any appropriate UI
    return <div>Loading...</div>;
  }
    return (<>
      <div><Toaster/></div>
      <Navigation />
      <div className="session-form space-on-sides-mb">
      
        <div className='d-flex view-session-form space-on-sides-mb'>
          <h2>{creatorUserName}'s Queue</h2>
          <Button variant="primary" onClick={handleOpenModal}>
            Request Song
          </Button>
        </div>
        <Table responsive className="mt-4">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </Table>
      </div>
      
      <SongRequestModal
        show={showModal}
        sessionId={sessionData.id}
        handleClose={handleCloseModal}
        handleRequest={handleSongRequest}
      />
    </>);
  };
export default ViewSession;