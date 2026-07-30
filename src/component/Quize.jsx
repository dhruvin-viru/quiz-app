import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Quize() {
    const qid = Number(useParams().id)
    const difficulty = useParams().difficulty
    const [questions, setQuestions] = useState([])
    const [resultwindow, setresultwindow] = useState('hide')
    const [results, setresults] = useState([])
    const [cans, setcans] = useState([])
    const [userans, setuserans] = useState([])
    const [randomizedChoices, setRandomizedChoices] = useState([])

    // localStorage.clear() 
    useEffect(() => {
        const savedQuestions = JSON.parse(localStorage.getItem(`QNA_${difficulty}`) || 'null')
        const checkans = JSON.parse(localStorage.getItem(`userans_${difficulty}`))
        if (checkans == null) {
            localStorage.setItem(`userans_${difficulty}`, JSON.stringify(Array(9).fill('')))
        }

        if (savedQuestions) {
            setQuestions(savedQuestions)
        } else {
            fetch(`https://opentdb.com/api.php?amount=10&difficulty=${difficulty}&type=multiple`)
                .then(res => res.json())
                .then(res => {
                    const results = res.results || []
                    setQuestions(results)
                    localStorage.setItem(`QNA_${difficulty}`, JSON.stringify(results))

                })
        }
    }, [difficulty])

    useEffect(() => {
        if (questions.length > 0) {
            const temp = questions.map(ans => ans.correct_answer)
            setcans(temp)
            localStorage.setItem(`QNA_${difficulty}_ans`, JSON.stringify(temp))
        }
    }, [questions, difficulty])

    const currentQuestion = questions[qid]

    useEffect(() => {
        if (currentQuestion) {
            const choices = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5)
            setRandomizedChoices(choices)
        }
    }, [qid, questions])

    const addans = (ans) => {
        const temp = JSON.parse(localStorage.getItem(`userans_${difficulty}`))
        temp[qid] = ans
        setuserans(temp)
        localStorage.setItem(`userans_${difficulty}`, JSON.stringify(temp))

    }
    const submitquize = () => {
        const temp = cans.map((val, i) => val === userans[i])
        setresults(temp)
        console.log(results);
        setresultwindow('show')
        localStorage.clear()
    }

    return (
        <div>
            <div>
                <Link to={'/'}>Home</Link>
            </div>
            <div>
                <div>
                    Difficulty : {difficulty}
                </div>
                <div>
                    <p>
                        Question {qid + 1}: {currentQuestion?.question}
                    </p>
                    <p>
                        Options:
                    </p>
                    <form>
                        {randomizedChoices.map((choice, index) => (
                            <label key={`${choice}-${index}`}>
                                <input type='radio' name='answer' value={choice} onChange={(e) => { addans(e.target.value) }} /> {choice}
                            </label>
                        ))}
                        <div className="button-group">
                            {
                                qid === 0 ?
                                    <button type="button" disabled>Previous</button> :
                                    <Link to={`/quize/${qid - 1}/${difficulty}`}><button type="button">Previous</button></Link>
                            }
                            {
                                qid === questions.length - 1 ?
                                    <button type="button" disabled>Next</button> :
                                    <Link to={`/quize/${qid + 1}/${difficulty}`}><button type="button">Next</button></Link>
                            }
                        </div>
                        <button type='button' onClick={() => { submitquize() }}>Submit</button>
                    </form>
                </div>
                <div className={`${resultwindow}`}>
                    <h1>Result</h1>
                    <table border='1' cellSpacing={0} cellPadding={10}>
                        <thead>
                            <tr>
                                <td><strong>Correct Answer</strong></td>
                                <td><strong>Your Answer</strong></td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                results?.map((val, i) => {
                                    let cellClass = 'incorrect'
                                    if (userans[i] == null || userans[i] === '') {
                                        cellClass = 'empty'
                                    } else if (val === true) {
                                        cellClass = 'correct'
                                    }
                                    return (
                                        <tr key={i}>
                                            <td>{cans[i]}</td>
                                            <td className={cellClass}>{userans[i] == null ? '' : userans[i]}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Quize