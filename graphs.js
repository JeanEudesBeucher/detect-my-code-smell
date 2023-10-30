    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = function() {
        window.location.href = '/';
    };
    document.body.insertBefore(backButton, document.body.firstChild);
