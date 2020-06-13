const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function leerJson(){
	let productsObject = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return productsObject;
}

const controller = {
	root: (req, res) => {
		let products = leerJson();

		let visited = products.filter(function(product){
			return product.category == "visited";						// Array de visited products
		});

		let inSale = products.filter(function(product){
			return product.category == "in-sale";						// Array de in-sale products
		});

		return res.render('index', {visited, inSale, toThousand});
		
	},
	search: (req, res) => {
		let products = leerJson();
		let busqueda = req.query.keywords
		res.render('results', {products, busqueda, toThousand});
	},
}

module.exports = controller;
