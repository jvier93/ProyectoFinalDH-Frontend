import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import DataGridContainer from "@/components/DataGridContainer";
import { useAuth } from "@/hooks/useAuth";
import ReservationServiceCard from '../../components/ReservationServiceCard';
import { useLoaderData } from 'react-router-dom';



const API_URL = import.meta.env.VITE_API_URL;

const loader = async () => {
  try {
    const response = await fetch(`${API_URL}/products/all`);

    if (!response.ok) {
      throw new Error(response.status);
    }
    const services = await response.json();
    
    return {
      services,
    };
  } catch (error) {
    Swal.fire({
      scrollbarPadding: false, // Disables extra space reserved for the scrollbar
      icon: "error",
      html: `
            <p class="text-sm text-gray-500 text-center font-Inter">
              Hubo un problema al intentar obtener los servicios.
              Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
            </p>
            
          `,
      footer: `
                   <details class="text-sm cursor-pointer text-gray-500">
                     <summary>Detalles del error</summary>
                     <p>Código de error: ${error}</p>
                   </details>
                 `,
      confirmButtonColor: "#33B8AD",
    });
    return { error: true };
  }
};

const Reservations = () => {
  const { services } = useLoaderData();
  

  const mockService = {
    urlImage: "https://example.com/image.jpg",
    name: "Servicio de Ejemplo",
    characteristics: ["Característica 1", "Característica 2"],
    price: "$100",
    id: 5
  };

  console.log(mockService);
  

  const { user } = useAuth(); // Obtén el email del usuario autenticado
  const [reservations, setReservations] = useState([]);
  
  useEffect(() => {
    console.log("User changed:", user);
    const fetchReservations = async () => {
      try {
        const response = await fetch(`${API_URL}/reservations/all?email=${user.email}`);

        if (!response.ok) {
          throw new Error(response.status);
        }

        const data = await response.json();
        setReservations(data);  // Guarda las reservas en el estado
        
        console.log(data);
        

      } catch (error) {
        Swal.fire({
          scrollbarPadding: false,
          icon: "error",
          html: `
                <p class="text-sm text-gray-500 text-center font-Inter">
                  Hubo un problema al intentar obtener las reservas.
                  Si el problema persiste puedes <a class="underline" href=mailto:serviciostecnicospruebasservic@gmail.com">contactar a soporte</a>.
                </p>
              `,
          footer: `
                       <details class="text-sm cursor-pointer text-gray-500">
                         <summary>Detalles del error</summary>
                         <p>Código de error: ${error.message}</p>
                       </details>
                     `,
          confirmButtonColor: "#33B8AD",
        });
      }
    };

    // Llamar a la función solo si hay un usuario autenticado
    if (user && user.email) {
      fetchReservations();
    }
  }, [user]);

  return (
    <div className='mx-auto mt-20 max-w-[1366px] md:mt-28'>
        <DataGridContainer>
          {reservations?.map((reservation) => (
            <ReservationServiceCard key={reservation.id} service={reservation} />
          ))}
        </DataGridContainer>
    </div>
  )
};

export default Reservations;

Reservations.loader = loader