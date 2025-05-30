// src/components/ReminderForm.js
import { Form, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

export default function ReminderForm({ onSetReminder }) {
  const [reminder, setReminder] = useState({ email: '', date: '', note: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setReminder(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSetReminder(reminder);
  };

  return (
    <Card className="p-4 mt-5 border-0 shadow-sm">
      <h5 className="mb-3 text-primary">Set a Reminder</h5>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="email" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" required onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Note</Form.Label>
          <Form.Control as="textarea" name="note" rows={2} onChange={handleChange} />
        </Form.Group>

        <Button variant="info" type="submit">Send Reminder</Button>
      </Form>
    </Card>
  );
}
