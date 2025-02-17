document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    const step4 = document.getElementById('step4');
    const step5 = document.getElementById('step5');
    const step6 = document.getElementById('step6');
    const specificQuestion = document.getElementById('specific-question');
    const specificOptions = document.getElementById('specific-options');
    const restartButton = document.getElementById('restart-button');
    const subtopicQuestion = document.getElementById('subtopic-question');
    const prep = document.getElementById('prep');
    
    var topics = ['Digital','Sustainability','Science_Engineering','Singapore',
                    'Wellness','Arts','Personal_Development'];
    

    let userChoices = {
        step2: '',
        step3: '',
        step4: '',
        step5: ''
    };

    const topicOptions = {
        'Digital': ['Artificial Intelligence & Machine Learning', 'Cyber Security', 'Data Science & Analytics', 'Internet of Things','Cloud Computing','Blockchain Technology','Software Engineering'],
        'Sustainability': ['Climate Change', 'Environmental Conservation', 'Renewable Energy', 'Sustainable Living', 'Green Economy'],
        'Science & Engineering': ['Astronomy & Space Exploration', 'Biology & Medical Science', 'Chemistry', 'Physics','Quantum Engineering','Engineering','Mathematics'],
        'Singapore': ['Economic Development', 'SG Culture & Heritage', 'Urban Planning', 'Education','Food & Beverage'],
        'Wellness': ['Mental Health', 'Physical Health', 'Nutrition', 'Mindfulness','Fitness'],
        'Arts': ['Visual Arts', 'Performing Arts', 'Culture & Heritage', 'Literary Arts','Film & Television','Digital Arts','Culinary Arts','Handicraft'],
        'Personal Development': ['Self-Help', 'Finance & Investment', 'Career Development', 'Time Management','Emotional Intelligence']
//        'Genre A': ['A1', 'A2', 'A3', 'A4'],
//        'Genre B': ['B1', 'B2', 'B3', 'B4'],
//        'Genre C': ['C1', 'C2', 'C3', 'C4'],
//        'Genre D': ['D1', 'D2', 'D3', 'D4']
    };

    const recommendations = [
        {
            step2: 'Technology',
            step3: 'Data Science & Analytics',
            step4: 'Beginner',
            titles: ['Data Science: The Executive Summary by Field Cady']
        },
        {
            step2: 'Technology',
            step3: 'AI / ML',
            step4: 'Intermediate',
            titles: ['Artificial Intelligence: A Modern Approach by Stuart Russell and Peter Norvig', 
                     'Machine Learning: A Probabilistic Perspective by Kevin P. Murphy']
        }
        // Add more recommendation objects as needed
    ];
    
    
    const idSets = {
        "set_0": ["D215C5", "3A1E8A", "CD777B", "A690B0", "3B8F7E", "D9C276", "CD5ED9", "83D3DD", "5A9A6E", "64DE1C"], 
        "set_1": ["E4FA89", "337D11", "6D31FF", "606325", "52D585", "B6AAA5", "B724E3", "D6CC7D", "658AF1", "F2106A"]
    };
    
    const set_one = ["D215C5", "3A1E8A", "CD777B", "A690B0", "3B8F7E", "D9C276", "CD5ED9", "83D3DD", "5A9A6E", "64DE1C"];
    const set_two = ["E4FA89", "337D11", "6D31FF", "606325", "52D585", "B6AAA5", "B724E3", "D6CC7D", "658AF1", "F2106A"];
    
    
    
    startButton.addEventListener('click', () => {
        startButton.classList.remove('grey-button');
        startButton.classList.add('red-button');
        setTimeout(() => {
            step1.classList.add('hidden');
            step2.classList.remove('hidden');
        }, 300);
        
        //option-button
        const collection = document.getElementsByClassName("option-button");
        for (let i = 0; i < collection.length; i++) {
          collection[i].classList.remove('selected');
        }
    });

    var mainTopic = '';
    
    var isRandom = false;
    
    var dataArr;
    
    var theJsonData;
    
    const randomIdOne = getRandomValue(set_one);
    const randomIdTwo = getRandomValue(set_two);
    
    document.getElementById("id_check").innerHTML = 'ID #1: ' + randomIdOne;
    
    fetch("myText.txt")
        .then((res) => res.text())
        .then((text) => {
//            console.log(text);
            theJsonData = JSON.parse(text);
         })
        .catch((e) => console.error(e));
    

    function handleButtonClick(event) {
        const clickedButton = event.target;
        const parentStep = clickedButton.closest('.step');
//console.log('hello ' + theJsonData['key9781400835959']);

        if (parentStep.id === 'step2') {
            userChoices.step2 = clickedButton.textContent;
            const selectedTopic = clickedButton.textContent;
            mainTopic = selectedTopic;
            
            if (selectedTopic.includes('Surprise')) 
            {
                isRandom = true;
                
                const randomTopic = topics[Math.floor(Math.random() * topics.length)];
                
                var randomButton = document.getElementById(randomTopic);
                randomButton.click(); // this will trigger the click event
                
            }
            else if (topicOptions[selectedTopic]) 
            {
//                isRandom = false;
                
                const questionHTML = `What specific area of <b>${selectedTopic}</b><br>are you interested in?`;
                specificQuestion.innerHTML = questionHTML;
                specificOptions.innerHTML = '';
                topicOptions[selectedTopic].forEach(option => {
                    const button = document.createElement('button');
                    button.className = 'option-button';
                    button.textContent = option;
                    button.id = option;
                    button.addEventListener('click', handleButtonClick);
                    specificOptions.appendChild(button);
                });
                setTimeout(() => {
                    step2.classList.add('hidden');
                    step3.classList.remove('hidden');
                }, 300);
                
                if (isRandom)
                {
                    setTimeout(() => {
                        var subtopics = [];
                        topicOptions[selectedTopic].forEach(option => {
                            subtopics.push(option);
                        });
                        
                        const randomSubtopic = subtopics[Math.floor(Math.random() * subtopics.length)];
                        var randomButton = document.getElementById(randomSubtopic);
                        randomButton.click(); // this will trigger the click event
                    }, 370);
                }
            } 
            else 
            {
//                isRandom = false;
                alert('You selected: ' + selectedTopic + '. This option is not implemented yet.');
            }
        } else if (parentStep.id === 'step3') {
            isRandom = false;
            userChoices.step3 = clickedButton.textContent;
            const selectedSubtopic = clickedButton.textContent;
            const questionHTML = `How familiar are you with<br> this selected topic?`
                                    + `<br><b>${mainTopic} >> ${selectedSubtopic}</b>`;
            subtopicQuestion.innerHTML = questionHTML;
            setTimeout(() => {
                step3.classList.add('hidden');
                step4.classList.remove('hidden');
            }, 300);
        } 

        else if (parentStep.id === 'step4') {
            
            userChoices.step4 = clickedButton.textContent;
            step4.classList.add('hidden');
            prep.classList.remove('hidden');
            
            var topic = userChoices.step2.replaceAll('&','%26');
            var subTopic = userChoices.step3.replaceAll('&','%26');
            var level = userChoices.step4.replaceAll('&','%26');
            
            //const apiUrl = 'https://blackbox-omakase-app.onrender.com/omakase/?topic=Personal%20Development&subtopic=Self-Help&level=Beginner';
            const apiUrl = 'https://blackbox-omakase-app.onrender.com/omakase/?topic=' + topic
                            + '&subtopic=' + subTopic 
                            + '&level=' + level;
                    
            console.log(apiUrl)
            
            $.ajax({
                url: apiUrl,
                method: 'GET',
                success: function(data) {
                    console.log('Success');
                    const obj = JSON.parse(data);
                    
                    showRecommendations(true, obj);
                    prep.classList.add('hidden');

                },
                error: function(xhr, status, error) {
                    console.error('Error:', status, error);
                    
                    showRecommendations(false, '');
                    prep.classList.add('hidden');
                }
            });
            
//            setTimeout(() => {
//               showRecommendations();
//               prep.classList.add('hidden');
//            }, 1000);
       }

        parentStep.querySelectorAll('.option-button').forEach(btn => btn.classList.remove('selected'));
        clickedButton.classList.add('selected');
    }
    
    function getDeepLink (isbn)
    {
        var link = '';
        var bookId = theJsonData['key' + isbn];
        
        if (isbn.length > 20)
        {
            link = 'https://go.nlb.gov.sg/m-link/details?type=ebook&id=' + bookId 
                    + '&utm_source=online&utm_campaign=blackbox_omakase&utm_medium=website&utm_content=ebook2';
        }
        else
        {
            link = 'https://go.nlb.gov.sg/m-link/details?type=book&id=' + bookId 
                    + '&utm_source=online&utm_campaign=blackbox_omakase&utm_medium=website&utm_content=book';
        }
        
        return link;
    }
    
    

    function showRecommendations(state, data) 
    {
        console.log('data:', data)
        
        document.getElementById('reason').innerHTML = data.reason;
        
        const step6 = document.getElementById('step6');
        const recommendationList = document.getElementById('recommendation-list');
        const recommBox = document.getElementById('recomm-box');

        const matchingRecommendations = recommendations.filter(rec => 
                rec.step2 === userChoices.step2 &&
                rec.step3 === userChoices.step3 &&
                rec.step4 === userChoices.step4 
        );

        recommendationList.innerHTML = '';
        
        if (state === true) 
        {
            var html = '';
            
            var appetiserTitle = data.appetiser.title;
            var appetiserAuthor = data.appetiser.author;
            var appetiserAbstract = data.appetiser.abstract;
            var appetiserCover = data.appetiser.cover_url;
            var appetiserIsbn = data.appetiser.isbn;
            
            var mainTitle = data.aain.title;
            var mainAuthor = data.aain.author;
            var mainAbstract = data.aain.abstract;
            var mainCover = data.aain.cover_url;
            var mainIsbn = data.aain.isbn;
            
            var dessertTitle = data.dessert.title;
            var dessertAuthor = data.dessert.author;
            var dessertAbstract = data.dessert.abstract;
            var dessertCover = data.dessert.cover_url;
            var dessertIsbn = data.dessert.isbn;
            
            
            if (appetiserAbstract === null || appetiserAbstract === 'null') appetiserAbstract = '';
            if (mainAbstract === null || mainAbstract === 'null') mainAbstract = '';
            if (dessertAbstract === null || dessertAbstract === 'null') dessertAbstract = '';
            
            
            var appetiserDeeplink = getDeepLink(appetiserIsbn);
            var mainDeeplink = getDeepLink(mainIsbn);
            var dessertDeeplink = getDeepLink(dessertIsbn);
            
            
            
            html += "<div class=\"menu-item\" onclick=\"window.open('" + appetiserDeeplink + "','mywindow');\" style=\"cursor: pointer;\">";
                html += "<div class=\"menu-header\">";
                    html += "Appetiser";
                html += "</div>";
                html += "<div class=\"menu-img\">";
                    html += "<img src=\"" + appetiserCover + "\" alt=\"Data Science\" width=\"100\" height=\"150\">";
                html += "</div>";
                html += "<div class=\"menu-text\">";
                    html += "<div class=\"item-title\">";
                        html += "<b>" + appetiserTitle + "</b> ";
                    html += "</div>";

                    html += "<div class=\"item-author\">";
                        html += "by " + appetiserAuthor;
                    html += "</div>";

                    html += "<div class=\"item-abstract\">";
                        html += "<i>" + appetiserAbstract + "</i>";
                    html += "</div>";

                    html += "<div class=\"item-more\">";
                        html += "<i>more >></i>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            
            html += "<div class=\"menu-item\" onclick=\"window.open('" + mainDeeplink + "','mywindow');\" style=\"cursor: pointer;\">";
                html += "<div class=\"menu-header\">";
                    html += "Main Course";
                html += "</div>";
                html += "<div class=\"menu-img\">";
                    html += "<img src=\"" + mainCover + "\" alt=\"Data Science\" width=\"100\" height=\"150\">";
                html += "</div>";
                html += "<div class=\"menu-text\">";
                    html += "<div class=\"item-title\">";
                        html += "<b>" + mainTitle + "</b> ";
                    html += "</div>";

                    html += "<div class=\"item-author\">";
                        html += "by " + mainAuthor;
                    html += "</div>";

                    html += "<div class=\"item-abstract\">";
                        html += "<i>" + mainAbstract + "</i>";
                    html += "</div>";

                    html += "<div class=\"item-more\">";
                        html += "<i>more >></i>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            
            html += "<div class=\"menu-item\" onclick=\"window.open('" + dessertDeeplink + "','mywindow');\" style=\"cursor: pointer;\">";
                html += "<div class=\"menu-header\">";
                    html += "Dessert";
                html += "</div>";
                html += "<div class=\"menu-img\">";
                    html += "<img src=\"" + dessertCover + "\" alt=\"Data Science\" width=\"100\" height=\"150\">";
                html += "</div>";
                html += "<div class=\"menu-text\">";
                    html += "<div class=\"item-title\">";
                        html += "<b>" + dessertTitle + "</b> ";
                    html += "</div>";

                    html += "<div class=\"item-author\">";
                        html += "by " + dessertAuthor;
                    html += "</div>";

                    html += "<div class=\"item-abstract\">";
                        html += "<i>" + dessertAbstract + "</i>";
                    html += "</div>";

                    html += "<div class=\"item-more\">";
                        html += "<i>more >></i>";
                    html += "</div>";
                html += "</div>";
            html += "</div>";
            
            document.getElementById("menu").innerHTML = html;

            const omakaseMenu = document.getElementById('menu');
            omakaseMenu.classList.remove('hidden');
            recommBox.classList.add('hidden');
        } 
        else 
        {
            const omakaseMenu = document.getElementById('menu');
            omakaseMenu.classList.add('hidden');
            recommBox.classList.remove('hidden');

            const li = document.createElement('li');
            li.textContent = 'No specific recommendations. Please try different options.';
            recommendationList.appendChild(li);
        }

        step6.classList.remove('hidden');
        
        document.getElementById("id_check").innerHTML = 'ID #1: ' + randomIdOne + ', ID #2 : ' + randomIdTwo;
    }
    
    
    function getRandomValue(list) {
        if (list.length === 0) {
          return null; // Return null if the list is empty
        }

        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }
    
    
//    function showRecommendations() 
//    {
//        const step6 = document.getElementById('step6');
//        const recommendationList = document.getElementById('recommendation-list');
//        const recommBox = document.getElementById('recomm-box');
//
//        const matchingRecommendations = recommendations.filter(rec => 
//                rec.step2 === userChoices.step2 &&
//                rec.step3 === userChoices.step3 &&
//                rec.step4 === userChoices.step4 
//        );
//
//        recommendationList.innerHTML = '';
//
//        if (matchingRecommendations.length > 0) 
//        {
//            const omakaseMenu = document.getElementById('menu');
//            omakaseMenu.classList.remove('hidden');
//            recommBox.classList.add('hidden');
//        } 
//        else 
//        {
//            const omakaseMenu = document.getElementById('menu');
//            omakaseMenu.classList.add('hidden');
//            recommBox.classList.remove('hidden');
//
//            const li = document.createElement('li');
//            li.textContent = 'No specific recommendations. Please try different options.';
//            recommendationList.appendChild(li);
//        }
//
//        step6.classList.remove('hidden');
//    }
   

    restartButton.addEventListener('click', () => {
        userChoices = {
            step2: '',
            step3: '',
            step4: '',
            step5: ''
        };
        document.querySelectorAll('.step').forEach(step => step.classList.add('hidden'));
        step1.classList.remove('hidden');
        startButton.classList.remove('red-button');
        startButton.classList.add('grey-button');
    });

    // Add listeners to initial buttons
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });
    
    [step3, step4].forEach(step => {
        const startOverButton = document.createElement('button');
        startOverButton.className = 'start-over-button'; // Updated class
        startOverButton.textContent = 'Start Over';
        startOverButton.addEventListener('click', () => {
            userChoices = { step2: '', step3: '', step4: '', step5: '' };
            document.querySelectorAll('.step').forEach(step => step.classList.add('hidden'));
            step1.classList.remove('hidden');
            startButton.classList.remove('blue-button');
            startButton.classList.add('grey-button');
        });
        step.appendChild(startOverButton);
    });
});