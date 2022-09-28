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
    "א' א׳",
    "ב' ב׳",
    "ג'ג׳",
    "ד' ד׳"
];

interface selection {
    title: string;
    HTMLelement: string;
    inputPlaceholder: string;
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
                validName: "cycleInput",
                formControlName: "cycleInput"
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
            },
            {
                title: "מגדר",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "genderInput",
                formControlName: "genderInput"
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
                validName: "firstOption",
                formControlName: "firstOption"
            },
            {
                title: "סיבה להעדפה ראשונה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                validName: "firstCause",
                formControlName: "firstCause"

            },
            {
                title: "העדפה שנייה",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "secondOption",
                formControlName: "secondOption"
            },
            {
                title: "סיבה להעדפה שנייה",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                validName: "secondCause",
                formControlName: "secondCause"

            },
            {
                title: "העדפה שלישית",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "thirdOption",
                formControlName: "thirdOption"
            },
            {
                title: "סיבה להעדפה שלישית",
                HTMLelement: "checkbox",
                inputPlaceholder: "",
                validName: "thirdCause",
                formControlName: "thirdCause"

            }
        ]
    }
];

export const NavTitles: string[] = [
    'שאלון העדפות',
    'יצירת מחזור מיון חדש',
    'עריכת מחזור מיון קיים',
    'התנתק'
];

export interface managerPage {
    title: string;
    // firstInput: string;
    table: boolean;
    courses: boolean;
    items?: selection[];
    selectionForm?: selection;
}

export const managerPages = [
    {
        title: "שאלון העדפות",
        // firstInput: "שם מחזור המיון",
        table: true,
        courses: false,
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
    {
        courseName: "טכנאי אבנט כחול פורס",
        courseNum: "1532"
    },
    {
        courseName: "טכנאי מכ''מ מערכת כיפת ברזל/ קלע דוד",
        courseNum: "1574"
    },
    {
        courseName: "טכנאי אוויוניקה מסוק עטלף",
        courseNum: "1319"
    },
    {
        courseName: "טכנאי מערכות קשר יחידות טיסה",
        courseNum: "1245"
    },
    {
        courseName: "טכנאי מערכות לוחמה אלקטרונית",
        courseNum: "1234"
    }
];

