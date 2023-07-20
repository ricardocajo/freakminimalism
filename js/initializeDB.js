//initialize_sizes();
initialize_prices();
initialize_works();
initialize_clothingItems();

const selectElement = document.getElementById("clothing-type");
// Attach the onchange event handler
selectElement.onchange = function() {
    // Get the selected value
    const selectedValue = selectElement.value;
    // Call the function with the selected value
    handleClothingTypeSelected(selectedValue);
};