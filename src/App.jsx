import { useState } from 'react'
import { pactCalls } from './components/kadena'
import './App.css'

function App() {
  const [wallet, setWallet] = useState({
    account: '',
    chain: '0',
    balance: null,
    guard: null
  })

  const getAccountDetails = async() => {
    try {
      const code = `(coin.details "${wallet.account}")`;
      const details = await pactCalls(code, chain);
      setWallet({
        balance: details.balance,
        guard: JSON.stringify(details.guard, null, 2)
      })
    } catch(err) {
      console.error('Error fetching account details:', err);
    }
  }
  
  const getBalance = async() => {
    try {
      const code = `(coin.get-balance "${wallet.account}")`;
      const balance = await pactCalls(code, chain);
      setWallet({
        balance: balance,
        guard: null
      })
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  }

  return (
    <div className="app">
    <h1>Pact Course</h1>
    <div className="card">
      <div className="cardbundle">
        <input
        type="text"
        placeholder="Account Name"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
        />
        <select value={chain} onChange={(e) => setChain(e.target.value)}>
          {[...Array(20)].map((_, i) => (
            <option key={i} value={i}>
              Chain (i)
              </option>
          ))}
        </select>
      </div>
      <div className="button-container">
        <button onClick={getAccountDetails}>Get Account Details</button>
        <button onClick={getBalance}>Get Balance</button>
        </div>
        {balance !== null && (
          <p>
            Balance: <span className="highlight">{balance}</span>
          </p>
        )}
        {guard !== null && (
          <div className="guard-container">
          <pre>
            Guard: <span className="highlight">{guard}</span>
          </pre>
          </div>
        )}
       </div>
    </div>
  )
}

export default App
