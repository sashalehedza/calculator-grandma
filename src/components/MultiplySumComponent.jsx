import React, { useState } from 'react'

function MultiplySumComponent() {
  const [pairs, setPairs] = useState([{ number1: '', number2: '', result: 0 }])

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

  const calculateSum = () => {
    let sum = 0
    for (let i = 0; i < pairs.length; i++) {
      sum += parseFloat(pairs[i].result)
    }
    return sum.toFixed(2) // Limit sum to two decimal places
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
  sumContainer: {
    marginTop: '20px',
  },
  hr: {
    margin: '10px 0',
  },
}
