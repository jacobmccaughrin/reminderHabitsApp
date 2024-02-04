let foods; // Variable to store the loaded JSON data

function checkOtherOption() {
    const exerciseTypeDropdown = document.getElementById("exerciseType");
    const otherInput = document.getElementById("otherExerciseType");

    // if other is selected, show input field; otherwise, hide it
    otherInput.style.display = (exerciseTypeDropdown.value === "other") ? 'block' : 'none';
}

async function logEntry() {
    const breakfast = document.getElementById("breakfast").value;
    const lunch = document.getElementById("lunch").value;
    const dinner = document.getElementById("dinner").value;
    const exerciseType = document.getElementById("exerciseType").value;
    const otherExerciseType = document.getElementById("otherExerciseType").value;

    // Define selectedFoods after the individual meals are obtained
    const selectedFoods = [breakfast, lunch, dinner];

    // if other is selected, then use value from input
    const selectedExerciseType = (exerciseType === 'other') ? otherExerciseType : exerciseType;

    if (!foods) {
        // Load the foods data if not already loaded
        await loadFoodData();
    }

    const totalCalories = selectedFoods.reduce((calories, food) => {
        const foodCalories = foods.foods[food] || 0;
        return calories + foodCalories;
    }, 0);

    const logOutput = document.getElementById("logOutput");
    logOutput.innerHTML += `<p><strong>Breakfast:</strong> ${breakfast}</p>`;
    logOutput.innerHTML += `<p><strong>Lunch:</strong> ${lunch}</p>`;
    logOutput.innerHTML += `<p><strong>Dinner:</strong> ${dinner}</p>`;
    logOutput.innerHTML += `<p><strong>Total Calories:</strong> ${totalCalories}</p>`;
    logOutput.innerHTML += `<p><strong>Exercise Type:</strong> ${selectedExerciseType}</p>`;

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

        const datalist = document.getElementById('foodSuggestions');

        // clear existing options
        datalist.innerHTML = '';

        // populate the datalist with food suggestions
        for (const food in foods.foods) {
            const option = document.createElement('option');
            option.value = food;
            datalist.appendChild(option);
        }
    } catch (error) {
        console.error('Error loading food suggestions:', error);
    }
}

// load food suggestions when the page loads
window.onload = loadFoodSuggestions;