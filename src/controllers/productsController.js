const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '..', 'data', 'productsDataBase.json');
//const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

function leerJson(){
	let productsObject = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
	return productsObject;
}

function guardarJson(products){
	let productsJson = JSON.stringify(products, null, " ");
	let jsonGuardado = fs.writeFileSync(productsFilePath, productsJson);
	return jsonGuardado;	
};

const controller = {
	// Root - Show all products
	root: (req, res) => {	
		let products = leerJson();	
		return res.render('products', {products, toThousand});		
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let products = leerJson();
		let product = products.find(function(product){
			return product.id == req.params.productId;
		});

		return res.render('detail', {product, toThousand});
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let products = leerJson();
		let productAdded = {
			id: products.length + 1,
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			discount: req.body.discount,
			image: '../../public/images/products/default-image.jpg',
			category: req.body.category
		};

		let totalProducts = [...products, productAdded];

		guardarJson(totalProducts);
		return res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let products = leerJson();
		let product = products.find(function(product){
			return product.id == req.params.productId;
		});

		return res.render('product-edit-form', {product, toThousand});
	},

	// Update - Method to update
	update: (req, res) => {
		let products = leerJson();
		let productsUpdate = products.map(function(product){
			if (product.id != req.params.productId){
				return product;
			}		
			return product = {
				id: product.id,
				name: req.body.name,
				description: req.body.description,
				price: req.body.price,
				discount: req.body.discount,
				image: product.image,
				category: req.body.category				
			}
		})

		guardarJson(productsUpdate);
		return res.redirect('/');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let products = leerJson();
		for (let i = 0; i < products.length; i++){
			if (products[i].id == req.params.productId){
				products.splice(i, 1);
				totalProducts = products;
			}
		}
		
		guardarJson(totalProducts);

		return res.redirect('/');
	}
};

module.exports = controller;