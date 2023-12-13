import React, { useState } from 'react'
import EditOutlinedIcon from "@mui/icons-material/EditOutlined"
import * as yup from "yup"
import { Formik } from 'formik'
import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Dropzone from 'react-dropzone'
import FlexBetween from 'components/flexBetween'
import { userActions } from 'store/user-slice'

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required")
})

const loginScheme = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required")
})

const initialValesRegister = {
    firstName: " ",
    lastName: " ",
    email: " ",
    password: "",
    location: " ",
    occupation: " ",
    picture: " "
}

const initialValuesLogin = {
    email: " ",
    password: ""
}

const Form = () => {

    const [isLogin, setIsLogin] = useState(true)
    const isMobile = useMediaQuery("(min-width:600px)")
    const theme = useTheme()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const register = async (values,onSubmitProps) => {
      const formData = new FormData()

      for (let value in values) {
        formData.append(value,values[value])
      }
      
      const userResponse = await fetch(
        "http://localhost:3001/auth/register", 
        {
          method: "POST",
          body: formData,
        }
      )

      const user = await userResponse.json()

      console.log(user);

      onSubmitProps.resetForm();

      if (user) {
        setIsLogin(true)
      }


    }

    const login = async (values,onSubmitProps) => {
      const userResponse = await fetch(
        "http://localhost:3001/auth/login", 
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(values),
        }
      )

      const loggedIn = await userResponse.json()

      if (loggedIn.error === "password did not match") {
        onSubmitProps.setErrors({ email: "Invalid email or password" });
      }
      else {

        dispatch(
          userActions.login({
            user: loggedIn.user,
            token: loggedIn.token
          })
          )
          navigate("/home")
          
        }
    }

    const handleForm = async (values,onSubmitProps) => {
      isLogin ? await login(values,onSubmitProps) : await register(values,onSubmitProps)
    }

  return (
    <Formik
      onSubmit={handleForm}
      initialValues={isLogin ? initialValuesLogin : initialValesRegister}
      validationSchema={isLogin ? loginScheme : registerSchema}

    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display='grid'
            gap='30px'
            gridTemplateColumns='repeat(2, minMax(0,1fr))'
            sx={{
              "& > div": {
                gridColumn: !isMobile ? "span 2" : undefined
              }
            }}
          >
            
            {!isLogin && (
              <>
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{gridColumn: "span 1"}}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{gridColumn: "span 1"}}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{gridColumn: "span 2"}}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                  helperText={touched.occupation && errors.occupation}
                  sx={{gridColumn: "span 2"}}
                />
                <Box
                  gridColumn='span 2'
                  border = {`1px solid ${theme.palette.secondary.main}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    accept=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(file) => setFieldValue("picture",file[0])}
                  >
                    {({getRootProps, getInputProps}) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.primary.main}`}
                        p='1rem'
                        sx={{
                          "&:hover": {
                            cursor: "pointer"
                          }
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <Typography>{"Add Picture Hear"}</Typography>
                        ) : (
                            <FlexBetween>
                              <Typography>{values.picture.name}</Typography>
                              <EditOutlinedIcon />
                            </FlexBetween>
                          )
                        }
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}
            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.occupation)}
              helperText={touched.email && errors.email}
              sx={{gridColumn: "span 2"}}
            />
            <TextField
              label="Password"
              type='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.occupation)}
              helperText={touched.password && errors.password}
              sx={{gridColumn: "span 2"}}
            />             
          </Box>
          <Box>
            <Button
              fullWidth
              type='submit'
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.main,
                "&:hover": {
                  backgroundColor: theme.palette.accent.main,
                  color: theme.palette.primary.main
                }
              }}
            > {isLogin ? "LOGIN" : "REGISTER"} 
            </Button>
              <Typography
                onClick = {() => {
                  setIsLogin(!isLogin)
                  resetForm()
                }}
                sx = {{
                  textDecoration: "underline",
                  color: theme.palette.primary.main,
                  "&:hover": {
                    cursor: "pointer",
                    color: theme.palette.accent.main
                  }
                }}
              >
                {isLogin ? "New Hear ... ? " : "Already Know Us ... ?"}
              </Typography>
          </Box>
        </form>
      )}
    </Formik>
  )
}

export default Form