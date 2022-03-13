export class BaseCourse<T> {
    constructor(source: Partial<T>){
        Object.assign(this,source);
    }

    id: number = 0;
    studyGroupId: number = 0;
    title: string = '';
    keywords: string[] = [];
    eventType: string = '';
}