import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Typography } from "@material-ui/core";
import useStyles from "./Styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, orange, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import StudentService from "../services/StudentService";
import { TextField } from "@mui/material";
//import SearchIcon from '@mui/icons-material/Search';

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: red,
    info: orange,
  },
});

function Home() {
  const [stdData, setStdData] = useState([]);
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await StudentService.getAllStudents();

    setStdData(response.data.data);
  };
  const deleteStd = async (id) => {
    await StudentService.deleteStudent(id);
    alert("Data deleted successfully");
    loadData();
  };

  return (
    <div className={classes.appBackground}>
      <ThemeProvider theme={theme}>
        <div>
          <Typography variant="h3" align="center" color="primary">
            <b>Student Management System</b>
          </Typography>
        </div>
        <div className={classes.searchbar}>
          <TextField
            placeholder="Search by name and branch"
            style={{
              marginTop: 50,
              marginBottom: 20,
              width: "20%",
              backgroundColor: "white",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          ></TextField>
        </div>
        <div className={classes.tablediv}>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center">FirstName</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Branch</TableCell>
                  <TableCell align="center">Date of Birth</TableCell>
                  <TableCell align="center">Mobile</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Address</TableCell>
                  <TableCell align="right">profile</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stdData
                  .filter((val) => {
                    if (searchTerm === "") {
                      return val;
                    } else if (
                      val.firstName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.lastName
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      val.branch
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((user, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row" align="center">
                        {user.firstName}
                      </TableCell>
                      <TableCell align="center">{user.lastName}</TableCell>
                      <TableCell align="center">{user.gender}</TableCell>
                      <TableCell align="center">{user.branch}</TableCell>
                      <TableCell align="center">{user.dateOfBirth}</TableCell>
                      <TableCell align="center">{user.mobile}</TableCell>
                      <TableCell align="center">{user.email}</TableCell>
                      <TableCell align="center">{user.address}</TableCell>
                      <TableCell align="right">
                        <img
                          className={classes.profimage}
                          src={`data:image/jpeg;base64,${user.profile}`}
                          alt=""
                        />
                      </TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary">
                          <Link
                            to={`/editStudent/${user.id}`}
                            className={classes.updateLink}
                          >
                            Update
                          </Link>
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteStd(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default Home;
