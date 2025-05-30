// src/pages/Home.js
import { Container, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {
  const slides = [
    {
      image: '/assets/slides/slide1.jpg',
      caption: 'Welcome to GiftSage',
      text: 'Discover the perfect gift for every occasion'
    },
    {
      image: '/assets/slides/slide2.jpg',
      caption: 'Personalized Suggestions',
      text: 'Get ideas tailored to age, interests, and relationships'
    },
    {
      image: '/assets/slides/slide3.jpg',
      caption: 'Make Every Gift Memorable',
      text: 'Bring a smile with meaningful choices'
    },
    {
      image: '/assets/slides/slide4.jpg',
      caption: 'Creative Wrapping Ideas',
      text: 'Presentation matters too!'
    },
    {
      image: '/assets/slides/slide5.jpg',
      caption: 'Shop with Ease',
      text: 'Get redirected to Amazon in one click'
    }
  ];

  return (
    <div style={{ background: 'linear-gradient(to right, #e1bee7, #d1c4e9)', paddingTop: '2rem', paddingBottom: '2rem' }}>
      <Container>
        <Carousel>
          {slides.map((slide, idx) => (
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={slide.image} alt={`slide-${idx}`} style={{ maxHeight: '500px', objectFit: 'cover' }} />
              <Carousel.Caption className="bg-dark bg-opacity-50 p-3 rounded">
                <h3>{slide.caption}</h3>
                <p>{slide.text}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        <div className="text-center mt-4">
          <Link to="/login" className="btn btn-primary mx-2">Login</Link>
          <Link to="/signup" className="btn btn-outline-primary mx-2">Signup</Link>
        </div>
      </Container>
    </div>
  );
}