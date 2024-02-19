import { Outlet, Navigate, Route } from 'react-router-dom'

// const ProtectedRoutes = () => {
//     let auth = {'token':true}
//     return(
//         auth.token ? <Outlet/> : <Navigate to="/login"/>
//     )
// }

// export default ProtectedRoutes




import { isAuthenticated } from '../services/authService';

const ProtectedRoutes = ({ element, role, ...rest }) => {
  const isAuthenticatedUser = isAuthenticated();
  
  if (!isAuthenticatedUser) {
    // Redirect to login if not authenticated
    return <Navigate to="/" />;
  }

  // Check if the user has the required role
  if (role && role !== isAuthenticatedUser.role) {
    // Redirect to an unauthorized page or the client dashboard
    return <Navigate to="/client-dashboard" />;
  }

  return <Route element={element} {...rest} />;
};

export default ProtectedRoutes;





// export const ProtectedRoute = () => {
//     const navigate = useNavigate();
//     const { isAuthenticated } = useAuth();
//     if (!isAuthenticated) {
//       navigate("/sign-in");
//     }
//     return (
//       <Grid container direction="column" width="100%" flexWrap="nowrap">
//         <DashboardHeader />
//         <Grid container direction="row" flexWrap="nowrap">
//           <Grid item>
//             <SideBar />
//           </Grid>
//           <Outlet />
//         </Grid>
//       </Grid>
//     );
//   };