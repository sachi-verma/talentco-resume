import {AgGridReact} from 'ag-grid-react';
import {useState, useEffect, useMemo, useCallback, useRef} from 'react';
import { Helmet } from 'react-helmet';
import { Form, Card, Button, ProgressBar, ListGroup, Modal, Badge, Row, Col, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import '../../css/multistep.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
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
    inRangeFloatingFilterDateFormat: 'DD MMM YYYY',
  };

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  return `${day}-${month}-${year}\n${hours}:${minutes}:${seconds}`;
}

function GridExample() {
    const gridRef = useRef();
    const [rowData, setRowData] = useState();

    const [columnDefs] = useState([
            {field: 'job_title', headerName: 'Job Title'},
            {field: 'skills', headerName: 'Skills'},
            {field: 'summary', headerName: 'Summary'},
            {field: 'industry', headerName: 'Industry'},
            {field: 'current_location', headerName: 'Current Location'},
            {field: 'experience', headerName: 'Experience (years)', cellStyle: { textAlign: 'center' }},
            {field: 'current_designation', headerName: 'Current Designation'},
            {field: 'ug_degree', headerName: 'UG Degree'},
            {field: 'ug_spl', headerName: 'UG Specialization'},
            {field: 'pg_degree', headerName: 'PG Degree'},
            {field: 'pg_spl', headerName: 'PG Specialization'},
            {field: 'cand_name', headerName: 'Name'},
            {field: 'func_area', headerName: 'Functional Area'},
            {field: 'current_company', headerName: 'Current Company'},
            {field: 'preferred_location', headerName: 'Preferred Location'},
            {field: 'annual_salary', headerName: 'Annual Salary (LPA)', cellStyle: { textAlign: 'center' }},
            {field: 'notice_period', headerName: 'Notice Period (days)', cellStyle: { textAlign: 'center' }},
            {field: 'dob', valueFormatter: params => formatDate(params.value), headerName: 'Date of Birth',filter: "agDateColumnFilter"},
            {field: 'age', headerName: 'Age', cellStyle: { textAlign: 'center' }},
            {field: 'marital_status', headerName: 'Marital Status'},
            {field: 'phone', headerName: 'Phone'},
            {field: 'email', headerName: 'Email'},
            {field: 'gender', headerName: 'Gender'},
            {field: 'work_permit', headerName: 'Work Permit'},
            {field: 'resume', headerName: 'Resume', cellRenderer: function(params){
              if (params.value !== null){
              const filename = params.value.split('\\').pop();
              return (
              <a href={`http://localhost:3002/${params.value}`} target="_blank" rel="noreferrer">{filename}</a>
              );
              }
            }},
            {field: 'uploaded_at', valueFormatter: params => formatDateTime(params.value), headerName: 'Uploaded At'}
        ]);

    const defaultColDef = useMemo( () => ({
        minWidth: 150,
        sortable: true,
        filter: true,
        floatingFilter: true,
        floatingFilterComponentParams: {},
        suppressFloatingFilterButton: true,
        filterParams: {
          buttons: ["apply", "reset"],
          closeOnApply: true,
        },
    }), []);

    const cellClickedListener = useCallback(e => {
        console.log('cellClicked', e);
    }, []);

    const onFilterTextBoxChanged = useCallback(() => {
      gridRef.current.api.setQuickFilter(document.getElementById('filter-text-box').value);
  }, []);

  const onBtnExport = useCallback(() => {
      gridRef.current.api.exportDataAsCsv();
  }, []);

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://cvapi.talentcohr.com/csv-data');
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              const data = await response.json();
              setRowData(data);
          } catch (error) {
              console.error('Error fetching data:', error);
              // Handle error
          }
      };
      fetchData();
  }, []);

    return (
        <>
        <Navbar collapseOnSelect expand="lg" variant="dark" sticky="top" id="navbar2" className="nav" style={{height: '80px'}}>  
        <Container>  
          <Navbar.Brand href="#" style={{fontSize: 18, color: '#101e45'}}>
            <img src="img/logo_small.png" alt="brand-logo" height="40" width="34" style={{marginRight: '10px'}}/>
            TalentCo Resume Management
          </Navbar.Brand>  
          <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{ borderStyle: 'none', height: '30px'}}> <FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/><FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/><FontAwesomeIcon icon={faEllipsisVertical} style={{color: '#02224d', fontSize: '20px'}}/> </Navbar.Toggle>  
          <Navbar.Collapse id="responsive-navbar-nav">  
            <Nav className="me-auto">  
            </Nav>  
            <Nav activeKey="2" >
              <NavLink className="nav-link" eventKey="2" to="/filter" style={{margin: '15px', color: '#d71728', textDecoration: 'none'}}>View Resumes</NavLink>  
            </Nav>  
          </Navbar.Collapse>  
        </Container>  
      </Navbar>
        <div className='ag-theme-quartz' style={{height: "75vh" }}>
        <Helmet>
        <title>Talentco | View Resumes</title>
        </Helmet>
        <div style={{marginTop: '15px'}}>
        <span style={{fontStyle: "10px"}}>Keyword Search:</span>
          <input
            type="text"
            id="filter-text-box"
            placeholder="Search here..."
            style={{ marginLeft: '5px'}}
          />
          <button onClick={onFilterTextBoxChanged} style={{ marginLeft: '5px'}}>Search</button>
        <button className="me-auto" onClick={onBtnExport} style={{marginLeft: "30px", fontSize: "10px"}}>Download CSV export file</button>
        </div>
            <AgGridReact
                ref={gridRef}
                onCellClicked={cellClickedListener}
                rowData={rowData}
                columnDefs={columnDefs}
                // rowSelection='multiple'
                animateRows={true}
                defaultColDef={defaultColDef}
                style={{fontSize: '12px'}}
                pagination={true}
                alwaysShowHorizontalScroll={true}
                alwaysShowVerticalScroll={true}
                ensureDomOrder={true}
                enableCellTextSelection={true}
                rowBuffer={0}
                />
                
        </div>
        </>
    )
}

export default GridExample