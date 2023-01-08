require('dotenv').config();
const { wogIcon, ruinaRecordsIcon} = process.env

const DB_LARUINATV_MEDIA = [
    {
        id: 000,
        urlID: {idYT:'a', idSpty:'', idDrive:''},
        typeMedia: 'serie',
        titulo: "Ainulindalë",
        artista: "World of Gwerh",
        tag: "Sello Arruinados",
        icon: [wogIcon, ruinaRecordsIcon],
        categoria:['Música', 'Sello Arruinados', 'Series'],
        boton1:'Ver',
        info: 'Serie basada en los escritos de la extensa obra del autor británico "J.R.R Tolkien" que forman parte del "Legendarium"'
    },
    {
        id: 001,
        urlID: {idYT:'mZiusH3M8Uc&ab', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        titulo: "Círculo Vicioso",
        artista: "Derrumbe",
        tag: "Álbum",
        icon: [ruinaRecordsIcon],
        categoria:['Música', 'Estudio "La Ruina Records"', 'Sello Arruinados'],
        boton1:'Escuchar',
        info:'Álbum de la banda "Derrumbe Punk". Grabado, mezclado y masterizado en nuestro estudio "La Ruina Records"'
    },
    {
        id: 002,
        urlID: {idYT:'a', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        titulo: "Paranoia en PerroNegro",
        artista: "Paranoia",
        tag: "Lanzamiento en vivo",
        icon: [ruinaRecordsIcon],
        categoria:['Música', 'En vivo', 'Sello Arruinados'],
        boton1:'Escuchar',
        info:'Lanzamiento en vivo del álbum "Pobre, Muerto, Aburrido" de la banda "Paranoia" en las estancias de "PerroNegro"'
    },
    {
        id: 003,
        urlID: {idWeb:'a', idDrive:'', urlDescarga:''},
        typeMedia: 'app',
        titulo: "Gwerh, the Bard",
        artista: "World of Gwerh",
        tag: "App interactiva",  
        icon: [wogIcon, ruinaRecordsIcon],
        categoria:['Música', 'Sello Arruinados', 'App y Descargables', 'Sello Arruinados'],
        boton1:'Entrar',
        info:'Acércate a escuchar las historias que el bardo tiene para contarte'
    },
    {
        id: 004,
        urlID: {idYT:'a', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        titulo: "Brutópolis",
        artista: "Urticaria",
        tag: "Sello Arruinados",     
        icon: [ruinaRecordsIcon],
        categoria:['Música', 'Sello Arruinados'],
        boton1:'Escuchar',
        info:'Álbum de la banda "Urticaria", postproducido por "La Ruina Records"'
    },
    {
        id: 005,
        urlID: {idYT:'a', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        titulo: "Barrios Bajos Blues",
        artista: "Caña Blues",
        tag: "Álbum",   
        icon: [ruinaRecordsIcon],
        categoria:['Sello Arruinados'],
        boton1:'Escuchar',
        info:'Álbum de la banda valdiviana de blues pesado llamada "Caña Blues", grabado en nuestro estudio "La Ruina Records"'
    },
    {
        id: 006,
        urlID: {idWeb:'a', idDrive:'', urlDescarga:''},
        typeMedia: 'libro',
        titulo: "La Espada Oxidada",
        artista: "World of Gwerh",
        tag: "Literatura",
        icon: [ruinaRecordsIcon],
        categoria:['Literatura', 'App y Descargables'],
        boton1:'Leer',
        info:'El relato de un errante sin destino en un viaje sin retorno'
    },
]

module.exports = { 
    DB_LARUINATV_MEDIA
}