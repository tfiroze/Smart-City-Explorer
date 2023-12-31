import React, { useContext, useEffect, useState } from "react";
import { Header } from "../components/dashboard/Header";
import {
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  IconButton,
  Fade,
  Alert,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  styled,
  useTheme,
  AvatarGroup,
  Avatar,
  Theme
} from "@mui/material";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { CreateItinerary } from "./CreateItinerary";
import { AddCircleOutline as AddIcon, History as HistoryIcon } from "@mui/icons-material";
import IItinerary from "../models/IItinerary";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import EditNoteIcon from "@mui/icons-material/EditNote";
import ChoroplethMap from "./MapTest";
import Choropleth from "../components/map/Choropleth";
import { MapContainer, TileLayer, Popup, Marker, useMap } from 'react-leaflet';

import thingsTodoDummyData from "../temp/dummy_data/thingsTodo.json";
import manhattanDarkImage from '../resources/images/manhattan_dark.jpg';
import { toTitleCase } from "../utils/utility_func";
import { VenueCard } from "../components/common/venueCard";
import { Login } from "./Login";
import { FriendsModal } from "../components/dashboard/Friends";
import { VenueDetailsModal } from "../components/createItinerary/VenueDetailsModal";
import makeStyles from "@mui/styles/makeStyles/makeStyles";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import L from "leaflet";
import { smartApi } from "../utils/apiCalls";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    "& .MuiPaper-root": {
      backgroundColor: "transparent",
      boxShadow: '0 0 0 rgba(0, 0, 0, 0.3)',
    }
  }
}));

const purpleIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export const ItineraryDetails = () => {

  const [openFriendsModal, setOpenFriendsModal] = useState<boolean>(false);
  const [openItienaryDetailsModal, setOpenItienaryDetailsModal] = useState<boolean>(false);

  const [data, setData] = useState<any>({})
  const [venueData, setVenueData] = useState<any>([])

  const [activeIndex, setActiveIndex] = useState<number>(0)


  const [friendReqLoading, setFriendReqLoading] = useState<boolean>(false)
  const [emailMessage, setEmailMessage] = useState<string>("")
  const [emailError, setEmailError] = useState<boolean>(false)


  const [friendsCount, setFriendsCount] = useState<number>(0)


  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    setData(location.state.data)
    let venues: any = []
    let keyName = ['ven_1', 'ven_2', 'rest_1', 'ven_3', 'ven_4', 'rest_2']
    keyName.map((el) => {
      if (location.state && location.state.data && location.state.data[el]) {
        venues.push(location.state.data[el])
      }
    })
    setVenueData(venues);
  }, [])


  const handleFriendsModal = () => setOpenFriendsModal(!openFriendsModal)
  const handItienraryDetailsModal = () => {
    setOpenItienaryDetailsModal(!openItienaryDetailsModal)
  }


  const currentTheme = useTheme();
  const navigate = useNavigate();

  const handleForward = () => {
    if ((activeIndex < (venueData.length - 1)) && (activeIndex >= 0)) {
      setActiveIndex(activeIndex + 1)

    }
  }

  const handleBackward = () => {
    if ((activeIndex < venueData.length) && (activeIndex > 0)) {
      setActiveIndex(activeIndex - 1)

    }
  }

  const handleHome = () => {
    navigate('/dashboard')
  }


  return (
    <>
      <Dialog
        open={openFriendsModal}
        onClose={handleFriendsModal}
        maxWidth="sm"
        fullWidth
      >
        <FriendsModal onSubmit={()=>{}}
          loading={false}
          isError={false}
          errorMessage={""}
          friendList = {(data?.friend_id && data.friend_id?.length>0)?data.friend_email:[]}
          hideAddFriend={true}
        
        />
      </Dialog>

      <Dialog
        open={openItienaryDetailsModal}
        onClose={handItienraryDetailsModal}
        maxWidth="md"
        fullWidth
        className={classes.root}
      >
        <VenueDetailsModal venue={venueData[activeIndex]} onClick={handItienraryDetailsModal} />
      </Dialog>
      <Grid container style={{ backgroundColor: '#ffff', height: '100vh' }}>
        <Grid container xs={12} style={{ height: '10vh', }}>
          <Header />
        </Grid>
        <Grid container xs={12} style={{ position: 'relative', height: '90vh', }}>
          <Grid container xs={12} style={{ width: '100%', height: '100%', zIndex: 10, background: 'transparent' }}>
            <Grid item xs={5} style={{ background: 'transparent', alignItems: 'center', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ width: '80%', padding: '10px', textAlign: 'center', background: currentTheme.palette.secondary.main, borderRadius: '15px', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <span onClick={() => handleHome()} style={{ width: '30px', height: '30px', borderRadius: '30px', margin: '1px', cursor: 'pointer' }}>
                  <ArrowBackIosIcon sx={{ color: '#757de8' }}/>
                </span>
                <Typography variant="h5" fontWeight={"bold"}>{data?.name ? data?.name : ''}</Typography>
                <div>
                  <AvatarGroup max={4} onClick={() => handleFriendsModal()} style={{cursor:'pointer'}}>
                    {data?.friend_email && data?.friend_email.map((el: string) =>
                      <Avatar>{el ? el.split('')[0] : ''}</Avatar>
                      
                    )}
                  </AvatarGroup>
                </div>
              </div>
              <Grid item xs={8} style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', background: 'transparent' }}>
                <span onClick={() => handleBackward()} style={{ width: '30px', height: '30px', borderRadius: '30px', margin: '1px', cursor: 'pointer' }}>
                  <ArrowBackIosIcon />
                </span>
                <VenueCard detailsModalClick={handItienraryDetailsModal} showSelect={false} isSelected={false} venDetails={venueData[activeIndex]} />
                <span onClick={() => handleForward()} style={{ width: '30px', height: '30px', borderRadius: '10px', margin: '1px', cursor: 'pointer' }}>
                  <ArrowForwardIosIcon />
                </span>
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 5 }}>
            <MapContainer
              style={{ height: "100%", width: "100%" }}
              zoom={12}
              center={[40.782790, -74.055090]}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {(venueData && venueData[activeIndex] && venueData[activeIndex].latitude) && <Marker
                icon={purpleIcon}
                position={[venueData[activeIndex].latitude, venueData[activeIndex].longitude]}
              >

              </Marker>}
            </MapContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
