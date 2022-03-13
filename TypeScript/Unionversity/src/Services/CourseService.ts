import courses from "../DataLayer/Mock/courses";
import studyGroups from "../DataLayer/Mock/studyGroups";
import { EventType } from "../Domain/Enums/enum";
import { Course } from "../Domain/Models/Course";
import { StudyGroup } from "../Domain/Models/StudyGroup";
import { SearchEventOptions } from "../Domain/Models/SearchEventsOptions";

export function searchEvents(options: SearchEventOptions): (Course | StudyGroup)[] {

    let events: (Course | StudyGroup)[] = options.eventType === EventType.Group ?
        studyGroups as any[] as Course[] :
        courses as any[] as StudyGroup[];

    let filteredCourses = events
        .filter((x: Course | StudyGroup) => {
            if (typeof options.query === 'number')
                return x.id === options.query;

            if (typeof options.query === 'string')
                // return x.keywords.some(k => k === options.query)
                return x.keywords.includes(options.query);
        });

    return filteredCourses;
}

export function enroll(event: Course | StudyGroup, enrolledEvents: (Course | StudyGroup)[]) {
    enrolledEvents.push(event);
}