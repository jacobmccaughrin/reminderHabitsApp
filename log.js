let foods; // Variable to store the loaded JSON data
var loggedFood = localStorage.setItem('foodLogged',false);

function checkOtherOption() {
    const exerciseTypeDropdown = document.getElementById("exerciseType");
    const otherInput = document.getElementById("otherExerciseType");

    // if other is selected, show input field; otherwise, hide it
    otherInput.style.display = (exerciseTypeDropdown.value === "other") ? 'block' : 'none';
}

async function logEntry() {
    const selectedFoods = {};
    const mealInputs = document.querySelectorAll("[id$='InputsContainer'] input");
    mealInputs.forEach(input => {
        const mealName = input.name.replace('[]', '');
        if (!selectedFoods[mealName]) {
            selectedFoods[mealName] = [];
        }
        selectedFoods[mealName].push(input.value);
    });

    const exerciseType = document.getElementById("exerciseType").value;
    const otherExerciseType = document.getElementById("otherExerciseType").value;
    loggedFood = localStorage.setItem('foodLogged',true);

    if (!foods) {
        // Load the foods data if not already loaded
        await loadFoodData();
    }

    const totalCalories = Object.values(selectedFoods).flat().reduce((calories, food) => {
        const foodCalories = foods.foods[food] || 0;
        
        return calories + foodCalories;
    }, 0);

    const logOutput = document.getElementById("logOutput");
    logOutput.innerHTML = '';
    for (const mealName in selectedFoods) {
        logOutput.innerHTML += `<p><strong>${mealName.charAt(0).toUpperCase() + mealName.slice(1)}:</strong> ${selectedFoods[mealName].join(', ')}</p>`;
    }
    logOutput.innerHTML += `<p><strong>Total Calories:</strong> ${totalCalories}</p>`;
    logOutput.innerHTML += `<p><strong>Exercise Type:</strong> ${exerciseType === 'other' ? otherExerciseType : exerciseType}</p>`;

    document.getElementById("healthForm").reset();
    document.getElementById("otherExerciseType").style.display = 'none';
}

async function loadFoodData() {
    try {
        const response = await fetch('food.json'); // Assuming your JSON file is named food.json
        foods = await response.json();
    } catch (error) {
        console.error('Error loading food data:', error);
    }
}

async function loadFoodSuggestions() {
    try {
        if (!foods) {
            // Load the foods data if not already loaded
            await loadFoodData();
        }

        const mealInputs = document.querySelectorAll("[id$='InputsContainer'] input");
        mealInputs.forEach(input => {
            const datalist = input.nextElementSibling;
            datalist.innerHTML = '';
            // populate the datalist with food suggestions
            for (const food in foods.foods) {
                const option = document.createElement('option');
                option.value = food;
                datalist.appendChild(option);
            }
        });
    } catch (error) {
        console.error('Error loading food suggestions:', error);
    }
}

// load food suggestions when the page loads
window.onload = loadFoodSuggestions;
