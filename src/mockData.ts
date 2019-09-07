export const MOCK_PARENT_USERNAME = 'parent_kadibudka';
export const MOCK_PARENT_PASSWORD = 'parent_passw0rd!';
export const MOCK_PARENT_FULLNAME = 'parent_kadibudka';
export const MOCK_PARENT_EMAIL = 'parent_kadibudkas@email.cz';
export const MOCK_PARENT_KIDS = ['Matěj Obecný', 'Eliška'];

export const MOCK_FIRST_CHILD_ID = '1f9a9-46a8c';
export const MOCK_SECOND_CHILD_ID = 'ac5e2-c4a8f';

function generateDays(pseudoSeed: number) {
    const days = [];
    for (let i = 1; i <= 30; i++) {
        days.push({
            date: `2019-09-${i.toString().padStart(2, '0')}`,
            value: (i % pseudoSeed === 0),
        });
    }
    return days;
}

export const MOCK_PARENT_KIDS_CALENDAR_2019_09 = [
    {
        fullname: 'Matěj Obecný',
        childId: MOCK_FIRST_CHILD_ID,
        days: generateDays(3),
    },
    {
        fullname: 'Eliška',
        childId: MOCK_SECOND_CHILD_ID,
        days: generateDays(4),
    },
];
export const MOCK_PARENT_NONEXISTING_USERNAME = 'parent_kadibudka';
export const MOCK_PARENT_NONEXISTING_PASSWORD = 'parent_passw0rd!';
export const MOCK_CHANGE_NEW_PASSWORD = 'parent_new_passw0rd!';

export const MOCK_TEACHER_USERNAME = 'parent_kadibudka';
export const MOCK_TEACHER_PASSWORD = 'parent_passw0rd!';

export const MOCK_ADMIN_USERNAME = 'admin_kadibudka';
export const MOCK_ADMIN_PASSWORD = 'admin_passw0rd!';

export const MOCK_NEW_TEACHER_DATA = {
    fullname: 'Moje malá učitelka',
    email: 'ucitelka@klubucitelu.cz',
    type: 'teacher',
};
export const MOCK_NEW_PARENT_DATA = {
    fullname: 'Anina Čudáková',
    email: 'cudakova@sitmp.cz',
    type: 'parent',
    kids: [],
};