var itemList = document.getElementById('items');
var existingItems = JSON.parse(localStorage.getItem('items')) || [];
var itemData = [];
var itemCount = 0;
var undoData = [];

function addItem() {
	if(document.getElementById("input").value != "") {
		if(document.getElementById("input").value == "!--") {
			itemData = [];
			undoData = [];
			reList();
			return;
		}

		if(document.getElementById("input").value == "!<<") {
			if(undoData.length >> 0) {
				itemData.unshift(undoData[0]);
				undoData.splice(0, 1);
			}
			
			reList();
			return;
		}

		if(document.getElementById("input").value == "!<-") {
			undoData = [];
			reList();
			return;
		}

		itemData.unshift(document.getElementById("input").value);
		reList();
	}
}

function removeItem(coord) {
	undoData.unshift(itemData[coord]);
	itemData.splice(coord, 1);
	reList();
}

function reList() {
	document.getElementById("items").innerHTML = "";
	itemCount = 0;

	itemData.forEach(item => {
		document.getElementById("items").innerHTML += '<li id="' + itemCount.toString() + '"><span class="itemt" onclick="removeItem(' + itemCount.toString() + ')">' + item + "</span></li>";
		itemCount++;
	});

	document.getElementById("input").value = "";
	localStorage.setItem('items', JSON.stringify(itemData));
}

existingItems.forEach(item => {
	itemData.push(item);
	reList();
});

document.getElementById("input").addEventListener("keypress", function onEvent(event) {
	if(event.key == "Enter" || event.keyCode == 13) { addItem(); }
});
