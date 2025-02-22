import React from 'react'

const CommomUser = ({commonUserPicture , commonUserName}) => {
  return (
    <>
    
    
    <div className="allUser_part"> 
         <div className="all_user_use w-full ">
            <div className="flex gap-4  justify-center items-center">
            <div className ="w-[60px] h-[60px] bg-slate-600 mx-auto my-auto rounded-full flex overflow-hidden justify-center items-center">
               <img src={commonUserPicture} alt="UsetPic" />
            </div>
            <h2 className='text-[17px] font-poppins font-medium'>{commonUserName}</h2>
            </div>
         </div>
    </div>
    
    
    </>
  )
}

export default CommomUser