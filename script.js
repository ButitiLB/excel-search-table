function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// AUTO-ADD NEW ROW
function autoAddRow(event) {
    let tbody = document.querySelector("#dataTable tbody");
    let lastRow = tbody.lastElementChild;

    // If user types something in LAST ROW → create new empty row
    if ([...lastRow.children].some(td => td.innerText.trim() !== "")) {
        let newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td></td><td></td><td></td><td></td>
            <td class="delete-cell" contenteditable="false" onclick="deleteRow(this)">🗑️</td>
        `;
        tbody.appendChild(newRow);
    }
}

// DELETE ROW
function deleteRow(cell) {
    let row = cell.parentElement;
    row.remove();
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");
}

// CSV IMPORT
function importCSV(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let lines = e.target.result.split("\n");
        let tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = ""; // clear existing rows

        lines.forEach(line => {
            let cols = line.split(",");
            if (cols.length >= 1) {
                let row = document.createElement("tr");
                row.innerHTML = `
                    <td>${cols[0] || ""}</td>
                    <td>${cols[1] || ""}</td>
                    <td>${cols[2] || ""}</td>
                    <td>${cols[3] || ""}</td>
                    <td class="delete-cell" contenteditable="false" onclick="deleteRow(this)">🗑️</td>
                `;
                tbody.appendChild(row);
            }
        });

        // Add one empty row for auto-add
        autoAddRow();
    };

    reader.readAsText(file);
}
