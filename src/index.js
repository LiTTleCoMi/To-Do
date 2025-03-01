class Task {
    constructor(id, taskId = -1, name = "Unnamed", complete = false) {
        this.id = id;
        this.taskId = taskId;
        this.name = name;
        this.complete = complete;

        const tasksElement = document.getElementById(id);
        tasksElement.innerHTML += `
        <div id="${id}-${taskId}" class="flex gap-y-1 min-h-fit items-center justify-between py-1 px-3 border-2 border-black w-9/10 mb-3 rounded-2xl h-12 gap-x-3">
            <div class="flex items-center gap-x-3">
                <img onclick="List.toggleTaskCompletion(${id}, ${taskId})" class="svg" src="../svgs/${complete ? 'check_box' : 'check_box_outline_blank'}.svg" alt="mark this task as done" />
                <div id="${id}-${taskId}-task" class=""><input class="text-xl" type="text" placeholder="Task" /></div>
            </div>
            <div class="flex flex-col-reverse sm:flex-row items-center gap-x-3 gap-y-1 min-w-fit min-h-fit">
                <img onclick="List.updateName(${id}, 'span', ${taskId})" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                <img onclick="List.deleteTask(${id}, ${taskId})" class="svg" src="../svgs/delete.svg" alt="delete this task" />
            </div>
        </div>`

        // bring the input box to focus and wait for it to be unfocused to then update the name
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

    static toggleTaskCompletion(id, taskId) {
        let list = lists.find(l => l.id == id);
        let task = list.tasks.find(t => t.taskId == taskId);
        task.complete = !task.complete;
        this.loadLists();
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
		list.showTasks = !list.showTasks;
		this.loadLists();
	}

	static createList() {
		let id = `${Date.now()}`;
		let list = new List(id);
		lists.push(list);
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML += `
        <div id=${list.id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
            <div id="${list.id}-list" class="px-7 py-3 min-h-fit h-14 flex items-center justify-between w-full gap-y-1 gap-x-3">
                <div class="flex gap-x-3 items-center">
                    <img  onclick="List.toggleTasks(${list.id})" class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                    <div id="${list.id}-name"><input type="text" class="text-2xl" placeholder="List Name" /></div>
                </div>
                <div class="flex flex-col-reverse sm:flex-row justify-center gap-x-3 min-w-fit min-h-fit">
                    <img onclick="List.updateName('${list.id}', 'span')" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                    <img onclick="List.createTask('${list.id}')" class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                    <img onclick="List.deleteList('${list.id}')" class="svg" src="../svgs/delete.svg" alt="delete this list" />
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
        // determine if its a task or a list being named and change variable values based on that
		if (taskId === "") {
			element = document.getElementById(`${id}-name`);
			item = lists.find((thisItem) => thisItem.id === id);
		} else {
			element = document.getElementById(`${id}-${taskId}-task`);
			item = lists
				.find((thisItem) => thisItem.id == id)
				.tasks.find((t) => t.taskId === taskId);
		}

        // determine if its an input box that needs to be changed to a span or a span that needs to be changed to an input
		if (setting === "input") {
			const inputElement = element.querySelector("input");
			item.name = inputElement.value === "" ? "Unnamed" : inputElement.value;
			this.loadLists();
		} else if (setting === "span") {
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
		this.loadLists();
	}

	static createTask(id) {
		const list = lists.find((item) => item.id === id);
		list.showTasks = true;
		list.tasks.push(new Task(id));
	}

	static loadLists() {
		console.log("Loading...");
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML = "";
        lists.forEach((list) => {
			listsElement.innerHTML += `
            <div id=${list.id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
                <div id="${list.id}-list" class="px-7 py-3 min-h-fit h-14 flex items-center justify-between w-full gap-y-1 gap-x-3">
                    <div class="flex gap-x-3 items-center">
                        <img  onclick="List.toggleTasks(${list.id})" class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                        <div id="${list.id}-name"><span class="text-2xl">${list.name}</span></div>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-row justify-center gap-x-3 min-w-fit min-h-fit">
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
                    <div id="${list.id}-${i}" class="flex gap-y-1 min-h-fit items-center justify-between py-1 px-3 border-2 border-black w-9/10 mb-3 rounded-2xl h-12 gap-x-3">
                        <div class="flex items-center gap-x-3">
                            <img onclick="List.toggleTaskCompletion(${task.id}, ${task.taskId})" class="svg" src="../svgs/${task.complete ? 'check_box' : 'check_box_outline_blank'}.svg" alt="mark this task as done" />
                            <div id="${list.id}-${i}-task" class=""><span class="text-xl">${task.name}</span></div>
                        </div>
                        <div class="flex flex-col-reverse sm:flex-row items-center gap-x-3 gap-y-1 min-w-fit min-h-fit">
                            <img onclick="List.updateName(${list.id}, 'span', ${task.taskId})" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                            <img onclick="List.deleteTask(${list.id}, ${task.taskId})" class="svg" src="../svgs/delete.svg" alt="delete this task" />
                        </div>
                    </div>`;
				});
			}
        });
        // save lists after every update
        this.saveLists();
    }

    static saveLists() {
        localStorage.clear();
        lists.forEach((list, i) => {
            localStorage.setItem(i, JSON.stringify(list));
        });
    }

    static loadStoredLists() {
        for (let i = 0; i < localStorage.length; i++) {
            let value = JSON.parse(localStorage.getItem(i));
            if (value !== null) {
                lists.push(value);
            }
        }
    }
}

// Initialize lists and load them
(() => {
    List.loadStoredLists();
	List.loadLists();
})();
