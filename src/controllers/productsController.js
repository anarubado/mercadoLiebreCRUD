const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function leerJson(){
	const productsObject = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return productsObject;
};

function guardarJson(){
	let productsObject = leerJson();
	productsJson = fs.writeFileSync(productsFilePath, productsObject, 'utf-8');
	return productsJson;
};

const controller = {
	// Root - Show all products
	root: (req, res) => {
		let arrayProducts = leerJson();				// Obtengo el objeto literal con todos los productos
		
		return res.render('products', {arrayProducts, toThousand});		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let product = products.find(function(product){
			return product.id == req.params.productId;
		});

		return res.render('detail', {product, toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
	},
	
	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		
	}
};

module.exports = controller;