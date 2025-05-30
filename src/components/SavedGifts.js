// src/components/SavedGifts.js
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function SavedGifts({ gifts, onRemove }) {
  return (
    <Row className="mt-4">
      {gifts.length === 0 ? (
        <p className="text-muted">You haven't saved any gifts yet.</p>
      ) : gifts.map((gift, idx) => (
        <Col md={6} lg={4} key={idx}>
          <Card className="mb-3 border-0 shadow-sm">
            <Card.Body>
              <Card.Title>{gift.name}</Card.Title>
              <Card.Text>{gift.description}</Card.Text>
              <Button variant="danger" onClick={() => onRemove(gift)}>Remove</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
