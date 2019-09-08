export const splitArray = <T>(array: T[], splitSize: number): T[][] => {
    const arrayOfArrays = [];

    let i, j;
    for (i = 0, j = array.length; i < j; i += splitSize) {
        arrayOfArrays.push(array.slice(i, i + splitSize));
    }

    return arrayOfArrays;
};

export const filterOutDuplicatesFromArray = <T>(list: T[]): T[] => {
    return list.filter(function(elem, pos) {
        return list.indexOf(elem) === pos;
    });
};

export const parseJsonBody = (body: string): any => {
    try {
        return JSON.parse(body);
    } catch (e) {
        console.log('Can\'t parse JSON body, error: ', e);
        return null;
    }
};

export const arrayContains = <T>(array: T[], item: T) => {
    return (array.indexOf(item) > -1);
};

export const prettyJson = (object: any) => JSON.stringify(object, null, 2);
