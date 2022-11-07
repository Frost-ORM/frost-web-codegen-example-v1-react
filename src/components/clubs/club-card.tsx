import { ClubFullModel } from "@frost-orm/frost-web-client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FrostApp } from "../../database/frost";
import { setStudentList } from "../students/student-signal";

export type ClubCardProps = {
	club: ClubFullModel;
};

export function ClubCard({ club }: ClubCardProps) {
	return (
		<Card sx={{ height: "max-content", overflow: "visible" }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{club.name}
				</Typography>

				<Typography variant="body2">
					<>
						<strong>Supervisor</strong>: {club.supervisor?.name} <br />
						<br />
						<strong>Room ID</strong>: {club.roomId} <br />
						<strong>Type</strong>: {club.type} <br />
						<strong># of Students</strong>: {FrostApp.club.getConnectedKeys("members", club)?.length} <br />
					</>
				</Typography>
			</CardContent>

			<CardActions>
				<Button
					size="small"
					onClick={() => setStudentList({ type: "club", selected: club, list: club.members ?? {} })}
				>
					StudentsList
				</Button>
			</CardActions>
		</Card>
	);
}

//
