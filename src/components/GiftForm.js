// src/components/GiftForm.js
import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

export default function GiftForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: '',
    relationship: '',
    interests: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="p-4 shadow-sm border-0 mb-4">
      <h4 className="mb-3 text-primary">Find the Perfect Gift</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Recipient's Age</Form.Label>
          <Form.Control type="number" name="age" onChange={handleChange} required placeholder="e.g. 25" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Relationship</Form.Label>
          <Form.Control type="text" name="relationship" onChange={handleChange} required placeholder="e.g. friend, sister" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interests</Form.Label>
          <Form.Control type="text" name="interests" onChange={handleChange} required placeholder="e.g. books, gadgets, music" />
        </Form.Group>

        <Button variant="success" type="submit" className="w-100">Get Suggestions</Button>
      </Form>
    </Card>
  );
}
