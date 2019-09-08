export const MOCK_PARENT_USERNAME = 'parent_kadibudka3';
export const MOCK_PARENT_PASSWORD = 'parent_passw0rd!3';
export const MOCK_PARENT_FULLNAME = 'Nejlepší Standa';
export const MOCK_PARENT_EMAIL = 'parent_kadibudkas@email.cz';

export const MOCK_FIRST_CHILD_ID = '1f9a9-46a8c';
export const MOCK_SECOND_CHILD_ID = 'ac5e2-c4a8f';
export const MOCK_PARENT_CHILDREN = [MOCK_FIRST_CHILD_ID, MOCK_SECOND_CHILD_ID];

function generateDays(pseudoSeed: number) {
    const days = {};
    for (let i = 1; i <= 30; i++) {
        days[`2019-09-${i.toString().padStart(2, '0')}`] = (i % pseudoSeed === 0);
    }
    return days;
}

export const MOCK_PARENT_CHILDREN_CALENDAR_2019_09 = [
    {
        fullname: 'Patrik Obecný',
        childId: MOCK_FIRST_CHILD_ID,
        'class': '3h',
        going: generateDays(3),
    },
    {
        fullname: 'Eliška',
        childId: MOCK_SECOND_CHILD_ID,
        'class': '1g',
        going: generateDays(4),
    },
];
export const MOCK_PARENT_NONEXISTING_USERNAME = 'parent_kadibudka_non';
export const MOCK_PARENT_NONEXISTING_PASSWORD = 'parent_passw0rd!-on';
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
    children: [],
};

export const MOCK_NEW_TEACHER_DATA_EDIT_REQUEST = {
    fullname: 'This Time Large Teacher',
    email: 'largeteacher@email.cz',
};
export const MOCK_NEW_PARENT_DATA_EDIT_REQUEST = {
    fullname: 'This Time Large Teacher',
    email: 'largeteacher@email.cz',
    children: ['Tonda'],
};
export const MOCK_NEW_TEACHER_DATA_EDITED = {
    ...MOCK_NEW_TEACHER_DATA,
    ...MOCK_NEW_TEACHER_DATA_EDIT_REQUEST,
};
export const MOCK_NEW_PARENT_DATA_EDITED = {
    ...MOCK_NEW_PARENT_DATA,
    ...MOCK_NEW_PARENT_DATA_EDIT_REQUEST,
};

export const MOCK_NEW_CHILD = {
    parent: 'ERROR_MOCK_NO_CHILD_ID',
    fullname: 'Moje Nové Mock Dítě Name',
    class: '1g',
};

export const MOCK_NEW_CLASS = {
    fullname: 'My little class of blackies',
    code: '1g',
};

export const MOCK_CLASS_ID = 'my-child-id-chill-sds55a';