import { templateJitUrl } from "@angular/compiler";
import { FormGroup } from "@angular/forms";

export const imgUrls = [
    "'../../../assets/images/startImg1.jpg'",
    "'../../../assets/images/startImg2.jpg'",
    "'../../../assets/images/startImg3.jpg'",
    "'../../../assets/images/startImg4.jpg'",
    "'../../../assets/images/startImg5.jpg'"
];

export const bases = [
    'בח_א_21',
    'כנף_1',
    'כנף_15',
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
    "4z4_oJ0FxV0"
]

interface selection {
    title: string;
    HTMLelement: string;
    selectOptions?: string[]; ///-------------
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
                title: "העדפה שנייה",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "secondOption",
                formControlName: "secondOption"
            },
            {
                title: "העדפה שלישית",
                HTMLelement: "select",
                inputPlaceholder: "",
                validName: "thirdOption",
                formControlName: "thirdOption"
            }
        ]
    }
];

export const NavTitles: string[] = [
    'דף הבית',
    'שאלון העדפות',
    'יצירת מחזור מיון חדש',
    'עריכת מחזור מיון קיים',
    'התנתק'
];

// export const managerPage = [

// ];