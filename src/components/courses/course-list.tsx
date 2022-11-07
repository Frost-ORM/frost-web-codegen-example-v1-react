import { CourseFullModel } from "@frost-orm/frost-web-client";
import { Box, Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { CourseCard } from "./course-card";

export type CoursesListProps = {
	data: Record<string, CourseFullModel>;
	extraProps?: ComponentProps<typeof Box>;
};

export function CoursesList({ data, extraProps }: CoursesListProps) {
	return (
		<Box id="courses-container" {...(extraProps ?? {})}>
			<Typography variant="h5">Courses List</Typography>

			<Stack id="courses-list" direction={"column"} gap={5}>
				{Object.values(data ?? {}).map((course) => (
					<CourseCard key={course.id} course={course} />
				))}
			</Stack>
		</Box>
	);
}
