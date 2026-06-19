import React from 'react';
import '../App.css';

export default function Landing({ onNavigate }) {
	return (
		<div className="landing">
			<header className="hero">
				<div className="container">
					<h1 className="title">Melody</h1>
					<p className="tagline">
						No-code platform — compiles to WebAssembly for
						blazing-fast apps.
					</p>
					<div className="cta">
						<button
							className="btn primary"
							onClick={() => onNavigate('/login')}
						>
							Login
						</button>
						<a className="btn link" href="#features">
							Learn More
						</a>
					</div>
				</div>
			</header>

			<section id="features" className="features container">
				<h2>Why Melody?</h2>
				<ul>
					<li>Build visually — no coding required.</li>
					<li>Compile to WebAssembly for native-like performance.</li>
					<li>Deploy easily with container-friendly output.</li>
				</ul>
			</section>

			<footer className="footer">
				<div className="container">
					© {new Date().getFullYear()} Melody — All rights reserved.
				</div>
			</footer>
		</div>
	);
}
