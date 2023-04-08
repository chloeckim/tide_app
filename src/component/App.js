import { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown';
import { TideContext } from '../context/TideContext';
import './App.css';
import 'react-dropdown/style.css';
import { TideTable } from './TideTable';

function App() {
  const options = ['Pacifica', 'Santa Cruz'];
  const [location, setLocation] = useState('');

  const { loading, getTideData } = useContext(TideContext);

  // Run getTideData onMount.
  // TODO: Add dependecy list when dropdown option is implemented.
  useEffect(getTideData, [location]);

  return (
    <div className="App">
      <Dropdown options={options} onChange={setLocation} value={location} placeholder="Select an option" />
      {loading? <p>Loading data...</p>: <TideTable/>}
    </div>
  );
}

export default App;
