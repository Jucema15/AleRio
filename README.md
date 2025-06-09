<h1 align="center"> Alerio </h1>
<h2 align="center"> Prototipo de SAT para caudales de ríos </h2>

<h3>Descripción del Proyecto</h3>
<p>Proyecto de prototipo para un sistema de alerta temprana (SAT) el cual se compone de un aplicativo web que contiene un mapa de la ciudad de Cali - Colombia, el cual muestra en tiempo real la ubicación de un sensor y el estado del mismo con respecto a la altura del agua que recorre el río</p>

<h3>Estado del Proyecto</h3>
<h4>
🌊: Proyecto prototipo finalizado 🌊:
</h4>

## :hammer:Funcionalidades del proyecto
- `Funcionalidad 1`: Mapa iteractivo en el cual se puede visualizar los sensores y el estado de cada uno.
- `Funcionalidad 2`: Actualización del estado de cada sensor en tiempo real.
- `Funcionalidad 2a`: Al hacer click en un sensor se muestra la información de este.
- `Funcionalidad 3`: Un sensor Arduino con un modulo ultrasonido envia los datos recolectados a la base de datos de forma periodica para tener información a tiempo real.
- `Funcionalidad 4`: Un usuario puede ingresar su correo electronico para suscribirse a un sensor especifico y así recibir correos de alerta.
- `Funcionalidad 5`: El sistema recolecta los ultimos 10 datos recolectados por el sensor y efectua una predicción a 1 hora en el futuro, si esta predicción supera el limite del valor de alerta roja envia un correo a los correos suscriptos al sensor para que tomen precauciones.

\## 📁 Acceso al proyecto:
Este proyecto cuenta con 3 carpetas importantes: Alerio(El backend de la aplicación), angular_map(El frontend de la aplicación), ultrasonid(Programación del arduino y script de PHP)

\## 🛠️ Abre y ejecuta el proyecto:
Para ejecutar este proyecto debes tener instalado NodeJs, XAMPP y opcionalmente el Arduino IDE:

1. La carpeta ultrasonid debe moverse a la carpeta htdocs dentro de la carpeta del XAMPP, de aqui modificar el código del arduino y del PHP con la conexión wifi y la conexión a la base de datos respectivamente para su funcionamiento
2. Abrir con el IDE de preferencia la carpeta Alerio y instalar las dependencias con `npm install`. Posteriormente a la instalación de dependencias crear un archivo .env con las siguientes variables:

## Base De Datos

- DB_HOST=tuDirecciónDeLaBaseDeDatos
- DB_PORT=elPuertoDeLaBaseDeDatos
- DB_USERNAME=nombreDeUsuarioDeLaBaseDeDatos
- DB_PASSWORD=contraseñaDeTuUsuarioDeLaBaseDeDatos
- DB_DATABASE=nombreDeLaTablaDeLaBaseDeDatos

## Servidor local para recibir los correos

- SMTP_HOST=localhost
- SMTP_PORT=1025
- SMTP_USER=
- SMTP_PASS=

Despues de seguir estos pasos ejecuta el comando `npm run start:dev` en la terminal dentro de la carpeta Alerio para iniciar el backend del proyecto.
Tambien puedes ejecutar el comando `maildev` en una terminal deiferente dentro de la carpeta Alerio para iniciar el servidor local para los correos.

3. Abrir con el IDE de preferencia la carpeta angular_map y instalar las dependencias con `npm install`. Posteriormente a la instalación de las dependencias ejecutar el comando `ng serve -o` para iniciar el proyecto de Angular.

<h3>✔️ Tecnologías utilizadas</h3>
- 🎴 Angular (Frontend)
- 📋 NestJs (Backend)
- 📂 MySQL (Base de Datos)
- ✉️ Maildev (Servidor para el testeo de correos)
- 📹 Arduino (Sensor)
- 💻 XAMPP (Servidor local y base de datos)

