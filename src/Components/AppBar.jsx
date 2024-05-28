import React from 'react';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const customTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: 'green',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: 'green',
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: '#93AB4F',
          '&.Mui-checked': {
            color: '#93AB4F',
          },
        },
      },
    },
  },
});

const AppBar = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <MuiAppBar position="fixed">
        <Toolbar
          sx={{
            pr: '24px', // Keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="black" // Ensure the text color is set to black for visibility
            noWrap
            sx={{ flexGrow: 1 }}
          >
            GEPF form
          </Typography>
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#93AB4F',
                marginRight: '2%',
                '&:hover': {
                  backgroundColor: '#DF6E46',
                },
              }}
            >
              Home
            </Button>
          </Link>
          <Link to="/">
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#93AB4F',
                marginLeft: '10%',
                '&:hover': {
                  backgroundColor: '#DF6E46',
                },
              }}
            >
              Start
            </Button>
          </Link>
        </Toolbar>
      </MuiAppBar>
    </ThemeProvider>
  );
};

export default AppBar;