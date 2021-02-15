import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';

import theme from '../theme/theme';

import DummyFormContainer from './SalaryForm/DummyFormContainer';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Row className="justify-content-center">
          <Col xl={5} lg={6} md={8} sm={10}>
            <DummyFormContainer />
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
