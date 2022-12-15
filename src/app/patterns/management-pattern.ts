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