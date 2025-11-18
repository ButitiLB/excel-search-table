function searchTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#dataTable tbody tr");

    rows.forEach(row => {
        let text = row.innerText.toLowerCase();
        row.style.display = text.includes(input) ? "" : "none";
    });
}

function addRow() {
    let tableBody = document.querySelector("#dataTable tbody");
    let newRow = document.createElement("tr");

    newRow.innerHTML = `
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    `;

    tableBody.appendChild(newRow);
}
