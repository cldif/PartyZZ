import './App.css';
import Party from './Party';
import PartyRender from './Party-functions';

function App() {
  return (
    <div className="App">
      <PartyRender party={new Party(0, '')} isUpdatable={false}/>
    </div>
  );
}

export default App;
