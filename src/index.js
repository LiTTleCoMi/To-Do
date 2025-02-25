class Task {
	constructor(id, taskId = -1, name = "Unnamed", complete = false) {
		this.id = id;
		this.taskId = taskId;
		this.name = name;
		this.complete = complete;

		const tasksElement = document.getElementById(id);
		tasksElement.innerHTML += `
        <div id="${this.id}-${this.taskId}" class="flex justify-between py-1 px-3 border-2 border-black w-9/10 mb-3 rounded-2xl h-12">
            <div class="flex items-center gap-x-3">
                <img class="svg" src="../svgs/menu.svg" alt="reorder drag drop" />
                <img class="svg" src="../svgs/check_box_outline_blank.svg" alt="mark this task as done" />
                <div id="${this.id}-${this.taskId}-task"><input class="text-xl" type="text" placeholder="Task" /></div>
            </div>
            <div class="flex items-center gap-x-3">
                <img onclick="List.updateName(${this.id}, 'span', ${this.taskId})" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                <img onclick="List.deleteTask(${this.id}, ${this.taskId})" class="svg" src="../svgs/delete.svg" alt="delete this task" />
            </div>
        </div>`;
		const inputElement = document
			.getElementById(`${this.id}-${this.taskId}-task`)
			.querySelector("input");

		inputElement.focus();
		inputElement.addEventListener("blur", () =>
			List.updateName(this.id, "input", this.taskId)
		);
	}
}

var lists = [];

class List {
	constructor(id, name = "", tasks = [], showTasks = false) {
		this.id = id;
		this.name = name;
		this.tasks = tasks;
		this.showTasks = showTasks;
	}

	static deleteTask(id, taskId) {
        let list = lists.find((d) => d.id == id);
		list.tasks = list.tasks.filter((task) => {
			return task.taskId != taskId;
        });
        this.loadLists()
	}

	static toggleTasks(id) {
		let list = lists.find((i) => i.id == id);
		console.log(list);
		list.showTasks = !list.showTasks;
		List.loadLists();
	}

	static createList() {
		let id = `${Date.now()}`;
		let myList = new List(id);
		lists.push(myList);
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML += `
        <div id=${id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
            <div id="${id}-list" class="px-7 py-3 h-14 flex items-center justify-between w-full">
                <div class="flex gap-x-3 items-center">
                    <img onclick="List.toggleTasks(${id})" class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                    <div id="${id}-name"><input type="text" class="text-2xl" placeholder="List Name" /></div>
                </div>
                <div class="flex justify-center gap-x-3">
                    <img onclick="List.updateName('${id}', 'span')" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                    <img onclick="List.createTask(${id})" class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                    <img onclick="List.deleteList(${id})" class="svg" src="../svgs/delete.svg" alt="delete this list" />
                </div>
            </div>
        </div>`;

		const inputElement = document
			.getElementById(id + "-name")
			.querySelector("input");
		inputElement.focus();
		inputElement.addEventListener("blur", () => List.updateName(id));
	}

	static updateName(id, setting = "input", taskId = "") {
		let element, item;
		if (taskId === "") {
			console.log("list");
			element = document.getElementById(`${id}-name`);
			item = lists.find((thisItem) => thisItem.id === id);
		} else {
			console.log(taskId);
			console.log("task");
			element = document.getElementById(`${id}-${taskId}-task`);
			console.log(id);
			item = lists
				.find((thisItem) => thisItem.id == id)
				.tasks.find((t) => t.taskId === taskId);
			console.log(item);
		}

		if (setting === "input") {
			console.log("input");
			const inputElement = element.querySelector("input");
			console.log(element.innerHTML);
			item.name = inputElement.value === "" ? "Unnamed" : inputElement.value;
			this.loadLists();
		} else if (setting === "span") {
			console.log("span");
			element.innerHTML = `<input type="text" class="text-${
				taskId === "" ? "2xl" : "xl"
			}" placeholder="List Name" />`;
			const inputElement = element.querySelector("input");
			inputElement.value = item.name;
			inputElement.focus();

			if (taskId === "") {
				inputElement.addEventListener("blur", () => this.updateName(id));
			} else {
				inputElement.addEventListener("blur", () =>
					this.updateName(id, "input", taskId)
				);
			}
		}
	}

	static deleteList(id) {
		lists = lists.filter((item) => item.id != id);
		console.log();
		this.loadLists();
	}

	static createTask(id) {
		const list = lists.find((item) => item.id === id);
		list.showTasks = true;
		console.log(list);
		list.tasks.push(new Task(id));
	}

	static loadLists() {
		console.log("Loading...");
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML = "";
		lists.forEach((list) => {
			listsElement.innerHTML += `
            <div id=${list.id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
                <div id="${list.id}-list" class="px-7 py-3 h-14 flex items-center justify-between w-full">
                    <div class="flex gap-x-3 items-center">
                        <img  onclick="List.toggleTasks(${list.id})" class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                        <div id="${list.id}-name"><span class="text-2xl">${list.name}</span></div>
                    </div>
                    <div class="flex justify-center gap-x-3">
                        <img onclick="List.updateName('${list.id}', 'span')" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                        <img onclick="List.createTask('${list.id}')" class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                        <img onclick="List.deleteList('${list.id}')" class="svg" src="../svgs/delete.svg" alt="delete this list" />
                    </div>
                </div>
            </div>`;
			if (list.showTasks) {
				const tasksElement = document.getElementById(list.id);
				list.tasks.forEach((task, i) => {
					task.taskId = i;
					tasksElement.innerHTML += `
                    <div id="${list.id}-${i}" class="flex justify-between py-1 px-3 border-2 border-black w-9/10 mb-3 rounded-2xl h-12">
                        <div class="flex items-center gap-x-3">
                            <img class="svg" src="../svgs/menu.svg" alt="reorder drag drop" />
                            <img id="${list.id}-${i}-task-completion" class="svg" src="../svgs/check_box_outline_blank.svg" alt="mark this task as done" />
                            <div id="${list.id}-${i}-task"><span class="text-xl">${task.name}</span></div>
                        </div>
                        <div class="flex items-center gap-x-3">
                            <img onclick="List.updateName(${list.id}, 'span', ${task.taskId})" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                            <img onclick="List.deleteTask(${list.id}, ${task.taskId})" class="svg" src="../svgs/delete.svg" alt="delete this task" />
                        </div>
                    </div>`;
				});
			}
		});
	}
}

// Initialize lists and load them
(() => {
	lists = [new List(`${Date.now()}`, "Sample List")];
	List.loadLists();
})();
