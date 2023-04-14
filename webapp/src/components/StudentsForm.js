import { TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import useStyles from "./Styles";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
const initialValues = {
  id: 0,
  firstName: "",
  lastName: "",
  gender: "",
  branch: "",
  email: "",
  mobile: "",
  address: "",
  profile: "",
};

function StudentsForm() {
  let navigate = useNavigate();
  const [std, setStd] = useState(initialValues);
  const classes = useStyles();
  
  const handleInputChange = (e) => {
    setStd({...std,[e.target.name]:e.target.value});
    
  };

  const onSubmit = async(e)=>{
    e.preventDefault();
    await axios.post('http://localhost:8080/student',std);
    navigate("/");
  }

  return (
    <>
      <Typography variant="h5" color="darkcyan" textAlign="center"><b>
        Add Student</b>
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "100%" },
        }}
        className={classes.formBox}
        noValidate
        autoComplete="off"
      >
        <TextField
          className={classes.textField}
          variant="outlined"
          label="First Name"
          name="firstName"
          value={std.firstName}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Last Name"
          name="lastName"
          value={std.lastName}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Gender"
          name="gender"
          value={std.gender}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Branch"
          name="branch"
          value={std.branch}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Email"
          name="email"
          value={std.email}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Mobile"
          name="mobile"
          value={std.mobile}
          onChange={(e)=>handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Address"
          name="address"
          value={std.address}
          onChange={(e)=>handleInputChange(e)}
        />
        {/* <div>
      <input type="file" onChange={handleFileChange} />

      <div>{file && `${file.name} - ${file.type}`}</div>

      <button onClick={handleUploadClick}>Upload</button>
    </div> */}
        <div> 
          <Button type="submit" className={classes.formbtn} onSubmit={e=>onSubmit(e)}>Save</Button>
          <Link to="/" className="classes.cancelbtn">Cancel</Link>
        </div>
      </Box>
    </>
  );
}

export default StudentsForm;
