Para poder visualizar los productos ingrese la siguiente URL: http://localhost:8080/api/products
Para poder visualizar los prodcutos en tiempo real URL: http://localhost:8080/realtimeproducts
para poder actulizar la table y ver que efectivamente hay cambios en tiempo real, hara uso de los siguientes metodos HTTP
(Nota:usar postman o otra herramienta que permita hacer peticiones HTTP)
POST-http://localhost:8080/api/products
data de ejemplo:
{
        "title": "producto prueba_3",
        "description": "Este es un producto prueba",
        "price": 200,
        "thumbnail": "",
        "code": "55998c",
	      "status" : true,
	      "category":"clothes",
        "stock": 25
}

DELETE-http://localhost:8080/api/products/:pid
