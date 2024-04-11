//creating a scheduler for the collection days.
//the data is stored in two arrays containing the day and time of the scheduled pick up.

const schedule ={
    madaraka:{
        days:['Monday', 'Thursday'],
        times:['8:00 AM', '5:00 PM'],
    },
    jamhuri:{
        days:['Tuesday', 'Friday'],
        times:['9:00 AM', '4:00 PM'],

    },

    nyayo:{
        days:['Wednesday', 'Saturday'],
    times:['7:00 AM', '6:00 PM'],
    },
};

//having created the schedule we now display it in the html.

const displaySchedule = () => {
    console.log('Displaying schedule');
    const scheduleElement = document.getElementById('schedule');
    Object.keys(schedule).forEach(estate => {
        const estateSchedule = schedule[estate];
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        scheduleItem.innerHTML = `
            <div>
                <h3>${estate} Estate</h3>
                <ul>
                    <li>Days: ${estateSchedule.days.join(', ')}</li>
                    <li>Times: ${estateSchedule.times.join(' and ')}</li>
                </ul>
            </div>
        `;
        scheduleElement.appendChild(scheduleItem);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    displaySchedule();
});

//we now continue to the feedback section.

const resources ={
    recycling:{
        title: 'Best Recycling Practices!',
        content:` What can i recycle?
        Letters

        Envelopes
        
        Brochures
        
        Cardboard boxes (flattened)
        
        Egg boxes
        
        Potato bags
        
        Cardboard centres from toilet roll and kitchen roll
        
        Newspapers
        
        'Tetra Pak' cartons for juice or milk
        
        Pizza boxes (if part of the box is soiled, seperate this and put it in your brown bin)
        
        Rigid plastic (washed and dried)
        
        Plastic drink bottles
        
        Plastic cleaning bottles
        
        Butter, yoghurt and salad tubs
        
        Plastic trays for fruit and vegetables
        
        Plastic milk containers
        
        Plastic bottles for liquid soap or shampoo
        
        Soft plastic (washed and dried)
        
        Frozen food bags
        
        Bread wrappers
        
        Plastic shopping bags
        
        Bubble wrap
        
        Crisp wrappers
        
        Pasta bags
        
        Outer wrapping on kitchen and toilet rolls
        
        Breakfast cereal bags `

    },
    reduceWaste:{
        title: 'Reducing Household Waste',
        content: `Tips and tricks for reducing waste in our homes.
       Recycling is the process of collecting waste and turning it into other materials or objects that can be reused. When we recycle, we use less raw materials than when producing a new product, which reduces air pollution and improves the environment. Recycling household waste can also reduce the amount you spend on waste collection, as many waste collectors have no restriction on the amount of waste you can put in your green and brown bins. But, there are generally thresholds for the amount you can put in your black bin, and excess charges apply if you go above this. You can also take your recyclable waste to a recycling facility to be recycled. Find out more about recycling in Ireland.
        
        The best way to reduce waste is not to produce it in the first place. So, reuse items whenever possible. For example, instead of buying plastic bottles of water, use a reusable bottle and refill it at home or at a free drinking water tap. If you’re going shopping, bring your own reusable shopping bags.
        
        Instead of buying new items, try and repair the ones you have. For example, you could repair your clothes, furniture, bike or appliances. Information on how to fix most things is available on the internet. Or, you can get a local professional to fix your items.
        
        Another option is upcycling. This is reusing items you no longer want, to make new products or materials of a higher value. It can be a fun and creative way of reducing waste and breathing new life into old items.
        
       Avoid single-use plastics

Single-use plastics (SUPs) are items that are used once, or for a short period of time, 
and then thrown away. 
For example, straws, cotton bud sticks and polystyrenefood containers.
You should avoid using SUPs 
as they take a long time to break down and 
can damage the environment, particularly oceans. 70% of marine litter in the world comes from SUPs.
        
Buy second hand
Buying second hand products will save you money.
 It also decreases the demand for new items, which preserves natural resources.
  Cars, clothes, exercise equipment, furniture and books are all examples of items that can be bought and used second hand.
If you have items that you do not want, instead of throwing them out, you could donate them to a charity shop. 
You could also donate or sell them through buy and sell websites or social media groups.
`
    }
};

//having populated the resource section we now display it.

const displayResources = () => {
    const resourcesList = document.getElementById('resources-list');
    Object.keys(resources).forEach(key => {
        const resource = resources[key];
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <h3><a href="${resource.link}" target="_blank">${resource.title}</a></h3>
            ${resource.content.split('\n').map(item => `<li>${item.trim()}</li>`).join('')}
           
        `;
        resourcesList.appendChild(listItem);
    });
};
//event listner for resources added.
document.addEventListener('DOMContentLoaded', () => {
    displayResources();
});

//feedback section.
//variable initialization.
const feedbackList = document.getElementById('feedback-list');
const feedbackForm = document.getElementById('feedback-form');
const feedback =[];

 //function to display.
 const displayFeedback = () => {
    feedbackList.innerHTML = ''; // Clear existing list.
    feedback.forEach(feedbackItem => {
        // Create a new list item for each feedback item.
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <strong>${feedbackItem.name}</strong>: ${feedbackItem.message}
        `;
        // Append the list item to the feedback list.
        feedbackList.appendChild(listItem);
    });
};



 //add event listner for the feedback form submission.

 feedbackForm.addEventListener('submit', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the values of the name and message fields from the form
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    // Add a new feedback item to the feedback array
    feedback.push({ name, message });
    // Call the displayFeedback function to update the displayed feedback
    displayFeedback();
    // Reset the form fields after submission
    feedbackForm.reset();
    // Show a prompt to the user
    alert(' Thank you for your feedback.We will be sure to get back to you as soon as possible. Garb-Got got you!');
});

 document.addEventListener('DOMContentLoaded', () =>{
    displayFeedback();

 });


    const wasteTypeForm = document.getElementById('waste-type-search-form');
const wasteTypeResult = document.getElementById('waste-type-result');

wasteTypeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const wasteId = document.getElementById('waste-id').value;
    fetch('https://your-api-endpoint.com/data')
        .then(response => response.json())
        .then(data => {
            const wasteType = data.listOfWasteTypes.list.find(item => item.waste_type_id === parseInt(wasteId));
            if (wasteType) {
                wasteTypeResult.textContent = `Waste ID: ${wasteType.waste_type_id}, Waste Type: ${wasteType.waste_type}`;
            } else {
                wasteTypeResult.textContent = 'Waste ID not found';
            }
        })
        .catch(error => {
            console.error('Error fetching API data:', error);
        });
});

//initializing variables for waste form.
const form = document.getElementById('waste-type-search-form');
const input = document.getElementById('waste-type');
const searchResults = document.getElementById('search-results');



//adding an event listener for the search form.

form.addEventListener('submit', function(event){
    event.preventDefault();
    const searchTerm = input.value;
    fetch(`https://data.epa.ie/epr/api/v1/wastesearchoptions?q=${searchTerm}`)
    .then(response.json())
    .then(data => {
        displaySearchResults(data);
    })
    .catch(error => {
        console.error('Error fetching data:',error);
    });
});
  //displaying the data.


  const displaySearchResults = (data) => {
    searchResults.innerHTML = ''; // Clear previous search results

    if (data && data.listOfWasteTypes && data.listOfWasteTypes.list.length > 0) {
        data.listOfWasteTypes.list.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.waste_type_id}: ${item.waste_type}`;
            searchResults.appendChild(li);
        });
    } else {
        const li = document.createElement('li');
        li.textContent = 'No results found';
        searchResults.appendChild(li);
    }
};
document.addEventListener('DOMContentLoaded', () =>{
    const feedbackList = document.getElementById('feedback-list');
    const feedbackForm = document.getElementById('feedback-form');
    const feedback = [];

    const displayFeedback = () =>{
        feedbackList.innerHTML ='';
        feedback.forEach(feedbackItem =>{
            const listItem = document.createElement('li');
            listItem.innerHTML =`<strong>${feedbackItem.name}</strong>: ${feedbackItem.message}`;
            feedbackList.appendChild(listItem);
        });

        //
    }
})