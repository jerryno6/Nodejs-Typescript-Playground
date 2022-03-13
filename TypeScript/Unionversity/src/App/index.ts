import { EventType } from "../Domain/Enums/enum";
import { SearchEventOptions } from "../Domain/Models/SearchEventsOptions";
import { StudyGroup } from "../Domain/Models/StudyGroup";
import { Course } from "../Domain/Models/Course";
import { enroll, searchEvents } from "../Services/CourseService";

let searchOption = new SearchEventOptions();
searchOption.query = 'research';
searchOption.eventType = EventType.Group;

let courses = searchEvents(searchOption);
// console.log(courses);

let enrolledEvents: (Course | StudyGroup)[] = [];
courses.forEach(x => enroll(x, enrolledEvents));
console.log(enrolledEvents);