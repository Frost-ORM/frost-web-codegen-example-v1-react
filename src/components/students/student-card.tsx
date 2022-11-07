import { Student } from "@frost-orm/frost-web-client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { FrostApp } from "../../database/frost";

export type StudentCardProps = {
	student: Student;
};

export function StudentCard({ student }: StudentCardProps) {
	return (
		<Card sx={{ height: "max-content", overflow: "visible" }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{student.name}
				</Typography>

				<Typography variant="body2">
					<>
						<strong>ID</strong>: {student.id} <br />
						<strong>Year</strong>: {student.year} <br />
						<strong>Email</strong>: {student.email} <br />
						<strong>DOB</strong>: {student.birthday} <br />
						<strong>Club</strong>: {FrostApp.student.getConnectedKeys("club", student)?.[0] ?? "None"}{" "}
						<br />
						<strong># of Courses</strong>:{" "}
						{FrostApp.student.getConnectedKeys("courses", student)?.length || "None"} <br />
					</>
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="small" onClick={() => FrostApp.student.delete(student)}>
					Delete
				</Button>
			</CardActions>
		</Card>
	);
}
