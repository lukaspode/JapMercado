//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COST_DESC = "Desc.";
const ORDER_BY_PROD_COST_ASC = "Asc.";
const ORDER_BY_REL = "Relev.";
var productsArray = [];
let filteredArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)     // criterio Nombre
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST_DESC){    // criterio Precio
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST_ASC){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost < bCost ){ return -1; }
            if ( aCost > bCost ){ return 1; }
            return 0;
        });
    }else if(criteria === ORDER_BY_REL){        // criterio Relevancia
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
    });
    }
    return result;
}

function showProductsList(array){
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(category.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) <= maxCost))  &&
            ((minCount == undefined) || (minCount != undefined && parseInt(category.soldCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.soldCount) <= minCount)))
            {
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name + ` - ` + category.currency + ` ` + category.cost + `</h4>
                                <small class="text-muted">Vendidos: ` + category.soldCount +`</small>                           
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            productsArray = resultObj.data;
            filteredArray = productsArray;
            productsArray = sortProducts(ORDER_BY_PROD_COST_DESC,productsArray);
            showProductsList(productsArray);
        }
    });
    
    const searchBar = document.getElementById("search_filter");     //Mostrar elementos filtrados
    searchBar.onkeyup = () => {
        let searchInput = searchBar.value.toLowerCase();
        filteredArray = productsArray.filter(item =>{
            return item.name.toLowerCase().indexOf(searchInput) > -1 || item.description.toLowerCase().indexOf(searchInput) > -1;
        });
        showProductsList(filteredArray);
    };
    searchBar.addEventListener("search", function(e){       //Eliminar filtrado
        showProductsList(productsArray);
        filteredArray = productsArray;                      //reseteo array filtrado nuevamente a todos los productos
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_ASC_BY_NAME,filteredArray);
        showProductsList(filteredArray);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_DESC_BY_NAME,filteredArray);
        showProductsList(filteredArray);
    });

    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_BY_PROD_COST_DESC,filteredArray);
        showProductsList(filteredArray);
    });

    document.getElementById("sortByCostAsc").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_BY_PROD_COST_ASC,filteredArray);
        showProductsList(filteredArray);
    });

    document.getElementById("sortByRelev").addEventListener("click", function(){
        let tempArray = sortProducts(ORDER_BY_REL,filteredArray)
        showProductsList(filteredArray);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList(productsArray);
    });

    document.getElementById("rangeFilterCost").addEventListener("click", function(){
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList(productsArray);
    });

    
});

/*
(((maxCost == undefined) || (maxCost != undefined && parseInt(category.cost) >= maxCost))
*/