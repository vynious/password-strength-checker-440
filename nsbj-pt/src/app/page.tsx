export default function Home() {
	return (
		<div className="flex bg-base-200 min-h-screen justify-center items-center">
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
	)
}
