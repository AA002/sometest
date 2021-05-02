import React, { useState } from 'react'
import './Receipt.css'

const Receipt = (props) => {
  const { description, amount, currency } = props.data

  return (
    <div className="wrapper">
      <div>Description: {description} </div>
      <div>Amount: {amount} </div>
      <div>Currency: {currency} </div>
    </div>
  );
}

export default Receipt