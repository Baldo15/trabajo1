# trabajo1
Bootcamp: Tecnologías para el desarrollo web

descripcion de las actividades 

1. el vs code se tenia instalado previamente en el equipo
2. ya contaba con una cuenta en git.
3. se crea el repositorio trabajo 1
4. para desplegar la base de datos en mongo se hace lo siguiente:

en el proyecto dentro de la carpeta docker se crea el archivo Dockerfile 
en este se configura la construccion de la imagen

en cmd ejecutamos el comando docker build -t imagen .
para construirla 

luego corremos el siguente comando docker run -d -p 27017:27017 -v /home/usuario/base:/data/db --name contenedor imagen

este conectara el directorio con el host

nos conectamos a la base con el siguiente comando mongo --host localhost --port 27017

creamos la base de datos

use mydb
db.createCollection("trabajo1.a")

para ejecutar la api en una maquina diferente

clonamos el proyecto con el comando

git clone github.com/Baldo15/trabajo1


se accede al direcorio del proyecto con cd

corremos el comando npm install para instalar las dependencias puestas en el package.json

y ejecutamos utilizando el comando node index.js con el cual se ejecuta el proyecto

