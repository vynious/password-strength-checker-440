"use client"

import { useCallback } from "react"
import type { Container, Engine } from "tsparticles-engine"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"

export default function Home() {
	const particlesInit = useCallback(async (engine: Engine) => {
		console.log(engine)

		// you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(engine);
		await loadSlim(engine)
	}, [])

	const particlesLoaded = useCallback(
		async (container: Container | undefined) => {},
		[]
	)

	return (
		<>
			<Particles
				id="tsparticles"
				url="/particle.json"
				init={particlesInit}
				loaded={particlesLoaded}
			/>

			<div className="absolute inset-0">
				<div className="flex min-h-screen justify-center items-center">
					<div className="container w-1/2">
						<input
							type="password"
							className="input input-bordered join-item w-full input-lg mb-2.5"
							placeholder="Type your password"
						/>
						<button className="btn join-item btn-neutral w-full">
							CHECK STRENGTH
						</button>
					</div>
				</div>
			</div>
		</>
	)
}
