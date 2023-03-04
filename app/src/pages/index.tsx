import { useContext } from 'react';
import Login from '../components/login';

export default function Home() {
  // Allow this component to access our user state
  return (
    <div>
      {/* Check to see if we are in a loading state and display a message if true */}
      <Login/>
    </div>
  );
}