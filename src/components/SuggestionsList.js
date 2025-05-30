// src/components/SuggestionsList.js
import { Card, Button, Row, Col } from 'react-bootstrap';

export default function SuggestionsList({ suggestions, onSave }) {
  return (
    <Row className="mt-4">
      {suggestions.length === 0 ? (
        <p className="text-muted">No suggestions yet. Fill the form above to get started.</p>
      ) : suggestions.map((item, idx) => (
        <Col md={6} lg={4} key={idx}>
          <Card className="mb-3 shadow-sm border-0">
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.description}</Card.Text>
              <Button variant="outline-primary" onClick={() => onSave(item)}>Save Gift</Button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
