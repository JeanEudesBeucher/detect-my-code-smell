window.onload = function() {
    // Ajoutez un bouton de retour en haut de la page
    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = function() {
        window.location.href = '/';
    };
    document.body.insertBefore(backButton, document.body.firstChild);
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const projectListDiv = document.getElementById('projectList');
            data.forEach(project => {
                const button = document.createElement('button');
                button.textContent = project.component.name;
                button.onclick = function() {
                    while (projectListDiv.firstChild) {
                        projectListDiv.removeChild(projectListDiv.firstChild);
                    }
                    const table = createMetricsTable(project);
                    projectListDiv.appendChild(table);
                };
                projectListDiv.appendChild(button);
            });
        });
};
document.getElementById('metricsButton').onclick = function() {
    window.location.href = '/metrics';
};

document.getElementById('detectButton').onclick = function() {
    window.location.href = '/detect';
};

document.getElementById('explanationButton').onclick = function() {
    window.location.href = '/explanation';
};

document.getElementById('graphsButton').onclick = function() {
    window.location.href = '/graphs';
};



function createMetricsTable(project) {
    const table = document.createElement('table');
    table.className = 'project-table';

    const headerRow = document.createElement('tr');
    const nameHeader = document.createElement('th');
    nameHeader.textContent = 'Metric';
    const valueHeader = document.createElement('th');
    valueHeader.textContent = 'Value';
    headerRow.appendChild(nameHeader);
    headerRow.appendChild(valueHeader);
    table.appendChild(headerRow);

    project.component.measures.forEach(measure => {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        nameCell.textContent = measure.metric;
        const valueCell = document.createElement('td');
        valueCell.textContent = measure.value;
        row.appendChild(nameCell);
        row.appendChild(valueCell);
        table.appendChild(row);
    });

    return table;
}
