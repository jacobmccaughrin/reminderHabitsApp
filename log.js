function checkOtherOption(){
    const exerciseTypeDropdown = document.getElementById("exerciseType");
    const otherInput = document.getElementById("otherExerciseType");

    // if other is selected, show input field; otherwise, hide it
    otherInput.style.display = (exerciseTypeDropdown.value === "other") ? 'block' : 'none';
}

function logEntry(){
    const caloriesBurned = document.getElementById("caloriesBurned").value;
    const foodConsumed = document.getElementById("foodConsumed").value;
    const exerciseType = document.getElementById("exerciseType").value;
    const otherExerciseType = document.getElementById("otherExerciseType").value;

    // if other is selected, then use value from input
    const selectedExerciseType = (exerciseType === 'other') ? otherExerciseType : exerciseType;

    const logOutput = document.getElementById("logOutput");
    logOutput.innerHTML += `<p><strong>Calories Burned:</strong> ${caloriesBurned}</p>`;
    logOutput.innerHTML += `<p><strong>Food Consumed:</strong> ${foodConsumed}</p>`;
    logOutput.innerHTML += `<p><strong>Exercise Type:</strong> ${selectedExerciseType}</p>`;

    document.getElementById("healthForm").reset();
    document.getElementById("otherExerciseType").style.display = 'none';
}