import { LOCAL_STORAGE_METAGAME_DATA_KEY } from '../reference/constants';

const initMetagameData = {
    history: {},
};

export const getMetagameData = () => {
    const loc = localStorage.getItem(LOCAL_STORAGE_METAGAME_DATA_KEY);

    if (!loc) {
        localStorage.setItem(LOCAL_STORAGE_METAGAME_DATA_KEY, JSON.stringify(initMetagameData));
        return initMetagameData;
    }

    return JSON.parse(loc);
}

export const addWin = (endGameState) => {
    let data = getMetagameData();

    data.history[endGameState.date] = {
        ...endGameState,
        won: true
    }

    localStorage.setItem(LOCAL_STORAGE_METAGAME_DATA_KEY, JSON.stringify(data));
}

export const addLoss = (endGameState) => {
    let data = getMetagameData();

    data.history[(new Date().toDateString())] = endGameState;
    
    localStorage.setItem(LOCAL_STORAGE_METAGAME_DATA_KEY, JSON.stringify(data));
}

export const getGamesWon = (metagameData) => {
    const games = Object.values(metagameData.history);

    const wins = games.filter(game => {
        return game.won
    });

    return wins.length;
}
