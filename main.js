const ID_START = 100;
let counter = 1;
let selectedId = "", selectedIndex = -1;
let records = []; // array of all the records
const table = document.getElementById("tableId");
const editModal = document.getElementById("modalEditId");
const addModal = document.getElementById("modalId");

class Record {//template for each record
	constructor(todo, date, status) {
		this.todo = todo;
		this.date = date;
		this.status = status;//1->pending 2->completed 3->rejected
		this.id = ID_START + counter++;
	}
}

// reading data to add in the table
function readData() {
	let todo = document.getElementById("todoId").value;
	let date = document.getElementById("dateId").value;
	let status = "";
	let isPending = document.getElementById("pendingRadioId");
	let isSuccess = document.getElementById("successRadioId");
	let isRejected = document.getElementById("rejectedRadioId");

	if (isPending.checked === true) {
		status = 1;
	} else if (isSuccess.checked === true) {
		status = 2;
	} else if (isRejected.checked === true) {
		status = 3;
	}
	if (todo === "" || date === "") {
		alert("error! fields are empty.");
		return;
	}
	document.getElementById("todoId").value = "";
	document.getElementById("dateId").value = "";
	let curRecord = new Record(todo, date, status);
	records.push(curRecord);
	// push the current record in the table
	addInTable(curRecord);
}
/////////////////////  ///////////////////////////////////////
/////////////////////  ///////////////////////////////////////
function addInTable(record) {// record will be added in the table 
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
	//console.table(table);
	table.rows[table.rows.length - 1].className = rowColorClass;
	console.table(records);
	// modal.classList.remove("hidden")
}

//edit the record id
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
	console.log("index:" + selectedIndex);
}

// update the record at the index selectedIndex 
function updateData() { 
	console.log("inside update, sel-id= " + selectedId);
	let todo = document.getElementById("todoEditId").value;
	let date = document.getElementById("dateEditId").value;
	let status = -1;
	let id = selectedId;
	let rowColorClass = "";
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

	records[selectedIndex].todo = todo;
	records[selectedIndex].date = date;
	records[selectedIndex].status = status;

	console.table(records);

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
}

function deleteData(id) {
	console.log("del"+id);
	for (let i = 0; i < records.length; i++) {
		let rec = records[i];
		if (rec.id === id) {
			records.splice(i, 1);
			break;
		}
	}
	for (let i = 0; i < table.rows.length; i++) {
		const rec = table.rows[i];
		console.log(i+" recdel "+rec.cells[0]);

		if (rec.cells[0].innerText == id.toString()) {
			console.log(rec);
			table.rows[i].remove();
			break;
		}
	}
}

function searchData() {
	let searchStr = document.getElementById("searchTextId").value;
	document.getElementsByTagName("tbody")[0].innerHTML = "";
	for (let record of records) {
		let todo = record.todo;
		if (todo.toLowerCase().includes(searchStr.toLowerCase())) {
			console.log("found");
			console.log(record);
			addInTable(record);
		}
	}
}