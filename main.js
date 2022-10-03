const ID_START = 100;//to assign new Ids.
const records = []; // array of all the records
const table = document.getElementById("tableId");
const editModal = document.getElementById("modalEditId");
const addModal = document.getElementById("modalId");
let selectedId = "", selectedIndex = -1, counter=1;
/*
	SelectedIndex=index in the array which is going to be edited. After edit this will be reset to -1.
	SelectedId=Id of the record in the table which is going to be edited. After edit this will be reset to -1.
*/

class Record {
	//template for each record
	constructor(todo, date, status) {
		this.todo = todo;
		this.date = date;
		this.status = status;//1->pending 2->completed 3->rejected
		this.id = ID_START + counter++;
	}
}

// reading data to add in the table
function readData() {
	const todo = document.getElementById("todoId").value;
	const date = document.getElementById("dateId").value;
	let status = "";
	const isPending = document.getElementById("pendingRadioId");
	const isSuccess = document.getElementById("successRadioId");
	const isRejected = document.getElementById("rejectedRadioId");

	if (isPending.checked === true) 
		status = 1;
	else if (isSuccess.checked === true) 
		status = 2;
	else if (isRejected.checked === true) 
		status = 3;
	
	if (todo === "" || date === "") {
		alert("error! fields are empty.");
		return;
	}
	document.getElementById("todoId").value = "";
	document.getElementById("dateId").value = "";
	let curRecord = new Record(todo, date, status);
	records.push(curRecord);
	addInTable(curRecord);
}

// record will be added in the table
function addInTable(record) { 
	let id = record.id;
	let todo = record.todo;
	let date = record.date;
	let status = record.status;
	let statusStr = "";
	let rowColorClass = "";
	if (status === 1) {
		statusStr = "Pending";
		rowColorClass = "table-warning";
	}
	else if (status === 2) {
		statusStr = "Complete";
		rowColorClass = "table-success";
	}
	else if (status === 3) {
		statusStr = "Rejected";
		rowColorClass = "table-danger";
	}
	//Adding record row into the table
	document
		.getElementsByTagName("tbody")[0]
		.innerHTML +=
		"<tr>" +
		"<td>" + id + "</td>" +
		"<td>" + todo + "</td>" +
		"<td>" + date + "</td>" +
		"<td><b>" + statusStr + "</b></td>" +
		"<td><div class='btn-group'><button class='btn btn-warning btn-sm' onclick='editData(" + id + ");'" +
		" data-bs-toggle=\"modal\"" + " data-bs-target=\"#modalEditId\"" + "><i class=\"bi-pencil\"></i></button>" +
		"<button class='btn btn-danger btn-sm' onclick='deleteData(" + id + ");'><i class=\"bi-trash-fill\"></i></button></div></td>" +
		"</tr>";
	//Adding record into the array
	table.rows[table.rows.length - 1].className = rowColorClass;
	console.log("Added!");
	console.table(records);
}

//Updating the modal and initialising selectedId & selectedIndex
function editData(id) {
	console.log("edited started on id=" + id);
	selectedId = id;
	for (let i = 0; i < records.length; i++) {
		let rec = records[i];
		if (rec.id === id) {
			selectedIndex = i;
			document.getElementById("todoEditId").value = rec.todo;
			document.getElementById("dateEditId").value = rec.date;
			break;
		}
	}
}

// update the record with id= selectedId 
function updateData() { 
	console.log("inside update, sel-id= " + selectedId);
	//Reading the info from the modal
	let todo = document.getElementById("todoEditId").value;
	let date = document.getElementById("dateEditId").value;
	if (todo === "" || date === "") {
		alert("error! fields are empty.");
		return;
	}
	let status = -1;
	let id = selectedId;
	let rowColorClass = "";//to change the row color
	let isPending = document.getElementById("pendingRadioEditId");
	let isSuccess = document.getElementById("successRadioEditId");
	let isRejected = document.getElementById("rejectedRadioEditId");

	if (isPending.checked === true)
		status = 1;
	else if (isSuccess.checked === true)
		status = 2;
	else if (isRejected.checked === true)
		status = 3;

	let statusStr = "";

	if (status === 1) {
		statusStr = "Pending";
		rowColorClass = "table-warning";
	}
	else if (status === 2) {
		statusStr = "Complete";
		rowColorClass = "table-success";
	}
	else if (status === 3) {
		statusStr = "Rejected";
		rowColorClass = "table-danger";
	}

	// updating in the array
	records[selectedIndex].todo = todo;
	records[selectedIndex].date = date;
	records[selectedIndex].status = status; 

	//Updating in the list
	for (let i = 0; i < table.rows.length; i++) {
		const rec = table.rows[i];
		console.log("row #" + i + ", id=" + rec.cells[0].innerText);
		if (rec.cells[0].innerText == id.toString()) {
			console.log("found!");
			console.log(rec);
			table.rows[i].innerHTML =
				"<tr>" +
				"<td>" + id + "</td>" +
				"<td>" + todo + "</td>" +
				"<td>" + date + "</td>" +
				"<td><b>" + statusStr + "</b></td>" +
				"<td><div class='btn-group'><button class='btn btn-warning btn-sm' onclick='editData(" + id + ");'" +
				" data-bs-toggle=\"modal\"" + " data-bs-target=\"#modalEditId\"" + "><i class=\"bi-pencil\"></i></button>" +
				"<button class='btn btn-danger btn-sm' onclick='deleteData(" + id + ");'><i class=\"bi-trash-fill\"></i></button></div></td>" +
				"</tr>";
			table.rows[i].className = rowColorClass;
			selectedId = -1;
			selectedIndex = -1;
			break;
		}
	}
	console.log("Updated!");
	console.table(records);
}

//To delete record with a given id
function deleteData(id) {
	//Deleting from the array
	for (let i = 0; i < records.length; i++) {
		let rec = records[i];
		if (rec.id === id) {
			records.splice(i, 1);
			break;
		}
	}
	//Deleting from the table
	for (let i = 0; i < table.rows.length; i++) {
		const rec = table.rows[i];
		if (rec.cells[0].innerText == id.toString()) {
			console.log(rec + "deleted.");
			table.rows[i].remove();
			break;
		}
	}
	console.log("Deleted!");
	console.table(records);
}

function searchData() {
	let searchStr = document.getElementById("searchTextId").value;
	document.getElementsByTagName("tbody")[0].innerHTML = "";
	// Searching in the array 
	for (let record of records) {
		let todo = record.todo;
		if (todo.toLowerCase().includes(searchStr.toLowerCase())) {
			//if a record in the array fits, add it into the table.
			console.log(record+"found. Adding to the list.");
			addInTable(record);
		}
	}
}