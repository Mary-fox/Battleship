let view = {
    displayMessage: function(msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function(location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }
}
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [{ locations: ["06", "16", "26"], hits: ["", "", ""] },
            { locations: ["24", "34", "44"], hits: ["", "", ""] },
            { locations: ["10", "11", "12"], hits: ["", "", ""] }],
            fire: function(guess) {
                for (var i = 0; i < this.numShips; i++) {
                let ship = this.ships[i];
                let index = ship.locations.indexOf(guess);
                //Если координаты клетки присутствуют в массиве locations, значит, 
                //выстрел попал в цель.
                if (index >= 0) {
                ship.hits[index] = "hit";
                    //выводим маркер попадания
                    view.displayHit(guess);
                    view.displayMessage("HIT!");
                    if (this.isSunk(ship)) {
                        //сообщаем игроку,что он потопил корабль 
                        view.displayMessage("You sank my battleship!");
                        this.shipsSunk++;
                    }
                    return true;
                }
            }
            //сообщаем пресдтавлению, что в клетке guess надо вывести маркер промаха
            view.displayMiss(guess);
            //выводим сообщение о промахе 
            view.displayMessage("You missed.");
            return false;
    },
    isSunk: function(ship) {
        for (var i = 0; i < this.shipLength; i++) {
        if (ship.hits[i] !== "hit") {
        return false;
        }
        }
        return true;
        }
       };
// isSunk   получает объект корабля и проверяет, помечены ли все его клетки маркером попадания.     
//Если есть хотя бы одна клетка, в которую еще не попал игрок, то корабль 
//еще жив и метод возвращает false.
//model.fire("53");
//model.fire("06");
//model.fire("16");
//model.fire("26");
//model.fire("34");
//model.fire("24");
//model.fire("44");
//model.fire("12");
//model.fire("11");
//model.fire("10");

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];
    if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
    } else {
    firstChar = guess.charAt(0);
    let row = alphabet.indexOf(firstChar);
    let column = guess.charAt(1);
    // добавляем код для получения второго символа, представляющего столбец игрового поля
    if (isNaN(row) || isNaN(column)) {
        alert("Oops, that isn't on the board.");
    //А здесь функция isNaN выявляет строки и столбцы, которыене являются цифрами        
        } else if (row < 0 || row >= model.boardSize ||
        column < 0 || column >= model.boardSize) {
        alert("Oops, that's off the board!");
    //Мы также проверяем, что цифры лежат в диапазоне от 0 до 6    
        } else {
            return row + column;
        }
    }
    return null;
    }
    //console.log(parseGuess("A0"));
    //console.log(parseGuess("B6"));
    //console.log(parseGuess("G3"));
    //console.log(parseGuess("H0"));
    //console.log(parseGuess("A7"));

    let controller = {
        guesses: 0,
        processGuess: function(guess) {
        let location = parseGuess(guess);
            //Метод parseGuess будет использоваться для проверки введенных данных
            //Если метод не возвращает null, значит, был получен действительный объект location.
            if (location) {
                this.guesses++;
                let hit = model.fire(location);
                if (hit && model.shipsSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + 
                this.guesses + " guesses");
 //Если выстрел попал в цель, а количество потопленных кораблей равно количеству 
//кораблей в игре, выводится сообщение о том, что все корабли потоплены.
                }
            }
        }
    };
    controller.processGuess("A0");
    controller.processGuess("A6");
    controller.processGuess("B6");
    controller.processGuess("C6");
    controller.processGuess("C4");
    controller.processGuess("D4");
    controller.processGuess("E4");
    controller.processGuess("B0");
    controller.processGuess("B1");
    controller.processGuess("B2");