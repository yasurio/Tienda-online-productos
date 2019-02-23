"use strict";
System.register("Component/service", [], function (exports_1, context_1) {
    "use strict";
    var Service;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Service = /** @class */ (function () {
                function Service(url) {
                    this.url = url;
                }
                Service.prototype.loadData = function () {
                    var xhttp = new XMLHttpRequest();
                    xhttp.responseType = 'json';
                    var self = this; //this de la calase
                    xhttp.onreadystatechange = function () {
                        self.dataReady(this); //this del objeto xhttp
                    };
                    xhttp.open("GET", this.url, true);
                    xhttp.send;
                };
                Service.prototype.dataReady = function (xhttp) {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        this.data = xhttp.response;
                    }
                };
                return Service;
            }());
            exports_1("Service", Service);
        }
    };
});
System.register("init", ["Component/service"], function (exports_2, context_2) {
    "use strict";
    var service_1, s;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (service_1_1) {
                service_1 = service_1_1;
            }
        ],
        execute: function () {
            s = new service_1.Service('http://localhost:8080/tienda/producto/findAll');
            s.loadData();
            console.log(s.loadData());
        }
    };
});
var Cart = /** @class */ (function () {
    function Cart() {
    }
    return Cart;
}());
System.register("interfaces/category", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("interfaces/product", [], function (exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
