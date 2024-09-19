import Button from "@/components/Button"
import { format } from 'date-fns';

const ReservationServiceCard = ({ service }) => {
  
  const formattedDate = format(new Date(service.reservationDate), 'dd/MM/yyyy HH:mm')
  const product = service.product

    
  return (
      <article className="flex gap-2 h-auto rounded-md border hover:shadow-xl bg-white p-4">
        <img
          src={product?.urlImage}
          className="hidden h-full w-60 rounded-md object-cover md:block"
          alt="Service image"
        />
        <div className="w-full space-y-4">
          <div>
            <p className="text-xl">{product?.name}</p>
            <p className="font-light text-gray-500">{product.category.name}</p>
          </div>

          <div className="mr-2 flex gap-8 rounded-md bg-gray-50 p-2 text-left text-sm">
            <div className="space-y-2">
              <p className="text-gray-400">Caracteristicas</p>
              <p className="">{product?.characteristics.length}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-400">Precio</p>
              <p className="">{product?.price}</p>
            </div>
          </div>
            <div className="mr-2 flex gap-8 rounded-md bg-gray-50 p-2 text-left text-sm">
              <div className="space-y-2">
                <p className="text-gray-400">Fecha y hora: </p>
                <p>{formattedDate}hs</p>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">Dirección: </p>
                <p>{service.address}</p>
              </div>
            </div>

          <div className="flex gap-2">
              <Button variant="primary" to={`/services/${product?.id}`}>
                ver
              </Button>
          </div>
        </div>
      </article>   
  )
}

export default ReservationServiceCard