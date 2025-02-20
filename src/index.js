var lists = [];

class List {
	constructor(id, name = "", tasks = []) {
		this.id = id;
		this.name = name;
		this.tasks = tasks;
	}

	static createList() {
		let id = String(Date.now());
		let myList = new List(id);
		lists.push(myList);
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML += `
        <div id=${id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
                <div id="${id}-list" class="px-7 py-3 h-14 flex items-center justify-between w-full">
                    <div class="flex gap-x-3 items-center">
                        <img class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                        <div id="${id}-name"><input type="text" class="text-2xl" placeholder="List Name" /></div>
                    </div>
                    <div class="flex justify-center gap-x-3">
                        <img onclick="List.updateListName('${id}', 'span')" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                        <img class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                        <img class="svg" src="../svgs/delete.svg" alt="delete this list" />
                    </div>
                </div>
            </div>`;

		const inputElement = document
			.getElementById(id + "-name")
			.querySelector("input");
		inputElement.focus();
        inputElement.addEventListener("blur", () => List.updateListName(id));
	}

	static updateListName(id, setting = "input") {
        const listElement = document.getElementById(`${id}-name`);
		const list = lists.find((item) => item.id === id);
		if (setting === "input") {
            const inputElement = listElement.querySelector("input");
            list.name = inputElement.value === '' ? "Unnamed List" : inputElement.value;
            listElement.innerHTML = `<span class="text-2xl">${list.name}</span>`
		} else if (setting === "span") {
            listElement.innerHTML = `<input type="text" class="text-2xl" placeholder="List Name" />`;
            const inputElement = listElement.querySelector("input");
            inputElement.value = list.name;
            inputElement.focus();
            inputElement.addEventListener("blur", () => List.updateListName(id))
		}
    }

    static deleteList(id) {
		const list = lists.find((item) => item.id === id);

    }

	static loadLists() {
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML = "";
		lists.forEach((list) => {
			listsElement.innerHTML += `
            <div id=${list.id} class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
                <div id="${list.id}-list" class="px-7 py-3 h-14 flex items-center justify-between w-full">
                    <div class="flex gap-x-3 items-center">
                        <img class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                        <div id="${list.id}-name"><span class="text-2xl">${list.name}</span></div>
                    </div>
                    <div class="flex justify-center gap-x-3">
                        <img onclick="List.updateListName('${list.id}', 'span')" class="svg" src="../svgs/edit.svg" alt="edit the name of this task" />
                        <img class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                        <img class="svg" src="../svgs/delete.svg" alt="delete this list" />
                    </div>
                </div>
            </div>`;
		});
	}
}

// Initialize lists and load them
(() => {
	lists = [new List(`${Date.now()}`, "Sample List")];
	List.loadLists();
})();
