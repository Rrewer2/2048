import Table from "./components/table/Table";
import "./App.css";

function App() {
    return (
        <div className="app">
            <header className="flex-center header">2048</header>
            <main className="flex-center main">
                <Table />
            </main>
            <footer className="flex-center footer"></footer>
        </div>
    );
}

export default App;
