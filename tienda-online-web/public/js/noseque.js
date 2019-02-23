const col = 5; // columnas

let values = [];
let matrix = [[], [], [], [], []]; // LO SIENTO

// generacion de datos descendente
for (let n = 25; n > 0; n--) {
    values.push(n);
}

// movimiento
// 0,0 - 0,1 - 1,0 - 0,2 - 1,1 - 2,0 - etc
for (let i = 0; i < col * 2 - 1; i++) {
    let x;
    let y;


    if (i < col) {
        x = 0;
        y = i;
    }
    else {
        if (col >= i) {
            x = col - i + 1;
            y = col - 1;
        }else {
            x = i - col + 1;
            y = col - 1;
        }
    }

    while (x < i + 1 && x < col) {
        matrix[x][y] = values.pop(); // dejo caer el ultimo elmento del array de datos

        x++
        y--;
    }
}