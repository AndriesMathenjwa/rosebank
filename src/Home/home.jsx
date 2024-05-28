import React, { useRef, useState } from "react";
import AppBar from "../Components/AppBar";
import Start from "../Components/start";
import Paper from "@mui/material/Paper";
import { Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import "./home.css";
import SendIcon from "@mui/icons-material/Send";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
import IconButton from "@mui/material/IconButton";

// Customizing the theme
const theme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            borderColor: "#93AB4F",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          "&.Mui-focused": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#93AB4F",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#93AB4F",
          "&.Mui-checked": {
            color: "#93AB4F",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#93AB4F",
          "&.Mui-checked": {
            color: "#93AB4F",
          },
        },
      },
    },
  },
});

function Home() {
  const mainFormRef = useRef(null);

  const [formData, setFormData] = useState({
    disclaimer: "",
    province: "",
    eventType: "",
    area: "",
    title: "",
    idNumber: "",
    pensionNumber: "",
    department: "",
    memberType: "",
    phoneNumber: "",
    email: "",
    consentID: "",
    phone: "",
    physicalAddress: "",
    helpWith: [],
    campaignSource: "",
    registrationType: "",
    initials: "",
    firstName: "",
    lastName: "",
    satisfaction: "", // New state for satisfaction rating
    tutorialsSatisfaction: "", // New state for tutorials satisfaction
    assessmentsSatisfaction: "", // New state for assessments satisfaction
    your_answer: "",  // Assuming you have this state for the text field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedHelpWith = checked
      ? [...formData.helpWith, value]
      : formData.helpWith.filter((item) => item !== value);
    setFormData({ ...formData, helpWith: updatedHelpWith });
  };

  const handleProvinceChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, province: value, area: "" }); // Reset area when province changes
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (isValid) {
      const finalFormData = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        finalFormData.append(key, value);
      });

      console.log("Form Data:", finalFormData);

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxbKGnxR5qj9pr8C6ESZE6J4FginTbY-VWwe3ZADEgrSpXErtqETbc3KLOLbEY1OKgdeA/exec",
          {
            method: "POST",
            body: finalFormData,
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Form submitted successfully:", responseData);
          Swal.fire("Success", "Form submitted successfully!", "success");
        } else {
          console.error("Failed to submit form:", response.statusText);
          Swal.fire("Error", "Failed to submit form", "error");
        }
      } catch (error) {
        console.error("An error occurred while submitting the form:", error);
        Swal.fire("Error", "An error occurred while submitting the form", "error");
      }
    }
  };

  const validateForm = () => {
    const {
      disclaimer,
      province,
      eventType,
      area,
      title,
      idNumber,
      department,
      memberType,
      email,
      consentID,
      phone,
      physicalAddress,
      helpWith,
      campaignSource,
      registrationType,
      initials,
      firstName,
      lastName,
      satisfaction,
      tutorialsSatisfaction,
      assessmentsSatisfaction,
    } = formData;

    if (!disclaimer) {
      Swal.fire({
        title: "Error",
        text: "Please provide a disclaimer",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!province) {
      Swal.fire({
        title: "Error",
        text: "Please select a province",
        icon: "error",
        customClass: {
          confirmButton: "swal-confirm-button", // Custom class for the confirmation button
        },
        buttonsStyling: false, // Disable default styling to use custom styles
        confirmButtonColor: "#4CAF50", // Background color for the confirmation button
      });
      return false;
    }

    if (!eventType) {
      Swal.fire("Error", "Please select an event type", "error");
      return false;
    }

    if (!area) {
      Swal.fire("Error", "Please provide an area", "error");
      return false;
    }

    if (!title) {
      Swal.fire("Error", "Please select a title", "error");
      return false;
    }

    if (!/^\d{13}$/.test(idNumber)) {
      Swal.fire("Error", "ID number must be 13 digits", "error");
      return false;
    }

    if (!department) {
      Swal.fire("Error", "Please provide a department", "error");
      return false;
    }

    if (!memberType) {
      Swal.fire("Error", "Please select a member type", "error");
      return false;
    }

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      Swal.fire("Error", "Invalid email format", "error");
      return false;
    }

    if (!consentID) {
      Swal.fire("Error", "Please select a consent option", "error");
      return false;
    }

    if (!/^\d{10}$/.test(phone)) {
      Swal.fire("Error", "Phone number must be 10 digits", "error");
      return false;
    }

    if (!physicalAddress) {
      Swal.fire("Error", "Please provide a physical address", "error");
      return false;
    }

    if (helpWith.length === 0) {
      Swal.fire(
        "Error",
        'Please select at least one option for "What do you need help with?"',
        "error"
      );
      return false;
    }

    if (!campaignSource) {
      Swal.fire("Error", "Please provide a campaign source", "error");
      return false;
    }

    if (!registrationType) {
      Swal.fire("Error", "Please select a registration type", "error");
      return false;
    }

    if (!initials) {
      Swal.fire("Error", "Please provide initials", "error");
      return false;
    }

    if (!firstName) {
      Swal.fire("Error", "Please provide a first name", "error");
      return false;
    }

    if (!lastName) {
      Swal.fire("Error", "Please provide a last name", "error");
      return false;
    }

    if (!satisfaction) {
      Swal.fire("Error", "Please rate your satisfaction with the lecturer's approach", "error");
      return false;
    }

    if (!tutorialsSatisfaction) {
      Swal.fire("Error", "Please rate your satisfaction with the tutorials", "error");
      return false;
    }

    if (!assessmentsSatisfaction) {
      Swal.fire("Error", "Please rate your satisfaction with the assessments", "error");
      return false;
    }

    return true;
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <AppBar />
        <Start />
        <Paper
          ref={mainFormRef}
          sx={{
            p: 2,
            margin: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "#FFFFFF",
          }}
        >
          <Divider
            sx={{ borderBottomWidth: "2px", borderBottomColor: "black" }}
          />

          <FormControl
            sx={{ width: "50%", margin: "auto", marginBottom: "4px" }}
          >
            <InputLabel id="Event-label">Data collection method *</InputLabel>
            <Select
              labelId="Event-label"
              id="Event-required"
              value={formData.eventType}
              name="eventType"
              label="Event Type *"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>- Choose -</em>
              </MenuItem>
              <MenuItem value="Email">Email</MenuItem>
              <MenuItem value="SMS">SMS</MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl
            sx={{
              width: "50%",
              margin: "auto",
              marginBottom: "2%",
              marginTop: "2%",
            }}
          >
            <InputLabel id="Title-label">Course Name *</InputLabel>
            <Select
              labelId="Title-label"
              id="Title-required"
              value={formData.title}
              name="title"
              label="Title *"
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>- Choose -</em>
              </MenuItem>
              <MenuItem value="IIE DIPLOMA IN IT SOFTWARE DEVELOPMENT">
                IIE DIPLOMA IN IT SOFTWARE DEVELOPMENT
              </MenuItem>
              <MenuItem value="IIE DIPLOMA IN IT NETWORK MANAGEMENT">
                IIE DIPLOMA IN IT NETWORK MANAGEMENT
              </MenuItem>
            </Select>
            <FormHelperText>Required</FormHelperText>
          </FormControl>

          <FormControl
            sx={{ width: "50%", margin: "auto", marginBottom: "2px" }}
          >
            <FormLabel id="lecturer_approach_label">
              <Typography sx={{ marginTop: "5%" }} gutterBottom>
                On a scale of 1-10, how satisfied were you with the lecturer's approach on this module. *
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="lecturer_approach"
              name="satisfaction"
              value={formData.satisfaction}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((n) => (
                <FormControlLabel
                  key={n + 1}
                  value={String(n + 1)}
                  control={<Radio />}
                  label={String(n + 1)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl
            sx={{ width: "50%", margin: "auto", marginBottom: "2px" }}
          >
            <FormLabel id="tutorials_satisfaction_label">
              <Typography sx={{ marginTop: "5%" }} gutterBottom>
                On a scale of 1-10, how satisfied were you with the module tutorials offered. *
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="tutorials_satisfaction"
              name="tutorialsSatisfaction"
              value={formData.tutorialsSatisfaction}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((n) => (
                <FormControlLabel
                  key={n + 1}
                  value={String(n + 1)}
                  control={<Radio />}
                  label={String(n + 1)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl
            sx={{ width: "50%", margin: "auto", marginBottom: "2px" }}
          >
            <FormLabel id="assessments_satisfaction_label">
              <Typography sx={{ marginTop: "5%" }} gutterBottom>
                On a scale of 1-10, how satisfied were you with the assessments given on this module. *
              </Typography>
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="assessments_satisfaction"
              name="assessmentsSatisfaction"
              value={formData.assessmentsSatisfaction}
              onChange={handleChange}
            >
              {[...Array(10).keys()].map((n) => (
                <FormControlLabel
                  key={n + 1}
                  value={String(n + 1)}
                  control={<Radio />}
                  label={String(n + 1)}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <FormControl
            sx={{ width: "50%", margin: "auto", marginBottom: "2px" }}
          >
            <FormLabel id="course_feedback_label">
              <Typography sx={{ marginTop: "5%" }} gutterBottom>
                What aspects of the course did you find most challenging, and how could these be improved? *
              </Typography>
              <TextField
                id="your_answer"
                label="your_answer *"
                variant="outlined"
                sx={{
                  width: "100%",
                  margin: "auto",
                  marginBottom: "6px",
                  marginTop: "2%",
                }}
                name="your_answer"
                value={formData.your_answer}
                onChange={handleChange}
              />
            </FormLabel>
          </FormControl>

          <Link style={{ flex: 1, textAlign: "right" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#93AB4F",
                color: "#FFFFFF",
                width: "100%",
                marginLeft: "5px",
                "&:hover": { backgroundColor: "#DF6E46" },
              }}
              endIcon={<SendIcon />}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Link>
        </Paper>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default Home;
