import {AgGridReact} from 'ag-grid-react';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import {Helmet} from 'react-helmet';
import { Form, Card, Button, ProgressBar, ListGroup, Modal, Badge, Row, Col, Container, Nav, Navbar } from 'react-bootstrap';


import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';


var filterParams = {
    comparator: (filterLocalDateAtMidnight, cellValue) => {
      var dateAsString = cellValue;
      if (dateAsString == null) return -1;
      var dateParts = dateAsString.split('/');
      var cellDate = new Date(
        Number(dateParts[2]),
        Number(dateParts[1]) - 1,
        Number(dateParts[0])
      );
      if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        return 0;
      }
      if (cellDate < filterLocalDateAtMidnight) {
        return -1;
      }
      if (cellDate > filterLocalDateAtMidnight) {
        return 1;
      }
      return 0;
    },
    // minValidYear: 2000,
    // maxValidYear: 2021,
    inRangeFloatingFilterDateFormat: 'DD MMM YYYY',
  };

function DjangoFilter() {

    // const gridRef = useRef();

    const [rowData, setRowData] = useState([
        {make: 'Ford', model: 'Focus', price: 40000},
        {make: 'Toyota', model: 'Celica', price: 50000},
        {make: 'BMW', model: '4 Series', price: 60000}
    ]);

    // to be used if removing the const defaultColDef
    // const [columnDefs, setColumnDefs] = useState([
    //     {field: 'make', sortable: true, filter: true},
    //     {field: 'model', sortable: true, filter: true},
    //     {field: 'price', sortable: true, filter: true}
    // ]);

    const [columnDefs, setColumnDefs] = useState([
            // {field: 'resume'}
            {field: 'name'},
            {field: 'email'},
            {field: 'mobile_number'},
            {field: 'education'},
            {field: 'skills'},
            {field: 'experience'},
            {field: 'designation'},
            // {field: 'total_experience'},
            // {field: 'company_name'},
            // {field: 'college_name'},
            // {field: 'willing_to_relocate'},
            // {field: 'resume_path'},
            // {field: 'age'},
            // {field: 'date', filter: 'agDateColumnFilter', filterParams: filterParams,}
        ]);

    const defaultColDef = useMemo( () => ({
        minWidth: 250,
        sortable: true,
        filter: true,
        floatingFilter: true,
    }), []);

    const cellClickedListener = useCallback ( e => {
        console.log('cellClicked', e);
    })

    useEffect (() => {
        fetch('http://localhost:8000/api/resumes/')
        .then(result => result.json())
        .then(rowData => setRowData(rowData))
    }, [])

    // const pushMeClicked = useCallback( e => {
    //     gridRef.curent.api.deselectAll();
    // })

    return (
        <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">  
        <Container>  
          <Navbar.Brand href="#" style={{fontSize: 18}}>
            <img src="img/Picture2_small.png" alt="brand-logo" height="30" width="25" style={{marginRight: '10px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
              {/* <Nav.Link href="#features">Link 1</Nav.Link>  
              <Nav.Link href="#pricing">Link 2</Nav.Link>    */}
            </Nav>  
            <Nav variant="pills" activeKey="3">
              <Nav.Link eventKey="1" href="http://localhost:3000/dynamicform" style={{margin: '5px'}}>Resume Form</Nav.Link>  
              <Nav.Link eventKey="2" href="http://localhost:3000/filter" style={{margin: '5px'}}>View Resumes</Nav.Link>  
              <Nav.Link eventKey="3" href="http://localhost:3000/djangofilter" style={{margin: '5px'}}>Parsed Resumes</Nav.Link>
              <Nav.Link eventKey="4" href="http://127.0.0.1:8000/" style={{margin: '5px'}}>Resume Parser</Nav.Link>   
            </Nav>   
          </Navbar.Collapse>  
        </Container>  
      </Navbar>  
        <div className='ag-theme-quartz' style={{height: "90vh" }}>
            <Helmet>
                <title>Talentco | Parsed Resumes</title>
            </Helmet>
            {/* <button onClick={pushMeClicked}>Push Me</button> */}
            <AgGridReact
                onCellClicked={cellClickedListener}
                rowData={rowData}
                columnDefs={columnDefs}
                // rowSelection='multiple'
                animateRows={true}
                defaultColDef={defaultColDef}/>
        </div>
        </>
    )
}

export default DjangoFilter
