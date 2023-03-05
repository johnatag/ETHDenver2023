import {
    RefreshMutation,
    RefreshMutationVariables,
    RefreshDocument,
  } from "../../graphql/generated";
  import { readAccessToken, setAccessToken } from "./helpers";
  
  export default async function refreshAccessToken() {
    if(typeof window !== 'undefined') {
      // 1. Get our current refresh token from local storage
      const currentRefreshToken = readAccessToken()?.refreshToken;
    
      if (!currentRefreshToken) return null;
    
      const fetchData = async <TData, TVariables>(
        query: string,
        variables?: TVariables,
        options?: RequestInit["headers"]
      ): Promise<TData> => {
        const res = await fetch(process.env.NEXT_PUBLIC_POLYGON_BASE_URL!, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...options,
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({
            query,
            variables,
          }),
        });
    
        const json = await res.json();
    
        if (json.errors) {
          const { message } = json.errors[0] || {};
          throw new Error(message || "Error…");
        }
    
        return json.data;
      }
    
      // 3. set the new access token in local storage
      const result = await fetchData<RefreshMutation, RefreshMutationVariables>(
        RefreshDocument,
        {
          request: {
            refreshToken: currentRefreshToken,
          },
        }
      );
    
      const {
        refresh: { accessToken, refreshToken: newRefreshToken },
      } = result;
    
      setAccessToken(accessToken, newRefreshToken);
    
      return accessToken as string;      
    }

  }