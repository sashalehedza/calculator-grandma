import React, { useState } from 'react'

function MultiplySumComponent() {
  const [pairs, setPairs] = useState([])
  const [pasteValue, setPasteValue] = useState('')

  const handleNumber1Change = (event, index) => {
    const updatedPairs = [...pairs]
    updatedPairs[index].number1 = event.target.value
    setPairs(updatedPairs)
    multiplyNumbers(index) // Call multiplyNumbers immediately
  }

  const handleNumber2Change = (event, index) => {
    const updatedPairs = [...pairs]
    updatedPairs[index].number2 = event.target.value
    setPairs(updatedPairs)
    multiplyNumbers(index) // Call multiplyNumbers immediately
  }

  const multiplyNumbers = (index) => {
    const updatedPairs = [...pairs]
    const result =
      parseFloat(updatedPairs[index].number1) *
      parseFloat(updatedPairs[index].number2)
    updatedPairs[index].result = result
    setPairs(updatedPairs)
  }

  const addPair = () => {
    const updatedPairs = [...pairs, { number1: '', number2: '', result: 0 }]
    setPairs(updatedPairs)
  }

  const deletePair = (index) => {
    const updatedPairs = [...pairs]
    updatedPairs.splice(index, 1)
    setPairs(updatedPairs)
  }

  const calculateSum = () => {
    let sum = 0
    for (let i = 0; i < pairs.length; i++) {
      sum += parseFloat(pairs[i].result)
    }
    return sum.toFixed(2) // Limit sum to two decimal places
  }

  const handlePasteChange = (event) => {
    setPasteValue(event.target.value)
  }

  const handlePastePairs = () => {
    const pairValues = pasteValue.split(',').map((pair) => pair.trim())
    const newPairs = pairValues.map((pair) => {
      const [number1, number2] = pair.split(' ')
      return {
        number1,
        number2,
        result: parseFloat(number1) * parseFloat(number2) || 0,
      }
    })
    const updatedPairs = [...pairs, ...newPairs]
    setPairs(updatedPairs)
    setPasteValue('')
  }

  return (
    <div style={styles.container}>
      {pairs.map((pair, index) => (
        <div key={index} style={styles.pairContainer}>
          <div style={styles.pairInputs}>
            <label>
              Pair {index + 1} - Number 1:
              <input
                type='number'
                value={pair.number1}
                onChange={(event) => handleNumber1Change(event, index)}
                style={styles.input}
              />
            </label>
            <label>
              Pair {index + 1} - Number 2:
              <input
                type='number'
                value={pair.number2}
                onChange={(event) => handleNumber2Change(event, index)}
                style={styles.input}
              />
            </label>
            <button
              onClick={() => deletePair(index)}
              style={styles.deleteButton}
            >
              Delete
            </button>
          </div>
          <label>
            Pair {index + 1} - Result:
            <input
              type='text'
              value={pair.result}
              readOnly
              style={styles.input}
            />
          </label>
          <hr style={styles.hr} />
        </div>
      ))}
      <button onClick={addPair} style={styles.button}>
        Add Another Pair
      </button>
      <div style={styles.pasteContainer}>
        <input
          type='text'
          value={pasteValue}
          onChange={handlePasteChange}
          placeholder='Paste pairs (e.g., 12 54, 23 44, 22 33)'
          style={styles.pasteInput}
        />
        <button onClick={handlePastePairs} style={styles.pasteButton}>
          Add Pairs
        </button>
      </div>
      <div style={styles.sumContainer}>
        <label>
          Sum of Results:
          <input
            type='text'
            value={calculateSum()}
            readOnly
            style={styles.input}
          />
        </label>
      </div>
    </div>
  )
}

export default MultiplySumComponent

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  pairContainer: {
    marginBottom: '20px',
  },
  pairInputs: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    width: '100px',
    marginRight: '10px',
  },
  button: {
    padding: '8px 16px',
    background: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '10px',
    marginBottom: '10px',
  },
  deleteButton: {
    padding: '8px 16px',
    background: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    marginLeft: '10px',
  },
  pasteContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '20px',
  },
  pasteInput: {
    padding: '5px',
    border: '1px solid #ccc',
    borderRadius: '3px',
    flex: '1',
    marginRight: '10px',
  },
  pasteButton: {
    padding: '8px 16px',
    background: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
  },
  sumContainer: {
    marginTop: '20px',
  },
  hr: {
    margin: '10px 0',
  },
}
