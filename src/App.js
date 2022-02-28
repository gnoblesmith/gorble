import './App.css';
import TopBar from './components/top-bar/TopBar';
import MainView from './components/main-view/MainView';
import { useEffect, useState } from 'react';
import { checkWordValidity, checkWord } from './api/api';
import { NUM_GUESSES, NUM_LETTERS, LOCAL_STORAGE_STATE_KEY } from './reference/constants';
import { GuessResult } from './reference/enums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWin, addLoss, getMetagameData } from './metagame-state/metagame-state';

function App() {
  const style = {
    background: "black",
    color: "white",
    width: "100%",
    height: "100vh",
    userSelect: "none",
  };

  const [gameState, setGameState] = useState(() => {
    return {
      activeRow: 0,
      activeCol: 0,
      letterGrid: new Array(NUM_GUESSES).fill({status: GuessResult.NO, value: ''}).map(() => new Array(NUM_LETTERS).fill({status: GuessResult.NO, value: ''}))
    }
  });

  const [metagameData, setMetagameData] = useState();

  const [loading, setLoading] = useState(false);

  const setGameStateWithSave = (updateFunc) => {
    setGameState((prev) => {
      const next = updateFunc(prev);
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(next));
      return next;
    });
  }

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
    setMetagameData(getMetagameData());
  }, []);

  const onWin = () => {
    toast("nice job!", {
      toastId: 'win-toast'
    });
    addWin(gameState);
    setMetagameData(getMetagameData());
  }

  const onLose = () => {
    toast("you lose :(", {
      toastId: 'lose-toast'
    });
    addLoss();
    setMetagameData(getMetagameData());
  }

  const onInvalidWord = () => {
    toast("word not in word list", {
      toastId: 'invalid-word-toast'
    });
  }

  const alreadyPlayedTodaysGame = () => {
    return !!metagameData.history[new Date().toDateString()];
  }

  const onKeyboardClick = (key) => {
    if (alreadyPlayedTodaysGame()) return;

    const row = gameState.activeRow;
    const col = gameState.activeCol;

    if (key === 'backspace') {
      if (col > 0) {
        setGameStateWithSave(prev => {
          const copy = prev.letterGrid;
          copy[row][col-1] = {
            ...copy[row][col],
            value: ''
          };
          return {
            ...prev,
            letterGrid: copy
          }
        });
        setGameStateWithSave(prev => {
          return {
            ...prev,
            activeCol: prev.activeCol-1
          }
        });
      }
    } else if (key === 'enter') {
      if (col === NUM_LETTERS) {
        let guess = '';
        gameState.letterGrid[row].forEach(cell => guess += cell.value);

        setLoading(true);
        checkWordValidity(guess).then((valid) => {
          if (valid) {
            checkWord(guess).then(response => {
              setGameStateWithSave(prev => {
                let copy = prev.letterGrid;
                copy[row] = copy[row].map((row, index) => {
                  return {
                    ...row,
                    status: response[index]
                  };
                });
                if (copy[row].filter(cell => cell.status === GuessResult.YES).length === NUM_LETTERS) {
                  onWin();
                } else if (row === NUM_GUESSES-1) {
                  onLose();
                }

                return {
                  ...prev,
                  letterGrid: copy
                };
              })

              setGameStateWithSave((prev) => {
                return {
                  ...prev,
                  activeCol: 0,
                }
              });
              setGameStateWithSave((prev) => {
                return {
                  ...prev,
                  activeRow: prev.activeRow+1,
                }
              });
            });
          } else {
            onInvalidWord();
          }
        }).finally(() => setLoading(false));
      }
    } else {
      if (col < NUM_LETTERS) {
        setGameStateWithSave(prev => {
          const copy = prev.letterGrid;
          copy[row][col] = {
            ...copy[row][col],
            value: key.toUpperCase()
          }
          return {
            ...prev,
            letterGrid: copy
          };
        });
        setGameStateWithSave((prev) => {
          return {
            ...prev,
            activeCol: prev.activeCol+1,
          }
        });
      }
    }
  }

  return <div style={style}>
    <TopBar />
    <ToastContainer />
    <MainView loading={loading} letterGrid={gameState.letterGrid} onKeyboardClick={onKeyboardClick} />
  </div>
}

export default App;
