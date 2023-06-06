//import { useState } from 'react'
import './App.css'
import Die from './components/Die'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize'

export default function App() {
  
  function allNewDice() { 
    return Array.from({length: 10}, () => {
      return {value: Math.floor(Math.random() * 6) + 1, isHeld: false, id: nanoid()}
    })
  }
  
  const [dieArr, setDieArr] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  function rollDice() {
    if (tenzies) {
      setDieArr(allNewDice());
      setTenzies(false)
    }
    setDieArr(oldDice => oldDice.map(die => {
        return die.isHeld === false ?
            {
                value: Math.ceil(Math.random() * 6),
                isHeld: false,
                id: nanoid()
            } :
            die
    }))
}

  function holdDice(id) {
    setDieArr((prevDice) => {
        return prevDice.map((die) => {
            if(die.id == id){
                return {...die, isHeld: !die.isHeld}
            }
            else{
                return die
            }
        })
    })
}
useEffect(() => {
  const initial = dieArr[0].value
  const sumHeld = dieArr.reduce((count, die) => {
      return die.isHeld && die.value === initial ? count + 1 : count;
      }, 0)
  if(sumHeld === 10){
      setTenzies(true);
      console.log("you won")
  }
  }, [dieArr])

  const { width, height } = useWindowSize()


  return (
    <main className='bg-custom-1 h-screen w-screen flex justify-center items-center font-karla'>
      
      {tenzies && <Confetti
        width={width}
        height={height}
      />}
      <div className='bg-custom-2 rounded-2xl w-8/12 h-5/6 flex flex-col justify-center items-center'>
        <h1 className="text-4xl mb-5">Tenzies</h1>
        <p className="text-lg mb-11">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='grid grid-cols-5 grid-rows-2 gap-11'>
          {dieArr.map(die => <Die key={die.id} id={die.id} value={die.value} isHeld={die.isHeld} holdDice={holdDice} />)}
        </div>
        <button 
          onClick={rollDice} 
          className='bg-custom-3 rounded-lg px-14 mt-20 py-4 font-semibold text-xl text-white  active:shadow-inner'>
            {tenzies ? "Play again?" : "Roll"}
        </button>
      </div>
    </main>
  )
}