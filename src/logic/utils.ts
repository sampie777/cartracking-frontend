export function dateFrom(date: Date | string): Date {
    if (typeof date === "string") {
        return new Date(date);
    }
    return date;
}

export function format(date: Date | string | null | undefined, format: string) {
    if (date == null || date === "") return "";

    if (typeof date === "string") {
        date = new Date(date);
    }
    return format
        .replace(/%dd/g, date.getDate().toString().padStart(2, '0'))
        .replace(/%d/g, date.getDate().toString())
        .replace(/%mm/g, (date.getMonth() + 1).toString().padStart(2, '0'))
        .replace(/%m/g, (date.getMonth() + 1).toString())
        .replace(/%YYYY/g, date.getFullYear().toString())
        .replace(/%YY/g, (date.getFullYear() % 100).toString())
        .replace(/%Y/g, date.getFullYear().toString())
        .replace(/%HH/g, date.getHours().toString().padStart(2, '0'))
        .replace(/%H/g, date.getHours().toString())
        .replace(/%MM/g, date.getMinutes().toString().padStart(2, '0'))
        .replace(/%M/g, date.getMinutes().toString())
        .replace(/%SS/g, date.getSeconds().toString().padStart(2, '0'))
        .replace(/%S/g, date.getSeconds().toString())
        .replace(/%f/g, date.getMilliseconds().toString().padStart(3, '0'));
}

export function capitalize(word: string) {
    if (word.length === 0) {
        return word;
    }

    if (word.length === 1) {
        return word.toUpperCase();
    }

    return word.charAt(0).toUpperCase() + word.substring(1);
}

export class ValidationError extends Error {
}

export function validate(result: boolean, message?: string) {
    if (result) {
        return;
    }
    throw new ValidationError(message || "Value is not true");
}

export const objectToArrayIfNotAlready = (obj: any) => {
    if (obj === undefined) {
        return [];
    }
    if (obj instanceof Array) {
        return obj;
    }
    return [obj];
};

const languageAbbreviationMap = {
    "AF": "Afrikaans",
    "NL": "Nederlands",
    "EN": "English",
    "DE": "Deutsch",
    "FA": "Français"
};
export const languageAbbreviationToFullName = (abbreviation: string) => {
    // @ts-ignore
    return languageAbbreviationMap[abbreviation.toUpperCase()] || abbreviation;
};

export const runAsync = (f: () => any) => setTimeout(f, 0);
export const emptyPromise = (): Promise<null> => new Promise((resolve => resolve(null)));
export const emptyPromiseWithValue = <T>(value: T): Promise<T> => new Promise((resolve => resolve(value)));
