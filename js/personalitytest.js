document.addEventListener('DOMContentLoaded', () => {
    // Element-Referenzen
    const intro = document.querySelector('.test-intro');
    const questionnaire = document.getElementById('questionnaire');
    const resultsContainer = document.querySelector('.results-container');
    const startButton = document.getElementById('startTest');
    const prevButton = document.getElementById('prevQuestion');
    const nextButton = document.getElementById('nextQuestion');
    const restartButton = document.getElementById('restartTest');
    const questionText = document.getElementById('questionText');
    const progressFill = document.querySelector('.progress-fill');
    const optionsContainer = document.querySelector('.options-container');

    // Test-Zustand
    let currentQuestion = 0;
    let answers = [];
    const questions = [
        // Extraversion (E) - Fokus auf soziale Energie und Aktivität
        "Ich bin gerne der Mittelpunkt der Aufmerksamkeit.",           // E+ stark
        "Ich komme auch mit fremden Menschen schnell ins Gespräch.",   // E+ moderat
        "Ich ziehe es vor, im Hintergrund zu bleiben.",                // E- stark
        "In großen Gruppen fühle ich mich oft unwohl.",               // E- moderat

        // Verträglichkeit (A) - Fokus auf Mitgefühl und soziale Harmonie
        "Das Wohlbefinden anderer ist mir wichtiger als mein eigenes.", // A+ stark
        "Ich versuche, Konflikte durch Kompromisse zu lösen.",         // A+ moderat
        "In Diskussionen setze ich mich oft durch.",                    // A- moderat
        "Kritik äußere ich direkt und unverblümt.",                    // A- stark

        // Gewissenhaftigkeit (C) - Fokus auf Ordnung und Zielstrebigkeit
        "Ich plane jeden Tag genau durch.",                            // C+ stark
        "Ich erledige Aufgaben gründlich und termingerecht.",         // C+ moderat
        "Spontane Entscheidungen fallen mir leichter als lange Planung.", // C- moderat
        "Ordnung ist mir weniger wichtig als Kreativität.",            // C- stark

        // Neurotizismus (N) - Fokus auf emotionale Reaktionen
        "Ich grüble oft lange über mögliche Probleme nach.",           // N+ stark
        "Stress macht mir schnell zu schaffen.",                       // N+ moderat
        "Ich bleibe in Krisensituationen gelassen.",                   // N- stark
        "Misserfolge kann ich gut wegstecken.",                       // N- moderat

        // Offenheit (O) - Fokus auf neue Erfahrungen und Kreativität
        "Ich entwickle häufig völlig neue Ideen und Konzepte.",       // O+ stark
        "Ich interessiere mich für abstrakte Gedankenexperimente.",   // O+ moderat
        "Bewährte Routinen geben mir Sicherheit.",                    // O- moderat
        "Ich bevorzuge praktische gegenüber theoretischen Ansätzen."  // O- stark
    ];

    const questionProperties = {
        // Extraversion
        0: { dimension: 'extraversion', isPositive: true, weight: 2.0, impact: 1.5 },  // Hauptfrage
        1: { dimension: 'extraversion', isPositive: true, weight: 1.5, impact: 1.2 },
        2: { dimension: 'extraversion', isPositive: false, weight: 1.8, impact: 1.4 }, // Wichtige Gegenfrage
        3: { dimension: 'extraversion', isPositive: false, weight: 1.3, impact: 1.1 },
        
        // Verträglichkeit
        4: { dimension: 'vertraeglichkeit', isPositive: true, weight: 1.9, impact: 1.5 },  // Hauptfrage
        5: { dimension: 'vertraeglichkeit', isPositive: true, weight: 1.4, impact: 1.2 },
        6: { dimension: 'vertraeglichkeit', isPositive: false, weight: 1.6, impact: 1.3 },
        7: { dimension: 'vertraeglichkeit', isPositive: false, weight: 1.7, impact: 1.4 }, // Wichtige Gegenfrage
        
        // Gewissenhaftigkeit
        8: { dimension: 'gewissenhaftigkeit', isPositive: true, weight: 2.0, impact: 1.5 },  // Hauptfrage
        9: { dimension: 'gewissenhaftigkeit', isPositive: true, weight: 1.6, impact: 1.3 },
        10: { dimension: 'gewissenhaftigkeit', isPositive: false, weight: 1.5, impact: 1.2 },
        11: { dimension: 'gewissenhaftigkeit', isPositive: false, weight: 1.7, impact: 1.4 }, // Wichtige Gegenfrage
        
        // Neurotizismus
        12: { dimension: 'neurotizismus', isPositive: true, weight: 1.9, impact: 1.5 },  // Hauptfrage
        13: { dimension: 'neurotizismus', isPositive: true, weight: 1.5, impact: 1.2 },
        14: { dimension: 'neurotizismus', isPositive: false, weight: 2.0, impact: 1.5 }, // Wichtige Gegenfrage
        15: { dimension: 'neurotizismus', isPositive: false, weight: 1.4, impact: 1.1 },
        
        // Offenheit
        16: { dimension: 'offenheit', isPositive: true, weight: 2.0, impact: 1.5 },  // Hauptfrage
        17: { dimension: 'offenheit', isPositive: true, weight: 1.7, impact: 1.3 },
        18: { dimension: 'offenheit', isPositive: false, weight: 1.5, impact: 1.2 },
        19: { dimension: 'offenheit', isPositive: false, weight: 1.8, impact: 1.4 }  // Wichtige Gegenfrage
    };

    // Zeigt eine bestimmte Sektion an und blendet die anderen aus
    function showSection(section) {
        // Entferne zuerst alle active Klassen
        intro.classList.remove('active');
        questionnaire.classList.remove('active');
        resultsContainer.classList.remove('active');

        // Füge active Klasse zur gewählten Sektion hinzu
        section.classList.add('active');

        // Scrolle sanft nach oben
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Aktualisiert die aktuelle Frage und den Fortschrittsbalken
    function updateQuestion() {
        questionText.textContent = questions[currentQuestion];
        const progress = ((currentQuestion + 1) / questions.length) * 100;
        progressFill.style.width = `${progress}%`;
        
        // Aktiviere/Deaktiviere Navigationsbuttons
        prevButton.disabled = currentQuestion === 0;
        nextButton.disabled = !answers[currentQuestion];

        // Markiere die ausgewählte Antwort
        const options = optionsContainer.querySelectorAll('.option-button');
        options.forEach(option => {
            option.classList.remove('selected');
            if (answers[currentQuestion] && option.value === answers[currentQuestion].toString()) {
                option.classList.add('selected');
            }
        });
    }

    // Event Listener für den Start-Button
    startButton.addEventListener('click', () => {
        currentQuestion = 0;
        answers = [];
        showSection(questionnaire);
        updateQuestion();
    });

    // Event Listener für die Antwort-Buttons
    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-button')) {
            // Entferne zuerst alle selected Klassen
            optionsContainer.querySelectorAll('.option-button').forEach(btn => {
                btn.classList.remove('selected');
            });
            
            // Markiere den ausgewählten Button
            e.target.classList.add('selected');
            
            // Speichere die Antwort
            answers[currentQuestion] = parseInt(e.target.value);
            nextButton.disabled = false;
        }
    });

    // Navigation zwischen Fragen
    prevButton.addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            updateQuestion();
        }
    });

    nextButton.addEventListener('click', () => {
        if (answers[currentQuestion]) {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                updateQuestion();
            } else {
                showResults();
            }
        }
    });

    // Zeigt die Ergebnisse an
    function showResults() {
        showSection(resultsContainer);
        calculateResults();
    }

    // Berechnet und zeigt die Testergebnisse an
    function calculateResults() {
        const dimensions = {
            extraversion: calculateDimensionScore('extraversion'),
            vertraeglichkeit: calculateDimensionScore('vertraeglichkeit'),
            gewissenhaftigkeit: calculateDimensionScore('gewissenhaftigkeit'),
            neurotizismus: calculateDimensionScore('neurotizismus'),
            offenheit: calculateDimensionScore('offenheit')
        };

        updateDimensionCards(dimensions);
        generateAIAnalysis(dimensions);
        generateDevelopmentInsights(dimensions);
        createCharts(dimensions);
    }

    function calculateDimensionScore(dimension) {
        let weightedSum = 0;
        let maxPossibleSum = 0;
        let totalImpact = 0;
        
        // Sammle alle Fragen für diese Dimension
        const dimensionQuestions = Object.entries(questionProperties)
            .filter(([_, props]) => props.dimension === dimension);
        
        dimensionQuestions.forEach(([index, props]) => {
            const answer = answers[index];
            if (answer) {
                let score;
                if (props.isPositive) {
                    score = answer;
                } else {
                    score = 6 - answer; // Invertiere negative Fragen
                }
                
                // Berechne gewichtete Punktzahl mit Impact-Faktor
                const adjustedScore = score * props.weight * props.impact;
                weightedSum += adjustedScore;
                
                // Berechne maximale Punktzahl für diese Frage
                maxPossibleSum += 5 * props.weight * props.impact; // 5 ist die höchstmögliche Antwort
                totalImpact += props.impact;
            }
        });
        
        if (maxPossibleSum > 0) {
            // Berechne Prozentsatz mit nicht-linearer Skalierung
            let percentage = (weightedSum / maxPossibleSum) * 100;
            
            // Wende eine nicht-lineare Transformation an
            percentage = adjustScoreDistribution(percentage, dimension);
            
            return Math.min(100, Math.max(0, Math.round(percentage)));
        }
        return 0;
    }

    function adjustScoreDistribution(score, dimension) {
        // Dimensionsspezifische Anpassungsfaktoren
        const adjustments = {
            'extraversion': 0.92,    // Etwas strenger
            'vertraeglichkeit': 0.95, // Leicht strenger
            'gewissenhaftigkeit': 0.88, // Am strengsten
            'neurotizismus': 0.90,    // Strenger
            'offenheit': 0.85         // Sehr streng
        };
        
        // Basis-Exponentialfunktion für nicht-lineare Verteilung
        const factor = adjustments[dimension] || 0.9;
        const adjustedScore = Math.pow(score / 100, factor) * 100;
        
        // Zusätzliche Feinjustierung basierend auf dem Wertebereich
        if (score < 40) {
            return adjustedScore * 0.9; // Niedrige Werte noch etwas niedriger
        } else if (score > 80) {
            return adjustedScore * 1.1; // Hohe Werte etwas höher
        }
        return adjustedScore;
    }

    function updateDimensionCards(dimensions) {
        Object.entries(dimensions).forEach(([dimension, score]) => {
            const card = document.getElementById(`${dimension}-card`);
            if (card) {
                const scoreElement = card.querySelector('.dimension-score');
                if (scoreElement) {
                    // Zeige nur den Zahlenwert an
                    scoreElement.textContent = Math.round(score);
                }
            }
        });
    }

    function getScoreLevel(score) {
        if (score >= 80) return "Sehr hoch";
        if (score >= 60) return "Hoch";
        if (score >= 40) return "Mittel";
        if (score >= 20) return "Niedrig";
        return "Sehr niedrig";
    }

    function generateAIAnalysis(dimensions) {
        // KI-Analyse temporär deaktiviert
        const analysisResult = document.getElementById('analysisResult');
        if (analysisResult) {
            analysisResult.innerHTML = ''; // Leere den Container
        }
    }

    function generateDevelopmentInsights(dimensions) {
        const developmentInsights = document.getElementById('developmentInsights');
        let insights = '<div class="development-insights">';
        
        // Identifiziere Entwicklungsbereiche
        Object.entries(dimensions)
            .filter(([, score]) => score < 60)
            .forEach(([dimension, score]) => {
                insights += `<div class="development-item">
                    <h4>${translateDimension(dimension)}</h4>
                    <p>${getDevelopmentAdvice(dimension, score)}</p>
                </div>`;
            });

        if (!insights.includes('development-item')) {
            insights += '<p>Sie zeigen in allen Dimensionen eine ausgewogene Entwicklung. Fokussieren Sie sich darauf, Ihre Stärken weiter auszubauen.</p>';
        }

        insights += '</div>';
        developmentInsights.innerHTML = insights;
    }

    function translateDimension(dimension) {
        const translations = {
            'extraversion': 'Extraversion',
            'vertraeglichkeit': 'Verträglichkeit',
            'gewissenhaftigkeit': 'Gewissenhaftigkeit',
            'neurotizismus': 'Emotionale Stabilität',
            'offenheit': 'Offenheit für Neues'
        };
        return translations[dimension] || dimension;
    }

    function getDimensionStrength(dimension, score) {
        const strengths = {
            'extraversion': 'sich leicht in sozialen Situationen bewegen und gerne mit anderen Menschen interagieren',
            'vertraeglichkeit': 'ein ausgeprägtes Einfühlungsvermögen besitzen und harmonische Beziehungen pflegen',
            'gewissenhaftigkeit': 'sehr organisiert und zielstrebig an Aufgaben herangehen',
            'neurotizismus': 'emotional sehr ausgeglichen und belastbar sind',
            'offenheit': 'neugierig sind und sich gerne mit neuen Ideen und Erfahrungen auseinandersetzen'
        };
        return strengths[dimension] || '';
    }

    function getDimensionAdvice(dimension) {
        const advice = {
            'extraversion': 'Versuchen Sie, sich schrittweise mehr in sozialen Situationen zu engagieren',
            'vertraeglichkeit': 'Üben Sie sich darin, die Perspektive anderer Menschen einzunehmen',
            'gewissenhaftigkeit': 'Entwickeln Sie klare Routinen und Strukturen für Ihre Aufgaben',
            'neurotizismus': 'Lernen Sie Entspannungstechniken und Stressmanagement-Methoden',
            'offenheit': 'Experimentieren Sie mit neuen Erfahrungen und kreativen Aktivitäten'
        };
        return advice[dimension] || '';
    }

    function getDevelopmentAdvice(dimension, score) {
        const adviceMap = {
            'extraversion': [
                'Setzen Sie sich kleine soziale Ziele, wie zum Beispiel täglich ein kurzes Gespräch mit einem Kollegen zu führen.',
                'Nehmen Sie an Gruppenaktivitäten teil, die Ihren Interessen entsprechen.'
            ],
            'vertraeglichkeit': [
                'Üben Sie aktives Zuhören in Gesprächen.',
                'Suchen Sie nach Möglichkeiten, anderen zu helfen und Unterstützung anzubieten.'
            ],
            'gewissenhaftigkeit': [
                'Erstellen Sie To-Do-Listen und setzen Sie sich realistische Zeitpläne.',
                'Teilen Sie große Aufgaben in kleinere, überschaubare Schritte ein.'
            ],
            'neurotizismus': [
                'Praktizieren Sie regelmäßig Meditation oder Achtsamkeitsübungen.',
                'Entwickeln Sie positive Bewältigungsstrategien für stressige Situationen.'
            ],
            'offenheit': [
                'Probieren Sie regelmäßig neue Aktivitäten oder Hobbys aus.',
                'Setzen Sie sich mit verschiedenen Perspektiven und Ideen auseinander.'
            ]
        };
        
        const advice = adviceMap[dimension];
        return advice ? advice.join(' ') : '';
    }

    function setupShareButton(dimensions) {
        const shareButton = document.getElementById('shareResults');
        if (shareButton) {
            shareButton.addEventListener('click', () => {
                const text = `Mein Big Five Persönlichkeitsprofil:\n
                    Extraversion: ${Math.round(dimensions.extraversion)}%
                    Verträglichkeit: ${Math.round(dimensions.vertraeglichkeit)}%
                    Gewissenhaftigkeit: ${Math.round(dimensions.gewissenhaftigkeit)}%
                    Emotionale Stabilität: ${Math.round(dimensions.neurotizismus)}%
                    Offenheit: ${Math.round(dimensions.offenheit)}%
                    \nTeste auch du deine Persönlichkeit auf big5insight.com!`;
                
                if (navigator.share) {
                    navigator.share({
                        title: 'Meine Big Five Persönlichkeitsanalyse',
                        text: text,
                        url: 'https://big5insight.com'
                    });
                } else {
                    // Fallback: Text in Zwischenablage kopieren
                    navigator.clipboard.writeText(text)
                        .then(() => alert('Ergebnisse wurden in die Zwischenablage kopiert!'))
                        .catch(() => alert('Teilen nicht möglich'));
                }
            });
        }
    }

    // Erstellt die Visualisierungen
    function createCharts(dimensions) {
        // Barplot
        const barCtx = document.getElementById('barChart').getContext('2d');
        new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Extraversion', 'Verträglichkeit', 'Gewissenhaftigkeit', 'Neurotizismus', 'Offenheit'],
                datasets: [{
                    label: 'Ihre Werte',
                    data: [
                        dimensions.extraversion,
                        dimensions.vertraeglichkeit,
                        dimensions.gewissenhaftigkeit,
                        dimensions.neurotizismus,
                        dimensions.offenheit
                    ],
                    backgroundColor: '#19B1E9',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            display: true,
                            text: 'Ausprägung in %'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });

        // Spinnennetzdiagramm
        const radarCtx = document.getElementById('resultsChart').getContext('2d');
        new Chart(radarCtx, {
            type: 'radar',
            data: {
                labels: ['Extraversion', 'Verträglichkeit', 'Gewissenhaftigkeit', 'Neurotizismus', 'Offenheit'],
                datasets: [{
                    label: 'Ihre Werte',
                    data: [
                        dimensions.extraversion,
                        dimensions.vertraeglichkeit,
                        dimensions.gewissenhaftigkeit,
                        dimensions.neurotizismus,
                        dimensions.offenheit
                    ],
                    borderColor: '#19B1E9',
                    backgroundColor: 'rgba(25, 177, 233, 0.2)'
                }]
            },
            options: {
                responsive: true,
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                }
            }
        });
    }

    // Event Listener für den Neustart-Button
    restartButton.addEventListener('click', () => {
        currentQuestion = 0;
        answers = [];
        showSection(intro);
    });

    // Initial die Intro-Sektion anzeigen
    showSection(intro);
});