import {Service} from "./component/service";
let s =new Service('http://localhost:8080/tienda/producto/findAll');

s.loadData();
console.log(s.loadData());