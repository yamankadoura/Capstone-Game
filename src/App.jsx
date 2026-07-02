import Die from "./Components/Die"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"


export default function App() {
    const [diesNum, setDiesNum] = useState(() => initialize())
    const buttonRef = useRef(null)
    const gameWon = diesNum.every(die => die.isHeld) && diesNum.every(die => die.value === diesNum[0].value)
    
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon])

    function randNum() {
        return Math.floor(Math.random() * 6) + 1
    }

    function initialize () {
        const arr = []
        for (let i = 1; i <= 10; i++) {
            arr.push({
                value: randNum(), 
                isHeld: false, 
                id :nanoid()})
        } 
        return arr
    }

    const allDice = diesNum.map((item) => (
        <Die 
            val = {item.value} 
            key={item.id} 
            isHeld={item.isHeld}
            hold= {hold}
            id= {item.id}
        />
    ))

    function hold(id) {
        setDiesNum(prevDie => prevDie.map( item => {
            return item.id === id ? {...item, isHeld: !item.isHeld} : item}
        ))
    }

    function rollDice() {
        if (!gameWon) {
            setDiesNum(prevDice => prevDice.map(die => {
                return die.isHeld
                    ? die
                    : {
                        ...die,
                        value: randNum(),
                    }
            }))
        } else {
            setDiesNum(initialize())
        }
    }

    return (
        <main>
            
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div aria-live="polite" className="sr-only">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>
            <div className="all-btns">
                {allDice}
            </div>
            <button ref={buttonRef} className="roll-btn" onClick={rollDice}>{gameWon ? "New Game" : "Roll"}</button>
            {gameWon && <Confetti/>}
        </main>
    )
}


