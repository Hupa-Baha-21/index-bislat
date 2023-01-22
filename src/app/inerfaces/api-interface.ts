export interface bases {
    name: string
}

export interface iCourseForSelectionPage {
    courseName: string
    courseNumber: string
    gender: string
}

export interface iCycle {
    name: string;
}

export interface iSelectionForm {
    title: string
    gender: string
    id: string
    fullName: string
    sortFrame: number
    first: string
    resonef: string
    second: string
    resones: string
    third: string
    resonet: string
}

// export interface isort {
//     name: string;
//     courses: iCourseForSelectionPage
// }

export interface isort {
    name: string;
    isExpand: boolean;
}
