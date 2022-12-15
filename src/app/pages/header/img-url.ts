import { templateJitUrl } from "@angular/compiler";
import { FormGroup } from "@angular/forms";

export const imgUrls = [
    "'../../../assets/images/startImg1_tmp.jpg'",
    "'../../../assets/images/startImg2_tmp.jpg'",
    "'../../../assets/images/startImg13_tmp.jpg'",
    "'../../../assets/images/startImg11_tmp.jpg'",
    "'../../../assets/images/startImg16_tmp.jpg'",
];

export const bases = [
    'בח_א_21',
    'כנף_1',
    'יב_א_צפונית',
    'ממח_א_111',
    'יב_א_מרכז',
    'בח_א_8',
    'כנף_4',
    'בח_א_28',
    'בח_א_6',
    'ביסל_א',
    'יב_א_דרומית',
    'בח_א_10',
    'כנף_25',
    'בח_א_30',
];

export const openingParagraphs = [
    "המערך הטכני הינו המערך הגדול בחיל. משרתים בו גברים ונשים במגוון עצום של מקצועות ותחומי עיסוק. אנשי המערך אחראים לתפעול השוטף של חיל האוויר, לאחזקת כלי הטיס, מערכות הנשק והציוד, לתחומי הלוגיסטיקה, ההנדסה, הפיתוח ולבנין כוחו של החיל.",
    " אנשי המערך - בטייסות הטיסה, בסוללות ההגנ''א, ביב''אות, בטייסות התחזוקה, ביחידות הבינוי, ביחידות הלוגיסטיות, במטה החיל ובדרגי ה- ד' - הם מקור עוצמתנו. אנשים מסורים ומקצועיים שפועלים למען חיל האוויר."
]

export const openingVideosUrl = [
    "rDNDHfgwzlg",
    "4z4_oJ0FxV0",
    "GWabNedaFBI"
]

export const equalshWords = [
    "ברק סופה f16 F16 f-16 F-16",
    "F15 F-15 f15 f-15 בז רעם",
    "F35 F-35 f35 f-35 אדיר",
    "א' א׳",
    "ב' ב׳",
    "ג'ג׳",
    "ד' ד׳"
];

interface selection {
    title: string;
    HTMLelement: string;
    inputPlaceholder: string;
    selectionsOptions?: option[];
    selectOptions?: any[];
    validName: string;
    formControlName: string;
}

interface page {
    formGroup?: FormGroup;
    ngSubmit: string;
    buttonText: string;
    buttonFunc: string;
    func: () => void;
    items: selection[];
}

export interface option {
    name: string;
    text: string;
    expansion: boolean;
}

interface iCycle {
    name: string;
}

export const selectionPage: page[] = [
    {
        ngSubmit: "moveNextPage",
        buttonText: "המשך",
        buttonFunc: "moveNextPage",
        func: () => void {},
        items: [
            {
                title: "מחזור המיון",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                validName: "cycleInput",
                formControlName: "cycleInput"
            },
            {
                title: "מגדר",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: ['אלקטרוניקה', 'אחזקה מתכת/ חשמל'],
                validName: "genderInput",
                formControlName: "genderInput"
            },
            {
                title: "שם פרטי + שם משפחה",
                HTMLelement: "input",
                inputPlaceholder: "",
                validName: "nameInput",
                formControlName: "nameInput"
            },
            {
                title: "מספר תעודת זהות",
                HTMLelement: "input",
                inputPlaceholder: "",
                validName: "idInput",
                formControlName: "idInput"
            },
            {
                title: "מסגרת מיון",
                HTMLelement: "input",
                inputPlaceholder: "הערך חייב להיות מספר",
                validName: "sortNumberInput",
                formControlName: "sortNumberInput"
            }
        ]
    },
    {
        ngSubmit: "sendForm",
        buttonText: "שלח",
        buttonFunc: "sendForm",
        func: () => void {},
        items: [
            {
                title: "העדפה ראשונה",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                validName: "firstOption",
                formControlName: "firstOption"
            },
            {
                title: "סיבה להעדפה ראשונה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        name: 'cause1',
                        text: 'מוטיבציה לתפקיד',
                        expansion: false
                    },
                    {
                        name: '2',
                        text: 'קרבה למקום מגורים',
                        expansion: false
                    },
                    {
                        name: '3',
                        text: 'חברים (יש לציין שמות)',
                        expansion: true
                    },
                    {
                        name: '4',
                        text: 'אחר',
                        expansion: true
                    }],
                validName: "firstCauses",
                formControlName: "firstCauses"

            },
            {
                title: "העדפה שנייה",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                validName: "secondOption",
                formControlName: "secondOption"
            },
            {
                title: "סיבה להעדפה שנייה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        name: '',
                        text: 'מוטיבציה לתפקיד',
                        expansion: false
                    },
                    {
                        name: '',
                        text: 'קרבה למקום מגורים',
                        expansion: false
                    },
                    {
                        name: '',
                        text: 'חברים (יש לציין שמות)',
                        expansion: true
                    },
                    {
                        name: '',
                        text: 'אחר',
                        expansion: true
                    }],
                validName: "secondCauses",
                formControlName: "secondCauses"

            },
            {
                title: "העדפה שלישית",
                HTMLelement: "select",
                inputPlaceholder: "",
                selectOptions: [],
                validName: "thirdOption",
                formControlName: "thirdOption"
            },
            {
                title: "סיבה להעדפה שלישית",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                selectionsOptions: [
                    {
                        name: '',
                        text: 'מוטיבציה לתפקיד',
                        expansion: false
                    },
                    {
                        name: '',
                        text: 'קרבה למקום מגורים',
                        expansion: false
                    },
                    {
                        name: '',
                        text: 'חברים (יש לציין שמות)',
                        expansion: true
                    },
                    {
                        name: '',
                        text: 'אחר',
                        expansion: true
                    }],
                validName: "thirdCauses",
                formControlName: "thirdCauses"

            }
        ]
    }
];

export const NavTitles_logedIn: string[] = [
    'שאלון העדפות',
    'מחזורי מיון',
    'יצירת מחזור מיון חדש',
    'עריכת מחזור מיון קיים',
    // 'עריכת קורס'
];

export const NavTitles_logedOut: string[] = [
    'התחבר'
];

export interface managerPage {
    title: string;
    // firstInput: string;
    table: boolean;
    courses: boolean;
    items?: selection[];
    selectionForm?: selection;
}

// interface

export const managerPages = [
    {
        title: "שאלון העדפות",
        // firstInput: "שם מחזור המיון",
        table: true,
        courses: false,
    },
    {
        title: 'מחזורי מיון',
        table: false,
        courses: false
    },
    {
        title: "יצירת מחזור מיון חדש",
        // firstInput: "שם מחזור המיון",
        table: false,
        courses: true,
        items: [
            {
                title: "שם מחזור מיון",
                HTMLelement: "input",
                inputPlaceholder: "לדוגמא: דצמבר 2022",
                validName: "", //----
                formControlName: "" //---
            }
        ],
        selectionPage: {
            title: "יצירת שאלון העדפות",
            HTMLelement: "checkbox",
            inputPlaceholder: "",
            validName: "", //----
            formControlName: "" //--- 
        }
    },
    {
        title: "עריכת מחזור מיון קיים",
        // firstInput: "בחר מחזור מיון שברצונך לערוך",
        table: false,
        courses: true,
        items: [
            {
                title: "בחר מחזור מיון שברצונך לערוך",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "", //----
                formControlName: "" //---
            }
        ],
        selectionPage: {
            title: "יצירת שאלון העדפות",
            HTMLelement: "checkbox",
            inputPlaceholder: "",
            validName: "", //----
            formControlName: "" //--- 
        }
    }
];

interface coursesSort {
    courseName: string;
    courseNum: string;
}

export const listAvionics: coursesSort[] = [
    // {
    //     courseName: "טכנאי אוויוניקה מסוק יסעור",
    //     courseNum: "1139"
    // },
    // {
    //     courseName: "טכנאי אוויוניקה מטוס אדיר",
    //     courseNum: "1404"
    // },
    // {
    //     courseName: "טכנאי דרג ד' מערכות אלקטרוניקה",
    //     courseNum: "1541"
    // }, {
    //     courseName: "טכנאי אוויוניקה מטוס ברק/ סופה",
    //     courseNum: "1551"
    // }, {
    //     courseName: "טכנאי מכ''מ מערכת חץ",
    //     courseNum: "1578"
    // },
    // {
    //     courseName: "טכנאי מערכות בקרת טיסה",
    //     courseNum: "1805"
    // }
];

export const listMaintenace: coursesSort[] = [
    {
        courseName: "טכנאי דרג א' ברק/ סופה",
        courseNum: "1373"
    }, {
        courseName: "טכנאי נשק מונחה",
        courseNum: "1630"
    }, {
        courseName: "טכנאי דרג א' מטוס תובלה כבדה ראם",
        courseNum: "0827"
    }, {
        courseName: "טכנאי חשמל מטוסים אחוד (חמ''מ)",
        courseNum: "1266"
    }, {
        courseName: "טכנאי צב''ה ציוד בטיחות והצלה",
        courseNum: "0366"
    }, {
        courseName: "טכנאי מנועים",
        courseNum: "1520"
    }
];

