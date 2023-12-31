import { busynessLevel } from './busynessLevel';

export default interface IVenueItem {
	timeFrom: string;
	timeTo: string;
	imgLink: string;
	title: string;
	description: string;
	venueId: string | number; //based on backend but ye....( ͡° ʖ̯ ͡°)
	budget: number;
	invited: number;
	conflictsWithPrevouse?: boolean;
	invitedParticipant?:string[];
	// busyness?:string;
	busyness?: busynessLevel;
	weatherCode?:number;
	lat?: number;   
    lon?: number;   
	duration: number;
	taxiFare: number;
}