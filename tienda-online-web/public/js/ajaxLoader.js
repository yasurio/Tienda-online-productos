let http_request = new XMLHttpRequest();
http_request.onreadystatechange= alertContets;
http_request.open('GET',"http://10.152.125.204:8080/tienda/producto/findAll",true);
http_request.send();

function alertContets(){
    if(http_request.readyState == 4){
        if(http_request.status == 200){
            console.log(http_request.responseText);
        }else{
            alert('Hubo problemas con la peticion');
        }
    }
}