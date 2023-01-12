const getProductById = (db, id) => { return db.filter(e=>{return e.idProduct=== +id}) }

module.exports = {
    getProductById
}