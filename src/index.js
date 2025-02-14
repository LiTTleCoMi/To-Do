var lists = [];
class List {
	constructor(name, id) {
		this.name = name;
		this.id = id;
        this.tasks = [];
	}
	static createList() {
		const listsElement = document.getElementById("lists-container");
		let listsHTML = listsElement.innerHTML;
		listsHTML += `
        <div class="border-2 border-black rounded-4xl w-9/10 overflow-hidden flex flex-col items-center">
            <div class="px-7 py-3 h-14 flex items-center justify-between w-full">
                <div class="flex gap-x-3 items-center">
                    <img src="../svgs/arrow_drop_down.svg" alt="expand to view tasks" />
                    <input type="text" class="text-2xl" placeholder="List Name" />
                </div>
                <div class="flex justify-center gap-x-3">
                    <img src="../svgs/sweep.svg" alt="clear all completed tasks in this list" />
                    <img src="../svgs/add.svg" alt="add a task to this list" />
                    <img src="../svgs/delete.svg" alt="delete this list" />
                </div>
            </div>
        </div>`;
		listsElement.innerHTML = listsHTML;
	}
}
