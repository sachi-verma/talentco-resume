import React, { Fragment } from 'react'
import Container from 'react-bootstrap/container';
import Profile from '../resume-components/profile';
import About from '../resume-components/about';
import Experience from '../resume-components/experience';
import Education from '../resume-components/education';
import Skills from '../resume-components/skills';
import Certification from '../resume-components/certifications';
import { NavLink } from 'react-router-dom';

function Resume() {
  return (
    <Fragment>

      <Container fluid className="p-0 top-image"></Container>
      <Container>

        <Profile></Profile>

        <About></About>

        <Experience></Experience>

        <Education></Education>

        <Certification></Certification>

        <Skills></Skills>


        <div className="d-grid col-2 mx-auto my-4 text-center">
          <NavLink className="nav-link align-middle bg-dark text-white p-2 rounded" to="/preview">Preview</NavLink>
        </div>

      </Container>
    </Fragment>
  )
}

export default Resume