import store from '../store/index';

export function fetchData() {
    return dispatch => {
        dispatch(fetchDataBegin());

        return fetch('http://localhost:8000/AllCards')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then((response) => dispatch(fetchDataSuccess({allCards: response})))
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    };
}

export function fetchPlayerCards(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName)
            .then(dispatch(fetchDataBegin()))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                const prevData = store.getState().data;
                const playerCards = response.deck;
                const newData = {
                    ...prevData,
                    playerCards,
                    ...response
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

export function fetchOpponentCard(opponentName) {
    return dispatch => {
        return fetch('http://localhost:8000/' + opponentName)
            .then(dispatch(fetchDataBegin()))
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error!');
                }
            })
            .then(response => {
                const prevData = store.getState().data;
                const opponentCards = response;
                const newData = {
                    ...prevData,
                    opponentCards,
                    ...response
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}


export function saveallCards(playerName) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                deck: store.getState().data.playerCards,
                pocket: store.getState().data.pocket,
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).then(() => {
            alert('Your deck has been saved.')
        })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

export const FETCH_DATA_BEGIN =
    "FETCH_DATA_BEGIN";

export const FETCH_DATA_SUCCESS =
    "FETCH_PAGES_SUCCESS";

export const FETCH_DATA_FAILURE =
    "FETCH_PAGES_FAILURE";


export const FETCH_DATA_UPDATE =
    "FETCH_DATA_UPDATE";

export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = (data) => (
    {
        type: FETCH_DATA_SUCCESS,
        payload: {data},
    }
);

export const fetchDataUpdate = (newData) => (
    {
        type: FETCH_DATA_UPDATE,
        payload: {...newData},
    }
);

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: {error}
});
