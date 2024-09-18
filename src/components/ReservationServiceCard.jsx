import Button from "@/components/Button"

const ReservationServiceCard = ({ service }) => {

  console.log(service);
  
    
  return (
    <article className="flex gap-2 rounded-md border bg-white p-4">
      <img
        src={service?.urlImage}
        className="hidden h-full w-60 rounded-md object-cover md:block"
        alt="Service image"
      />
      <div className="w-full space-y-4">
        <div>
          <p className="text-xl">{service?.name}</p>
          <p className="font-light text-gray-500">{"Categoria"}</p>
        </div>

        <div className="mr-2 flex gap-8 rounded-md bg-gray-50 p-2 text-left text-sm">
          <div className="space-y-2">
            <p className="text-gray-400">Caracteristicas</p>
            {/* <p className="">{service?.characteristics.length}</p> */}
          </div>
          <div className="space-y-2">
            <p className="text-gray-400">Precio</p>
            <p className="">{service?.price}</p>
          </div>
        </div>
        <div className="flex gap-2">
            <Button variant="primary" to={`/services/${service?.id}`}>
              ver
            </Button>
        </div>
      </div>
    </article>
  )
}

export default ReservationServiceCard