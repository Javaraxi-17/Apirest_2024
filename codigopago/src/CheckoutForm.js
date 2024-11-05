import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './App.css'; // Cambia esto para que apunte a App.css


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [amount, setAmount] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    const cardElement = elements.getElement(CardElement);

    // Llamada a tu backend para crear el PaymentIntent
    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // Convertir el monto ingresado a centavos
      body: JSON.stringify({ amount: parseInt(amount) * 100 }), // Monto en centavos
    });

    const { clientSecret } = await response.json();

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess('Pago exitoso');
    }
  };

  return (
    <div className="checkout-container">
      <form className="checkout-form" onSubmit={handleSubmit}>
        <h2>Pago con tarjeta</h2>

        <div className="form-group">
          <label htmlFor="amount">Monto</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Ingresa el monto"
            required
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="cardElement">Información de tarjeta</label>
          <CardElement id="cardElement" className="form-control" />
        </div>

        <button type="submit" disabled={!stripe} className="btn btn-primary btn-block">
          Pagar
        </button>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
      </form>
    </div>
  );
};

export default CheckoutForm;
