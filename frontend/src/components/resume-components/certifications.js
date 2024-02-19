import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdAddCircleOutline, MdEdit, MdClose, MdDelete } from 'react-icons/md';
import { GrCertificate } from 'react-icons/gr';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { ImCheckmark, ImCross } from 'react-icons/im'
import Months from '../formats/months';
import Years from '../formats/years';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

function Certification() {

  const certificationList = useSelector(state => state.certificationList)
  const dispatch = useDispatch();
  const {addCertification, editCertification, removeCertification} = bindActionCreators(actionCreators, dispatch);

  const [show, setShow] = useState(false);
  const [Alert, setAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleClose = () => {
    setValidated(false);
    setShow(false);
    setForm({
      id:"",
      title: "",
      issuer: "",
      isCompleted: false,
      startMonth: "",
      startYear: "",
      endMonth: "",
      endYear: "",
    //   duration: "",
      description: "",
      isEdit: false
    })
  }
  const handleShow = () => setShow(true);
  const handleAlertClose = () => setAlert(false);
  const handleAlert = (id) => {
    setDeleteId(id)
    setAlert(true);
  }


  // const [list, setList] = useState([]);
  const [form, setForm] = useState({
    id:"",
    title: "",
    issuer: "",
    isCompleted: false,
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
//   duration: "",
    description: "",
    isEdit: false
  });
  const handleForm = (e) => {
    setForm((old) => {
      return {
        ...old,
        [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
      }
    })
  }


  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = event.currentTarget;
    if(!valid.checkValidity()){
      setValidated(true);
    }
    else{
      if(form.isEdit){
        editCertification(form);
        // list[form.id] = form;
        // setList(list);
      }
      else{
        addCertification(form)
        // const newList = list.concat({ ...form });
        // setList(newList);
      }
      setShow(false);
      setForm({
        id:"",
        title: "",
        issuer: "",
        isCompleted: false,
        startMonth: "",
        startYear: "",
        endMonth: "",
        endYear: "",
    //   duration: "",
        description: "",
        isEdit: false
      })
    }
    
  }

  const handleEdit = (id) => {
    const form = certificationList[id];
    form.isEdit = true;
    form.id = id
    setForm(form)
    setShow(true);
  }

  const handleDelete = (id) => {
    removeCertification(id);
    // list.splice(id, 1);
    // setList(list);
    setAlert(false);
  }

  return (
    <Row className="justify-content-center mt-2">
      <Col md={8} sm={12} className="d-flex justify-content-between align-items-center bg-light rounded">
        <h5 className="m-0">Certifications</h5>
        <MdAddCircleOutline size={30} className="rounded edit" onClick={handleShow} />
      </Col>
      <Col md={8} sm={12}>
        { 
          certificationList.map((item,id) => {
              return (
                <Row className="border-bottom pt-3" key={id}>
                  <Col md={10} className="d-flex justify-content-start">
                    <GrCertificate size={50} className="rounded color-blue bg-grey shadow-sm p-1" />
                    <div className="px-3">
                      <h5 className="m-0">{item.title}</h5>
                      <p className="text-muted m-0">{item.issuer} • {item.startMonth} {item.startYear} {`${item.isWorking ? " - Present" : " - "+item.endMonth+" "+item.endYear }`}</p>
                      {/* <p className="text-muted m-0">{item.duration}</p> */}
                      <p>{item.description}</p>
                    </div>

                  </Col>
                  <Col md={2}>
                    <div className="d-flex flex-wrap justify-content-end">
                      <MdEdit size={30} className="rounded edit" onClick={() => {handleEdit(id)}}/>
                      <MdDelete size={30} className="rounded edit" onClick={() => {handleAlert(id)}}/>
                    </div>
                  </Col>
                </Row>
              )
            })
        }

      </Col>
      <Modal show={show} onHide={handleClose} centered scrollable={true} backdrop="static">
        <Modal.Header>
          <Modal.Title style={{fontSize: 30}}>Certification</Modal.Title>
          <MdClose size={30} className="rounded edit" onClick={handleClose} />
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label style={{fontSize: 15}}>Title</Form.Label>
              <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="Ex: Certification in Web Development" name="title" value={form.title} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{fontSize: 15}}>Issued By</Form.Label>
              <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="Ex: Google" name="company" value={form.company} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="I am currently working in this role" name="isWorking" checked={form.isWorking} onChange={handleForm} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Row>
                <Col>
                  <Row>
                    <Form.Label style={{fontSize: 15}}>Start Month - Year</Form.Label>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Control required as="select" type="select" title={form.startMonth} style={{fontSize: 15}} name="startMonth"  value={form.startMonth} onChange={handleForm} className="form-select">
                        <Months/>
                      </Form.Control>
                    </Col>
                    <Col>
                      <Form.Control required as="select" type="select" title={form.startYear} style={{fontSize: 15}} name="startYear" value={form.startYear} onChange={handleForm} className="form-select">
                        <Years/>
                      </Form.Control>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>

                    <Col>
                      <Row>
                        <Form.Label style={{fontSize: 15}}>End Month - Year</Form.Label>
                      </Row>
                      <Row>
                        <Col>
                          <Form.Control required as="select" type="select" title={form.endMonth} style={{fontSize: 15}} name="endMonth" value={form.endMonth} onChange={handleForm} disabled={form.isWorking} className="form-select">
                            <Months />
                          </Form.Control>
                        </Col>
                        <Col>
                          <Form.Control required as="select" type="select" title={form.endYear} style={{fontSize: 15}} name="endYear" value={form.endYear} onChange={handleForm} disabled={form.isWorking} className="form-select">
                            <Years/>
                          </Form.Control>
                        </Col>
                      </Row>

                    </Col>

                  </Row>




                </Col>
              </Row>

            </Form.Group>
            {/* <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control required type="text" size="sm" placeholder="Ex: Pune, India" name="location" value={form.location} onChange={handleForm} />
            </Form.Group> */}
            <Form.Group className="mb-3">
              <Form.Label style={{fontSize: 15}}>Description</Form.Label>
              <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="Ex: Covered basic topics of web development in JavaScript" name="description" value={form.description} onChange={handleForm} />
            </Form.Group>
            <button type="submit" style={{fontSize: 12}} className="rounded edit px-2" class="btn btn-danger">
              Save Changes
            </button>

          </Form>
        </Modal.Body>

      </Modal>
      <Modal show={Alert} onHide={handleAlertClose} className="text-center" size="sm" centered>
        <Modal.Body>
          <h4>Are you sure ?</h4>
          <ImCheckmark size={30} className="rounded edit" onClick={() => {handleDelete(deleteId)}}/>
          <ImCross size={25} className="rounded edit" onClick={handleAlertClose} />
        </Modal.Body>
      </Modal>
    </Row>
  )
}

export default Certification