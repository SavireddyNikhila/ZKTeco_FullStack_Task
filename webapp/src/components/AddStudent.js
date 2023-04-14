import { TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import useStyles from "./Styles";
import Box from "@mui/material/Box";
import { Button } from "@material-ui/core";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentService";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { Paper } from "@material-ui/core";
import FormHelperText from '@mui/material/FormHelperText';

const initialValues = {
  firstName: "",
  lastName: "",
  gender: "",
  branch: "",
  dateOfBirth: "",
  email: "",
  mobile: "",
  address: "",
  profile: "",
};

function AddStudent() {
  let navigate = useNavigate();
  const [std, setStd] = useState(initialValues);
  const classes = useStyles();
  const { id } = useParams();
  const [errors, setErrors] = useState({})
  const [message,setMessage] = useState("")

  const validate = () =>{
    let temp = {}
    temp.firstName = std.firstName ? "":"This field is required.";
    temp.branch = std.branch.length !== 0 ?"":"This field is required";
    temp.mobile = std.mobile ?(std.mobile.length === 14 ?"":"Mobile should be 14 digits [+countrycode]-[10 digits]"):"This field is required";
    temp.email = std.email ?((/$^|.+@.+..+/).test(std.email)?"":"Email is not valid"):"This field is required.";

    setErrors({
      ...temp
    })

    return Object.values(temp).every(x=>x ==="")
  }
  
  const handleInputChange = (e) => {
    setStd({ ...std, [e.target.name]: e.target.value });
  };

  const saveStudent = (e) => {
    console.log(std);
    e.preventDefault();
    if(validate()){
      if (id) {
        StudentService.updateStudent(id, std)
          .then((response) => {
            if (response.data.code === "OK") {
              console.log(std);
              alert("Student Data Updated Successfully");
              navigate("/");
            } else {
              setMessage(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        StudentService.createStudent(std)
          .then((response) => {
            if (response.data.code === "OK") {
              console.log(std);
              alert("Student Data Added Successfully");
              navigate("/");
            } else {
              setMessage(response.data.message);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    
  };

  useEffect(() => {
    StudentService.getStudentById(id)
      .then((response) => {
        setStd(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    const withoutPrefix = base64.replace(/^data:image\/\w+;base64,/, "");
    console.log(withoutPrefix);
    std["profile"] = withoutPrefix;
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const title = () => {
    if (id) {
      return <p>Update Student</p>;
    } else {
      return <p>Add Student</p>;
    }
  };
  return (
    <Paper className={classes.formDiv}>
      <Typography
        variant="h5"
        color="darkcyan"
        textAlign="center"
        style={{ marginTop: "20px", paddingTop: "20px" }}
      >
        <b>{title()}</b>
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
        <Typography color="#ff0000">{message}</Typography>
        <TextField
          className={classes.textField}
          variant="outlined"
          label="First Name"
          name="firstName"
          value={std.firstName}
          placeholder="Enter first name"
          onChange={(e) => handleInputChange(e)}
          {...(errors.firstName && {error:true, helperText: errors.firstName})}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Last Name"
          name="lastName"
          value={std.lastName}
          placeholder="Enter last name"
          onChange={(e) => handleInputChange(e)}
        />
        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            label="Gender"
            name="gender"
            value={std.gender}
            onChange={(e) => handleInputChange(e)}
          >
            <FormControlLabel value="F" control={<Radio />} label="Female" />
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="O" control={<Radio />} label="Other" />
          </RadioGroup>
        </FormControl>
        
          <FormControl fullWidth {...(errors.email && {error:true})}>
            <InputLabel>Branch</InputLabel>
            <Select
              fullWidth
              label="Branch"
              name="branch"
              value={std.branch}
              onChange={(e) => handleInputChange(e)}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ECE">ECE</MenuItem>
              <MenuItem value="CSE">CSE</MenuItem>
              <MenuItem value="EEE">EEE</MenuItem>
              <MenuItem value="IT">IT</MenuItem>
              <MenuItem value="ME">ME</MenuItem>
            </Select>
            {errors.branch && <FormHelperText className={classes.error1}>{errors.branch}</FormHelperText>}
          </FormControl>
       
        <TextField
          className={classes.textField}
          variant="outlined"
          label="DateOfBirth"
          name="dateOfBirth"
          value={std.dateOfBirth}
          placeholder="YYYY-MM-DD"
          onChange={(e) => handleInputChange(e)}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Mobile"
          name="mobile"
          value={std.mobile}
          placeholder="+countrycode-10digits"
          onChange={(e) => handleInputChange(e)}
          {...(errors.mobile && {error:true, helperText: errors.mobile})}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Email"
          name="email"
          value={std.email}
          placeholder="abc@gmail.com"
          onChange={(e) => handleInputChange(e)}
          {...(errors.email && {error:true, helperText: errors.email})}
        />
        <TextField
          className={classes.textField}
          variant="outlined"
          label="Address"
          name="address"
          value={std.address}
          placeholder="address"
          onChange={(e) => handleInputChange(e)}
        />
        <Button
          className={classes.updatebtn}
          variant="contained"
          color="primary"
          component="label"
          name="profile"
          value={std.profile}
          onChange={(e) => {
            uploadImage(e);
          }}
        >
          {" "}
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <div>
          <Button
            type="submit"
            className={classes.savebtn}
            onClick={(e) => saveStudent(e)}
          >
            Save
          </Button>
          <Button variant="contained" className={classes.cancelbtn}>
            <Link to="/" className={classes.cancelLink}>
              Cancel
            </Link>
          </Button>
        </div>
      </Box>
    </Paper>
  );
}

export default AddStudent;
