const services = [
    {
        categoryId: 1,
        image: "/images/services/cambioCables.png",
        name: "Cambio de Cables",
        description: "Reemplazo y actualización de cables eléctricos para garantizar un suministro seguro y eficiente de electricidad en tu hogar",
        price: "50000.00",
        reservations: [
            { date: "2024-09-02" },
            { date: "2024-10-22" },
            { date: "2024-10-09" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 6,
                pname: "sin demoras",
                icon: faClock,
              },
        ]  
    },
    {
        categoryId: 2,
        image: "/images/services/calefaccion.jpeg",
        name: "Mantenimiento de Calefacción",
        description: "Inspección y ajuste de sistemas de calefacción para asegurar su funcionamiento óptimo y prevenir fallas durante el invierno",
        price: "60000.00",
        reservations: [
            { date: "2024-10-30" },
            { date: "2024-09-16" },
            { date: "2024-10-14" },
            { date: "2024-10-05" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 2,
                pname: "eco-friendly",
                icon: faLeaf,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 6,
                pname: "sin demoras",
                icon: faClock,
              },
        ]
    },
    {
        categoryId: 3,
        image: "/images/services/destapeCaños.jpg",
        name: "Destape de caños",
        description: "Servicio para desobstruir caños y tuberías bloqueadas, evitando problemas de plomería y garantizando un flujo adecuado de agua",
        price: "25000.00",
        reservations: [
            { date: "2024-09-02" },
            { date: "2024-09-11" },
            { date: "2024-10-05" },
            { date: "2024-10-24" },
        ],
        properties: [
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 5,
                pname: "precios bajos",
                icon: faDollarSign,
              },
              {
                id: 6,
                pname: "sin demoras",
                icon: faClock,
              },
        ]
    },
    {
        categoryId: 3,
        image: "/images/services/griferia.jpeg",
        name: "Cambio de grifería",
        description: "Sustitución de grifos antiguos o dañados en lavabos, fregaderos y duchas para mejorar la funcionalidad y estética de tu baño o cocina",
        price: "125000.00",
        reservations: [
            { date: "2024-09-25" },
            { date: "2024-10-04" },
            { date: "2024-10-14" },
            { date: "2024-09-11" },
            { date: "2024-10-05" },
            { date: "2024-10-24" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 6,
                pname: "sin demoras",
                icon: faClock,
              },
        ]
    },
    {
        categoryId: 4,
        image: "/images/services/pinturaParedes.png",
        name: "Pintura de Paredes",
        description: "Aplicación de pintura fresca en paredes para revitalizar el ambiente de tus espacios interiores y exteriores, dando un nuevo look a tu hogar",
        price: "70000.00",
        reservations: [
            { date: "2024-09-10" },
            { date: "2024-10-13" },
            { date: "2024-10-01" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 2,
                pname: "eco-friendly",
                icon: faLeaf,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
        ]
    },
    {
        categoryId: 5,
        image: "/images/services/limpiezaAlfombra.jpg",
        name: "Limpieza de Alfombras",
        description: "Servicio profesional para limpiar y desinfectar alfombras, eliminando manchas, suciedad y alérgenos para mantener un ambiente saludable",
        price: "35000.00",
        reservations: [
            { date: "2024-09-02" },
            { date: "2024-09-23" },
            { date: "2024-10-17" },
            { date: "2024-10-30" },
            { date: "2024-09-16" },
            { date: "2024-10-14" }
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 5,
                pname: "precios bajos",
                icon: faDollarSign,
              },
              {
                id: 6,
                pname: "sin demoras",
                icon: faClock,
              },
        ]
    },
    {
        categoryId: 6,
        image: "/images/services/plomeria.jpg",
        name: "Reparación de Plomería",
        description: "Reparación de fugas, grietas y otros problemas en el sistema de plomería para asegurar un funcionamiento adecuado y prevenir daños",
        price: "50000.00",
        reservations: [
            { date: "2024-09-02" },
            { date: "2024-09-02" },
            { date: "2024-09-23" },
            { date: "2024-10-09" },
            { date: "2024-10-17" },
            { date: "2024-10-30" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
              {
                id: 5,
                pname: "precios bajos",
                icon: faDollarSign,
              },
        ]
    },
    {
        categoryId: 4,
        image: "/images/services/pisos.jpg",
        name: "Instalación de Pisos",
        description: "Colocación de nuevos pisos en diferentes tipos de superficies, ofreciendo una renovación completa y mejorando el aspecto y funcionalidad de tus espacios",
        price: "100000.00",
        reservations: [
            { date: "2024-09-02" },
            { date: "2024-09-02" },
            { date: "2024-09-23" },
            { date: "2024-10-13" },
            { date: "2024-10-01" },
            { date: "2024-09-05" },
        ],
        properties: [
            {
                id: 1,
                pname: "garantia",
                icon: faAward,
              },
              {
                id: 2,
                pname: "eco-friendly",
                icon: faLeaf,
              },
              {
                id: 3,
                pname: "profesional calificado",
                icon: faStar,
              },
              {
                id: 4,
                pname: "calidad",
                icon: faShieldAlt,
              },
        ]
    },
]

export default services;