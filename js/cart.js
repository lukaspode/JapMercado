let cartProducts;

 function updateCant(arrayProd){
    let nuevoSubtotal = document.getElementsByClassName("cantidadInput")
    let aConvertir = 0;
    for (let i = 0; i < nuevoSubtotal.length; i++) {
         let valor = nuevoSubtotal[i].value;
         let category = arrayProd[i];
         category.count = valor;
    }
    let costoSubtotal = 0;
    for (let i = 0; i < arrayProd.length; i++) {
        let articulo = arrayProd[i];
        if (articulo.currency === "UYU"){
            aConvertir = aConvertir + articulo.unitCost*(articulo.count);
        }
        costoSubtotal = costoSubtotal + (articulo.unitCost)*(articulo.count)
    }
    costoSubtotal = costoSubtotal - aConvertir + (aConvertir/40)

    document.getElementById("subtotal").innerHTML = costoSubtotal;
}


function showCart(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
            htmlContentToAppend += `
            <div href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <a href="product-info.html"><img src="` + category.src + `" alt="` + category.name + `" class="img-thumbnail"></a>
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + ` - ` + category.currency + ` ` + category.unitCost + `</h4>
                                <div class="quantity">
                                    <small class="text-muted">Cantidad:</small>
                                    <button class="button-p-m plus-btn" type="button" name="button">
                                        <img src="img/plus.svg" alt="" />
                                    </button>
                                    <input class="cantidadInput" type="number" min="1" name="name" value="` + category.count +`">
                                    <button class="button-p-m minus-btn" type="button" name="button">
                                        <img src="img/minus.svg" alt="" />
                                    </button>
                                </div>
                        </div>
                        
                    </div>
                </div>
            </div>
            </div>
            `
        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProducts = resultObj.data;
            showCart(cartProducts.articles);
            updateCant(cartProducts.articles);
        }
        let nuevaCant = document.getElementsByClassName("cantidadInput")
        for (let i = 0; i < nuevaCant.length; i++) {
            nuevaCant[i].onchange = function(e){
                updateCant(cartProducts.articles);
            }
        }
        
    });
});


// https://japdevdep.github.io/ecommerce-api/cart/654.json