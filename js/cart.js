let cartProducts;

 function updateCart(arrayProd){
    let nuevaCantidad = document.getElementsByClassName("cantidadInput")
    let aConvertir = 0;
    for (let i = 0; i < nuevaCantidad.length; i++) {
         let valor = nuevaCantidad[i].value;
         arrayProd[i].count = valor;
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
    document.getElementById("subtotal").value = costoSubtotal;
    document.getElementById("subtotal").innerHTML = costoSubtotal;
    let tipoEnvio = document.getElementsByClassName("envioT");
    let j;
    for (let i = 0; i < document.getElementsByClassName("envioT").length; i++) {
        if(tipoEnvio[i].checked){
            j=i;
        }
    }
    if(tipoEnvio[j].id === "envioPremium"){
        let subtotalActual = document.getElementById("subtotal").value;
        let porcentaje = round(subtotalActual*(0.15),2);
        document.getElementById("costoEnvio").value = porcentaje;
        document.getElementById("costoEnvio").innerHTML = porcentaje;
        updateTotal()
    }else if(tipoEnvio[j].id === "envioStandar"){
        let subtotalActual = document.getElementById("subtotal").value;
        let porcentaje = round(subtotalActual*(0.05),2);
        document.getElementById("costoEnvio").value = porcentaje;
        document.getElementById("costoEnvio").innerHTML = porcentaje;
        updateTotal()
    }else{
        let subtotalActual = document.getElementById("subtotal").value;
        let porcentaje = round(subtotalActual*(0.07), 2);
        document.getElementById("costoEnvio").value = porcentaje;
        document.getElementById("costoEnvio").innerHTML = porcentaje;
        updateTotal()
    }
}

function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}



function updateTotal(){
    let total = document.getElementById("subtotal").value + document.getElementById("costoEnvio").value;
    document.getElementById("costoTotal").innerHTML = round(total,2);
}

function showCart(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];
            htmlContentToAppend += `
            <div  class="list-group-item list-group-item-action">
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
                                    <input class="cantidadInput" type="number" min="1" onkeydown="return false" name="name" value="` + category.count +`">
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
function transferenciaExitosa(){
    let datos = document.getElementById("submitT").elements;
    let contador = 0;
    for (let i = 0; i < datos.length-2; i++) {
        if(datos[i].value.length != 0){
            contador++;
        }
    }
    if(contador === 6){
        $('#compra').modal('hide');
        $('#transferencia').modal('hide');
        Swal.fire({
            icon:'success',
            title:'Compra exitosa!',
            text:'gracias!',
            className: "modal-dialog-centered"
        })
    }else{
        $('#transferencia').modal('hide');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos erróneos o faltantes!',
            className: "modal-dialog-centered",
          }).then(function(){
            $('#transferencia').modal('show');
          })  
    }
}
function ocultarModalCompra(){
    $('#compra').modal('hide');
}
function showModalCompra(){
    $('#compra').modal('show');
}

function creditoExitoso(){
    let datos = document.getElementById("submitD").elements;
    let contador = 0;
    for (let i = 0; i < datos.length-2; i++) {
        if(datos[i].value.length != 0){
            contador++;
        }
    }
    if(contador === 6){
        $('#compra').modal('hide');
        $('#credito').modal('hide');
        Swal.fire({
            icon:'success',
            title:'Compra exitosa!',
            text:'gracias!',
            className: "modal-dialog-centered"
        })
        
    }else{
        $('#credito').modal('hide');
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Datos erróneos o faltantes!',
            className: "modal-dialog-centered",
          }).then(function(){
            $('#credito').modal('show');
          })
    }
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData('https://japdevdep.github.io/ecommerce-api/cart/654.json').then(function(resultObj){
        if (resultObj.status === "ok"){
            cartProducts = resultObj.data;
            showCart(cartProducts.articles);
            updateCart(cartProducts.articles);
            let subtotalActual = document.getElementById("subtotal").value;
            let porcentaje = subtotalActual*(0.05)
            document.getElementById("costoEnvio").value = porcentaje;
            document.getElementById("costoEnvio").innerHTML = porcentaje;
            updateTotal();
        }
        let nuevaCant = document.getElementsByClassName("cantidadInput");   // actualizacion de cantidad de input
        
        let tipoEnvio = document.getElementsByClassName("envioT");  // seleccion de tipo de envío
        for (let i = 0; i < tipoEnvio.length; i++){
            tipoEnvio[i].onchange = function(e){
                updateTotal();
                updateCart(cartProducts.articles);
            }
        }
        let plusBtn = document.getElementsByClassName("plus-btn");  // boton aumentar cantidad input de Productos
        for (let i = 0; i < plusBtn.length; i++){
            plusBtn[i].onclick = function(e){
                cartProducts.articles[i].count++;
                nuevaCant[i].value= cartProducts.articles[i].count;
                updateCart(cartProducts.articles);
                updateTotal();
            }
        }
        let minusBtn = document.getElementsByClassName("minus-btn"); // boton disminuir cantidad input de Productos
        for (let i = 0; i < minusBtn.length; i++){
            minusBtn[i].onclick = function(e){
                console.log(nuevaCant[i].value);
                if(cartProducts.articles[i].count > 1){
                    cartProducts.articles[i].count--;
                }
                nuevaCant[i].value= cartProducts.articles[i].count;
                updateCart(cartProducts.articles);
                updateTotal();
            }
        }
    });
});


// https://japdevdep.github.io/ecommerce-api/cart/654.json