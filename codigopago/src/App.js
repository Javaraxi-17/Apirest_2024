// App.js
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51Q9ZKG02KI1DmTNirhz0cpeMYddJrwuVP25VdMUKchvu2eb9mPnYBcHYbmpyUIUNd9B93WSM3LGHPR1pvLV0XNxO00ery2SLsi');

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
