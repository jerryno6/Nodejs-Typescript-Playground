import { CourseDto } from "./Dtos/CourseDto";
import courses from "../Mock/courses";
import { ICourse } from "../../Domain/Interfaces/Icourse";

function getCourse(): CourseDto[] {
    let result: CourseDto[] = [];

    courses.forEach((x: ICourse) => {
        result.push(new CourseDto(x));
    });

    return result;
}