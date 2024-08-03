import React from 'react'
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className="bg-secondary fixed bottom-0 w-full  ">
        <div className='h-48 flex items-center justify-between pl-12 pr-48 py-7 text-white'>
           <div className='flex flex-col items-center px-0.5'>
               <Link to="/">
                   <img src="./images/logo.svg" alt="logo app" className=" " />
               </Link>
               <p>Todos los derechos reservados © 2024</p>
           </div>
    
           <div className="w-0.5 bg-white h-full"></div>
    
           <div className='flex flex-col items-center space-y-8'>
               <Link to="/">
                   <p>Términos y condiciones</p>
               </Link>
               <Link to="/">
                   <p>Aviso de privacidad</p>
               </Link>
               <Link to="/">
                   <p>Política de privacidad</p>
               </Link>
           </div>

           <div className="w-0.5 bg-white h-full"></div>

           <div className='flex flex-col items-center space-y-5 px-10'>
               <p>Seguinos</p>
               <div className='flex space-x-4'>
                  <a href='https://x.com' target='_blank' rel='noopener noreferrer'>
                      <img src="./images/X.png" alt="X app" className="w-auto h-auto" />
                  </a>
                  <a href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
                      <img src="./images/Ig.png" alt="logo app" className="w-auto h-auto" />
                  </a>
                  <a href='https://youtube.com' target='_blank' rel='noopener noreferrer'>
                      <img src="./images/YT.png" alt="logo app" className="w-auto h-auto" />
                  </a>
                  <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
                      <img src="./images/LinkedIn.png" alt="logo app" className="w-auto h-auto" />
                  </a>
               </div>

           </div>
        </div>
        
    </footer>
    
  )
}

export default Footer