var lists = [new List('1')];

class List {
	constructor(id) {
		this.id = id;
		this.name = "";
		this.tasks = [];
	}
    static createList() {
        let id = string(Date.now());
        let myList = new List(id);
        lists.push(myList);
		const listsElement = document.getElementById("lists-container");
		listsElement.innerHTML += `
        <div class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
            <div class="px-7 py-3 h-14 flex items-center justify-between w-full">
                <div class="flex gap-x-3 items-center">
                    <img class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                    <input id=${id}-name type="text" class="text-2xl" placeholder="List Name" />
                </div>
                <div class="flex justify-center gap-x-3">
                    <img class="svg" src="../svgs/sweep.svg" alt="clear all completed tasks in this list" />
                    <img class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                    <img class="svg" src="../svgs/delete.svg" alt="delete this list" />
                </div>
            </div>
        </div>`;


		const inputElement = document.querySelector("input");
		inputElement.focus();
        inputElement.addEventListener("blur", () =>
            myList.updateListName(id)
		);
	}
	updateListName(id) {
        this.name = document.getElementById(id + '-name').value;
        console.log(this.name);

    }
    static loadLists() {
        const listsElement = document.getElementById("lists-container");
        listsElement.innerHTML = '';
        lists.forEach((list) => {
			listsElement.innerHTML += `
            <div class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
                <div class="px-7 py-3 h-14 flex items-center justify-between w-full">
                    <div class="flex gap-x-3 items-center">
                        <img class="svg" src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                        <input id=${list.id}-name type="text" class="text-2xl" placeholder="List Name" />
                    </div>
                    <div class="flex justify-center gap-x-3">
                        <img class="svg" src="../svgs/sweep.svg" alt="clear all completed tasks in this list" />
                        <img class="svg" src="../svgs/add.svg" alt="add a task to this list" />
                        <img class="svg" src="../svgs/delete.svg" alt="delete this list" />
                    </div>
                </div>
            </div>`;
	    });
    }
}
