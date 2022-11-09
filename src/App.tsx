import React, { useEffect, useReducer, useState } from 'react'
import logo from './logo.svg'
import './App.css'
import readXlsxFile, { Row } from 'read-excel-file'
import reducer from './state/reducer'
import { StackCards } from './state/types'
import { CREATE_SET } from './state/actions'

function App() {
  const [data, setData] = useState<Row[]>()
  const [state, dispatch] = useReducer(reducer, {})

  const handleFileUpload = async (e: any) => {
    const file = e.target.files[0]
    const res = await readXlsxFile(file)
    setData(res)
  }

  useEffect(() => {
    let currentStackName: string = ''
    let currentStackCards: StackCards = []

    data?.forEach((row, index) => {
      // add current stack, start new one
      if (!row[0] || !row[1] || index === data.length - 1) {
        dispatch({
          type: CREATE_SET,
          payload: {
            stackName: currentStackName,
            stackData: currentStackCards
          }
        })

        currentStackName = ''
        currentStackCards = []
      }

      if (!!row[0] && row[1] === null) {
        if (typeof row[0] === 'string') currentStackName = row[0]
      }

      if (!!row[0] && typeof row[0] === 'string' && !!row[1] && typeof row[1] === 'string') {
        currentStackCards.push([row[0], row[1]])
      }
    })
  }, [data])

  const renderCards = (cards: StackCards) => {
    return cards.map((card: [string, string]) => (
      <p>
        {card[0]} | {card[1]}
      </p>
    ))
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <label htmlFor='file-upload'>Upload a file:</label>
        <input type='file' id='file-upload' name='file-upload' onChange={handleFileUpload} />
      </header>
      <div>
        <h3>Flashcards data</h3>
        {state &&
          Object.entries(state).map((item: [string, unknown]) => (
            <div>
              <h2>{item[0]}</h2>
              {renderCards(item[1] as StackCards)}
            </div>
          ))}
      </div>
    </div>
  )
}

export default App
