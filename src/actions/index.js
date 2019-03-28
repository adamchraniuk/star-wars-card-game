import store from '../store/index';


export function fetchPlayerDeck(playerName) {
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
                const deck = response.deck;
                const newData = {
                    ...prevData,
                    deck,
                    ...response
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
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
                const playerAllCards = response.playerAllCards;
                const newData = {
                    ...prevData,
                    playerAllCards,
                    ...response
                };
                dispatch(fetchDataSuccess(newData));
            })
            .catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

//OPPONENTS ACTIONS
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
                if(opponentCards.length > 5){
                    opponentCards.splice(0,5);
                }
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

//SHOP ACTIONS

export function savePlayerCards(playerName, actualPocket) {
    return dispatch => {
        return fetch('http://localhost:8000/PlayerDeck/' + playerName, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                playerAllCards: store.getState().data.playerAllCards,
                pocket: actualPocket,
                deck: store.getState().data.deck
            }),
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error!');
            }
        }).catch(error => {
                dispatch(fetchDataFailure(error));
            });
    }
}

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

export const FETCH_DATA_BEGIN =
    "FETCH_DATA_BEGIN";

export const FETCH_DATA_SUCCESS =
    "FETCH_PAGES_SUCCESS";

export const FETCH_DATA_FAILURE =
    "FETCH_PAGES_FAILURE";


export const fetchDataBegin = () => ({
    type: FETCH_DATA_BEGIN
});

export const fetchDataSuccess = (data) => ({
    type: FETCH_DATA_SUCCESS,
    payload: {data},
});

export const fetchDataFailure = error => ({
    type: FETCH_DATA_FAILURE,
    payload: {error}
});
