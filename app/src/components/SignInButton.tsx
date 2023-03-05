import useLensUser from "../libs/auth/useLensUser";
import useLogin from "../libs/auth/useLogin";
import { useState } from "react";
import { magic } from "../libs/magic";
import Web3 from 'web3';


import {
    useAddress,
    useNetworkMismatch,
    useNetwork,
    ConnectWallet,
    ChainId,
    MediaRenderer,
  } from "@thirdweb-dev/react";

export default function SignInButton(props: {
    isTokenHolder: Function
}) {

    const [accountAdress, setAccountAdress] = useState('' as string);

    const { isSignedInQuery, profileQuery } = useLensUser();
    const { mutate: requestLogin } = useLogin();
    const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on the wrong network
    const [, switchNetwork] = useNetwork(); // Function to switch the network.

    let handleWalletLogin = async () => {
        if (magic && typeof window !== 'undefined') {
            //@ts-ignore
            const web3 = new Web3(magic.rpcProvider);
            await magic.wallet.connectWithUI()
                .then((response) => {
                    setAccountAdress(response[0]);
                }).catch((error: any) => {
                    console.log(error);
                });
        }
    }

    if(accountAdress == '') {
        return <div>
        <button onClick={() => {
            handleWalletLogin();
        }}>Connect</button>
    </div>
    }

     // 2. User needs to switch network to Polygon
  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchNetwork?.(ChainId.Polygon)}>
        Switch Network
      </button>
    );
  }

  // Loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // If the user is not signed in, we need to request a login
  if (!isSignedInQuery.data) {
    return <button onClick={() => requestLogin()}>Sign in with Lens</button>;
  }

  // Loading their profile information
  if (profileQuery.isLoading) {
    return <div>Loading...</div>;
  }

  // If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div>No Lens Profile.</div>;
  }
    // If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <div>
        <MediaRenderer
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ""}
          alt={profileQuery.data.defaultProfile.name || ""}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }

    return <>Error</>
}