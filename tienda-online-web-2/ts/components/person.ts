class Person {
    name: string;
    surname: string;
    age: number;
    private _nif: string;
    constructor(name: string, surname: string, age: number, nif: string) {
        this.name = name;
        this.surname = surname;
        this.age = age;
        this._nif = nif;
    }

    get nif(): string {
        return this._nif;
    }

    set nif(nif: string) {
        this._nif = nif;
    }

    fullName(): string {
        return this.name + ' ' + this.surname;
    }
}

let person = new Person('Alejandro', 'Sevillano Moreno', 28, '28538888-V');

console.log(person.fullName());

person.nif = '90555444-M';

console.log(person.nif);

class Employee extends Person {
    salary: number;
    idEmployee: number;
    und: boolean;
    constructor(name: string, surname: string, age: number, nif: string, salary: number, idEmployee: number, und: boolean) {
        super(name, surname, age, nif);
        this.salary = salary;
        this.idEmployee = idEmployee;
        this.und = und;
    }
}

let employee = new Employee('Alejandro', 'Sevillano Moreno', 28, '28538888-V', 100000, 127391, true);

console.log('NIF de empleado: ' + employee.nif);