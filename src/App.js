import './App.css';
import TopBar from './components/top-bar/TopBar';
import MainView from './components/main-view/MainView';
import { useEffect, useState } from 'react';
import { checkWordValidity, checkWord, getWord } from './api/api';
import { NUM_GUESSES, NUM_LETTERS, LOCAL_STORAGE_STATE_KEY } from './reference/constants';
import { GuessResult } from './reference/enums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addWin, addLoss, getMetagameData } from './metagame-state/metagame-state';
import StatsModal from './components/stats-modal/StatsModal';

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
      date: new Date().toDateString(),
      activeRow: 0,
      activeCol: 0,
      letterGrid: new Array(NUM_GUESSES).fill({status: '', value: ''}).map(() => new Array(NUM_LETTERS).fill({status: '', value: ''}))
    }
  });

  const [metagameData, setMetagameData] = useState();

  const [loading, setLoading] = useState(false);
  const [statModalShowing, setStatModalShowing] = useState(false);
  const [keyboardLetterStatuses, setKeyboardLetterStatuses] = useState({});

  const setGameStateWithSave = (updateFunc) => {
    setGameState((prev) => {
      const next = updateFunc(prev);
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(next));
      return next;
    });
  }

  useEffect(() => {
    const savedState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE_KEY));
    if (savedState && savedState.date === new Date().toDateString()) {
      setGameState(savedState);
      updateKeyboardStatuses(savedState.letterGrid);
    }
    setMetagameData(getMetagameData());
  }, []);

  const onStatsButtonClicked = () => {
    setStatModalShowing(true);
  }

  const onCloseStatsModal = () => {
    setStatModalShowing(false);
  }

  const onWin = () => {
    toast("nice job!", {
      toastId: 'win-toast'
    });
    setStatModalShowing(true);

    setTimeout(() => {
      addWin(gameState);
      setMetagameData(getMetagameData());
    }, 500);

  }

  const onLose = () => {
    getWord().then((theAnswer) => {
      console.log(theAnswer);
      toast(`the answer was ${theAnswer.toUpperCase()}`, {
        toastId: 'lose-toast'
      });
      setStatModalShowing(true);
  
      setTimeout(() => {
        addLoss(gameState);
        setMetagameData(getMetagameData());
      }, 500);

    });
  }

  const onShareClick = () => {
    toast("results copied to clipboard", {
      toastId: 'share-toast'
    });
  }

  const onInvalidWord = () => {
    toast("word not in word list", {
      toastId: 'invalid-word-toast'
    });
  }

  const alreadyPlayedTodaysGame = () => {
    return !!metagameData.history[new Date().toDateString()];
  }

  const updateKeyboardStatuses = (letterGrid) => {
    const allGuessResults = letterGrid.flat();
    
    allGuessResults.forEach(guessResult => {
        if (guessResult.value && guessResult.status) {
            if (!keyboardLetterStatuses[guessResult.value]) {
              // this code sucks. make it better gabe - todo
              setKeyboardLetterStatuses((prev) => {
                    return  prev[guessResult.value] === "yes" ? prev :
                            prev[guessResult.value] === "maybe" && guessResult.status === "yes" ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } :
                            prev[guessResult.value] === "no" && (guessResult.status === "yes" || guessResult.status === "maybe") ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } : {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            };
                });
            } else if (guessResult.status === "yes") {
              setKeyboardLetterStatuses((prev) => {
                    return  prev[guessResult.value] === "yes" ? prev :
                            prev[guessResult.value] === "maybe" && guessResult.status === "yes" ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } :
                            prev[guessResult.value] === "no" && (guessResult.status === "yes" || guessResult.status === "maybe") ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } : {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            };
                });
            } else if (keyboardLetterStatuses[guessResult.value] !== "yes" && guessResult.status === "maybe") {
              setKeyboardLetterStatuses((prev) => {
                    return  prev[guessResult.value] === "yes" ? prev :
                            prev[guessResult.value] === "maybe" && guessResult.status === "yes" ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } :
                            prev[guessResult.value] === "no" && (guessResult.status === "yes" || guessResult.status === "maybe") ? {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            } : {
                              ...prev,
                              [guessResult.value]: guessResult.status
                            };
                });
            }
        }
    });
  };

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

                updateKeyboardStatuses(copy);

                return {
                  ...prev,
                  letterGrid: copy
                };
              })
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
    <TopBar onStatsButtonClicked={onStatsButtonClicked} />
    <ToastContainer />
    { statModalShowing ? <StatsModal metagameData={metagameData} onClose={onCloseStatsModal} onShareClick={onShareClick} /> : null }
    <MainView
      loading={loading}
      letterGrid={gameState.letterGrid}
      keyboardLetterStatuses={keyboardLetterStatuses}
      onKeyboardClick={onKeyboardClick} 
    />
  </div>
}

export default App;
