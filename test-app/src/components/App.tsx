import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SalaryCalculatorForm from './SalaryForm/SalaryForm';

const App: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col lg={4}>
          <SalaryCalculatorForm onSubmit={() => {}} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
