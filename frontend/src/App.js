// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// App.js

import './App.css';
// import './css/default.css';
// import './css/skeleton.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ResumeBuilder from './components/dashboards/ResumeBuilder';
import ClientDashboard from './components/dashboards/ClientDashboard';
import AdminDashboard from './components/dashboards/AdminDashboard';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
// import { getToken } from './services/authService';
import ProtectedRoutes from './utils/ProtectedRoutes'
import Resume from './components/dashboards/Resume';
import UserForm from './components/dashboards/ResumeForm';
import FormComponent from './components/dashboards/FormComponent';
import StepForm from './components/dashboards/StepForm';
import MultiStepForm from './components/dashboards/MultistepForm';
import SinglePageForm from './components/dashboards/SinglepageForm';
import GridExample from './components/dashboards/MultilevelFilter';
import DynamicForm from './components/dashboards/DynamicResume';
import DjangoFilter from './components/dashboards/DjangoFilter';




const App = () => {
  // Define the isAuthenticated function inside the App component
  // const isAuthenticated = () => {
  //   const token = getToken();
  //   return !!token; // Returns true if token exists, false otherwise
  // };

  return (
    <Container fluid className="bg-white p-0">
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<ResumeBuilder />}exact></Route>
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/resumeform" element={<UserForm />} />
          <Route path="/formcomponent" element={<FormComponent />} />
          <Route path="/stepform" element={<StepForm />} />
          <Route path="/multistepform" element={<MultiStepForm />} />
          <Route path="/singlepageform" element={<SinglePageForm />} />
          <Route path="/filter" element={<GridExample />} />
          <Route path="/dynamicform" element={<DynamicForm />} />
          <Route path="/djangofilter" element={<DjangoFilter />} />





          {/* <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />  */}
          {/* <Navigate to="/login" /> */}
          <Route element={<ProtectedRoutes />}>
                <Route path="/client-dashboard" element={<ClientDashboard />} role="client"/>
                <Route path="/admin-dashboard" element={<AdminDashboard />} role="admin" />
          </Route>
          <Route element={<LoginForm />} path="/login"/>
          <Route path="/register" element={<RegisterForm />} />

        </Routes>
      </div>
    </Router>
    </Container>
  );
};

export default App;

