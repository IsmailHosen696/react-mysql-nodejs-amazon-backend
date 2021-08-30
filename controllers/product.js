const db = require('../sql/sql');

module.exports.getallproducts = async (req, res) => {
    const getquery = 'SELECT * FROM products;';
    await db.query(getquery, (err, data) => {
        if (err) {
            res.json({ err });
        }
        res.json({ data });
    })
}
module.exports.addproducts = async (req, res) => {
    const { productName, productPrice, productDescription, url } = req.body;
    const getquery = `INSERT INTO products (productname,productprice,productdetails,productimg) VALUES (?,?,?,?);`;
    await db.query(getquery, [productName, productPrice, productDescription, url], (err, result) => {
        if (err) {
            res.json({ err });
        }
        res.json({ result });
    })
}