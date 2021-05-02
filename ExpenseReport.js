import React, { useEffect, useState } from 'react'
import Receipt from './Receipt'

export default function ExpenseReport() {
  const [sum, setSum] = useState(0)
  const [rates, setRates] = useState(null)

  const mockData = [
    {
      description: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      amount: '100',
      currency: 'CAD'
    },
    { description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
      amount: '100',
      currency: 'USD'
    },
    {
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ',
      amount: '100',
      currency: 'HKD'
    },
    {
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
      amount: '100',
      currency: 'EUR'
    },
    {
      description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium',
      amount: '100',
      currency: 'SGD'
    }
  ]

  const renderReceipts = () => {
    return mockData.map((data, idx) => {
      return <Receipt key={idx} data={data}/>
    })
  }

  const renderError = () => {
    if (sum > 1000) {
      return <div>Expense Report Limit has been reached!</div>
    }
  }

  const getCurrencies = () => {
    return fetch("http://api.exchangeratesapi.io/latest?access_key=02f6e238a7f13f0fdbb813369071a2f3")
      .then(res => res.json())
      .then(res => res)
  }

  useEffect(async () => {
    // const res = await getCurrencies();
    // my api key exceeded limits!
    // making up rates!!
    const myRates = {
      CAD: 1.1,
      USD: 1.2,
      AZN: 1.3,
      EUR: 1.4,
      SGD: 1.5,
      HKD: 1.6,
      JPY: 1.7,
      GBP: 1.8,
      NZD: 1.9,
      AFN: 2.0
    }
    setRates(myRates)
  }, [])

  useEffect(() => {
    if(rates) {
      const newSum = mockData.reduce((acc, {amount, currency}) => {
        return acc + (amount / rates[currency])
      }, sum)
      setSum(newSum)
    }
  }, rates)

  return (
    <div>
      {renderReceipts()}
      {renderError()}
      <button disabled={sum > 1000} onClick={() => console.log(mockData)}>Submit</button>
    </div>
  );
}