import React from 'react'
import {AppBar, Toolbar, Typography,Grid, Button, CssBaseline, IconButton} from '@material-ui/core' 
import HomeIcon from '@mui/icons-material/Home';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';
import useStyles from './Styles';

function Header() {
    const classes = useStyles();
  return (
    <>
    <CssBaseline />
      <AppBar position='fixed'>
        <Toolbar className={classes.toolbar}>
            <Grid container alignItems='center'>
                <Grid item>
                    <Typography variant='h6'>
                        Student Management System
                    </Typography>
                </Grid>
                <Grid item sm></Grid>
                <Grid item>
                    <IconButton className={classes.headIcons}><HomeIcon/></IconButton>
                    <Button size="large" className={classes.btn}><Link to="/" className={classes.link}>Home</Link></Button>
                    <IconButton className={classes.headIcons}><InfoIcon /></IconButton>
                    <Button size="large"><Link to="/about" className={classes.link}> About</Link></Button>
                    <IconButton className={classes.headIcons}><PersonAddIcon /></IconButton>
                    <Button size="large"><Link to="/addStudent"  className={classes.link}> Add Student</Link></Button>
                </Grid>
            </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header