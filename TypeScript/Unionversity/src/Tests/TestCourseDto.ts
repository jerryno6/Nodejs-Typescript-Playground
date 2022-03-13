import { ICourse } from "../Domain/Interfaces/Icourse";
import { Course } from "../Domain/Models/Course";

const courses = [
    {
        id: 1,
        studyGroupId: 1,
        title: 'Improvisational Arts Lab',
        keywords: ['improv', 'art', 'performance', 'lab'],
        eventType: 'course',
    }];


let a = new Course(courses[0]);

console.log(a.title);