import React, { useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MdAddCircleOutline, MdEdit, MdClose } from 'react-icons/md';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';
import { CgProfile } from "react-icons/cg";

function Personal() {

    const personalList = useSelector(state => state.personal)
    const dispatch = useDispatch();
    const {managePersonal} = bindActionCreators(actionCreators, dispatch);

    // const [about, setAbout] = useState();
    const [Alert, setAlert] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [validated, setValidated] = useState(false);

    const handlePersonal = (e) => {
        const valid = e.currentTarget;
        if (!valid.checkValidity()) {
            setValidated(true);
            setIsEdit(false)
        }
        else {
            setIsEdit(true)
        }
        managePersonal(e.target.value)
        // setAbout(e.target.value)

    }
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setValidated(false);
        setForm({
            id:"",
            firstName: "",
            lastName: "",
            phone: "",
            dob: "",
            location: "",
            position: "",
            email: "",
            linkedin: "",
            isRelocate: false,
            isEdit: false
          })
    }
    const handleShow = () => setShow(true);

    // const handleAlertClose = () => setAlert(false);
    // const handleAlert = (id) => {
    //   setDeleteId(id)
    //   setAlert(true);
    // }

    const [form, setForm] = useState({
        id:"",
        firstName: "",
        lastName: "",
        phone: "",
        dob: "",
        location: "",
        position: "",
        email: "",
        linkedin: "",
        isRelocate: false,
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

      const handleSubmit = (event) => {
        event.preventDefault();
        const valid = event.currentTarget;
        if(!valid.checkValidity()){
          setValidated(true);
        }
        else{
        //   if(form.isEdit){
        //     editExperience(form);
        //     // list[form.id] = form;
        //     // setList(list);
        //   }
        //   else{
        //     addExperience(form)
        //     // const newList = list.concat({ ...form });
        //     // setList(newList);
        //   }
          setShow(false);
          setForm({
            id:"",
            firstName: "",
            lastName: "",
            phone: "",
            dob: "",
            location: "",
            position: "",
            email: "",
            linkedin: "",
            isRelocate: false,
            isEdit: false
          })
        }
        
      }

      const handleEdit = (id) => {
        const form = personalList[id];
        form.isEdit = true;
        form.id = id
        setForm(form)
        setShow(true);
      }
    
    //   const handleDelete = (id) => {
    //     removeExperience(id);
    //     // list.splice(id, 1);
    //     // setList(list);
    //     setAlert(false);
    //   }



    return (
        <Row className="justify-content-center mt-2">
            <Col md={8} sm={12} className="d-flex justify-content-between align-items-center bg-light rounded">
                <h5 className="m-0">Personal Details</h5>
                {/* {!isEdit && <MdAddCircleOutline size={30} className="rounded edit" onClick={handleShow} />}
                {isEdit && <MdEdit size={30} className="rounded edit" onClick={handleShow} />} */}
                <MdAddCircleOutline size={30} className="rounded edit" onClick={handleShow} />
            </Col>
            <Col md={8} sm={12}>
                { 
               personalList?.map((item,id) => {
                    return (
                        <Row className="border-bottom pt-3" key={id}>
                        <Col md={10} className="d-flex justify-content-start">
                            <CgProfile size={50} className="rounded color-blue bg-grey shadow-sm p-1" />
                            <div className="px-3">
                                <h5 className="m-0">{item.firstName} {item.lastName}</h5>
                                <p className="text-muted m-0">{item.phone}</p>
                                <p className="text-muted m-0">{item.dob}</p>
                                <p className="text-muted m-0">{item.position}</p>
                                <p className="text-muted m-0">{item.location} | {`${item.isRelocate ? "Willing to Relocate" : "Will not Relocate" }`}</p>
                                <p className="text-muted m-0">{item.email}</p>
                                <p className="text-muted m-0">{item.linkedin}</p>
                                {/* <p>{item.description}</p> */}
                            </div>

                        </Col>
                        <Col md={2}>
                            <div className="d-flex flex-wrap justify-content-end">
                            <MdEdit size={30} className="rounded edit" onClick={() => {handleEdit(id)}}/>
                            {/* <MdDelete size={30} className="rounded edit" onClick={() => {handleAlert(id)}}/> */}
                            </div>
                        </Col>
                        </Row>
                    )
                    })
                }
            </Col>

            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header>
                    <Modal.Title>Personal Details</Modal.Title>
                    <MdClose size={30} className="rounded edit" onClick={handleClose} />
                </Modal.Header>

                <Modal.Body>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>First Name</Form.Label>
                        <Form.Control required type="text" style={{fontSize: 15}} placeholder="" name="firstName" value={form.firstName} onChange={handleForm} />
                        <Form.Label style={{fontSize: 15}}>Last Name</Form.Label>
                        <Form.Control required type="text" style={{fontSize: 15}} placeholder="" name="lastName" value={form.lastName} onChange={handleForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>Phone Number</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="" name="phone" value={form.phone} onChange={handleForm} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>Date of Birth</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="dd/mm/yyyy" name="dob" value={form.dob} onChange={handleForm} />
                    </Form.Group>
                   
                    {/* <Form.Group className="mb-3">
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

                        </Form.Group> */}
                        <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>Location</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="" name="location" value={form.location} onChange={handleForm} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I am willing to relocate" name="isRelocate" checked={form.isRelocate} onChange={handleForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>Position</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="" name="position" value={form.position} onChange={handleForm} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Label style={{fontSize: 15}}>Email</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="" name="email" value={form.email} onChange={handleForm} />
                        <Form.Label style={{fontSize: 15}}>LinkedIn</Form.Label>
                        <Form.Control required style={{fontSize: 15}} type="text" size="sm" placeholder="" name="linkedin" value={form.linkedin} onChange={handleForm} />
                        </Form.Group>
                        {/* <button type="submit" style={{fontSize: 12}} className="rounded edit px-2" class="btn btn-danger">
                        Save Changes
                        </button> */}
                        <button type="submit" style={{fontSize: 12}} className="rounded edit px-2" class="btn btn-danger">
                        Save Changes
                        </button>
                    </Form>
                </Modal.Body>
       
            </Modal>
        </Row>
    )
}

export default Personal