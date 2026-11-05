// Ejercicio B1

db.usuarios.countDocuments()
db.anuncios.countDocuments()  
db.ofertas.countDocuments()   
db.valoraciones.countDocuments()



// Ejercicio B2

db.anuncios.insertOne({
  titulo: "Bicicleta de montaña Orbea",
  descripcion: "Revisada en taller.",
  precio: 300,
  categoria: "Deporte",
  estado: "DISPONIBLE",
  ciudad: "Castellón",
  fechaPublicacion: new Date("2026-10-27"),
  visitas: 0,
  vendedor: { id: ObjectId("660000000000000000000004"), nombre: "Hugo Sanz" },
  fotos: [ { url: "https://img.rastro.es/bici-1.jpg", orden: 1 } ],
  atributos: { talla: "L", tipo: "montaña", pulgadasRueda: 29 }
})

db.anuncios.insertOne({
  titulo: "Google Pixel 7",
  descripcion: "Libre, con caja.",
  precio: 260,
  categoria: "Móviles",
  estado: "DISPONIBLE",
  ciudad: "Valencia",
  fechaPublicacion: new Date("2026-10-28"),
  visitas: 0,
  vendedor: { id: ObjectId("660000000000000000000005"), nombre: "Sara López" },
  fotos: [
    { url: "https://img.rastro.es/pixel-1.jpg", orden: 1 },
    { url: "https://img.rastro.es/pixel-2.jpg", orden: 2 }
  ],
  atributos: { marca: "Google", modelo: "Pixel 7", almacenamientoGB: 128, bateriaPct: 92 }
})


// Ejercicio B3

//1
db.usuarios.createIndex({ email: 1 }, { unique: true })

//2
db.valoraciones.createIndex({ "autor.id": 1, anuncioId: 1 }, { unique: true })

//3
db.anuncios.createIndex({ categoria: 1, precio: 1 })

//4
db.usuarios.getIndexes()
db.valoraciones.getIndexes()
db.anuncios.getIndexes()

//5
db.anuncios.find({ categoria: "Coches" }).sort({ precio: 1 }).explain()


// Ejercicio B5

// 1
db.anuncios.find(
  { estado: "DISPONIBLE", ciudad: "Valencia" },
  { titulo: 1, precio: 1, _id: 0 }
).sort({ precio: 1 })

// 2
db.anuncios.find({ categoria: "Coches", "atributos.km": { $lt: 100000 } })

// 3
db.anuncios.find({ categoria: "Móviles", "atributos.almacenamientoGB": { $gte: 128 } })

// 4
db.anuncios.find({ precio: { $gte: 50, $lte: 400 } })

// 5
db.anuncios.find({ titulo: /nike/i })

// 6
db.anuncios.find({ "vendedor.id": ObjectId("660000000000000000000002") })

//7
db.anuncios.find({ fotos: { $size: 0 } })

// 8
db.ofertas.find({ "anuncio.id": ObjectId("670000000000000000000001"), estado: "PENDIENTE" })

//9
db.usuarios.find(
  { favoritos: ObjectId("670000000000000000000008") },
  { nombre: 1, _id: 0 }
)

//10
db.anuncios.countDocuments({ estado: "VENDIDO" })

//11
db.anuncios.find({}, { titulo: 1, visitas: 1, _id: 0 }).sort({ visitas: -1 }).limit(3)



// Ejercicio B6

// 1
db.anuncios.aggregate([
  { $group: { _id: "$categoria", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
])

// 2
db.anuncios.aggregate([
  { $group: { _id: "$categoria", precioMedio: { $avg: "$precio" } } }
])

// 3
db.anuncios.aggregate([
  { $group: { _id: "$ciudad", total: { $sum: 1 } } }
])

// 4
db.anuncios.aggregate([
  { $match: { estado: "DISPONIBLE" } },
  { $group: { _id: "$vendedor.nombre", totalEnVenta: { $sum: "$precio" } } }
])

// 5
db.anuncios.aggregate([
  { $group: { _id: "$categoria", totalVisitas: { $sum: "$visitas" } } },
  { $sort: { totalVisitas: -1 } },
  { $limit: 1 }
])


// Ejercicio B7

// 1
db.anuncios.find({ _id: ObjectId("670000000000000000000003") })

db.anuncios.updateOne(
  { _id: ObjectId("670000000000000000000003") },
  { $push: { fotos: { url: "https://img.rastro.es/a3-4.jpg", orden: 4 } } }
)

// 2
db.anuncios.find({ _id: ObjectId("670000000000000000000005") })

db.anuncios.updateOne(
  { _id: ObjectId("670000000000000000000005") },
  { $inc: { visitas: 1 } }
)

//3
db.usuarios.find({ _id: ObjectId("660000000000000000000005") })

// Quita el iPhone
db.usuarios.updateOne(
  { _id: ObjectId("660000000000000000000005") },
  { $pull: { favoritos: ObjectId("670000000000000000000003") } }
)

// Añade el Ford Focus
db.usuarios.updateOne(
  { _id: ObjectId("660000000000000000000005") },
  { $addToSet: { favoritos: ObjectId("670000000000000000000002") } }
)

// Lo añade otra vez
db.usuarios.find({ _id: ObjectId("660000000000000000000005") },
  { $addToSet: { favoritos: ObjectId("670000000000000000000002") } }
)

//RESPUESTA: Nos se duplica. La segunda vez responde modifiedCount: 0, porque $addToSet no añade lo que ya está

//4
db.ofertas.updateOne(
  { _id: ObjectId("680000000000000000000003") },
  { $set: { estado: "ACEPTADA" } }
)

db.anuncios.updateOne(
  { _id: ObjectId("670000000000000000000001") },
  { $set: { estado: "RESERVADO" } }
)

//RESPUESTA: He utizado dos instruccionees. Si hay problemas entre una y otra, la oferta saldría como aceptada paro el coche apareciería como disponible y otra persona podría compralo

//5
db.anuncios.find({ categoria: "Coches" })

db.anuncios.updateMany(
  { categoria: "Coches" },
  { $mul: { precio: 0.9 } }
)

// 6
// Cambia su usuario
db.usuarios.updateOne(
  { _id: ObjectId("660000000000000000000002") },
  { $set: { nombre: "Luis M. Martín" } }
)

// Mira sus anuncios
db.anuncios.find({ "vendedor.id": ObjectId("660000000000000000000002") })
// Sus anuncios (es el vendedor)
db.anuncios.updateMany(
  { "vendedor.id": ObjectId("660000000000000000000002") },
  { $set: { "vendedor.nombre": "Luis M. Martín" } }
)

// Sus ofertas (es el comprador)
db.ofertas.updateMany(
  { "comprador.id": ObjectId("660000000000000000000002") },
  { $set: { "comprador.nombre": "Luis M. Martín" } }
)

// Sus valoraciones escritas (es el autor)
db.valoraciones.updateMany(
  { "autor.id": ObjectId("660000000000000000000002") },
  { $set: { "autor.nombre": "Luis M. Martín" } }
)

//RESPUESTA: “Luis Martín” sigue apareciendo porque el nombre está copiado en cada anuncio y la copia no se actualiza sola. Por eso se arregla en todas




// Reto opcional

// Reto 1
// 1
db.valoraciones.insertOne({
  anuncioId: ObjectId("670000000000000000000007"),
  autor: { id: ObjectId("660000000000000000000002"), nombre: "Luis M. Martín" },
  valoradoId: ObjectId("660000000000000000000001"),
  estrellas: 4,
  comentario: "Buen trato",
  fecha: new Date()
})

//2
db.usuarios.updateOne(
  { _id: ObjectId("660000000000000000000001") },
  { $set: { valoracionMedia: 4 }, $inc: { numValoraciones: 1 } }
)

//3
db.valoraciones.aggregate([
  { $group: { _id: "$valoradoId", media: { $avg: "$estrellas" }, total: { $sum: 1 } } }
])

//4
db.usuarios.find({}, { nombre: 1, valoracionMedia: 1, numValoraciones: 1, _id: 0 })




// Reto 2
db.anuncios.aggregate([
  { $lookup: {
      from: "usuarios",
      localField: "vendedor.id",
      foreignField: "_id",
      as: "vendedorCompleto"
  } }
])


// Reto 3

{
  titulo: "Monitor Samsung 27 pulgadas",
  precio: 80,
  historialPrecios: [
    { fecha: new Date("2026-11-01"), precioAnterior: 90, precioNuevo: 80 }
  ]
}

db.anuncios.updateOne(
  { _id: ObjectId("670000000000000000000005") },
  {
    $set: { precio: 80 },
    $push: { historialPrecios: { fecha: new Date(), precioAnterior: 90, precioNuevo: 80 } }
  }
)

// Reto 4
db.runCommand({
  collMod: "anuncios",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["precio"],
      properties: {
        precio: { bsonType: "number" }
      }
    }
  }
})