import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { Toaster } from 'react-hot-toast';

const SongRequestModal = ({ show, sessionId, handleClose, handleRequest }) => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');

  const handleSubmit = () => {
    // You can perform any validation or additional logic here
    // For simplicity, just calling the handleRequest function with title and artist
    handleRequest(title, artist);
    handleClose(); // Close the modal after handling the request
  };
  

  return (<>
    <Toaster></Toaster>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Request Song</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Song Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter song title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formArtist">
            <Form.Label>Artist</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Request
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  );
};
export default SongRequestModal;