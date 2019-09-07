export const MOCK_PARENT_USERNAME = 'parent_kadibudka';
export const MOCK_PARENT_PASSWORD = 'parent_passw0rd!';
export const MOCK_PARENT_FULLNAME = 'parent_kadibudka';
export const MOCK_PARENT_EMAIL = 'parent_kadibudkas@email.cz';
export const MOCK_PARENT_KIDS = ['Matěj Obecný', 'Eliška'];

function generateDays(pseudoSeed: number) {
    const days = [];
    for (let i = 0; i <= 30; i++) {
        days.push({
            date: `2019-09-${i.toString().padStart(2, '0')}`,
            value: (i % pseudoSeed === 0),
        });
    }
    return days;
}

export const TEST_PARENT_KIDS_CALENDAR_2019_09 = [
    {
        fullname: 'Matěj Obecný',
        days: generateDays(3),
    },
    {
        fullname: 'Eliška',
        days: generateDays(4),
    },
];
export const MOCK_PARENT_NONEXISTING_USERNAME = 'parent_kadibudka';
export const MOCK_PARENT_NONEXISTING_PASSWORD = 'parent_passw0rd!';
export const MOCK_CHANGE_NEW_PASSWORD = 'parent_new_passw0rd!';