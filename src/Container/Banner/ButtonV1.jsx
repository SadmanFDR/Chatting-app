import React from 'react'

const ButtonV1 = ({buttonV1BG , buttonV1Text , buttonV1Click}) => {


  return (
    <>
    
    <button onClick={buttonV1Click} className={`py-1 px-5 ${buttonV1BG} text-[16px] font-poppins font-medium text-primaryCol rounded-lg`}>{buttonV1Text}</button>
    
    </>
  )
}

export default ButtonV1