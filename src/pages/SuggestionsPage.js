// src/pages/SuggestionsPage.js
import { useLocation } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function SuggestionsPage() {
  const location = useLocation();
  const suggestions = location.state?.suggestions || [];

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center text-primary">Gift Suggestions</h2>
      <Row>
        {suggestions.map((item, idx) => (
          <Col md={6} lg={4} key={idx} className="mb-4">
            <Card className="shadow h-100">
              <Card.Img variant="top" src={item.image || '/assets/default-product.jpg'} style={{ height: '200px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-transparent border-top-0">
                <Button
                  variant="outline-primary"
                  href={item.amazonLink || 'https://www.amazon.com'}
                  target="_blank"
                  className="w-100"
                >
                  Buy on Amazon
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
