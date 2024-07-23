// Creating a scheduler for the collection days.
const schedule = {
    madaraka: {
        days: ['Monday', 'Thursday'],
        times: ['8:00 AM', '5:00 PM'],
    },
    jamhuri: {
        days: ['Tuesday', 'Friday'],
        times: ['9:00 AM', '4:00 PM'],
    },
    nyayo: {
        days: ['Wednesday', 'Saturday'],
        times: ['7:00 AM', '6:00 PM'],
    },
};

// Display the schedule in the HTML.
document.addEventListener('DOMContentLoaded', () => {
    const pickUpScheduleForm = document.getElementById('pick-up-schedule-form');
    const scheduleResult = document.getElementById('schedule-result');

    pickUpScheduleForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const estate = document.getElementById('estate').value;
        if (schedule[estate]) {
            const estateSchedule = schedule[estate];
            scheduleResult.innerHTML = `
                <h3>${estate} Estate Schedule</h3>
                <ul>
                    <li>Days: ${estateSchedule.days.join(', ')}</li>
                    <li>Times: ${estateSchedule.times.join(' and ')}</li>
                </ul>
            `;
        } else {
            scheduleResult.innerHTML = 'Schedule not found';
        }
    });
});

// Educational/informative section.
const resources = {
    recycling: {
        title: 'What can I recycle?',
        content: `Frozen food bags
        Bread wrappers
        Plastic shopping bags
        Bubble wrap
        Crisp wrappers
        Pasta bags
        Outer wrapping on kitchen and toilet rolls
        Breakfast cereal bags`
    },
    reduceWaste: {
        title: 'Reducing Household Waste',
        content: `Tips and tricks for reducing waste in our homes.
        Recycling is the process of collecting waste and turning it into other materials or objects that can be reused. When we recycle, we use less raw materials than when producing a new product, which reduces air pollution and improves the environment. Recycling household waste can also reduce the amount you spend on waste collection, as many waste collectors have no restriction on the amount of waste you can put in your green and brown bins. But, there are generally thresholds for the amount you can put in your black bin, and excess charges apply if you go above this. You can also take your recyclable waste to a recycling facility to be recycled.
        
        The best way to reduce waste is not to produce it in the first place. So, reuse items whenever possible. For example, instead of buying plastic bottles of water, use a reusable bottle and refill it at home or at a free drinking water tap. If you’re going shopping, bring your own reusable shopping bags.
        
        Instead of buying new items, try and repair the ones you have. For example, you could repair your clothes, furniture, bike or appliances. Information on how to fix most things is available on the internet. Or, you can get a local professional to fix your items.
        
        Another option is upcycling. This is reusing items you no longer want, to make new products or materials of a higher value. It can be a fun and creative way of reducing waste and breathing new life into old items.
        
        Single-use plastics (SUPs) are items that are used once, or for a short period of time, and then thrown away. For example, straws, cotton bud sticks and polystyrene food containers. You should avoid using SUPs as they take a long time to break down and can damage the environment, particularly oceans. 70% of marine litter in the world comes from SUPs.
        
        Buy second hand. Buying second-hand products will save you money. It also decreases the demand for new items, which preserves natural resources. Cars, clothes, exercise equipment, furniture, and books are all examples of items that can be bought and used second-hand. If you have items that you do not want, instead of throwing them out, you could donate them to a charity shop. You could also donate or sell them through buy and sell websites or social media groups.`
    }
};

// Display the resource section in HTML.
const displayResources = () => {
    const resourcesList = document.getElementById('resources-list');
    Object.keys(resources).forEach(key => {
        const resource = resources[key];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3>${resource.title}</h3>
            <ul>${resource.content.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}</ul>
        `;
        resourcesList.appendChild(listItem);
    });
};

// Event listener for displaying resources.
document.addEventListener('DOMContentLoaded', () => {
    displayResources();
});

// Feedback section.
const feedbackList = document.getElementById('feedback-list');
const feedbackForm = document.getElementById('feedback-form');
const feedback = [];

// Function to display feedback.
const displayFeedback = () => {
    feedbackList.innerHTML = ''; // Clear existing list.
    feedback.forEach(feedbackItem => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${feedbackItem.name}</strong>: ${feedbackItem.message}
        `;
        feedbackList.appendChild(listItem);
    });
};

// Add event listener for the feedback form submission.
feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    feedback.push({ name, message });
    displayFeedback();
    feedbackForm.reset();
    alert('Thank you for your feedback. We will be sure to get back to you as soon as possible. Garb-Got got you!');
});

document.addEventListener('DOMContentLoaded', () => {
    displayFeedback();
});

// Initializing variables for the waste form.
const form = document.getElementById('waste-type-search-form');
const input = document.getElementById('waste-type');
const searchResults = document.getElementById('search-results');

// Adding an event listener for the search form.
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const searchTerm = input.value.trim();
    if (searchTerm) {
        fetch(`https://data.epa.ie/epr/api/v1/wastesearchoptions?q=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    } else {
        searchResults.innerHTML = '<li>Please enter a search term.</li>';
    }
});

// Function to display search results.
const displaySearchResults = (data) => {
    searchResults.innerHTML = ''; // Clear previous search results

    if (data && data.listOfWasteTypes && data.listOfWasteTypes.list.length > 0) {
        data.listOfWasteTypes.list.forEach(item => {
            const li = document.createElement('li');
            const wasteType = item.waste_type.toLowerCase();
            const classification = wasteType.includes('poison') ? 'Hazardous' : 'Non-Hazardous';
            li.innerHTML = `
                <strong>${item.waste_type_id}</strong>: ${item.waste_type} - ${classification}
            `;
            searchResults.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        searchResults.appendChild(li);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    displayFeedback();
});



// Fetch and display awards and performance data.
const fetchAwardsAndPerformance = () => {
    fetch('https://data.epa.ie/epr/api/v1/reportdata/search?year=2017')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the response to check the structure
            displayAwardsAndPerformance(data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
};

// Function to display awards and performance.
const displayAwardsAndPerformance = (data) => {
    const performanceResults = document.getElementById('performance-results');
    performanceResults.innerHTML = ''; // Clear previous results
    if (data && data.results && data.results.length > 0) {
        data.results.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>Facility:</strong> ${item.facilityName} <br>
                <strong>Award:</strong> ${item.award} <br>
                <strong>Performance:</strong> ${item.performance} <br>
                <strong>Year:</strong> ${item.year} <br>
                <strong>Exportable:</strong> ${item.exportable ? 'Yes' : 'No'}
            `;
            performanceResults.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        performanceResults.appendChild(li);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    fetchAwardsAndPerformance();
});

