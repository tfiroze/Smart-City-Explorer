import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import {
	Button,
	Grid,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Divider,
	Paper,
} from "@mui/material";
import {
	Timeline,
	TimelineItem,
	TimelineOppositeContent,
	TimelineSeparator,
	TimelineDot,
	TimelineConnector,
	TimelineContent,
} from "@mui/lab";
import { styled } from "@mui/system";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { VenueSelectionControlls } from "./VenueSelectionControlls";

interface Itinerary{
  timeFrom:string;
  timeTo:string;
  imgLink:string;
  title:string;
  description:string;
  venueId:string|number;//based on backend but ye....( ͡° ʖ̯ ͡°) 
  budget:number;
  invited:number;
  conflictsWithPrevouse?:boolean;
}
const data:Itinerary[] = [
	{
		timeFrom: "08:00",
		timeTo: "09:40",
		imgLink:
			"https://images.unsplash.com/photo-1538970272646-f61fabb3a8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=695&q=80",
		title: "Times Square",
		description:
			"Times Square is a major commercial intersection and neighborhood located in the Midtown Manhattan section of New York City. It is known for its vibrant atmosphere, bright billboards, and massive crowds.",
		venueId: "1291212",
		invited: 20,
		budget: 100.5,
	},
  {
		timeFrom: "13:45",
		timeTo: "15:00",
		imgLink:
			"https://images.unsplash.com/photo-1563818785891-5e953f985e29?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=655&q=80",
		title: "The High Line",
		description:
			"The High Line is an elevated linear park built on a historic freight rail line. It offers a unique and scenic walkway with gardens, art installations, and stunning views of Manhattan's West Side.",
		venueId: "1357911",
		invited: 12,
		budget: 60.7,
	},
	{
		timeFrom: "10:00",
		timeTo: "11:40",
		imgLink:
			"https://images.unsplash.com/photo-1512872942423-e9877d94e902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
		title: "Central Park",
		description:
			"Central Park is an urban park in the middle of Manhattan. It is one of the most famous parks in the world and offers a wide range of recreational activities and attractions, including lakes, meadows, walking paths, and iconic landmarks.",
		venueId: "9876543",
		invited: 15,
		budget: 80.2,
	},
	{
		timeFrom: "12:00",
		timeTo: "13:30",
		imgLink:
			"https://images.unsplash.com/photo-1555109307-f7d9da25c244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
		title: "Empire State Building",
		description:
			"The Empire State Building is a world-famous skyscraper located in Midtown Manhattan. It offers breathtaking views of the city from its observation decks and is a popular tourist attraction.",
		venueId: "246810",
		invited: 25,
		budget: 150.9,
	},


  {
		timeFrom: "22:00",
		timeTo: "22:40",
		imgLink:
			"https://images.unsplash.com/photo-1501503125584-bb1da5f56d48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
		title: "Grand Central Terminal",
		description:
			"Grand Central Terminal is a historic train station located in Midtown Manhattan. It is renowned for its stunning Beaux-Arts architecture, intricate details, and vibrant main concourse.",
		venueId: "2236067",
		invited: 24,
		budget: 135.2,
	},
	{
		timeFrom: "16:15",
		timeTo: "17:40",
		imgLink:
			"https://images.unsplash.com/photo-1590700928582-5389e4ded3cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
		title: "The Metropolitan Museum of Art",
		description:
			"The Metropolitan Museum of Art, often referred to as the Met, is one of the world's largest and most prestigious art museums. It houses an extensive collection spanning thousands of years and various cultures.",
		venueId: "271828",
		invited: 30,
		budget: 200.0,
	},
	{
		timeFrom: "18:00",
		timeTo: "19:40",
		imgLink:
			"https://images.unsplash.com/photo-1503572327579-b5c6afe5c5c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=742&q=80",
		title: "Statue of Liberty",
		description:
			"The Statue of Liberty is a colossal neoclassical sculpture located on Liberty Island in New York Harbor. It is a symbol of freedom and democracy and has become one of the most iconic landmarks in the United States.",
		venueId: "1414213",
		invited: 22,
		budget: 120.5,
	},
	{
		timeFrom: "20:00",
		timeTo: "21:40",
		imgLink:
			"https://images.unsplash.com/photo-1602089266537-57cb22e5235b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=689&q=80",
		title: "Rockefeller Center",
		description:
			"Rockefeller Center is a complex of commercial buildings located in Midtown Manhattan. It is famous for its Art Deco architecture, ice skating rink, and the iconic Christmas tree during the holiday season.",
		venueId: "1123581",
		invited: 17,
		budget: 95.7,
	},

	{
		timeFrom: "23:00",
		timeTo: "00:00",
		imgLink:
			"https://images.unsplash.com/photo-1625358775317-a4f33370c520?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1155&q=80",
		title: "The Museum of Modern Art",
		description:
			"The Museum of Modern Art, also known as MoMA, is a renowned art museum located in Midtown Manhattan. It showcases a vast collection of modern and contemporary artworks from around the world.",
		venueId: "987654",
		invited: 16,
		budget: 75.8,
	},
  {
		timeFrom: "15:15",
		timeTo: "16:00",
		imgLink:
			"https://images.unsplash.com/photo-1599854171059-d91f0fee45cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1610&q=80",
		title: "Brooklyn Bridge",
		description:
			"The Brooklyn Bridge is a famous landmark that connects Manhattan to Brooklyn. It is a suspension bridge with pedestrian walkways, offering stunning views of the New York City skyline and the East River.",
		venueId: "3141592",
		invited: 18,
		budget: 90.3,
	}
];

const StyledArrowForwardIcon = styled(ArrowForwardIcon)`
	color: #008080;
	vertical-align: middle;
	margin: 0 8px;
`;

export const VenueSelection = () => {
  const [itinerary, setItinerary] = React.useState<Itinerary[]>([]);

	useEffect(() => {
    let response = [...data];//API response

    response = sortData(response);
    response = identifyConflicts(response);
    setItinerary([...response]);
  }, []);

  const addItinerary = (data:Itinerary) =>{
      let items = [...itinerary,data]
  }

  const identifyConflicts = (data:Itinerary[]) => {

    for (let x = 0;x<data.length;x++) {
      
    }   
 
      return data;
  }

  const sortData = (data:Itinerary[]) => data.sort((timeA:Itinerary,timeB:Itinerary) => {
      let z = convertTimeToMinutes(timeA.timeFrom);
      let b = convertTimeToMinutes(timeB.timeFrom);
      console.log(z,b)

      return z + b;
    });

    

	return (
		<Grid container>
			<Grid
				item
				xs={12}
				md={8}
				style={{ maxHeight: "70vh", overflowY: "scroll" }}
			>
				<Timeline position="alternate-reverse">
					{itinerary.map((item, index) => (
						<TimelineItem key={index}>
							<TimelineSeparator>
								<TimelineDot color="primary" />
								{index !== data.length - 1 && <TimelineConnector />}
							</TimelineSeparator>
							<TimelineContent>
								<Typography variant="subtitle2" component="div" align="center">
									<b>From</b> {item.timeFrom} <StyledArrowForwardIcon />{" "}
									<b>{item.timeTo}</b>
								</Typography>
								<Card sx={{ display: "flex", maxWidth: 600 }}>
									<CardMedia
										component="img"
										alt="times square"
										image={item.imgLink}
										sx={{ width: 150 }}
									/>
									<Divider orientation="vertical" flexItem />
									<CardContent>
										<Typography variant="h6" component="div">
											{item.title}
										</Typography>
										<Typography variant="body2" color="text.secondary">
											{item.description}
										</Typography>
										<Divider sx={{ margin: "10px 0" }} />
										<Grid container justifyContent="space-between">
											<Grid item>
												<Typography variant="subtitle2" component="div">
													Invited
												</Typography>
												<Typography variant="body2" component="div">
													{item.invited}
												</Typography>
											</Grid>
											<Grid item>
												<Typography variant="subtitle2" component="div">
													Budget
												</Typography>
												<Typography variant="body2" component="div">
													{item.budget}
												</Typography>
											</Grid>
										</Grid>
									</CardContent>
									<CardActions>
										<Button size="small" variant="outlined">
											View
										</Button>
									</CardActions>
								</Card>
							</TimelineContent>
						</TimelineItem>
					))}
				</Timeline>
			</Grid>
			<Grid item xs={12} md={4} spacing={2}>
      <VenueSelectionControlls />
			</Grid>
		</Grid>
	);
};

const convertTimeToMinutes = (time: string): number => {
  let [hours, minutes] = time.split(":");
  return parseInt(hours) * 60 + parseInt(minutes);
}