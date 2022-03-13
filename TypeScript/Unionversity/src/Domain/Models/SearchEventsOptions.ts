import { EventType } from "../Enums/enum"

export class SearchEventOptions {
    query:string | number = '';
    eventType: EventType = EventType.Courses
}