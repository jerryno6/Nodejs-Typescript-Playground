import {
    RaccoonMeadowsVolunteers,
    RaccoonMeadowsActivity,
    raccoonMeadowsVolunteers,
} from './raccoon-meadows-log';

import {
    WolfPointVolunteers,
    WolfPointActivity,
    wolfPointVolunteers,
} from './wolf-point-log';

type CombinedActivity = RaccoonMeadowsActivity | WolfPointActivity;

type Volunteers = {
    id: number;
    name: string;
    activities: CombinedActivity[];
};

function combineVolunteers(volunteers: (RaccoonMeadowsVolunteers | WolfPointVolunteers)[]) {
    let result: Volunteers[] = [];

    result = volunteers.map(volunteer => {
        let id = volunteer.id;
        if (typeof id === 'string')
            id = parseInt(id, 10);

        let itemResult: Volunteers = {
            id: id,
            name: volunteer.name,
            activities: volunteer.activities
        }

        return itemResult;
    });

    return result;
}

function isVerified(verified: string | boolean): boolean {
    return (typeof verified === 'string' && verified === 'yes') ||
        (typeof verified === 'boolean' && verified === true)
}

function getHours(activity: CombinedActivity) {
    if ('hours' in activity) {
        return activity.hours;
    } else if ('time' in activity) {
        return activity.time;
    }
}

function calculateHours(volunteers: Volunteers[]) {
    return volunteers.map((volunteer) => {
        let hours = 0;

        volunteer.activities.forEach((activity) => {
            //validate input
            if (!isVerified(activity.verified))
                return;

            // accumulate hours
            hours += getHours(activity);

        });

        return {
            id: volunteer.id,
            name: volunteer.name,
            hours: hours,
        };
    });
}

function byHours(a,b){
    return b.hours - a.hours;
}

const combinedVolunteers = combineVolunteers(
    [].concat(wolfPointVolunteers, raccoonMeadowsVolunteers)
);

let result = calculateHours(combinedVolunteers)
    .sort(byHours);
    
console.log(result);