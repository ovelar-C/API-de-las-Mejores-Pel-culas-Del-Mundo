# API REST PELÍCULAS

## DESCRIPCÍON GENERAL
El tema principal de esta generosa y humilde API son los filmes cinematograficos, el septimo arte. 
El gran motivo de la elección de este tema es maravillosamente contundente : me gustan las películas.
Teniendo en cuentas los siguientes datos incipientes y caracteristicas principales de una película los datos a tener son:

- "Titulo"
- "Fecha de Estreno"
- "Director"
- "Ganador del Oscar"
- "Generos"
- "Costo Inicial"
- "Recaudacion"
- "Rentabilidad"
- "Sinopsis"
- "Duracion"
- "Pais de Origen"
- "Idioma Original"
- "Actores"

La función central de la API 
- Lectura de información
- Actualización
- Eliminación
- Creación

```bash
📦 API
├── 📁 controlador
│   └── 📄 peliControlador.js
├── 📁 data
│   └── 📄 datosPeliculas.json
├── 📁 middlewares
│   ├── 📄 logger.js
│   ├── 📄 validateData.js
│   └── 📄 logs.txt
├── 📁 vista
│   └── 📄 peliVista.js
├── 📁 modelo
│   └── 📄 peliModelo.js
├── 📄 index.js
├── 📄 package.json
└── 📄 README.md

```

- Controlador : se encarga de recibir las solicitudes y de coordinar el flujo de datos
- Modelo : se encarga del manejo y la lógica de los datos
- Vista : definición de las rutas y el receptor de las solicitudes http
- Middlewares : se ejecuta entre el request y el response, ademas de tener validaciones

### Base URL http://localhost:3000/api/peliculas

### ENDPOINTS
| Método | Ruta       | Descripción                             | Parámetros / Body                                     |    
|--------|-----------|------------------------------------------|-------------------------------------------------------|
| GET    | /         | Lista todas las películas                | Ninguno                                               |
| GET    | /:id      | Obtiene una película por ID              | id (en URL)                                           |
| GET    | /filtro   | Obtiene películas según los parámetros   | actor (query string, ej: `/filtro?actor=Tom`)         |
| GET    | /rentable | Consulta la rentabilidad de una película | titulo (query string, ej: `/rentable?titulo=Matrix`)  |
| POST   | /         | Agrega una nueva película                | { "titulo": "Matrix", "fechaEstreno": 1999 } (Body)   |
| PATCH  | /:id      | Actualiza datos de una película          | id (en URL) y body con los campos a actualizar        |
| DELETE | /:id      | Elimina una película                     | id (en URL)

### Middlewares Implementados
- Logger : resgistra cada petición que llega a la API capturando fecha y hora, esta solicitud es guardad en un archivo logs.txt, Esto se ejecuta antes de que la solicitud llegue al controlador(app.use(logger))
- Validador de Datos : verifica que los datos enviados sean los correctos y esperados
- Express JSON : permite que la API lea y procese solicitudes en formato JSON

### Validaciones
Los campos esperados y que se validan son:
- String : verifica que sea string, que no este vacío y que no contenga solo números
- Integer : Valida solo los numeros enteros positivos
- Booleano : Valida que los booleanos sean solo Booleanos
- Array : Verifica si está vacío o contiene datos no correspondientes

### ejempo de uso
### conclución 

