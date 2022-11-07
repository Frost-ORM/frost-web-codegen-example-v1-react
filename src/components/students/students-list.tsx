import { Box, IconButton, Stack, Typography } from "@mui/material";
import { ComponentProps } from "react";
import { StudentCard } from "./student-card";
import { clearStudentsList, useStudentsSignal } from "./student-signal";
import CancelIcon from "@mui/icons-material/Cancel";

export type StudentsListProps = ComponentProps<typeof Box>;

export function StudentsList(extraProps) {
	const students = useStudentsSignal();
	return (
		<Box id="students-container" {...(extraProps ?? {})}>
			<Box flexDirection={"row"} display={"flex"} alignItems={"center"} justifyContent={"space-between"}>
				<Typography variant="h5">Selected Students List</Typography>
				{
					Boolean(students) && (
						<IconButton 
						title="clear selection"
						onClick={clearStudentsList}
						>
							<CancelIcon />
						</IconButton>
					)
				}
			</Box>

			<Stack id="students-list" direction={"column"} gap={5}>
				{Object.values(students?.list ?? {}).map((student) => (
					<StudentCard student={student} />
				))}
			</Stack>
		</Box>
	);
}
