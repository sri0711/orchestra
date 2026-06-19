import React, {useState, useEffect, useCallback} from 'react';
import './App.css';
import Landing from './pages/Landing';
import Login from './pages/Login';

function App() {
	const [path, setPath] = useState(window.location.pathname);

	useEffect(() => {
		const onPop = () => setPath(window.location.pathname);
		window.addEventListener('popstate', onPop);
		return () => window.removeEventListener('popstate', onPop);
	}, []);

	const navigate = useCallback((to) => {
		if (to === window.location.pathname) return;
		window.history.pushState({}, '', to);
		setPath(to);
	}, []);

	return (
		<div className="App">
			{path === '/login' ? <Login onNavigate={navigate} /> : <Landing onNavigate={navigate} />}
		</div>
	);
}

export default App;
