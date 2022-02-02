import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import axios from 'axios';

const Review = (props) => {
  const {
    idDrink: id,
    strDrink: name,
    strDrinkThumb: thumbnail,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: directions,
  } = props.aDrink;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [review, setReview] = useState('');

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };
  const submitReview = (review) => {
    alert('Thank You For Your Feedback!');
  };

  return (
    <div className='card-background'>
      <div className='card-button'>
        <Button type='button' className='btn btn-dark' onClick={handleShow}>
          Submit A Review
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className='align-items-center'>
              <InputGroup className='mb-2'>
                <InputGroup.Text>Review</InputGroup.Text>
                <textarea
                  rows='6'
                  cols='50'
                  placeholder='Describe Your Experience'
                  value={review}
                  onChange={handleReviewChange}
                ></textarea>
              </InputGroup>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type='button' className='btn btn-dark' onClick={handleClose}>
            Close
          </Button>
          <Button
            type='button'
            className='btn btn-dark'
            onClick={(review) => {
              submitReview(review);
              handleClose();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Review;
