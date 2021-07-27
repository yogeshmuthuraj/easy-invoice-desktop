import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    label: {
      fontSize: 20
    }
  }),
);

function getSteps() {
  return ['Upload Orders File', 'Select Orders', 'Upload Carrier File', 'Download PDF'];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return 'Upload Orders File';
    case 1:
      return 'Select Orders';
    case 2:
      return 'Upload Carrier File';
    case 3:
      return 'Download PDF';
    default:
      return 'Bimbilipi Bilapi';
  }
}

export default function TabStepper(props) {
  const classes = useStyles();
  const steps = getSteps();

  return (
    <div className={classes.root}>
      <Stepper style={{ fontSize: 15 }} activeStep={props.activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        <div>
          <Typography style={{ fontSize: 20 }} className={classes.instructions}>{getStepContent(props.activeStep)}</Typography>
        </div>
      </div>
    </div>
  );
}
