import React, { Component } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';


const defaultTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#101e45',
      },
      secondary: {
        main: '#d71728',
      },
      background: {
        main: "#f8f9fa"
      },
    },
  },
);

export class FormUserDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <ThemeProvider theme={defaultTheme}>
        <>
        <Container background="#ffffff">
          <Dialog
            open
            fullWidth
            // maxWidth='sm'
          >
            {/* <AppBar title="Enter User Details" >
            <Typography>Enter User Details</Typography>
            </AppBar> */}
            <DialogTitle>
              {" "}
              <Typography variant="h4">Enter User Details</Typography>
            </DialogTitle>
            <Grid display="flex" justifyContent="center" alignItems="center">
            <TextField
              placeholder="Enter Your First Name"
              label="First Name"
              onChange={handleChange('firstName')}
              defaultValue={values.firstName}
              margin="normal"
              sx={{
                width: 300,
                // color: 'success.main',
              }}
              justifyContent="center" 
              alignItems="center"
            />
            <br />
            </Grid>

            <Grid display="flex" justifyContent="center" alignItems="center">
            <TextField
              placeholder="Enter Your Last Name"
              label="Last Name"
              onChange={handleChange('lastName')}
              defaultValue={values.lastName}
              margin="normal"
              sx={{
                width: 300,
                // color: 'success.main',
              }}
            />
            <br />
            </Grid>

            <Grid display="flex" justifyContent="center" alignItems="center">
            <TextField
              placeholder="Enter Your Email"
              label="Email"
              onChange={handleChange('email')}
              defaultValue={values.email}
              margin="normal"
              sx={{
                width: 300,
                // color: 'success.main',
              }}
            />
            <br />
            </Grid>

            <Grid display="flex" justifyContent="center" alignItems="center" margin="50">
            <Button
              color="primary"
              variant="contained"
              margin="50"
              onClick={this.continue}
            >Continue</Button>
            </Grid>
          </Dialog>
          </Container>
        </>
      </ThemeProvider>
    );
  }
}

export default FormUserDetails;