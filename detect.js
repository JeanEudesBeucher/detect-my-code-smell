    const backButton = document.createElement('button');
    backButton.textContent = 'Back';
    backButton.onclick = function() {
        window.location.href = '/';
    };
    document.body.insertBefore(backButton, document.body.firstChild);
    
    document.getElementById('metricsForm').onsubmit = function(event) {
        event.preventDefault(); // Empêche la soumission du formulaire
    
        // Supprime les anciennes alertes
        var oldAlerts = document.getElementsByClassName('alert');
        while(oldAlerts[0]) {
            oldAlerts[0].parentNode.removeChild(oldAlerts[0]);
        }
    
        // Récupère les valeurs entrées par l'utilisateur
        var NOM = document.getElementById('NOM').value;
        var NCLOC = document.getElementById('NCLOC').value;
        var CYCLO = document.getElementById('CYCLO').value;
        var AWM = document.getElementById('AWM').value;
        var NOC = document.getElementById('NOC').value;
        var NOCL = document.getElementById('NOCL').value;
        var NOF = document.getElementById('NOF').value;
        var NOS = document.getElementById('NOS').value;
        var WMC = document.getElementById('WMC').value;
    
        // Comparez les valeurs entrées aux valeurs moyennes
        compareValues(NOM, 714, 5921, 'NOM');
        compareValues(NCLOC, 5892, 27535, 'NCLOC');
        compareValues(CYCLO, 1244, 7259, 'CYCLO');
        compareValues(AWM, 13.42, 25, 'AWM');
        compareValues(NOC, 70, 313, 'NOC');
        compareValues(NOCL, 1122, 5871, 'NOCL');
        compareValues(NOF, 56, 225, 'NOF');
        compareValues(NOS, 2901, 14211, 'NOS');
        compareValues(WMC, 13.9, 35, 'WMC');


        // Supposons que vous ayez les valeurs suivantes pour CYCLO, NOM, NCLOC et WAV
        var values = {
            'CYCLO': CYCLO,
            'NOM': NOM,
            'NCLOC': NCLOC,
            'AWM': AWM,
            'NOC': NOC,
            'NOCL': NOCL,
            'NOF': NOF,
            'NOS': NOS,
            'WMC' : WMC
        };
    
        // Les valeurs moyennes pour chaque métrique
        var averages = {
            'CYCLO': 1244,
            'NOM': 714,
            'NCLOC': 5892,
            'AWM': 13.42,
            'NOC': 70,
            'NOCL': 1122,
            'NOF': 56,
            'NOS': 2901,
            'WMC' : 13.9
        };

    // Calculer les pourcentages
    var percentages = {};
    for (var metric in values) {
        percentages[metric] = (values[metric] / (2 * averages[metric])) ;
        if(percentages[metric]>=100){
            percentages[metric] = 100;
        }
    }

    // Créer les données pour le graphique
    var data = [
        {
            x: Object.keys(percentages),
            y: Object.values(percentages),
            type: 'bar',
            marker: {
                color: Object.values(percentages).map(value => {
                    if (value < 0.5) return 'green';
                    else if (value >= 0.5 && value <= 0.8) return 'orange';
                    else return 'red';
                })
            },
            width: 0.5 // Ajuste la largeur des barres
        }
    ];

    // Créer le graphique
    // Créer le graphique
    
    Plotly.newPlot('myDiv', data, {
        title: 'Graph to compare its values (50% being the average)',
        yaxis: {
            tickformat: ',.0%', // Ajoute un pourcentage à l'axe des ordonnées
            range: [0, 1] // Définit la plage de l'axe des ordonnées de 0 à 100%
        }
    });


    
    function compareValues(value, avg, highAvg, metric) {
        var result;
        var alertClass;
        
        if (value < avg) {
            result = "low probability of code smells";
            alertClass = "low";
        } else if (value > avg && value < highAvg) {
            result = "medium probability of code smells";
            alertClass = "medium";
        } else if (value > highAvg) {
            result = "high probability of code smells";
            alertClass = "high";
        }
        
        // Créez un nouvel élément span pour le message d'alerte
        var alertSpan = document.createElement("span");
        alertSpan.className = "alert " + alertClass; // Ajoutez une classe pour pouvoir supprimer plus tard
        alertSpan.textContent = metric + " : " + result;
        
        // Ajoutez le message d'alerte à côté de la zone de texte correspondante
        document.getElementById('text').parentNode.appendChild(alertSpan);        }

        // ... (votre code existant)

        // Récupère la valeur de AMW, WMC et NOM
        var AMW = parseFloat(document.getElementById('AWM').value);
        var WMC = parseFloat(document.getElementById('WMC').value);
        var NOM = parseFloat(document.getElementById('NOM').value);

        var averages = {
            'CYCLO': 1244,
            'NOM': 714,
            'NCLOC': 5892,
            'AWM': 13.42,
            'NOC': 70,
            'NOCL': 1122,
            'NOF': 56,
            'NOS': 2901,
            'WMC' : 13.9
        };

        var high = {
            'CYCLO': 7259,
            'NOM': 5921,
            'NCLOC': 27535,
            'AWM': 25,
            'NOC': 313,
            'NOCL': 5871,
            'NOF': 225,
            'NOS': 14211,
            'WMC' : 35
        };

        if (greenBubble) {
            greenBubble.remove();
        }
        
        if (redBubble) {
            redBubble.remove();
        }

        // Vérifie les conditions et affiche la bulle verte si nécessaire
        if ((AMW > averages['AWM'] || WMC > averages['WMC']) && NOM > averages['NOM']) {
            var greenBubble = document.createElement("div");
            greenBubble.className = "bubble green";
            greenBubble.textContent = "Class is not too small and simple";
            document.getElementById('myDiv1').appendChild(greenBubble);
        }

        // ... (votre code existant)

        // Vérifie les conditions et affiche la bulle rouge si nécessaire
        if ((AMW > averages['AWM'] || WMC > high['WMC']*1.5) && NOM > high['NOM']) {
            var redBubble = document.createElement("div");
            redBubble.className = "bubble red";
            redBubble.textContent = "Class has substantial size and complexity";
            document.getElementById('myDiv1').appendChild(redBubble);
        }

        if ((AMW > averages['AWM'] && WMC > high['WMC']*0.5) && NOM > high['NOM']*0.75) {
            var redBubble = document.createElement("div");
            redBubble.className = "bubble red";
            redBubble.textContent = "Class is neither small nor dumb";
            document.getElementById('myDiv1').appendChild(redBubble);
        }

        

        //Plotly.newPlot('myDiv1', {
        
        //});
        
    }
        