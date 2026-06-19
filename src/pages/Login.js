import React, { useState } from 'react';
import '../App.css';

export default function Login({ onNavigate }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		// Placeholder: implement real auth integration
		alert('Login submitted for ' + email);
	}

	return (
		<div className="login container">
			<h2>Login to Melody</h2>
			<form onSubmit={handleSubmit} className="login-form">
				<label>
					Email
					<input
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<div className="form-actions">
					<button type="submit" className="btn primary">
						Login
					</button>
					<button
						type="button"
						className="btn link"
						onClick={() => onNavigate('/')}
					>
						Back
					</button>
				</div>
			</form>
		</div>
	);
}
