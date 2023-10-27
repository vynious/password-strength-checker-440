"use client"

import { useState, useCallback, use } from "react"
import type { Container, Engine } from "tsparticles-engine"
import Particles from "react-particles"
import { loadSlim } from "tsparticles-slim"
import axios from "axios"
import ExplodingIcon from './components/ExplodingIcon';  // Adjust the import statement according to the file's location
import PasswordCheck from "./components/PasswordCheck";


export default function Home() {
  const [analysis, setAnalysis] = useState({})
  const [password, setPassword] = useState("");
  const [analysed, setAnalysed] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);





  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine)
    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine)
  }, [])

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => { },
    []
  )






  const handleButtonClick = async () => {
    const result = await calculateStrength(password)
    console.log(result)
    if (result) {
      setAnalysed(true)
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };


  const updatePasswordState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  /*
   todo: external calling to api to get the resulting strength
  */
  const calculateStrength = async (password: string): Promise<[string, number]> => {
    try {
      const analysis = { strength: "strong", recommendation: "testing" }
      setAnalysis(analysis)
      return ["Strong", 10];

    } catch (error) {
      console.log(error)
      return ["error", -1];
    }
  }

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
              type={isPasswordHidden ? "password" : "text"}
              value={password}
              onChange={updatePasswordState}
              className="input input-bordered join-item w-full input-lg mb-2.5"
              placeholder="Type your password"
            />
            <button onClick={handleButtonClick} className="btn join-item btn-neutral w-full">
              CHECK STRENGTH
            </button>
            <button onClick={togglePasswordVisibility} type="button">
              {isPasswordHidden ? "Show Password" : "Hide Password"}
            </button>

            {analysed && (
              <>
                <ExplodingIcon />
                <PasswordCheck analysis={analysis} />
              </>
            )}


          </div>
        </div>
      </div>
    </>
  )
}