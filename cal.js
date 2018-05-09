var buttons = document.querySelectorAll('button');
var scr = document.querySelector('input');

for(var i = 0; i < buttons.length; i++) {
	buttons[i].onclick = buttonHandler;
}
var operators = '/*+-';
var store = [];
var operation = '';
var temp = '';
function buttonHandler(e) {
	if(e.target.name == '=') {
		store.push(Number(temp));
		for(var i = 0; i < operators.length; i++) {
			position = 0;
			while(store.indexOf(operators[i]) != -1) {
				position = store.indexOf(operators[i]);
				left = store[position - 1];
				right = store[position + 1];
				store[position] = calc(left, right, operators[i]);
				store = remove(position - 1, position+1, store);
				//alert(store);
			}
		}
		scr.value = '= ' + store;
	}else if(e.target.name == 'clear') {
		scr.value = '';
		store = [];
		temp = '';
	}else {
		scr.value += e.target.name;
		
		if(operators.indexOf(e.target.name) != -1) {
			if(temp == ''){
				temp += e.target.name; 
			}else {
				store.push(Number(temp));
				store.push(e.target.name);
				temp = '';
			}
		}else {
			temp += e.target.name;
		}
	}
	
	
}

function remove(skip1, skip2, array) {
	newArray = [];
	for(var i = 0; i < array.length; i++) {
		if(i == skip1 || i == skip2) {
			continue;
		}
		newArray.push(array[i]);
	}
	return newArray;
}

function calc(left, right, operator) {
	switch(operator) {
		case '+':
			return left + right;
		case '-':
			return left - right;
		case '*':
			return left * right;
		case '/':
			return left / right;
	}
}