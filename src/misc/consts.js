require('dotenv').config();
const { wogIcon, ruinaRecordsIcon} = process.env

const DB_LARUINATV_MEDIA = [
    {
        id: 0,
        idMedia: {idYT:'', idSpty:'', idDrive:''},
        typeMedia: 'serie',
        title: "Ainulindalë",
        artist: "World of Gwerh",
        tag: "Sello Arruinados",
        icon: [wogIcon, ruinaRecordsIcon],
        categories:['Música', 'Sello Arruinados', 'Series'],
        actionButton:'Ver',
        info: 'Serie basada en los escritos de la extensa obra del autor británico "J.R.R Tolkien" que forman parte del "Legendarium"',
        genre: 'metal'
    },
    {
        id: 1,
        idMedia: {idYT:'mZiusH3M8Uc', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        title: "Círculo Vicioso",
        artist: "Derrumbe",
        tag: "Álbum",
        icon: [ruinaRecordsIcon],
        categories:['Música', 'Estudio "La Ruina Records"', 'Sello Arruinados'],
        actionButton:'Escuchar',
        info:'Álbum de la banda "Derrumbe Punk". Grabado, mezclado y masterizado en nuestro estudio "La Ruina Records"',
        genre: 'punk'

    },
    {
        id: 2,
        idMedia: {idYT:'A4QHsGibd34', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        title: "Paranoia en PerroNegro",
        artist: "Paranoia",
        tag: "Lanzamiento en vivo",
        icon: [ruinaRecordsIcon],
        categories:['Música', 'En vivo', 'Sello Arruinados'],
        actionButton:'Escuchar',
        info:'Lanzamiento en vivo del álbum "Pobre, Muerto, Aburrido" de la banda "Paranoia" en las estancias de "PerroNegro"',
        genre: 'punk'

    },
    {
        id: 3,
        idMedia: {idYT:'ZUdNWa8kL3E', idDrive:'', urlDescarga:''},
        typeMedia: 'app',
        title: "Gwerh, the Bard",
        artist: "World of Gwerh",
        tag: "App interactiva",  
        icon: [wogIcon, ruinaRecordsIcon],
        categories:['Música', 'Sello Arruinados', 'App y Descargables', 'Sello Arruinados'],
        actionButton:'Entrar',
        info:'Acércate a escuchar las historias que el bardo tiene para contarte',
        genre: 'other'
    },
    {
        id: 4,
        idMedia: {idYT:'liBJys5OexY', idSpty:'', idDrive:''},
        typeMedia: 'musica',
        title: "Brutópolis",
        artist: "Urticaria",
        tag: "Sello Arruinados",     
        icon: [ruinaRecordsIcon],
        categories:['Música', 'Sello Arruinados'],
        actionButton:'Escuchar',
        info:'Álbum de la banda "Urticaria", postproducido por "La Ruina Records"',
        genre: 'metal'
    },
    {
        id: 005,
        idMedia: {idYT:'7C8SdVEpj9k', idSpty:'', idDrive:''}, //&list=OLAK5uy_nlnLI24tL90QP7jgSfjC2ZhDMyxOrtLk4
        typeMedia: 'musica',
        title: "Barrios Bajos Blues",
        artist: "Caña Blues",
        tag: "Álbum",   
        icon: [ruinaRecordsIcon],
        categories:['Sello Arruinados'],
        actionButton:'Escuchar',
        info:'Álbum de la banda valdiviana de blues pesado llamada "Caña Blues", grabado en nuestro estudio "La Ruina Records"',
        genre: 'blues'
    },
    {
        id: 006,
        idMedia: {idWeb:'', idDrive:'', urlDescarga:''},
        typeMedia: 'libro',
        title: "La Espada Oxidada",
        artist: "World of Gwerh",
        tag: "Literatura",
        icon: [ruinaRecordsIcon],
        categories:['Literatura', 'App y Descargables'],
        actionButton:'Leer',
        info:'El relato de un errante sin destino en un viaje sin retorno',
        genre: 'literario'
    },
]

module.exports = { 
    DB_LARUINATV_MEDIA
}