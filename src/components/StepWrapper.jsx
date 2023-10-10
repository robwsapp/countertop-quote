import { Stepper, Step, StepLabel, Box } from '@mui/material';

const StepWrapper = ({ children, activeStep, totalSteps, stepLabels }) => {
  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepLabels.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {children}
    </Box>
  );
};

export default StepWrapper;



