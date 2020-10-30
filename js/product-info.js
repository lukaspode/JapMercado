
let product;
let commentArray = [];
let allProducts = [];

function showProduct(prod){                         //Mostrar Datos Producto
    let producto = prod; 
    document.getElementById("prodTitle").innerHTML = producto.name;
    document.getElementById("produCost").innerHTML = producto.currency + ` ` + producto.cost;
    document.getElementById("produDesc").innerHTML = producto.description;
    document.getElementById("produCount").innerHTML = producto.soldCount;
    document.getElementById("produCat").innerHTML = producto.category;
    showImages(producto.images);
}

function showImages(array){                                //Mostrar Imagenes Producto
    let htmlContentToAppend = "";
    let iter;
    for (let i = 0; i < array.length; i++) {
        iter = array[i];
        if (i == 0){
            htmlContentToAppend += `
                <div class="carousel-item active">
                    <img src="` + iter + `" class=" d-block w-100" alt="imagenDescriptiva">
                </div>        
            `
        }
        else{
            htmlContentToAppend += `
                <div class="carousel-item ">
                    <img src="` + iter + `" class="d-block w-100" alt="imagenDescriptiva">
                </div>        
            `
        }
    }
    document.getElementById("prod-images").innerHTML = htmlContentToAppend;
}

function showRelated(arrayRel,arrayProd){
    let htmlContentToAppend = '';
    let iter;
    for (let i = 0; i < arrayRel.length; i++) {
        iter = arrayRel[i];
        htmlContentToAppend += `
             <div class="col-sm-4">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <h5 class="m-3"> `+ arrayProd[iter].name +` </h5>
                    <img class='img-fluid img-thumbnail' src="` + arrayProd[iter].imgSrc + `" alt="` + arrayProd[iter].description + `">
                    <div class="card-body">
                    <p class="mb-1">`+ arrayProd[iter].currency + ` ` + arrayProd[iter].cost + `</p>
                    <small class="text-right"><p>Clickea para mas info (+)</p></small>
                  </div>
                </a>
            </div>
        `
    }
    document.getElementById("prod-images-rel").innerHTML = htmlContentToAppend;    

}

function showComments(array){                           //Mostrar Comentarios
    let htmlContentToAppend = "";
    let iter;
    for (let i = 0; i < array.length; i++) {
        iter = array[i];
        for (let i = 0; i < iter.score; i++) {
            htmlContentToAppend +=`<span class="fa fa-star star-color"></span>`      //Añado estrellas    
        }
                                                                        //Añado Datos
        htmlContentToAppend += `
        <article class="review-tooltip expanded" id="review65714097">         
            <h4 class="review-tooltip-title">`+iter.user+`</h4>           
            <div class="review-tooltip-full-body">`+iter.description+`
            </div>       
            <div class="review-tooltip-creation-date ch-hide">
                <small>publicado: <time>`+iter.dateTime+`</time></small>
            </div>
            <br>
        </article>
        `
    }
    document.getElementById("prod-comments").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            allProducts = resultObj.data;
        }
    });
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){     //Carga de InfoProducto
        if (resultObj.status === "ok"){
            product = resultObj.data;
            showProduct(product);
            showRelated(product.relatedProducts,allProducts);
        }
    });
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){    //Carga Comentarios
        if (resultObj.status === "ok"){
            commentArray = resultObj.data;
            showComments(commentArray);
        }
    });
    
});