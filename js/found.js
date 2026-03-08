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
// 📦 SUBMIT FOUND ITEM
// ===============================

function submitFoundItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const itemDesc = document.getElementById("itemDesc").value.trim();
  const foundPlace = document.getElementById("foundPlace").value.trim();
  const foundDate = document.getElementById("foundDate").value;
  const phone = document.getElementById("phone").value.trim();
  const imageInput = document.getElementById("itemImage");

  if (!itemName || !itemDesc || !foundPlace || !foundDate || !phone) {
    alert("Please fill all fields");
    return;
  }

  const reader = new FileReader();

  reader.onload = function () {
    const foundItem = {
      student: studentName,
      studentClass: studentClass,
      itemName,
      itemDesc,
      foundPlace,
      foundDate,
      phone,
      image: reader.result || null,
      status: "found" // ⭐ NEW
    };

    const foundItems =
      JSON.parse(localStorage.getItem("foundItems")) || [];

    foundItems.push(foundItem);
    localStorage.setItem("foundItems", JSON.stringify(foundItems));

    alert("Found item reported successfully!");
    window.location.href = "intro.html";
  };

  if (imageInput.files && imageInput.files[0]) {
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    reader.onload();
  }
}

function goBack() {
  window.location.href = "intro.html";
}
