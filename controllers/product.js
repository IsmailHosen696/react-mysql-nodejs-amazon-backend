const db = require('../sql/sql');

module.exports.getallproducts = async (req, res) => {
    const getquery = 'SELECT * FROM products;';
    await db.query(getquery, (err, data) => {
        if (err) {
            res.json(err);
        }
        res.json(data);
    })
}
module.exports.addproducts = async (req, res) => {
    const { productName, productPrice, productDescription, productFeatures, url, type } = req.body;
    const getquery = `INSERT INTO products (productname,productprice,productdetails, productfeatures,productimg,type) VALUES (?,?,?,?,?,?);`;
    await db.query(getquery, [productName, productPrice, productDescription, productFeatures, url, type], (err, result) => {
        if (err) {
            res.json({ err });
        }
        res.json(result);
    })
}