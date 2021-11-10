import Navbar from "./components/Navbar/Navbar";
import "./style/App.css"
import Header from "./components/Header/Header";

function App() {

  let links = [
    {name:"First"},
    {name:"Second"},
    {name:"Third"},
    {name:"Four"}
  ]

  return (
      <div className="App">
        <Header />
        <Navbar links={links}/>
      </div>
  );
}

export default App;
