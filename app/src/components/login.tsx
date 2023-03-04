import { useState } from "react"
import { magic } from "../libs/magic";
import { AbiItem } from 'web3-utils';
import Web3 from 'web3';
import ERC20_ABI from '../abi/token.json'

export default function Login() {

    const [account, setAccount] = useState('' as string);

    let login = async () => {
        if(magic && typeof window !== 'undefined') {
            //@ts-ignore
            const web3 = new Web3(magic.rpcProvider);
            const accounts = await magic.wallet.connectWithUI();
            if(accounts.length != 0) {
                setAccount(accounts[0]);
                const axios = require('axios');
                const apiKey = process.env.NEXT_PUBLIC_POLYGONSCAN_API;
                const apiBaseUrl= process.env.NEXT_PUBLIC_POLYGON_BASE_URL;
                const tokenAddress = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS;
                
                axios.get(apiBaseUrl, {
                    params: {
                      module: 'account',
                      action: 'tokenbalance',
                      contractaddress: tokenAddress,
                      address: account,
                      tag: 'latest',
                      apikey: apiKey
                    }
                  })
                  .then((response: { data: { result: any; }; }) => {
                    console.log(`Balance of ${account}: ${response.data.result}`);
                  })
                  .catch((error: any) => {
                    console.error(error);
                  });

            }
                
        }  
    }

    return <>
        <button onClick={login}>Connect</button>
    </>
}