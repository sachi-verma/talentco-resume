import React from "react";
import ReactDOM from "react-dom";
import MultiStep from "react-multistep";
import StepOne from "../Steps/step1";
import StepTwo from "../Steps/step2";
import StepThree from "../Steps/step3";
import StepFour from "../Steps/step4";
import { Container, Row, Col, Card } from "react-bootstrap";

import "../Steps/prog-track.css";
import "../Steps/stylestep.css";

// const steps = [
//   { name: "Name", component: <StepOne /> },
//   { name: "Email", component: <StepTwo /> },
//   { name: "Password", component: <StepThree /> },
//   { name: "Agreement", component: <StepFour /> }
// ];

function FormComponent() {
  return (
    // <div>
    //   <Container fluid>
    //         <Row>
    //           <Col>
    //           <h1>React multi step</h1>
    //           <MultiStep steps={steps} />
    //           </Col>
    //         </Row>
    //       </Container>
    // </div>
    // <div className='container'>
    <div className="d-flex align-items-center justify-content-center vh-100">
    {/* <Container>
      <Row>
        <Col> */}
          <Card style={{ width: '50rem', padding: '40px' }}>
            <Card.Header className='text-center' style={{ fontSize: '50px' }}>Resume Form</Card.Header>
            <form>
              <MultiStep activeStep={0} prevButton={{title: 'Back', style:{ marginRight: "1rem" }}} nextButton={{style:{type: "submit" }}}>
                <StepOne title='Name'/>
                <StepTwo title='Email'/>
                <StepThree title='Password'/>
                <StepFour title='Agreement'/>
              </MultiStep>
              </form>
          </Card>
        {/* </Col>
      </Row>
    </Container> */}
    </div>
  );
}

export default FormComponent