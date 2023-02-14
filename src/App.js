// import logo from "./logo.svg";
import "./App.css";
import Square from "./components/Square/Square";
import Numbers from "./components/Numbers/Numbers";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                Спробуй, курво, 2048!
            </header>
            <div className="App-main">
                <Square />
                <Numbers />
            </div>
            <footer className="App-footer">Зроблено з любов'ю</footer>
        </div>
    );
}

export default App;
