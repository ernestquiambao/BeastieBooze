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

  const [userReview, setUserReview] = useState('');

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const submitReview = (userReview) => {
    const { getReviews } = props;
    const userAndReview = { text: userReview };
    return axios
      .post('/')
      .then(() => {
        alert('Thank You For Your Feedback!');
        // getReviews();
      })
      .catch((err) => {
        console.error(err);
      });
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
                  value={userReview}
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
            onClick={(userReview) => {
              submitReview(userReview);
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
