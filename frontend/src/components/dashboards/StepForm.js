import React from 'react'
import MultiStep from 'react-multistep'
import StepOne from '../step-components/stepOne'
import StepTwo from '../step-components/stepTwo'
import StepThree from '../step-components/stepThree'
import StepFour from '../step-components/stepFour'
// import '../../css/default.css';
// import '../../css/skeleton.css';
import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import Final from '../step-components/final'
import MultiStepProgressBar from "../progressbar/progressbar";




function StepForm() {
  // <Container className='justify-content-center align-items-center'>
  //   <MultiStep activeStep={0} prevButton={{title: 'Back', style:{ marginRight: "1rem" }}} >
  //     <StepOne title='Step 1'/>
  //     <StepTwo title='Step 2'/>
  //     <StepThree title='Step 3'/>
  //     <StepFour title='Step 4'/>
  //   </MultiStep>
    
  // </Container>
   //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: ""
  })

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = input => e => {
    // input value from the form
    const {value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData(prevState => ({
      ...prevState,
      [input]: value
  }));
  }

  const [page, setPage] = useState("pageone");

  const nextPage = (page) => {
    setPage(page);
  };

  const nextPageNumber = (pageNumber) => {
    switch (pageNumber) {
      case "1":
        setPage("pageone");
        break;
      case "2":
        setPage("pagetwo");
        break;
      // case "3":
      //   setPage("pagethree");
      //   break;
      // case "4":
      //   alert("Ooops! Seems like you did not fill the form.");
      //   break;
      default:
        setPage("1");
    }
  };


// javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          {/* <MultiStepProgressBar page={page} onPageNumberClick={nextPageNumber} /> */}
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepOne nextStep={nextStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 2:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <StepTwo nextStep={nextStep} prevStep={prevStep} handleFormData={handleInputData} values={formData} />
              </Col>
            </Row>
          </Container>
        </div>
      );
      // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="App">
          <Container>
            <Row>
              <Col  md={{ span: 6, offset: 3 }} className="custom-margin">
                <Final values={formData}  />
              </Col>
            </Row>
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return (
        <div className="App">
        </div>
      );
  }


}

export default StepForm