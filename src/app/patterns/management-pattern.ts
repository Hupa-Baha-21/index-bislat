import { iCourseForSelectionPage } from "../inerfaces/api-interface";

export interface iManagerPage {
    title: string;
    elements?: [{
        subtitle?: string;
        elementType: string;
        items: [{
            text: string;
            URL: string;
        }]
    }];
}

export const managerPage: iManagerPage = {
    title: 'מחזורי מיון',
}
export const s = [
    {
        url: 'opening-cycles',
        elements: [
            {
                type: 'blob',
                title: '',
                image: '../../../../assets/images/arrowReadMore.png'
            }
        ]
    },
    {
        url: 'add-new-cycle',
        elements: [
            {
                type: 'input',
                title: 'שם מחזור המיון',
                placeholder: 'לדוגמא: דצמבר 2022'
            },
            {
                type: 'search',
                title: 'הוספת קורסים',
                placeholder: 'הקלד מספר/ שם מקצוע',
            },
            {
                type: 'check-box',
                title: 'הצגת המחזור מיון באתר',
                show: true
            },
            {
                type: 'check-box',
                title: 'פתיחת שאלון העדפות',
                show: false
            },
            {
                type: 'button',
                title: 'סיום',
            },
            {
                type: 'button',
                title: 'ביטול'
            }
        ]
    }
]