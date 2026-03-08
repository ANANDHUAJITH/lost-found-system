// ===============================
// 🔐 PAGE PROTECTION
// ===============================

const studentName = localStorage.getItem("studentName");
const studentClass = localStorage.getItem("studentClass");
const role = localStorage.getItem("role");

if (!studentName || !role) {
  window.location.href = "index.html";
}

// ===============================
// 📦 SUBMIT LOST ITEM
// ===============================

function submitLostItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const itemDesc = document.getElementById("itemDesc").value.trim();
  const lostPlace = document.getElementById("lostPlace").value.trim();
  const lostDate = document.getElementById("lostDate").value;
  const phone = document.getElementById("phone").value.trim();
  const imageInput = document.getElementById("itemImage");

  if (!itemName || !itemDesc || !lostPlace || !lostDate || !phone) {
    alert("Please fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const lostItem = {
      student: studentName,
      studentClass: studentClass,
      itemName,
      itemDesc,
      lostPlace,
      lostDate,
      phone,
      image: reader.result || null,
      status: "lost" // ⭐ NEW
    };

    const lostItems =
      JSON.parse(localStorage.getItem("lostItems")) || [];

    lostItems.push(lostItem);
    localStorage.setItem("lostItems", JSON.stringify(lostItems));

    alert("Lost item reported successfully!");
    window.location.href = "intro.html";
  };

  if (imageInput.files && imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
}

// ===============================
// 🔙 BACK BUTTON
// ===============================

function goBack() {
  window.location.href = "intro.html";
}
