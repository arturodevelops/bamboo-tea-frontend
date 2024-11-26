import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QLFynHSsQ6HUBrZGSapnw6lZU2aIXxg6uXi8s4cnpnIJ8PAsFFqbh2AKdyk2nPH6ZCejrHQREcIzozZORSvql7V00YTE7NztF');

const StripeProvider = ({ children }) => (
  <Elements stripe={stripePromise}>
    {children}
  </Elements>
);

export default StripeProvider;
