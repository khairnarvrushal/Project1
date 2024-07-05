
let selectedFile = null;


document.getElementById('fileInput').addEventListener('change', function (event) {
    selectedFile = event.target.files[0]; 
    document.getElementById('displayButton').disabled = !selectedFile;
});

document.getElementById('displayButton').addEventListener('click', function () {
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            displayData(json);
        };
        reader.readAsArrayBuffer(selectedFile);
    }
});

function displayData(data) {
    const table = document.getElementById('dataTable');
    const header = document.getElementById('tableHeader');
    const body = document.getElementById('tableBody');

    header.innerHTML = '';
    body.innerHTML = '';

    const headerRow = document.createElement('tr');
    data[0].forEach(cell => {
        const th = document.createElement('th');
        th.textContent = cell;
        headerRow.appendChild(th);
    });
    header.appendChild(headerRow);

    data.slice(1).forEach(row => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
        });
        body.appendChild(tr);
    });

    table.classList.remove('hidden'); 
}
