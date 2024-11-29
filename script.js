const questions = [
    {
        question: "In which age, France saw the rise of powerful kingdoms and a flourishing of art and architecture?",
        options: ["Ancient Gaul", "Middle era", "French Revolution and Napoleon", "20th Century and Beyond"],
        answer: 1, // Updated to the correct index
        Explanation: " During the Middle Ages, France saw the rise of powerful kingdoms and a flourishing of art and architecture. The Hundred Years' War against England (1337-1453) left a lasting impact on French national identity. French Gothic architecture is an architectural style which emerged in France in 1140, and was dominant until the mid-16th century. The most notable examples are the great Gothic cathedrals of France, including Notre-Dame Cathedral, Reims Cathedral, Chartres Cathedral, and Amiens Cathedral.",
    },
    {
        question: "France was one of the founding members of the European Economic Community (EEC) in ?",
        options: ["1965", "1957", "1949", "1987"],
        answer: 1,
        Explanation: `The European Economic Community (EEC) was a regional economic organization established in 1957 by the Treaty of Rome. It aimed to bring about economic integration among its member states. The six founding members were:
                        •	Belgium
                        •	France
                        •	Italy
                        •	Luxembourg
                        •	Netherlands
                        •	West Germany
                        The EEC's main goals were to:
                        •	Eliminate trade barriers: This involved removing tariffs and quotas on goods traded between member states.
                        •	Establish a common market: This meant creating a single market where goods, services, capital, and labour could move freely.
                        •	Promote economic cooperation: This included coordinating economic policies and developing joint projects.`
    },
    {
        question: "France joined NATO in  which year ?",
        options: ["1943", "1879", "1949", "1789"],
        answer: 2,
        Explanation: `While France has been a founding member of NATO since 1949, it's important to note a unique period in its relationship with the alliance.
                    From 1966 to 2009, France withdrew from NATO's integrated military command structure. This meant that French forces were not under direct NATO command during this time. However, it's crucial to remember that France never formally left NATO. It continued to participate in political and strategic discussions and maintained close cooperation with other NATO members.
                    This period of partial withdrawal was a result of French President Charles de Gaulle's vision of an independent European defence policy. He believed that Europe should not be overly reliant on the United States for its security.`,
    },
    {
        question: "UNESCO stands for?",
        options: ["United Nations Economic and Social Council", "United Nations Environmental Programme", "Universal Society of Education and Culture", "United Nations Educational, Scientific and Cultural Organization"],
        answer: 3,
        Explanation: `The United Nations Educational, Scientific and Cultural Organization (UNESCO) is a specialized agency of the United Nations that promotes international cooperation in education, science, and culture. It was founded on November 16, 1945, and has 195 member states and 8 associate members. UNESCO is governed by the General Conference, which meets every two years, and the Executive Board, which meets twice a year.   
                    UNESCO's mission is to contribute to the building of peace, the eradication of poverty, sustainable development and intercultural dialogue through
                    education, the sciences, culture, communication and information. The Organization seeks to create the conditions for dialogue among civilizations, cultures and peoples, based on respect for diverse cultures and ways of life.`,
    },
    {
        question: "Why France's global influence has declined in recent years?",
        options: ["Rise of emerging powers and a more multipolar world order.", "Economic stagnation and high unemployment rates", "Political instability and social unrest", "All of the above."],
        answer: 3,
        Explanation: `Here are some additional points that could be included in a more detailed explanation:
                        Economic Challenges:
                        •	Stagnant Economic Growth: France has struggled with slow economic growth compared to other major economies.
                        •	High Unemployment: Persistent high unemployment rates have weakened the country's economic standing.
                        •	Public Debt: A significant national debt burden limits France's ability to invest in infrastructure and social programs.
                        Political Instability:
                        •	Frequent Government Changes: Frequent changes in government and political instability have hindered long-term policymaking and international relations.
                        •	Social Unrest: Social protests and strikes have disrupted economic activity and tarnished France's image.`,
    },
];

// Login Page
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    const userId = document.getElementById('userId').value;
    localStorage.setItem('userName', userName);
    localStorage.setItem('userId', userId);
    window.location.href = 'intro.html'; // Redirect to quiz page
});

// Intro Page
document.getElementById('intro')?.addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = 'quiz.html'; // Redirect to quiz page
});

// Quiz Page
if (document.getElementById('quiz')) {
    const quizContainer = document.getElementById('quiz');
    let currentQuestionIndex = 0;
    let score = 0;

    function loadQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        quizContainer.innerHTML = `<h2>${currentQuestion.question}</h2>`;
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.onclick = () => checkAnswer(index, button);
            quizContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex, button) {
        const currentQuestion = questions[currentQuestionIndex];

        // Check if the clicked button is correct or wrong
        if (selectedIndex === currentQuestion.answer) {
            button.classList.add('correct');
            score++;
            showExplanation(`<span style="color: green;">Correct!</span><br>${currentQuestion.Explanation}`, () => {
                proceedToNextQuestion();
            });
        } else {
            button.classList.add('wrong');
            showExplanation(`<span style="color: red;">Wrong!</span><br>${currentQuestion.Explanation}`, () => {
                proceedToNextQuestion();
            });
        }
    }

    function proceedToNextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Redirect to results page after quiz completion
            localStorage.setItem('score', score);
            window.location.href = 'result.html';
        }
    }

    function showExplanation(explanation, callback) {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-button">&times;</span>
                <p>${explanation}</p>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector('.close-button');
        closeButton.onclick = () => {
            document.body.removeChild(modal);
            callback(); // Proceed to the next question
        };

    }

    loadQuestion();
}

// Result Page
if (document.getElementById('result')) {
    const resultContainer = document.getElementById('result');
    const userName = localStorage.getItem('userName');
    const userId = localStorage.getItem('userId');
    const score = localStorage.getItem('score');

    resultContainer.innerHTML = `
        <p>Name: ${userName}</p>
        <p>ID: ${userId}</p>
        <p>Score: ${score} out of ${questions.length}</p>
    `;
}