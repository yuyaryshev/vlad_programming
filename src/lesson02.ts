import type {Vector2D, GameObject, MyDocument} from "./types.js"

function main(document: MyDocument) {

// Добавляем текстовое поле
	let memoField = document.createElement('textarea')

// Сохраняем созданное поле в document.memoField - чтобы нам потом проще было к нему обращаться
	document.memoField = memoField

// Добавляем текстовое поле на страницу
	document.body.appendChild(memoField)

// Создаем и добавляем еще одно текстовое поле на страницу
	document.dataField = document.createElement('textarea')
	document.body.appendChild(document.dataField)


// Задаем начальную ширину и высоту полей memoField и dataField
	document.memoField.style.width = '1100px'
	document.memoField.style.height = '500px'

	document.dataField.style.width = '400px'
	document.dataField.style.height = '500px'

// Создаем пустое хранилище игровых объектов
	document.gameObjects = {};

// Создаем игровой объект Q и задаем его начальные параметры
// x и y - это начальные координаты объекта
// s - это то как объект будет отображаться на нашем игровом поле
// Поле v равное {x:1, y:0} - это поле скорости объекта - куда он будет двигаться изначально
	document.gameObjects.Q = { x: 3, y: 6, s: 'Q', v: { x: 1, y: 0 } };

// Создаем игровой объект a и задаем его начальные параметры
	document.gameObjects.a = { x: 30, y: 6, s: 'a' }

// redraw - Функция которая обновляет игровое поле на экране
	function redraw() {
		// Создаем пустой массив строк
		let lines = []

		// Цикл по оси y от 0 до 29
		// Оператор ++ означает "добавить 1"
		// Синтаксис: for(начальное значение итератора; условие завершения; изменение итератора) - итератор пройдет от начального значения до условия завершения.
		// После каждой итерации будет осуществлено изменение итератора
		for (let y = 0; y < 30; y++) {
			// Создаем пустой символов строки
			let lineItems = []

			// Цикл по оси x от 0 до 140
			// Оператор ++ означает "добавить 1"
			for (let x = 0; x < 140; x++) {
				// Создаем пустую переменную для хранения текущего объекта
				// То есть того, который находится по координатам x, y
				let currentObject;

				// Цикл который проходит по всем игровым объектам
				// Синтаксис: for(let итератор in объект) - итератор пройдет по всем полям объекта
				for (let gameObjectId in document.gameObjects) {
					// Константа, которая хранит рассматриваемый объект. Константа это то же что и переменная, но ее нельзя изменить - у нее всегда только изначальное значение.
					const gameObject = document.gameObjects[gameObjectId];


					// Сравниваем координаты рассматриваемого объекта и текущие координаты
					// Символ && означает "И"
					// Символ === означает равны в точности
					if (gameObject.x === x && gameObject.y === y) {
						// Если координаты равны, то рассматриваемый объект сохраняем в переменную "текущий объект"
						currentObject = gameObject
						break
					}
				}

				// Сохраняем в символ строки то, что находится внутри поля "s" текущего объекта
				if (currentObject && currentObject.s) {
					// Если объект есть и у него есть "s" то добавляем "s" в список символов текущей строки - это делает .push функция у массива
					lineItems.push(currentObject.s)
				} else {
					// Иначе выводим пустое игровое поле, то есть добавляем "." в список символов текущей строки - это делает .push функция у массива
					lineItems.push('.')
				}
			}

			// При помощи .join() объединяем все символы строки в строку, а затем добавляем эту строку в список строк.
			lines.push(lineItems.join(''))
		}
		// При помощи .join('\n') объединяем все строки в одну большую мега строку.
		// При объединении строк между ними вставляем символ '\n' который называется "символ конца строки"
		// А затем записываем эту строку в document.memoField.textContent.
		// Дальше работает уже наш браузер. Увидев что строка обновилась, он обновляет ее на экране.
		document.memoField.textContent = lines.join('\n')
	}

// do_tick_Q - обновляет объект Q на каждом тике игры
	function do_tick_Q() {
		// Если объект уехал далеко направо
		if (document.gameObjects.Q.x > 35) {
			// Изменяем скорость на "влево" то есть {x:-1,y:0}
			document.gameObjects.Q.v = { x: -1, y: 0 }
		}

		// Если объект уехал далеко налево
		if (document.gameObjects.Q.x < 15) {
			// Изменяем скорость на "вправо" то есть {x:1,y:0}
			document.gameObjects.Q.v = { x: 1, y: 0 }
		}
	}

// do_tick_a - обновляет объект a на каждом тике игры
	function do_tick_a() {
		// Тут ничего нет. Поэтому объект стоит на месте.
	}

// do_tick_physics - обновляет состояния объектов с точки зрения законов физики
	function do_tick_physics() {
		// Цикл который проходит по всем игровым объектам
		// Синтаксис: for(let итератор in объект) - итератор пройдет по всем полям объекта
		for (let gameObjectId in document.gameObjects) {
			// Константа, которая хранит рассматриваемый объект. Константа это то же что и переменная, но ее нельзя изменить - у нее всегда только изначальное значение.
			const gameObject = document.gameObjects[gameObjectId];

			// Если у объекта есть скорость v
			if (gameObject.v) {
				// Тогда берем компоненту скорости v.x и прибавляем ее к полю x
				gameObject.x = gameObject.x + gameObject.v.x;

				// А компоненту скорости v.y прибавляем к полю y
				gameObject.y = gameObject.y + gameObject.v.y;
			}
		}
	}

// refreshDataText - функция которая отображает данные во втором поле на экране
	function refreshDataText() {
		// JSON.stringify преобразует в текст все данные внутри document.gameObjects в строку
		// Ну а затем мы просто записываем эту строку в document.dataField.textContent
		// Дальше работает уже наш браузер. Увидев что строка обновилась, он обновляет ее на экране.
		document.dataField.textContent = JSON.stringify(document.gameObjects, undefined, 4);
	}

// do_tick - функция обработки следующего кадра игры
	function do_tick() {
		// Обновляем объект Q
		do_tick_Q();

		// Обновляем объект a
		do_tick_a();

		// Двигаем объекты в соответствии с нашими физическими законами
		do_tick_physics();

		// Перерисовываем игровое поле
		redraw();

		// Перерисовываем текст в втором поле
		refreshDataText()
	}

// Создаем таймер, который "звонит" каждые 200 миллисекунд. То есть за одну секунду он звонит 5 раз
	setInterval(do_tick, 200)
}

main(document as any);