import { useState } from "react";
import {
  Button,
  useTheme,
  Typography,
  Box,
  TextField,
  useMediaQuery,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik"; // Formik is a library that allows us to create forms
import * as yup from "yup"; // Yup is a library that allows us to validate forms
import { useNavigate } from "react-router-dom"; // useNavigate allows user to navigate to different pages
import { useDispatch } from "react-redux"; // useDispatch allows us to dispatch actions to react redux to store user info
import { setLogIn } from "../../state"; // setLogIn is the action/reducer created in the state.js file
import Dropzone from "react-dropzone"; // Dropzone is a library that allows us to upload images for their profile picture
import FlexBetween from "../../components/FlexBetween"; // FlexBetween is a component created by me which allows me to use it multiple times

const registerSchema = yup.object().shape({
  // This is a yup schema that allows us to validate the register form
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
  picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  // This is a yup schema that allows us to validate the login form
  email: yup.string().email("invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const initialValuesRegister = {
  // These are the initial values for the register form which will be empty at first
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: "",
};

const initialValuesLogin = {
  // These are the initial values for the login form which will be empty at first
  email: "",
  password: "",
};

const Form = () => {
  const [pageType, setPageType] = useState("login"); // This allows us to toggle between the login and register form
  const { palette } = useTheme(); // This allows us to access the theme object and use any colour from the theme file
  const dispatch = useDispatch();
  const navigate = useNavigate(); // This allows us to navigate to different pages
  const isNonMobile = useMediaQuery("(min-width: 600px)"); // This allows us to check if the screen size is greater than 600px
  const isLogin = pageType === "login"; // This allows us to check if the page type is login
  const isRegister = pageType === "register"; // This allows us to check if the page type is register

  const register = async (values, onSubmitProps) => {
    // This function allows us to register the user by sending the form info to the backend and saving the user to the database
    // Allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name); // This allows us to save the image name to the database
    const savedUserResponse = await fetch(
      "http://localhost:3001/auth/register", // This is the endpoint/api call that we are sending the formData info to
      {
        // This is the payload that is being sent
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json(); 
    onSubmitProps.resetForm(); // This comes from formik and allows us to reset the form

    if (savedUser) {
      // If the user is saved then the user navigated to the login page by setting the page type to login
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    // This function is responsible for logging the user in by sending the form info to the backend and checking if the user exists
    const loggedInResponse = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      // If the user is successfully logged in then the user info is saved to the redux state/store and the user is navigated to the home page
      dispatch(
        setLogIn({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps); // If the page type is login then the login function will be called which will send the form info to the backend and log the user in
    if (isRegister) await register(values, onSubmitProps); // If the page type is register then the register function will be called which will send the form info to the backend and register the user
  };

  return (
    <Formik
      onSubmit={handleFormSubmit} // This allows us to submit the form using the handleFormSubmit function
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister} // If the page type is login then the initial values will be the login initial values otherwise it will be the register initial values
      validationSchema={isLogin ? loginSchema : registerSchema} // If the page type is login then the validation schema will be the login validation schema otherwise it will be the register validation schema
    >
      {({
        // These are formik props that allow us to access the formik functions and values
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))" // This allows us to create a grid with 4 columns and each column will take up 1fr of the space
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" }, // This allows to make the grid responsive by making the grid span 4 columns on mobile screens and 1 column on non mobile screens
            }}
          >
            {isRegister && ( // If the page type is register then the following fields will be displayed for the register form
              <>
                <TextField
                  label="First Name" // This is the label for the text field
                  required // This prevents the user from leaving the field empty
                  onBlur={handleBlur} // This allows us to check if the user has clicked off the text field
                  onChange={handleChange} // This allows us to check if the user has changed the text field such as typing in it
                  value={values.firstName}
                  name="firstName" // Syncing the name with the initial values
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName) // This allows us to check if the user has clicked off the text field and if there are any errors
                  }
                  helperText={touched.firstName && errors.firstName} // This allows us to display the error message if there is an error
                  sx={{ gridColumn: "span 2" }} // This allows us to span the text field across 2 columns
                />
                <TextField
                  label="Last Name"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  label="Location"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{ gridColumn: "span 4" }} // This allows us to span the text field across 4 columns
                />
                <TextField
                  label="Occupation"
                  required
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{ gridColumn: "span 4" }}
                />
                <Box
                  // Creating a box to display the dropzone to allow the user to upload a profile picture
                  gridColumn="span 4"
                  border={`1px solid ${palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone // This is the dropzone component which allows us to upload images
                    acceptedFiles=".jpg,.jpeg,.png" // Only accepts these file types
                    multiple={false} // Only allows the user to upload one image
                    onDrop={
                      (acceptedFiles) =>
                        setFieldValue("picture", acceptedFiles[0]) // This allows us to set the value of picture to the image that the user has uploaded
                    }
                  >
                    {(
                      { getRootProps, getInputProps } // These are the props that allow us to access the dropzone functions
                    ) => (
                      <Box // This is the box that will display the dropzone with dashed border
                        {...getRootProps()} // This allows us to access the root props
                        border={`2px dashed ${palette.primary.main}`}
                        p="1rem"
                        sx={{ "&:hover": { cursor: "pointer" } }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? ( // If there the user does not upload a picture then display the text otherwise display the picture file name
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              // This will be displayed for both the login and register form
              label="Email"
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              label="Password"
              required
              type="password" // This hides the password
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>

          {/* BUTTONS */}

          <Box>
            <Button
              // This is the login or register button depending on the page type
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: palette.primary.main,
                color: palette.background.alt,
                "&:hover": {
                  backgroundColor: palette.primary.mediumMain,
                },
              }}
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </Button>
            <Typography
              // This is the text below the form which allows the user to switch between the login and register form
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
              sx={{
                width: "fit-content",
                color: palette.primary.main,
                "&:hover": {
                  cursor: "pointer",
                  textDecoration: "underline",
                  color: palette.primary.dark,
                },
              }}
            >
              {isLogin
                ? "Don't have an account? Sign up here."
                : "Already have an account? Login here."}
            </Typography>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
