import { useQuery } from "@tanstack/react-query";
import { useAddress } from "@thirdweb-dev/react";
import { readAccessToken } from "./helpers";
import { useDefaultProfileQuery } from "../../graphql/generated";

import { magic } from "../magic";

export default function useLensUser() {
  if(typeof window !== undefined) {
    // 1. Make a react query for the local storage Key
    const localStorageQuery = (address: string) => useQuery(
      ["lens-user", address],
      // Writing the actual function to check the local storage
      () => readAccessToken()
    );

    // If there is a connected wallet address
    // Then we can ask for the default profile from Lens
    const profileQuery = (address: string) => useDefaultProfileQuery(
      {
        request: {
          ethereumAddress: address,
        },
      },
      {
        enabled: !!address,
      }
    );

    return {
      // Contains information about both the local storage
      // AND the information about the lens profile
      isSignedInQuery: localStorageQuery,
      profileQuery: profileQuery,
    };
  }
  
}