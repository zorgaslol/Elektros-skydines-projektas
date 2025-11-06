var list = document.querySelector(".item-list");
var panel = document.querySelector(".panel");
var total = 0;
var panelState = new Array(12).fill(null);
var slots = [];

for (var i = 0; i < 12; i++) {
  var slot = document.createElement("div");
  slot.className = "slot";
  slot.textContent = "Slot " + (i + 1);
  panel.appendChild(slot);
}
slots = document.querySelectorAll(".slot");

document.addEventListener("dragstart", function (e) {
  if (e.target.classList.contains("item")) {
    e.dataTransfer.setData("name", e.target.dataset.name);
    e.dataTransfer.setData("price", e.target.dataset.price);
    e.dataTransfer.setData("icon", e.target.dataset.icon);
  }
});

slots.forEach(function (slot, index) {
  slot.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  slot.addEventListener("drop", function (e) {
    e.preventDefault();

    var name = e.dataTransfer.getData("name");
    var price = parseFloat(e.dataTransfer.getData("price"));
    var icon = e.dataTransfer.getData("icon");

    slot.innerHTML = "";

    var img = document.createElement("img");
    img.src = icon;
    img.alt = name;
    img.className = "slot-icon";
    slot.appendChild(img);

    var label = document.createElement("p");
    label.textContent = name;
    label.className = "slot-label";
    slot.appendChild(label);

    if (panelState[index]) {
      total -= panelState[index].price;
    }

    panelState[index] = { name, price, icon };
    total += price;
    updateTotal();
  });

  slot.addEventListener("click", function () {
    if (panelState[index]) {
      total -= panelState[index].price;
      panelState[index] = null;
      updateTotal();
    }
    slot.innerHTML = "";
  });
});

function updateTotal() {
  document.getElementById("total-cost").textContent = total.toFixed(2);
}

fetch("item.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (items) {
    list.innerHTML = "";

    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      var div = document.createElement("div");
      div.className = "item";
      div.draggable = true;
      div.dataset.price = item.price;
      div.dataset.name = item.name;
      div.dataset.icon = item.icon;

      var img = document.createElement("img");
      img.src = item.icon;
      img.className = "item-icon";
      div.appendChild(img);

      var label = document.createElement("span");
      label.textContent = item.name + " (€" + item.price + ")";
      div.appendChild(label);

      list.appendChild(div);
    }
  })
  .catch(function (error) {
    console.log("Error loading JSON:", error);
  });

document.getElementById("save-btn").addEventListener("click", function () {
  var data = {
    total: total,
    slots: panelState
  };

  var blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  var link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "panel-setup.json";
  link.click();
});

document.getElementById("load-btn").addEventListener("click", function () {
  document.getElementById("load-input").click();
});

document.getElementById("load-input").addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onload = function (event) {
    var data = JSON.parse(event.target.result);

    total = 0;
    panelState.fill(null);
    slots.forEach(function (slot) {
      slot.innerHTML = "";
    });

    data.slots.forEach(function (item, i) {
      if (item) {
        var img = document.createElement("img");
        img.src = item.icon;
        img.className = "slot-icon";

        var label = document.createElement("p");
        label.textContent = item.name;
        label.className = "slot-label";

        slots[i].appendChild(img);
        slots[i].appendChild(label);

        panelState[i] = item;
        total += item.price;
      }
    });

    updateTotal();
  };
  reader.readAsText(file);
});

document.getElementById("clear-btn").addEventListener("click", function () {
  total = 0;
  updateTotal();
  panelState.fill(null);
  slots.forEach(function (slot) {
    slot.innerHTML = "";
  });
});

document.getElementById("download-btn").addEventListener("click", function () {
  var panel = document.querySelector(".panel");

  html2canvas(panel, { backgroundColor: "#2b2b2b", scale: 2 }).then(canvas => {
    var link = document.createElement("a");
    link.download = "panel.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

