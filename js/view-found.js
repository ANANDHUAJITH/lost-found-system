// ===============================
// 🔐 PAGE PROTECTION
// ===============================

const currentUser = localStorage.getItem("studentName");
const currentClass = localStorage.getItem("studentClass");
const role = localStorage.getItem("role");

if (!currentUser || !role) {
  window.location.href = "index.html";
}

// ===============================
// 📦 LOAD FOUND ITEMS
// ===============================

let foundItems = JSON.parse(localStorage.getItem("foundItems")) || [];
const container = document.getElementById("foundList");

// ===============================
// 🖼️ RENDER FOUND ITEMS
// ===============================

function renderFoundItems() {
  container.innerHTML = "";

  const activeItems = foundItems.filter(
    item => item.status !== "returned"
  );

  if (activeItems.length === 0) {
    container.innerHTML = "<p>No active found items.</p>";
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
    <p><strong>Found at:</strong> ${item.foundPlace}</p>
    <p><strong>Date:</strong> ${item.foundDate}</p>
    <p><strong>Reported by:</strong> ${item.student} (${item.studentClass})</p>
    <p><strong>Phone:</strong> ${item.phone}</p>

    ${
      item.student === currentUser && item.studentClass === currentClass
        ? `<button class="btn delete-btn" onclick="deleteFoundItem(${index})">
            Delete Entry
          </button>`
        : ""
    }

    ${
      canReturn
        ? `<button class="btn" onclick="markReturned(${index})">
            Mark as Returned
          </button>`
        : ""
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
  if (!confirm("Mark this item as returned?")) return;

  foundItems[index].status = "returned";
  localStorage.setItem("foundItems", JSON.stringify(foundItems));
  renderFoundItems();
}

function deleteFoundItem(index) {

  if (!confirm("Are you sure you want to delete this found item report?")) return;

  foundItems.splice(index, 1);

  localStorage.setItem("foundItems", JSON.stringify(foundItems));

  renderFoundItems();

}

function goBack() {
  window.location.href = "intro.html";
}

// ===============================
// 🚀 INITIAL RENDER
// ===============================

function respondToItem(index){

const name = localStorage.getItem("studentName");
const studentClass = localStorage.getItem("studentClass");

if(!foundItems[index].responses){
foundItems[index].responses = [];
}

foundItems[index].responses.push({
name:name,
class:studentClass,
time:new Date().toLocaleString()
});

localStorage.setItem("foundItems", JSON.stringify(foundItems));

alert("Response recorded 👍");

}

renderFoundItems();

