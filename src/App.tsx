import dpsLogo from './assets/DPS.svg';
import './App.css';
import CRM from './components/CRM';
import 'bootstrap/dist/css/bootstrap.min.css';
// https://dummyjson.com/users

function App() {
	return (
		<>
			<div>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<CRM />
			</div>
		</>
	);
}

export default App;
