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
                var ship = this.ships[i];
                var index = ship.locations.indexOf(guess);
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
model.fire("53");
model.fire("06");
model.fire("16");
model.fire("26");
model.fire("34");
model.fire("24");
model.fire("44");
model.fire("12");
model.fire("11");
model.fire("10");