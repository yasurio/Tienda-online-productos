import { Product } from "../interfaces/product";

export class Service {
    url: string;
    data: Product[];
    constructor(url: string) {
        this.url = url;
        this.data = [];
    }
    loadData(callback: Function): void {
        var xhttp = new XMLHttpRequest();
        xhttp.responseType = 'json';
        let self = this; // This de la clase
        xhttp.onreadystatechange = function () {
            self.dataReady(this, callback); // This del objeto xhttp
        };
        xhttp.open("GET", this.url, true);
        xhttp.send();
    }
    private dataReady(xhttp: XMLHttpRequest, callback: Function): any {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            this.data = xhttp.response;
            callback(xhttp.response);
        }
    }
}