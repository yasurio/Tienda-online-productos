export class Service{
    url: string;
    //data: Product [];
    constructor(url : string){
        this.url = url;
    }
    loadData(): void {
        var xhttp =new XMLHttpRequest();
        xhttp.responseType='json';
        let self=this;  //this de la calase
        xhttp.onreadystatechange =function(){
            self.dataReady(this);   //this del objeto xhttp
        }
        xhttp.open("GET",this.url,true);
        xhttp.send;
    }
    private dataReady(xhttp : XMLHttpRequest): void{
        if(xhttp.readyState == 4 && xhttp.status==200){
            //this.data = xhttp.response;
        }
    }
}