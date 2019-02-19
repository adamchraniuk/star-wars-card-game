export const APP_STATES = {
    INIT: 0,
    LOADING: 1,
    RESULTS: 2,
    ERROR: 3,
};

export const TABLE_CONFIG = [
    {
        id: 'name',
        text: 'Name',
        field: 'name',
        type: 'text'
    },
    {
        id: 'height',
        text: 'Height',
        field: 'height',
        type: 'text'
    },
    {
        id: 'mass',
        text: 'Mass',
        field: 'mass',
        type: 'text'
    },
    {
        id: 'birth_year',
        text: 'Birth Year',
        field: 'birth_year',
        type: 'text'
    },
    {
        id: 'details_button',
        text: 'Details',
        type: 'button',
        link: '/people/',
        buttonText: 'Show details'
    }
];


export const DETAILS_CONFIG = [
    {
        id: 'name',
        text: 'Name',
        field: 'name',
        type: 'text'
    },
    {
        id: 'height',
        text: 'Height',
        field: 'height',
        type: 'text'
    },
    {
        id: 'mass',
        text: 'Mass',
        field: 'mass',
        type: 'text'
    },
    {
        id: 'birth_year',
        text: 'Birth Year',
        field: 'birth_year',
        type: 'text'
    },
    {
        id: 'gender',
        text: 'Gender',
        field: 'gender',
        type: 'text'
    },
    {
        id: 'eye_color',
        text: 'Eye Color',
        field: 'eye_color',
        type: 'text'
    },
];