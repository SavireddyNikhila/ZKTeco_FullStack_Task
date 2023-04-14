import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import useStyles from './Styles';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Typography } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import SportsGolfIcon from '@mui/icons-material/SportsGolf';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label: 'college picture1',
    imgPath:
      'https://th.bing.com/th/id/OIP.nCuvkwA486e7FM8H1aKcCwHaFA?w=258&h=180&c=7&r=0&o=5&pid=1.7',
  },
  {
    label: 'college picture2',
    imgPath:
      'https://th.bing.com/th/id/OIP.543qlnS93HALsInOYDJlNAHaFb?w=254&h=187&c=7&r=0&o=5&pid=1.7',
  },
  {
    label: 'graduation day',
    imgPath:
      'https://th.bing.com/th/id/OIP.wN0zfD9VzXYnuNeALSkXhgHaE7?w=297&h=197&c=7&r=0&o=5&pid=1.7',
  },
  {
    label: 'classrooms',
    imgPath:
      'https://th.bing.com/th/id/OIP.5tADzH19Q17InuSyv7lZxwHaE3?w=264&h=180&c=7&r=0&o=5&pid=1.7',
  },
];

function About() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const classes = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
    <Box sx={{ maxWidth: '50%'}} className={classes.box1}>
      <Typography variant='h3' align='center' color='purple'> <b>Welcome to SRM University!!</b></Typography>
      <Typography variant='h5' align='center' ><pre><b>University, College
        School Education</b></pre></Typography>
      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {images.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  height: '100%',
                  display: 'block',
                  maxWidth: '100%',
                  overflow: 'hidden',
                  width: '100%',
                }}
                src={step.imgPath}
                alt={step.label}
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Next
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0} >
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
      
    </Box>
    <Typography variant='h4' align='center'><b>Know more about</b></Typography>
      <div className={classes.flexContainer}>
        <div className={classes.cardDiv}>
         <p align='center'>
          <VerifiedUserIcon></VerifiedUserIcon>
          <h4>Certified Teachers</h4>
          Even the all-powerful pointing has no control about the blind texts it is an almost unorthographic.
         </p>
        </div>
        <div className={classes.cardDiv}>
        <p align='center'>
          <SchoolIcon></SchoolIcon>
          <h4>Special Education</h4>
          Even the all-powerful pointing has no control about the blind texts it is an almost unorthographic.
         </p>
        </div>
        <div className={classes.cardDiv}>
        <p align='center'>
          <LibraryBooksIcon></LibraryBooksIcon>
          <h4>Book & Library</h4>
          Even the all-powerful pointing has no control about the blind texts it is an almost unorthographic.
         </p>
        </div>
        <div className={classes.cardDiv}>
        <p align='center'>
          <SportsGolfIcon></SportsGolfIcon>
          <h4>Sport Clubs</h4>
          Even the all-powerful pointing has no control about the blind texts it is an almost unorthographic.
         </p>
        </div>
      </div>
      <Typography variant='h4' align='center'><b>Contact Us</b></Typography>
      <div className={classes.contactDiv}>
        <div className={classes.cdiv}>
             <p align='center'>
              <EmailIcon></EmailIcon>
                <h5>Email</h5>
                youremail@email.com
             </p>
        </div>
        <div className={classes.cdiv}>
             <p align='center'>
              <PhoneIcon></PhoneIcon>
              <h5>Call</h5>
              call us: +1235 2348 65
             </p>
        </div>
        <div>

        </div>
      </div>
    </>
  );
}

export default About;