Ejercicio A1

1. 
23 columnas (10 comunes + 13 de atributos)
titulo	categoria	marca	modelo	anio	km	combustible	almacenamiento_gb	bateria_pct	talla	genero	material	ancho	fondo	alto
Seat Ibiza	Coches	Seat	Ibiza	2015	98000	gasolina	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL
iPhone 13	Móviles	Apple	iPhone 13	NULL	NULL	NULL	128	87	NULL	NULL	NULL	NULL	NULL	NULL
Chaqueta vaquera	Ropa	Levi’s	NULL	NULL	NULL	NULL	NULL	NULL	M	unisex	NULL	NULL	NULL	NULL
Mesa de comedor	Muebles	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	NULL	roble	160  90	 75


2.
titulo	categoria	marca	modelo	anio	km	combustible	almacenamiento_gb	bateria_pct	talla	genero	material	ancho	fondo	alto
Chaqueta vaquera	Ropa	Levi’s	NULL	NULL	NULL	NULL	NULL	NULL	M	unisex	NULL	NULL	NULL	NULL


3. 
Habría que modificar la tabla con ALTER TABLE para añadir las nuevas columnas (tipo_bici y pulgadas_rueda), porque talla ya está creada. Los datos que ya tenemos tendrían esos campos vacíos (NULL). Además, cada vez que apareciera una categoría nueva, habría que volver a modificar la tabla

4.
Habría que hacer 4 JOIN, uno con cada tabla (coches, moviles, ropa y muebles), porque cada tipo de anuncio tiene sus datos en una tabla diferente. Si se añade una categoría nueva, también habría que añadir otro JOIN a la consulta

5.
{ titulo: "iPhone 13 128 GB", categoria: "Móviles", precio: 380, atributos: { marca: "Apple", modelo: "iPhone 13", almacenamientoGB: 128, bateriaPct: 87 } }
{ titulo: "Mesa de comedor de roble", categoria: "Muebles", precio: 120, atributos: { material: "roble", ancho: 160, fondo: 90, alto: 75 } }




Ejercicio A2


1.
Si el usuario cambia un dato (por ejemplo su email), habría que cambiarlo en todos sus anuncios. Además, si lo metiéramos entero dentro de cada anuncio, sus datos estarían repetidos inecesariamente

2.
Porque aparece en la ficha del anuncio y normalmente no cambia. El email puede cambiar y la ciudad aparece en cada anuncio

3. 
Habría que cambiar su nombre en en usuarios, y todos sus anuncios, en el campo vendedor.nombre

4.
En SQL, la tabla clases solo guardaba el identificador del monitor (monitor_id). Para ver su nombre había que hacer un INNER JOIN con la tabla monitores. En cambio, aquí el nombre del vendedor se guarda directamente dentro del anuncio. Así no hace falta hacer un JOIN porque ya está en el documento. Si cambia el nombre, hay que actualizarlo en todos los anuncios donde aparezca.



Ejercicio A3


1.
¿Cuando leo el anuncio, casi siempre necesito las ofertas?	No. La ficha que abre todo el mundo no muestra ofertas. Solo las mira el vendedor.
¿La oferta pertenece solo al anuncio?	No. También es del comprador, que quiere verla en «mis ofertas».
¿Se consulta sola?	Sí. «Mis ofertas» busca ofertas sin abrir ningún anuncio.
¿Puede crecer sin límite?	Sí. Un anuncio popular puede recibir muchísimas.


2.
{
  importe: 340,
  estado: "PENDIENTE",
  fecha: new Date("2026-10-27"),
  anuncio: {
    id: ObjectId("670000000000000000000003"),
    titulo: "iPhone 13 128 GB",
    precio: 380
  },
  comprador: {
    id: ObjectId("660000000000000000000005"),
    nombre: "Sara"
  }
}


3. El título, el precio del anuncio y su id

4.No, no debe cambiar. El precio guardado en la oferta es el que tenía el anuncio cuando Sara hizo la oferta. En caso contrario, habría una contradicción en la oferta respecto al precio



Ejercicio A4

1.
Lo mejor sería guardar las valoraciones en otra colección llamada valoraciones. Un vendedor puede recibir muchísimas valoraciones y, si las guardamos todas en un array, su documento crecería demasiado. Además, cada valoración está relacionada con dos usuarios y un anuncio, así que es mejor tenerla separada

2.
{
  anuncioId: ObjectId("670000000000000000000004"),
  autor: {
    id: ObjectId("660000000000000000000004"),
    nombre: "Hugo"
  },
  valoradoId: ObjectId("660000000000000000000003"),
  estrellas: 5,
  comentario: "Todo perfecto",
  fecha: new Date("2026-09-15")
}


3.Sobre autor.id + anuncioId. Así la misma persona no puede valorar dos veces la misma compra

4.valoracionMedia (la nota media) y numValoraciones (cuántas valoraciones tiene)



Ejercicio A5

1.Un usuario suele tener pocos favoritos. Sin embargo, un anuncio puede ser guardado como favorito por muchos usuarios

2.La opción b porque se crearía una lista interminable que cada vez iría creciendo más cada vez que abriesen la ficha

3.La opción a porque al abrir el documento del usuario ya tienes la lista de ids de sus favoritos, sin buscar en otra colección intermedia

4.Contando los usuarios cuyo array favoritos contiene el id de ese anuncio

5. $addToSet porque añade el valor al array solo si no está ya



Ejercicio A6

1.Referenciaría en la colección de mensajes porque una conversación puede tener cientos de mensajes y crecer sin límite, y cada mensaje relaciona a dos usuarios

2.Embebería en la compra porque pertenece solo a esa compra. Si el usuario se muda, la compra antigua debe conservar la dirección a la que se envió

3.Embebería en el anuncio, dentro de etiquetas porque son pocas, pequeñas y se leen siempre con el anuncio

4.Referenciaría en la colección categorias porque una categoría la comparten muchos anuncios. El anuncio puede guardar una copia del nombre

5.Embebería en el anuncio, dentro de historialPrecios: [{ fecha, precio }] porque pertenece solo a ese anuncio, no tiene sentido sin él y un anuncio cambia de precio pocas veces

6.Referenciaría en la colección anuncios con vendedor.id porque el anuncio se busca solo, recibe ofertas y favoritos, y un usuario puede tener muchos

7.Embebería en el pedido dentro lineas porque pertenecen solo a ese pedido, siempre se leen con él y son pocas. Además, guardan el precio del momento de la compra

8.Referenciaría en la colección resenas porque un producto popular puede tener miles de reseñas


Ejercicio B2.3

No he tenido que modificar nada antes de insertar el anuncio. MongoDB permite guardar documentos con distintos campos, así que el anuncio de Deporte se guarda directamente con sus atributos (talla, tipo y pulgadasRueda). En PostgreSQL habría tenido que usar ALTER TABLE para añadir las nuevas columnas o crear una tabla deporte y añadir otro JOIN a las consultas.


Ejercicio B4


1: Un usuario con el email de Ana
Predicción: fallará, porque en el B3.1 creamos un índice único sobre email
MongoServerError: E11000 duplicate key error collection: rastro.usuarios index: email_1 dup key: { email: "ana@rastro.es" }
El índice es único, por eso no se puede duplicar el correo


2:Hugo valora otra vez a Marta por el mismo anuncio
Predicción: fallará, por el índice único sobre autor.id + anuncioId
MongoServerError: E11000 duplicate key error collection: rastro.valoraciones index: autor.id_1_anuncioId_1 dup key: { autor.id: ObjectId('660000000000000000000004'), anuncioId: ObjectId('670000000000000000000004') }
Ya existe una valoración con ese autor y ese anuncio en el índice único



3:Un anuncio de un vendedor que no existe
Predicción: se guardará, porque MongoDB no comprueba si un id apunta a algo que existe
Es un gran problema porque hay un anuncio de un vendedor que no existe en usuarios. Si alguien pulsa en el perfil del vendedor, no encontrará nada



4: Un anuncio con el precio escrito como texto
Predicción: el insert se realizará sin problemas, porque MongoDB no obliga a que los campos tengan un tipo de dato concreto. Sin embargo, al buscar anuncios de menos de 100 €, la lámpara no aparecerá en los resultados
Es un problema porque cuando alguien quiera buscar un anuncio al filtrar por precio, no le aparecerá


5: Cambiar el precio del Xiaomi sin operador
Predicción: fallará, porque updateOne necesita un operador como $set
MongoInvalidArgumentError: Update document requires atomic operators
Sin $set se intenta reemplazar todo el documento por { precio: 80 }, pero se perderían los demás datos. Por eso, mongo bloquea la acción


6:Buscar el iPhone por su id escrito como texto
Predicción: no lo encontrará, porque el _id es un ObjectId, no un texto
Devuelve un NULL porque no ha encontrado nada. Es un problema porque es engañoso, parece que el iPhone no existe


7.
En el gimnasio, habría mostrado un error porque el plan_id no existe y no habría dejado guardar el socio. En Rastro, como Mongo no comprueba las claves ajenas, esa comprobación tiene que hacerla el backend antes de guardar el anuncio, mirando si el vendedor existe en la colección usuarios

8. La lámpara no aparece porque el precio se guardó como texto ("75") en vez de como número. Al buscar precios inferiores a 100, Mongo no la encuentra porque está comparando un texto con un número

9.
En los dos ejercicios se guardaron datos incorrectos y MongoDB no dio ningún error porque no comprueba automáticamente si las referencias existen ni si los campos tienen el tipo de dato correcto


Ejercicio B5.12

No dan error. Simplemente no salen, porque no tienen ese campo y no cumplen el filtro


Ejercicio B8

1.
En MongoDB está todo en un solo documento (fotos, atributos, vendedor) y se lee de una vez, sin JOIN. Además, cada anuncio guarda solo lo suyo, y si sale una categoría nueva no hay que cambiar nada

2.
Los pagos. Con el dinero no puede haber errores, y SQL comprueba mejor que todo esté bien

3.
Las fotos son pocas y siempre se ven con el anuncio. Las ofertas pueden ser muchísimas, y el comprador quiere verlas por separado en «mis ofertas»

4.
Para recordar cuánto costaba cuando se hizo la oferta, como un ticket. Aunque el precio cambie después, la oferta no cambia

5.
Es copiar un dato en varios sitios. se lee más rápido pero si el dato cambia, hay que cambiarlo en todos los sitios. Lo vi cuando Luis cambió su nombre

6.

El programa (el código de la app). MongoDB no tiene claves ajenas y deja guardar referencias a cosas que no existen


RETO 2.
Al LEFT JOIN. Une dos colecciones por un campo


RETO 3
Utilizaría embebido, dentro del anuncio. Un anuncio cambia de precio pocas veces. El historial solo es de esee anuncio y se necesita al mostrar la ficha («ha bajado de precio»)

RETO 4
Error: MongoServerError: Document failed validation
Rechaza el anuncio porque el precio es texto ("75") y no un número. Con $jsonSchema, MongoDB puede comprobar los tipos. Como ha fallado, no se ha guardado nada y no tienes que borrar la lámpara