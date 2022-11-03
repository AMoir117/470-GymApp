

function pluckAttributes(course, attributesToPluck) {
    return attributesToPluck.reduce((accu, attribute) => {
        accu[attribute] = course[attribute];
        return accu;
    }, {});
}

function pluckCourseBaseAttributes(course) {
    const attributesToPluck = [
        'term',
        'subject',
        'catalog',
        'course_title',
        'units',
        'class_number',
        'combined_class_number',
    ];
    let courseBase = pluckAttributes(course, attributesToPluck);

    return courseBase;
}

function pluckCourseComponentAttributes(course) {
    let attributesToPluck = [
        'class_number',
        'section',
        'component',
        'class_type'
    ];

    return pluckAttributes(course, attributesToPluck);
}

function pluckCourseInstructorAttributes(course) {
    const attributesToPluck = [
        'instructor_id',
        'instructor_fName',
        'instructor_mName',
        'instructor_lName',
    ];

    return pluckAttributes(course, attributesToPluck);
}

function pluckMeetingPatternAttributres(course) {
    const attributesToPluck = [
        'facility_name',
        'meeting_pattern',
        'start_time',
        'end_time',
    ];

    return pluckAttributes(course, attributesToPluck);
}

function addIfNotAMember(item, collectionOfItems) {

    const filtered = collectionOfItems.filter(singleItem => {
        return ! Object.keys(item).reduce((accu, attribute) => {
            return accu && item[attribute] == singleItem[attribute];
        }, true);
    });

    filtered.push(item);
    return filtered;
}

function createStudentViewOfCourses(courses) {
    const transcriptView = courses.reduce((coursesDict, course) => {
        const key = `${course.subject}-${course.catalog} ${course.term} ${course.parent_class_number}`;

        coursesDict[key] = coursesDict[key] || pluckCourseBaseAttributes(course);
        coursesDict[key]['components'] = coursesDict[key]['components'] || [];
        if( ! coursesDict[key][course.component] ) {
            coursesDict[key][course.component] = {
                ...pluckCourseComponentAttributes(course),
                instructors: [],
                meeting_pattern: []
            }
        }

        coursesDict[key]['components'].push(course.component);
        const instructor = pluckCourseInstructorAttributes(course);
        coursesDict[key][course.component].instructors = addIfNotAMember(instructor, coursesDict[key][course.component].instructors);
        const meeting_pattern = pluckMeetingPatternAttributres(course);
        coursesDict[key][course.component].meeting_pattern = addIfNotAMember(meeting_pattern, coursesDict[key][course.component].meeting_pattern);

        return coursesDict;
    }, {});

    return transcriptView;
}

module.exports = createStudentViewOfCourses;
