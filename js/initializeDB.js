//initialize_sizes();
initialize_prices();
initialize_works();
initialize_designs();
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

// Add an event listener to all the buttons with class "color-button" inside the element with the id "color-list"
document.querySelectorAll("#color-list .color-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Get the image element that is the child of the clicked button
    const image = button.querySelector("img");
    // Retrieve the alt attribute value from the image
    const altValue = image.getAttribute("alt");

    console.log("aaa");
    handleClothingColorSelected(altValue);
  });
});

  