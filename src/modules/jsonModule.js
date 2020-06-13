const fs = require('fs');
const path = require('path');

module.exports = function(archivo) {

    const funciones = {
        path: path.join(__dirname, '..', 'data', archivo + '.json'),

        leerJson: function(){
            
        }
    }
}