// src/pages/Dashboard.js
import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Offcanvas, Nav, Card, Form } from 'react-bootstrap';
import SavedGifts from '../components/SavedGifts';
import ReminderForm from '../components/ReminderForm';
import GiftForm from '../components/GiftForm';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [saved, setSaved] = useState([]);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [theme, setTheme] = useState('light');
  const [showSidebar, setShowSidebar] = useState(false);
  const [step, setStep] = useState(1);
  const [suggestion, setSuggestion] = useState(null);
  const [formData, setFormData] = useState({
    age: '',
    relationship: '',
    interests: '',
    occasion: '',
    personality: ''
  });

  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'bg-light text-dark' : 'bg-dark text-white';
    setShowSidebar(true);

    const fetchSuggestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/gifts/saved', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const data = await res.json();
        setSaved(data);
      } catch (err) {
        console.error('Failed to fetch saved gifts:', err);
      }
    };

    fetchSuggestions();
  }, [theme]);

  const handleReminder = (reminder) => {
    console.log("Reminder set:", reminder);
  };

  const handleRemove = (gift) => {
    setSaved(saved.filter(g => g._id !== gift._id));
  };

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(prev => prev + 1);

  const handleSmartSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/gifts/smart-suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setSuggestion(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <div className={`d-flex ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`} style={{ minHeight: '100vh' }}>
      {showSidebar && (
        <Offcanvas show={true} backdrop={false} scroll={true} className="w-25 border-end">
          <Offcanvas.Header>
            <Offcanvas.Title>Dashboard</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Button variant="outline-primary" className="mb-2" onClick={() => setShowGiftForm(!showGiftForm)}>
                Gift Suggestion
              </Button>
              <Button variant="outline-success" className="mb-2" onClick={toggleTheme}>
                Toggle Theme
              </Button>
              <Button variant="outline-warning" className="mb-2">
                Reminder
              </Button>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </Nav>
          </Offcanvas.Body>
        </Offcanvas>
      )}

      <Container fluid className="p-4">
        <h2 className="mb-4">Welcome to your Dashboard</h2>

        {showGiftForm && (
          <Card className="p-4 bg-white shadow rounded mb-4" style={{ maxWidth: '600px' }}>
            <h4 className="mb-3">Smart Gift Suggestion</h4>
            <Form onSubmit={handleSmartSubmit}>
              {step === 1 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Age of the Recipient</Form.Label>
                    <Form.Control type="number" name="age" required onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Your Relationship</Form.Label>
                    <Form.Control type="text" name="relationship" required onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Interests</Form.Label>
                    <Form.Control type="text" name="interests" required onChange={handleChange} />
                  </Form.Group>
                  <Button onClick={handleNext}>Next</Button>
                </>
              )}
              {step === 2 && (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>What is the Occasion?</Form.Label>
                    <Form.Control type="text" name="occasion" required onChange={handleChange} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Describe their personality</Form.Label>
                    <Form.Control type="text" name="personality" required onChange={handleChange} />
                  </Form.Group>
                  <Button type="submit">Get Suggestion</Button>
                </>
              )}
            </Form>
            {suggestion && (
              <Card className="mt-4 shadow">
                <Card.Img variant="top" src={suggestion.image || '/assets/default.jpg'} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{suggestion.name}</Card.Title>
                  <Card.Text>{suggestion.description}</Card.Text>
                  {suggestion.link && (
                    <Button variant="outline-primary" href={suggestion.link} target="_blank">Buy on Amazon</Button>
                  )}
                </Card.Body>
              </Card>
            )}
          </Card>
        )}

        <Card className="mb-4 p-3 shadow">
          <h5 className="text-primary">📍 Your Gift Planning Roadmap</h5>
          <ul className="mb-0">
            <li>🎁 Search for personalized gifts</li>
            <li>📌 Save the ones you like</li>
            <li>⏰ Set reminders for birthdays & occasions</li>
            <li>💌 Share thoughtful ideas with loved ones</li>
          </ul>
        </Card>

        <Row>
          <Col lg={8}>
            <SavedGifts gifts={saved} onRemove={handleRemove} />
          </Col>
          <Col lg={4}>
            <ReminderForm onSetReminder={handleReminder} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
