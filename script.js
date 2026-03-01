function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// AUTO ADD ROW — ახლა 7 სვეტი (მაგრამ delete უკანასკნელი)
function autoAddRow() {
    let tbody = document.querySelector("#dataTable tbody");
    let lastRow = tbody.lastElementChild;

    // check if last row is filled (ვამოწმებთ პირველ 6 td-ს, delete არ ითვლება)
    let cells = lastRow.querySelectorAll("td:not(.delete-cell)");
    let filled = Array.from(cells).some(td => td.innerText.trim() !== "");

    if (filled) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>  <!-- UID -->
            <td contenteditable="true"></td>  <!-- AnyDesk -->
            <td contenteditable="true"></td>
            <td contenteditable="true"></td>
            <td class="delete-cell" contenteditable="false" onclick="deleteRow(this)">🗑️</td>
        `;
        tbody.appendChild(newRow);
    }
}

// DELETE ROW
function deleteRow(cell) {
    let row = cell.parentElement;
    let tbody = row.parentElement;
    
    // ბოლო ცარიელი რიგის წაშლას ვკრძალავთ
    if (row === tbody.lastElementChild) return;
    
    row.remove();
    
    // თუ ბოლო რიგი აღარ არის ცარიელი — დავამატოთ ახალი ცარიელი
    autoAddRow();
}

// DARK MODE (თუ გჭირდებათ)
function toggleDarkMode() {
    document.body.classList.toggle("dark");
    let icon = document.getElementById("darkIcon");
    if (document.body.classList.contains("dark")) {
        icon.innerHTML = "☀️ Light";
    } else {
        icon.innerHTML = "🌙 Dark";
    }
}

// CSV IMPORT — ახლა 7 ველი (UID + AnyDesk)
function importCSV(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let lines = e.target.result.split("\n");
        let tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = "";

        lines.forEach((line, index) => {
            if (index === 0) return; // skip header if exists
            let cols = line.split(",");
            if (cols.length >= 6) {  // მინიმუმ name + 5 სხვა
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td contenteditable="true">${cols[0]?.trim() || ""}</td>
                    <td contenteditable="true">${cols[1]?.trim() || ""}</td>
                    <td contenteditable="true">${cols[2]?.trim() || ""}</td>
                    <td contenteditable="true">${cols[3]?.trim() || ""}</td> <!-- UID -->
                    <td contenteditable="true">${cols[4]?.trim() || ""}</td> <!-- AnyDesk -->
                    <td contenteditable="true">${cols[5]?.trim() || ""}</td>
                    <td contenteditable="true">${cols[6]?.trim() || ""}</td>
                    <td class="delete-cell" contenteditable="false" onclick="deleteRow(this)">🗑️</td>
                `;
                tbody.appendChild(row);
            }
        });

        // ბოლოს დავამატოთ ცარიელი რიგი
        autoAddRow();
    };

    reader.readAsText(file);
}
