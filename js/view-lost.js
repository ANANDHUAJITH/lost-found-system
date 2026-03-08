// ===============================
// 🔐 PAGE PROTECTION
// ===============================

const currentUser = localStorage.getItem("studentName");
const currentClass = localStorage.getItem("studentClass");
const role = localStorage.getItem("role"); // admin | student

if (!currentUser || !role) {
  window.location.href = "index.html";
}

// ===============================
// 📦 LOAD LOST ITEMS
// ===============================

let lostItems = JSON.parse(localStorage.getItem("lostItems")) || [];
const container = document.getElementById("lostList");

// ===============================
// 🖼️ RENDER LOST ITEMS
// ===============================

function renderLostItems() {

  container.innerHTML = "";

  const activeItems = lostItems.filter(
    item => item.status !== "returned"
  );

  if (activeItems.length === 0) {
    container.innerHTML = "<p>No active lost items.</p>";
    return;
  }

  activeItems.forEach((item, index) => {

    const card = document.createElement("div");
    card.className = "card";

    const canReturn =
      role === "admin" ||
      (item.student === currentUser &&
       item.studentClass === currentClass);

    card.innerHTML = `
      ${item.image ? `<img src="${item.image}" class="item-image">` : ""}

      <div class="card-details">

        <h3>${item.itemName}</h3>

        <p><strong>Description:</strong> ${item.itemDesc}</p>
        <p><strong>Lost at:</strong> ${item.lostPlace}</p>
        <p><strong>Date:</strong> ${item.lostDate}</p>
        <p><strong>Reported by:</strong> ${item.student} (${item.studentClass})</p>
        <p><strong>Phone:</strong> ${item.phone}</p>

        ${
          item.student === currentUser && item.studentClass === currentClass
          ? `<button class="btn delete-btn" onclick="deleteItem(${index})">
               Delete Entry
             </button>`
          : ""
        }

        ${
          canReturn
          ? `<button class="btn" onclick="markReturned(${index})">
               Mark as Retrieved
             </button>`
          : `<p style="color:gray;">
               <em>Only reporter or admin can mark retrieved</em>
             </p>`
        }

        <button class="btn respond-btn" onclick="respondToItem(${index})">
        👍 Respond
        </button>

      </div>
    `;

    container.appendChild(card);

  });

}

// ===============================
// ✅ MARK AS RETURNED
// ===============================

function markReturned(index) {

  if (!confirm("Mark this item as retrieved?")) return;

  lostItems[index].status = "returned";

  localStorage.setItem("lostItems", JSON.stringify(lostItems));

  renderLostItems();

}

// ===============================
// ❌ DELETE ENTRY
// ===============================

function deleteItem(index) {

  if (!confirm("Are you sure you want to delete this report?")) return;

  lostItems.splice(index, 1);

  localStorage.setItem("lostItems", JSON.stringify(lostItems));

  renderLostItems();

}

// ===============================
// 🔙 BACK BUTTON
// ===============================

function goBack() {
  window.location.href = "intro.html";
}

// ===============================
// 🚀 INITIAL RENDER
// ===============================

function respondToItem(index){

const name = localStorage.getItem("studentName");
const studentClass = localStorage.getItem("studentClass");

if(!lostItems[index].responses){
lostItems[index].responses = [];
}

lostItems[index].responses.push({
name:name,
class:studentClass,
time:new Date().toLocaleString()
});

localStorage.setItem("lostItems", JSON.stringify(lostItems));

alert("Response recorded 👍");

}

renderLostItems();

