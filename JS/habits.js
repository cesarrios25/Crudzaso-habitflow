const form = document.getElementById("habitsForm");
const title = document.getElementById("inputTaskTitle");
const frequency = document.getElementById("frequency");
const priority = document.getElementById("priority");
const status = document.getElementById("status");
const cards = document.querySelector(".cards-container");

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let habitEditingId = null;
let currentFilter = "all";

// ------------- CREATE / EDIT HABITS
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (habitEditingId === null) {
    const newHabit = {
      id: Date.now(),
      title: title.value.trim(),
      frequency: frequency.value,
      priority: priority.value,
      status: "Pending"
    };
    habits.push(newHabit);
  } else {
    const habit = habits.find(h => h.id === habitEditingId);

    habit.title = title.value.trim();
    habit.frequency = frequency.value;
    habit.priority = priority.value;
    habit.status = status.value;

    habitEditingId = null;
    status.disabled = true;
    form.querySelector("#btn-create").innerText = "Create Habit";
  }

  localStorage.setItem("habits", JSON.stringify(habits));
  renderHabits();
  form.reset();
});

// -------------- SHOW HABITS
function renderHabits() {
  cards.innerHTML = "";

  let filteredHabits = habits;

  if (currentFilter !== "all") {
    filteredHabits = habits.filter(
      habit => habit.status === currentFilter
    );
  }

  filteredHabits.forEach((habit) => {
    const card = document.createElement("picture");

    card.innerHTML = `
      <h2>${habit.title}</h2>
      <p><strong>Frequency:</strong> ${habit.frequency}</p>
      <p><strong>Priority:</strong> ${habit.priority}</p>
      <p><strong>Status:</strong> ${habit.status}</p>

      <div class="btn_picture">
        <button class="btn-delete" data-id="${habit.id}">Eliminar</button>
        <button class="btn-edit" data-id="${habit.id}">Editar</button>
      </div>
    `;

    cards.appendChild(card);
  });

  deleteHabit();
}

// -------------- DELETE HABIT
function deleteHabit() {
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = Number(btn.dataset.id);
      habits = habits.filter(habit => habit.id !== id);
      localStorage.setItem("habits", JSON.stringify(habits));
      renderHabits();
    });
  });
}

// -------------- EDIT HABIT
cards.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-edit")) {
    const id = Number(e.target.dataset.id);
    const habit = habits.find(habit => habit.id === id);

    habitEditingId = id;

    title.value = habit.title;
    frequency.value = habit.frequency;
    priority.value = habit.priority;
    status.value = habit.status;

    status.disabled = false;
    form.querySelector("#btn-create").innerText = "Save new habit";
  }
});

// -------------- FILTER 
const filterStatus = document.querySelector(".filter-status");

filterStatus.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    currentFilter = e.target.dataset.status;
    renderHabits();
  }
});
renderHabits();
