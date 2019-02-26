import yoda from '../../images/avatars/yoda.png'

export const APP_STATES = {
    INIT: 0,
    IN_GAME: 1,
    END_GAME: 2
};

export const GAME_DECKS = {
    playerDeck: [
        {
            name: "Yoda",
            attack: 15,
            defence: 100,
            avatar: yoda,
            id: '1',
            cardEnable: true,
        },
        {
            name: "Luke",
            attack: 35,
            defence: 50,
            avatar: '',
            id: '2',
            cardEnable: true,
        },
        {
            name: "Yoda3",
            attack: 100,
            avatar: '',
            defence: 44,
            id: '3',
            cardEnable: true,
        },

    ],
    opponentDeck: [
        {
            name: "Darth1",
            avatar: '',
            defence: 100,
            attack: 11,
            id: '1'
        },
        {
            name: "Darth4",
            avatar: '',
            defence: 100,
            attack: 42,
            id: '2'
        },
        {
            name: "Darth3",
            avatar: '',
            defence: 100,
            attack: 33,
            id: '3'
        },
        {
            name: "Darth11",
            defence: 100,
            avatar: '',
            attack: 11,
            id: '4'
        },
        {
            name: "Darth41",
            avatar: '',
            defence: 100,
            attack: 41,
            id: '5'
        },
        {
            name: "Darth31",
            avatar: '',
            defence: 100,
            attack: 31,
            id: '6'
        },
    ],
};

export const GAME_CONFIG = {
    ROUND_LIMIT: 3,
};