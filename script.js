function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

// AUTO ADD ROW
function autoAddRow() {
    let tbody = document.querySelector("#dataTable tbody");
    let lastRow = tbody.lastElementChild;

    // check if last row is filled
    let filled = [...lastRow.children].some(td => td.innerText.trim() !== "" && !td.classList.contains("delete-cell"));

    if (filled) {
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

    // prevent deleting last always-empty row
    let tbody = row.parentElement;
    if (row === tbody.lastElementChild) return;

    row.remove();
}

// DARK MODE
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    let icon = document.getElementById("darkIcon");

    if (document.body.classList.contains("dark")) {
        icon.innerHTML = "☀️ Light";
    } else {
        icon.innerHTML = "🌙 Dark";
    }
}

// CSV IMPORT
function importCSV(event) {
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = function (e) {
        let lines = e.target.result.split("\n");
        let tbody = document.querySelector("#dataTable tbody");
        tbody.innerHTML = "";

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

        // add last empty row
        autoAddRow();
    };

    reader.readAsText(file);
}
