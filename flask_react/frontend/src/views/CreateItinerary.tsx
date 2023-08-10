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
  const [attractionTypeValue, setAttractionTypeValue] = useState<any[]>([]);
  const [attractionTypeName, setAttractionTypeName] = useState<string[]>([])

  const finelize = (data: IVenueItem[]) => {
    setVenueItems(data);
    setCurrentStep(currentStep + 1);
    setItinerary({ ...itinerary, plan: data });
  };

  const updateItinerary = (request: object) => {
    console.log(currentStep);
    handleGetRecommendation(request)
  };

  const handleGetRecommendation = (request: object) => {
    console.log(request);

    smartApi.getRecommendation(request)
      .then((results) => {
        console.log(results);

        if (results?.valid) {
          manipulateRecommendationData(results.data, results.order)
          setCurrentStep(currentStep + 1);
        } else {
          // ... handle the case when results?.valid is falsy ...

        }
      })
      .catch((error) => {
        console.log(error);
        // setError('2')
        // setLoading(false)
      });
  }

  const manipulateRecommendationData = (data: any, order:any) => {
    order.sort((a:any, b:any) => a.order - b.order);

    // Extract only the 'type' property
    const typesArray = order.map((item:any) => item.type);

    const dataManipulation:any[] = []
    typesArray.map((element:any, index:number)=>{
        dataManipulation.push({
          'type_att': element,
          'venue': data[element],
          'order': index,
          'time': index == 0 ? '9:00 Am To 11 Am' : index == 1 ? '11 Am to 1 Pm' : index == 2 ? '3 Pm to 5 Pm' : '5 Pm to 7pm'
        })
    })

    setAttractionTypeValue(dataManipulation)
    setAttractionTypeName(Object.keys(data))
  }



  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <Questionnaire updateItinerary={updateItinerary} currentItinerary={itinerary} />;
      case 1:
        return <PickRecommendation currentItinerary={itinerary} attractionValue={attractionTypeValue} attractionName={attractionTypeName}/>;
      // case 2:
      //   return <VenueSelection updateItinerary={updateItinerary} currentItinerary={itinerary} />;
      // case 3:
      //   return <ConfirmItineraryItems
      //     // completed={addItem} 
      //     data={itinerary}
      //   />;
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
