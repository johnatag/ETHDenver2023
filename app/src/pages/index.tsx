import { useContext, useState } from 'react';
import { magic } from "../libs/magic";
import Web3 from 'web3';
import SignInButton from '../components/SignInButton';

export default function Home() {
  // Allow this component to access our user state
  const [tokenHolder, setTokenHolder] = useState(false);

  let isTokenHolder = (addr: string) => {
    if (typeof window !== 'undefined') {
      const axios = require('axios');
      const apiKey = process.env.NEXT_PUBLIC_POLYGONSCAN_API;
      const apiBaseUrl = process.env.NEXT_PUBLIC_POLYGON_BASE_URL;
      const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;

      axios.get(apiBaseUrl, {
        params: {
          module: 'account',
          action: 'tokenbalance',
          contractaddress: tokenAddress,
          address: addr,
          tag: 'latest',
          apikey: apiKey
        }
      })
        .then((response: { data: { result: any; }; }) => {
          setTokenHolder(response.data.result == 1);
        })
        .catch((error: any) => {
          console.error("oof", error);
          setTokenHolder(false);
        });
    }
  }

  return (
    <div>
      {/* Check to see if we are in a loading state and display a message if true */}
      <SignInButton
        isTokenHolder={isTokenHolder}
      />
    </div>
  );
}