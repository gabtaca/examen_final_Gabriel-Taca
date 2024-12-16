import "./App.css"; // Importation des styles globaux
import GridPaternCreator from './components/GridPaternCreator'; 

function App() {
  return (
    <div className="app_body">
      <header>
        <div className="ctrl_h">
          <h1>Examen_final</h1>
          <h2>Gabriel Taca</h2>
        </div>
      </header>
      <main>
        <div className="ctrl_grid-main">
          <GridPaternCreator /> {/* Inclusion du créateur de motifs */}
        </div>
      </main>
    </div>
  );
}

export default App;
