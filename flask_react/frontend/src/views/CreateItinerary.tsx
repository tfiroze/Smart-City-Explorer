import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Paper,
  Typography,
  Divider,
  styled,
  Fab,
  Tooltip,
} from "@mui/material";
import VenueSelection from "../components/createItinerary/VenueSelection";
import { Questionnaire } from "../components/createItinerary/Questionnaire";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import IVenueItem from "../models/IVenueItem";
import { ConfirmItineraryItems } from "../components/createItinerary/ConfirmItineraryItems";
import IItinerary from "../models/IItinerary";
import { PickRecommendation } from "../components/createItinerary/PickRecommendation";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { VenueSelectionControls } from "../components/createItinerary/VenueSelectionControls";
import { Header } from "../components/dashboard/Header";
import { smartApi } from "../utils/apiCalls";

const steps = [
  "Trip Information",
  "Select Recommendations",
  "Itinerary Overview",
  "Itinerary Confirmation",
];

const StyledFab = styled(Fab)(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));

interface IProps {
  // handleCreateItinerary: () => void;
  // addItem: (item: IItinerary) => void;
}

export const CreateItinerary: React.FC<IProps> = ({
  // handleCreateItinerary,
  // addItem,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [venueItems, setVenueItems] = useState<IVenueItem[]>([]);
  const [dialogItineraryItem, setDialogItineraryItems] = useState<IItinerary | null>(null);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState<boolean>(false);
  const [itinerary, setItinerary] = useState<IItinerary>({
    budget: 0,
    comments: "",
    date: "",
    endTime: "",
    startTime: "",
    name: "",
    plan: [],
  });

  const finelize = (data: IVenueItem[]) => {
    setVenueItems(data);
    setCurrentStep(currentStep + 1);
    setItinerary({ ...itinerary, plan: data });
  };

  const updateItinerary = () => {
    console.log(currentStep);

    setCurrentStep(currentStep + 1);
  };

  // const handleGetRecommendation = (request: object) =>{
  //   smartApi.getRecommendation(request).then((results) => {
  //     console.log(results);
  //     // setSubmitLoading(false)
  //     // if (results?.valid) {
  //     //     // setError(results.errorType)
  //     //     // handleSelectionError('User Details has been Successfully Updated!')
  //     //     // setActiveOption('Home')


  //     // } else {
  //     //     // ... handle the case when results?.valid is falsy ...
  //     //     // setError(results.errorType)
  //     // }
  // }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Questionnaire updateItinerary={updateItinerary} currentItinerary={itinerary} />;
      case 1:
        return <PickRecommendation updateItinerary={updateItinerary} currentItinerary={itinerary} />;
      case 2:
        return <VenueSelection updateItinerary={updateItinerary} currentItinerary={itinerary} />;
      case 3:
        return <ConfirmItineraryItems
          // completed={addItem} 
          data={itinerary}
        />;
      default:
        return null;
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      // handleCreateItinerary();
    }
  };
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };


  return (
    <Grid container style={{ backgroundColor: '#ffff' }}>
      <Grid item xs={12} style={{ width: '100%', height: '10vh', display: 'flex', alignItems: 'center' }}>
        <Header activeStep={currentStep} steps={steps} />
      </Grid>
      <Grid item xs={12} style={{ padding: '0px' }}>
        {renderStep()}
      </Grid>
    </Grid>
  );
};
