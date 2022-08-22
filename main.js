
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],
            fire: function(guess) {
                for (let i = 0; i < this.numShips; i++) {
                let ship = this.ships[i];
                let index = ship.locations.indexOf(guess);
                //Если координаты клетки присутствуют в массиве locations, значит, 
                //выстрел попал в цель.
                if (ship.hits[index] === "hit") {
                    view.displayMessage("Oops, you already hit that location!");
                    return true;
                }else if (index >= 0) {
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
        for (let i = 0; i < this.shipLength; i++) {
             if (ship.hits[i] !== "hit") {
                 return false;
            }
        }
        return true;
    },
    
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

    generateShipLocations: function() {
        let locations;
        for (let i = 0; i < this.numShips; i++) {
            do { 
                locations = this.generateShip();
            } //генерируем набор позиций
            while (this.collision(locations));
            this.ships[i].locations = locations; //..и проверяем, перекрываются ли эти позиции с существующими 
            //кораблями на доске. Если есть перекрытия, нужна
        }
        console.log("Ships array: ");
		console.log(this.ships);
	},
    generateShip: function() {
		let direction = Math.floor(Math.random() * 2);
		let row, col;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		let newShipLocations = []; //Набор позиций нового корабля начинается с пустого массива, в который последовательно добавляются элементы.
		for (let i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},
    //locations — массив позиций нового корабля, который мы собираемся разместить на игровом поле.
    
    collision: function (locations) {
		for (let i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
            //встречается ли какая-либо из позиций массива locations нового корабля в массиве locations существующих кораблей.
			for (let j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
};
//Метод indexOf проверяет, присутствует ли заданная позиция в массиве. Таким образом, если полученный индекс больше либо равен 0, мы знаем, что клетка уже 
//занята, поэтому метод возвращает true перекрытие обнаружено).  
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
};
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
}
// controller.processGuess("A0");
//controller.processGuess("A6");
//controller.processGuess("B6");
//controller.processGuess("C6");
//controller.processGuess("C4");
//controller.processGuess("D4");
//controller.processGuess("E4");
//controller.processGuess("B0");
//controller.processGuess("B1");
//controller.processGuess("B2");

function parseGuess(guess) {
    let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

    if (guess === null || guess.length !== 2) {
    alert("Oops, please enter a letter and a number on the board.");
    } else {
    let firstChar = guess.charAt(0);
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
    
    function handleFireButton () {
        let guessInput = document.getElementById ("guessInput");
        let guess = guessInput.value; //извлекаем данные, введенные пользователем.Координаты хранятся 
        //в свойстве value элемента input.
        controller.processGuess(guess); //Координаты выстрела передаются контроллеру
        guessInput.value = ""; //обнуление input формы перед новым выстрелом
    }


    window.onload = init;  //браузер должен выполнять init при полной загрузке страницы.
    function init() {
        let fireButtom = document.getElementById ("fireButton");
        fireButtom.onclick = handleFireButton; //обработчик события нажатия — функцию  handleFireButton
        model.generateShipLocations();  //вызов метода, генерирующего позиции кораблей, который 
        //заполнит пустые массивы. Вызывается в init, чтобы это происходило во время загруки игры, до ее начала 
    }
