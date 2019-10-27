## Wallakeep: <br>PRACTICE BASICS REACT. VII Full Stack Developer KeepCoding Course.

Wallakeep
Esta práctica se realizará conjuntamente a la práctica de Nodepop que se realizó
durante el módulo de NodeJS.<br /><br />
Los endpoints que nos ofrece Nodepop son los siguientes:<br />
- Listar anuncios (con filtro y paginación)<br />
- Obtener el detalle de un anuncio<br />
- Crear un anuncio<br />
- Actualizar un anuncio<br />
- Obtener todos los tags que se puedan usar<br /><br />
El Nodepop que vamos a usar es el siguiente:<br />
https://github.com/IsmaelB83/keepcoding-backend-node<br />
Gracias a Ismael por ofrecerlo a modo de punto común en todas las prácticas.<br /><br />
La práctica consiste en realizar un frontal en React que cumpla los siguientes
requisitos:<br />
- Todos los componentes deben pertenecer a una ruta, por ejemplo, el listado
de anuncios puede ser /advert<br />
- Debe existir al menos un error boundary que englobe a toda la aplicación.<br />
- Una vez el usuario se haya registrado este debe ser almacenado en un<br />
contexto que engloba a toda la aplicación y en el LocalStorage.<br />
- Si un usuario se ha registrado, accede, por ejemplo, al listado de anuncios y
recarga la página el sistema deberá obtener el usuario del LocalStorage y
almacenarlo en el contexto para así no perder al usuario de la aplicación. Este
comportamiento debe ser el mismo en el detalle de un anuncio o en el crear /
actualizar un anuncio.<br /><br />
Los componentes que debe contener Wallakeep son:<br />
- Registro : en él se pedirá: nombre, apellidos y tag. Estos tags deberán de ser
recuperados del endpoint que devuelve todos los tags.<br />
- Crear/Actualizar : permite tanto crear un anuncio como editarlo, no son dos
componentes distintos, debe ser uno solo que haga las dos funcionalidades.<br />
- Listado : permitirá listar todos los anuncios y se deberán implementar los
filtros que proporcione Nodepop (nombre, precio, tag…)<br />
- Detalle : permitirá visualizar el detalle de un anuncio. El ID del anuncio deberá
ser pasado como path param, en su ruta (/advert/:id).<br />

### Structure and main components

lorem ipsum
**lorem ipsum**


### Use `npm i` & `npm start` to run
