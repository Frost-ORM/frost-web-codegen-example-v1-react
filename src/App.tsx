import { ClubFullModel, CourseFullModel } from "@frost-orm/frost-web-client";
import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { ClubsList } from "./components/clubs/clubs-list";
import { CoursesList } from "./components/courses/course-list";
import { clearStudentsList, setStudentList, students$ } from "./components/students/student-signal";
import { StudentsList } from "./components/students/students-list";
import { FrostApp } from "./database/frost";
import { addStudents, setData } from "./database/mock-data";
import "./styles/App.css";

function App() {
	const [clubs, setClubs] = useState<Record<string, ClubFullModel>>({});
	const [courses, setCourses] = useState<Record<string, CourseFullModel>>({});

	useEffect(() => {
		/*
		 * Courses Observer
		 * (No Constraints Passed , So it listens to all Courses)
		 * included with each course is the connected students and professor
		 */
		const courseSub = FrostApp.course
			.observeMany({
				include: { professor: true, students: true },
			})
			.subscribe((data) => {
				console.log(data);
				/*
				 * When the data changes the coursesList div is modified
				 */
				setCourses(data);

				/*
				 * if the selected course changes then emit the new students list
				 * if empty then emit an empty student list
				 */
				let signal = students$.getValue();
				if (signal && signal.type === "course") {
					let selected = data[signal.selected.id ?? ""];
					if (!Object.values(data).length || !selected) clearStudentsList();
					else setStudentList({ type: "course", selected, list: selected.students ?? {} });
				}
			});

		/*
		 * Clubs Observer
		 * (No Constraints Passed , So it listens to all Clubs)
		 * included with each club is the connected students and supervisor
		 */
		const clubSub = FrostApp.club
			.observeMany({ include: { supervisor: true, members: true } })
			.subscribe((data) => {
				/*
				 * When the data changes the clubsList div is modified
				 */
				setClubs(data);

				/*
				 * if the selected club changes then emit the new students list
				 * if empty then emit an empty student list
				 */
				let signal = students$.getValue();
				if (signal && signal.type === "club") {
					let selected = data[signal.selected.id ?? ""];
					if (!Object.values(data).length || !selected) clearStudentsList();
					else setStudentList({ type: "club", selected, list: selected.members ?? {} });
				}
			});

		return () => {
			clubSub.unsubscribe();
			courseSub.unsubscribe();
		};
	}, []);

	return (
		<div className="App">
			<img id="img" src="/logo.svg" />

			<Stack direction={"row"} gap={5} mx={"auto"} justifyContent={"center"} py={2}>
				<Button variant="contained" onClick={setData}>
					Set initial Mock Data
				</Button>
				<Button variant="contained" onClick={() => addStudents()}>
					Add Extra Students
				</Button>
			</Stack>

			<Stack direction={"row"} gap={5} justifyContent={"center"} alignItems={"start"} maxWidth={1280} mx={"auto"}>
				<CoursesList extraProps={{ flex: 1 }} data={courses} />
				<ClubsList extraProps={{ flex: 1 }} data={clubs} />
				<StudentsList flex={1} />
			</Stack>
		</div>
	);
}

export default App;
