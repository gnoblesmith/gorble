import './App.css';
import TopBar from './components/top-bar/TopBar';
import MainView from './components/main-view/MainView';
import Keyboard from './components/keyboard/Keyboard';
import { useEffect, useState } from 'react';
import { initializeWord, checkWordValidity, checkWord } from './api/api';
import { NUM_GUESSES, NUM_LETTERS, LOCAL_STORAGE_STATE_KEY } from './reference/constants';
import { GuessResult } from './reference/enums';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const style = {
    display: "flex",
    flexFlow: "column",
    background: "black",
    color: "white",
    width: "100%",
    height: "100%",
  };

  const [gameState, setGameState] = useState(() => {
    return {
      activeRow: 0,
      activeCol: 0,
      letterGrid: new Array(NUM_GUESSES).fill({status: GuessResult.NO, value: ''}).map(() => new Array(NUM_LETTERS).fill({status: GuessResult.NO, value: ''}))
    }
  });

  const setGameStateWithSave = (updateFunc) => {
    setGameState((prev) => {
      const next = updateFunc(prev);
      localStorage.setItem(LOCAL_STORAGE_STATE_KEY, JSON.stringify(next));
      return next;
    });
  }

  // mock code remove later
  useEffect(() => {
    initializeWord();
  }, []);
  /////////////////////////

  useEffect(() => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_STATE_KEY);
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  const onWin = () => {
    toast("nice job!", {
      toastId: 'win-toast'
    });
  }

  const onLose = () => {
    toast("you lose :(", {
      toastId: 'lose-toast'
    });
  }

  const onInvalidWord = () => {
    toast("word not in word list", {
      toastId: 'invalid-word-toast'
    });
  }

  const onKeyboardClick = (key) => {
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
        // todo submit guess - win conditions + lose conditions
        let guess = '';
        gameState.letterGrid[row].forEach(cell => guess += cell.value);
        checkWordValidity(guess).then((response) => {
          if (response) {
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
        })
      }
    } else {
      if (col < NUM_LETTERS) {
        setGameStateWithSave(prev => {
          const copy = prev.letterGrid;
          copy[row][col] = {
            ...copy[row][col],
            value: key.toUpperCase()
          }
          console.log(1, prev.activeCol);
          return {
            ...prev,
            letterGrid: copy
          };
        });
        setGameStateWithSave((prev) => {
          console.log(2, prev.activeCol);
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
    <MainView letterGrid={gameState.letterGrid} />
    <Keyboard onClick={onKeyboardClick} />
  </div>
}

export default App;
