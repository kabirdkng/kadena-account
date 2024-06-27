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
      const details = await pactCalls(code, wallet.chain);
      if (details) {
        setWallet({
          ...wallet,
          balance: details.balance,
          guard: JSON.stringify(details.guard, null, 2)
        })
      } else {
        console.error('No account details found');
      }
    } catch(err) {
      console.error('Error fetching account details:', err);
    }
  }
  
  const getBalance = async() => {
    try {
      const code = `(coin.get-balance "${wallet.account}")`;
      const balance = await pactCalls(code, wallet.chain);
      setWallet({
        ...wallet,
        balance: balance,
        guard: null
      })
    } catch (err) {
      console.error('Error fetching balance:', err);
    }
  }

  const handleChainChange = (e) => {
    setWallet({
      ...wallet,
      chain: e.target.value
    })
  }

  return (
    <div className="app">
      <h1>Pact Course</h1>
      <div className="card">
        <div className="cardbundle">
          <input
            type="text"
            placeholder="Account Name"
            value={wallet.account}
            onChange={(e) => setWallet({ ...wallet, account: e.target.value })}
          />
          <select value={wallet.chain} onChange={handleChainChange}>
            {[...Array(20)].map((_, i) => (
              <option key={i} value={i}>
                Chain {i}
              </option>
            ))}
          </select>
        </div>
        <div className="button-container">
          <button onClick={getAccountDetails}>Get Account Details</button>
          <button onClick={getBalance}>Get Balance</button>
        </div>
        {wallet.balance !== null && (
          <p>
            Balance: <span className="highlight">{wallet.balance}</span>
          </p>
        )}
        {wallet.guard !== null && (
          <div className="guard-container">
            <pre>
              Guard: <span className="highlight">{wallet.guard}</span>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}

export default App