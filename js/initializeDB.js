//initialize_sizes();
initialize_prices();
initialize_works();
initialize_clothingItems();

const selectElementType = document.getElementById("clothing-type");
// Attach the onchange event handler
selectElementType.onchange = function() {
    // Get the selected value
    const selectedValue = selectElementType.value;
    // Call the function with the selected value
    handleClothingTypeSelected(selectedValue);
};

const selectElementSubType = document.getElementById("clothing-subtype");
// Attach the onchange event handler
selectElementSubType.onchange = function() {
    // Get the selected value
    const selectedValue = selectElementSubType.value;
    // Call the function with the selected value
    handleClothingSubTypeSelected(selectedValue);
};

const selectElementColor = document.getElementById("clothing-color");
// Attach the onchange event handler
selectElementColor.onchange = function() {
    // Get the selected value
    const selectedValue = selectElementColor.value;
    // Call the function with the selected value
    handleClothingSubTypeSelected(selectedValue);
};