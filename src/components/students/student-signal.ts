import { Club, Course, StudentWithMetadata } from "@frost-orm/frost-web-client/generated";
import { bind } from "@react-rxjs/core";
import { createSignal } from "@react-rxjs/utils";

export const StudentsListEmptySignal: null = null;
export type StudentsListSignal =
	| {
			type: "course";
			selected: Course;
			list: Record<string, StudentWithMetadata>;
	  }
	| {
			type: "club";
			selected: Club;
			list: Record<string, StudentWithMetadata>;
	  }
	| typeof StudentsListEmptySignal;

export const [studentListSignal$, setStudentList] = createSignal<StudentsListSignal>();

export const [useStudentsSignal, students$] = bind(studentListSignal$, StudentsListEmptySignal);
export const clearStudentsList = ()=>setStudentList(StudentsListEmptySignal)