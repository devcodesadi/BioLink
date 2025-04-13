import React, { useState } from 'react'
import BioCreate from './BioCreate'
import OnBoardSelectSocial from './OnBoardSelectSocial'

function Onboarding() {
    const [step,setStep]=useState(1)

    const nextStep=()=>setStep((prev)=>prev+1)

  return (
    <>
    {step===1 && <BioCreate nextStep={nextStep}/>}
    {step===2 && <OnBoardSelectSocial/>}
    
    </>
  )
}


export default Onboarding