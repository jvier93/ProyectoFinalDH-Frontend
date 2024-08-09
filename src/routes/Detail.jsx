import React from 'react'
import { services } from "@/data/services";
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Search from '../components/Search';

async function loader({ params }) {
  
  const detail = services.find(service => service.id == params.serviceId) || null;
   
    
  return { 
    detailFromLoader: detail,
   };
}


const Detail = () => {
  const  {detailFromLoader} = useLoaderData();
  
  console.log(detailFromLoader);
  
  
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  }
  
  
  return (
    <>
      <Search/>
      <div className='flex justify-center items-center h-32'>
        <h2 className='text-xl text-primaryLight lg:text-6xl'>Detalle del servicio</h2>
      </div>

      <div className='flex h-16 bg-primary'></div>
      {detailFromLoader ? (
        <h3 className='text-xl text-center p-8 text-primaryLight lg:text-6xl'>{detailFromLoader.categoryName}</h3>
      ) : (
        <p className='text-xl text-primaryLight lg:text-4xl'>
              Categoría no encontrada.
            </p>
      )}
      
      
      <div className='relative flex lg:w-[1227px] lg:h-[451px] bg-primary justify-center rounded-full mx-auto'>
        {detailFromLoader ? (
          <>
            <div className='relative flex-col w-full mr-auto m-4 sm:m-6 md:m-8 lg:m-12 space-y-4  max-w-screen-lg'> 
              <h3 className='text-xl text-white lg:text-4xl'>{detailFromLoader.name}</h3>
              <img className='rounded-3xl lg:w-96' src={detailFromLoader.image} alt="" />
            </div>
            <section className='flex items-center ml-0 md:ml-4 mx-4 md:mx-8 lg:mx-16 p-4 text-white text-xs lg:text-2xl'>
              {detailFromLoader.description}
            </section>
            <div className='flex items-end mr-16 mb-8 text-white text-base lg:text-3xl'>{detailFromLoader.price}</div>
          </>
          ) : (
            <p className='text-xl text-primaryLight lg:text-4xl'>
              Servicio no encontrado.
            </p>)
        }
        <button className='absolute top-8 right-8'>
          <FontAwesomeIcon 
          icon={faArrowLeft}
          className='text-white sm:text-sm md:text-lg lg:text-2xl xl:text-4xl'
          onClick={handleGoBack}
         />
        </button>
      </div>
      <div className='flex justify-center'>
        <button className='bg-primary my-6 px-10 py-3 rounded-2xl text-white'>Agendar servicio</button>
      </div>
      
        
    </>
    
  )
}


Detail.loader = loader;

export default Detail