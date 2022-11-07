import { CourseFullModel } from "@frost-orm/frost-web-client";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useCallback } from "react";
import { FrostApp } from "../../database/frost";
import { setStudentList } from "../students/student-signal";

export type CourseCardProps = {
	course: CourseFullModel;
};

export function CourseCard({ course }: CourseCardProps) {
	const handleStudentListSelected = useCallback(
		() => setStudentList({ type: "course", selected: course, list: course.students ?? {} }),
		[course]
	);

	return (
		<Card sx={{ height: "max-content", overflow: "visible" }}>
			<CardContent>
				<Typography variant="h5" component="div" gutterBottom>
					{course.name}
				</Typography>

				<Typography variant="body2">
					<>
						<strong>Professor</strong>: {course.professor?.name} <br />
						<br />
						<strong>Difficulty Level</strong>: {course.difficultyLevel} <br />
						<strong>Department</strong>: {course.department} <br />
						<strong>Difficulty Level</strong>: {course.duration} weeks <br />
						<br />
						<strong># of Students</strong>: {FrostApp.course.getConnectedKeys("students", course)?.length}{" "}
						<br />
					</>
				</Typography>
			</CardContent>

			<CardActions>
				<Button size="small" onClick={handleStudentListSelected}>
					StudentsList
				</Button>
			</CardActions>
		</Card>
	);
}
