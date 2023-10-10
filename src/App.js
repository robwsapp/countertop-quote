import React, { useState, useMemo } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import Connect from './components/Connect';
import ThankYou from './components/ThankYou';
import UploadDrawings from './components/UploadDrawings';
import MeetAfterDrawings from './components/MeetAfterDrawings';
import ChooseMeetingLocation from './components/ChooseMeetingLocation';
import ChooseLocation from './components/ChooseLocation';
import ScheduleConsultation from './components/ScheduleConsultation';
import ScheduleNow from './components/ScheduleNow';
import BookInHome from './components/BookInHome';
import ContactSoon from './components/ContactSoon';
import LocationSpecific from './components/LocationSpecific';
import { LinearProgress, Paper } from '@mui/material';

import mainLogo from'./lakeside-logo.png';

import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [hasDrawings, setHasDrawings] = useState(null);
  const [wantsToMeet, setWantsToMeet] = useState(null);
  const [meetingLocation, setMeetingLocation] = useState(""); 

  const steps = [
    { label: 'Connect', component: Connect },
    { label: 'Thank You', component: ThankYou },
    { label: 'Upload Drawings', component: UploadDrawings },
    { label: 'Meet After Drawings', component: MeetAfterDrawings },
    { label: 'Choose Meeting Location', component: ChooseMeetingLocation },
    { label: 'Choose Location', component: ChooseLocation },
    { label: 'Schedule Consultation', component: ScheduleConsultation },
    { label: 'Schedule Now', component: ScheduleNow },
    { label: 'Book In-Home', component: BookInHome },
    { label: 'Contact Soon', component: ContactSoon },
    { label: 'Location: Kentwood', component: () => <LocationSpecific locationName="Kentwood" /> },
    { label: 'Location: Muskegon', component: () => <LocationSpecific locationName="Muskegon" /> },
    { label: 'Location: Traverse City', component: () => <LocationSpecific locationName="Traverse City" /> },
    { label: 'Location: Brighton', component: () => <LocationSpecific locationName="Brighton" /> },
  ];

  const journeys = useMemo(() => {
    return {
      journey1: ['Upload Drawings', 'Meet After Drawings', 'Choose Meeting Location', 'Choose Location'],
      journey2: ['Upload Drawings', 'Meet After Drawings', 'Choose Meeting Location', 'Book In-Home'],
      journey3: ['Upload Drawings', 'Meet After Drawings', 'Contact Soon'],
      journey4: ['Upload Drawings', 'Meet After Drawings', 'Schedule Consultation', 'Schedule Now'],
    };
  }, []);
  
  const determineCurrentJourney = () => {
    if(hasDrawings) {
      if(wantsToMeet) {
        return meetingLocation === "Lakeside Location" ? journeys.journey1 : journeys.journey2;
      } 
      return journeys.journey3;
    } else if(hasDrawings === false) {
      return journeys.journey4;
    } 
    // Default initial steps
    return ['Connect', 'Thank You'];
  };
  
  const calculateProgress = () => {
    const currentJourney = determineCurrentJourney();
    
    // Debug Logs
    console.log("Current Step:", currentStep);
    console.log("Has Drawings:", hasDrawings);
    console.log("Wants to Meet:", wantsToMeet);
    console.log("Meeting Location:", meetingLocation);
  
    const stepIndexInJourney = currentJourney.findIndex(step => step === steps[currentStep].label);
    if (stepIndexInJourney === -1) return 0;
    return (stepIndexInJourney / (currentJourney.length - 1)) * 100;
  };

  const progress = calculateProgress();

  const getCurrentStepComponent = () => {
    const CurrentComponent = steps[currentStep].component;
    // Ensure all steps get the necessary state-setting functions as props
    const commonProps = {
      setStep: setCurrentStep,
      setHasDrawings,
      setWantsToMeet,
      setMeetingLocation,
    };
    return <CurrentComponent {...commonProps} />;
  };

  return (
    <Provider store={store}>
      <div className="app-background">
  <div className="logo-container">
    <img src={mainLogo} alt="Lakeside Logo"/>
  </div>
  <div className="step-wrapper-container">
    <Paper elevation={8} style={{ padding: '30px',  maxWidth: '500px', textAlign: 'center' }}>
      <LinearProgress variant="determinate" value={progress} className="progress-bar" />
      {getCurrentStepComponent()}
    </Paper>
  </div>
</div>

    </Provider>
  );
}

export default App;