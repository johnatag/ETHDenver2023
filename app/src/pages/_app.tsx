import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { magic } from '../libs/magic';
import { ChainId, ThirdwebProvider } from '@thirdweb-dev/react';


export default function App({ Component, pageProps }: AppProps) {
  
  // Create a client
  const queryClient = new QueryClient();
  const desiredChainId = ChainId.Mumbai;
  
  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
    </ThirdwebProvider>
    
  )
}
