initialize_prices();
initialize_clothingItems();
initialize_designs();
initialize_works();

const listElementTypes = document.getElementById("clothing-type");
listElementTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handleClothingTypeSelected(event.target);
  }
});

const listElementSubTypes = document.getElementById("clothing-subtype");
listElementSubTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handleClothingSubTypeSelected(event.target);
  }
});

// Add an event listener to all the buttons with class "color-button" inside the element with the id "color-list"
document.querySelectorAll("#color-list .color-button").forEach((button) => {
  button.addEventListener("click", () => {
    // Get the image element that is the child of the clicked button
    const image = button.querySelector("img");
    // Retrieve the alt attribute value from the image
    const altValue = image.getAttribute("alt");

    handleClothingColorSelected(altValue);
  });
});

document.getElementById('prevBtnWorks').addEventListener('click', function () {
  
  // Reset the timer for works by clearing the existing interval and setting a new one
  clearInterval(worksIntervalId);
  worksIntervalId = setInterval(simulateWorksButtonClick, 5000);

  if(works_show_index[2] - 3 >= 2) {
    $('#works_list li').addClass('hidden'); // Oculta todos os itens
  
    // Atualiza os índices
    works_show_index = works_show_index.map(function (index) {
      return index - 3;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    works_show_index.forEach(function (index) {
      $('#works_list li').eq(index).removeClass('hidden');
    });
  }
});

// Function to update works based on the button click
function updateWorks() {
  if (works_show_index[2] + 3 <= works_list_size) {
    $('#works_list li').addClass('hidden'); // Oculta todos os itens

    // Atualiza os índices
    works_show_index = works_show_index.map(function (index) {
      return index + 3;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    works_show_index.forEach(function (index) {
      $('#works_list li').eq(index).removeClass('hidden');
    });
  } else {
    $('#works_list li').addClass('hidden'); // Oculta todos os itens

    works_show_index = [0, 1, 2];

    // Remove a classe 'hidden' dos itens com os índices atualizados
    works_show_index.forEach(function (index) {
      $('#works_list li').eq(index).removeClass('hidden');
    });
  }
}

// Function to simulate button click every 5 seconds for works
function simulateWorksButtonClick() {
  updateWorks();
}

// Set initial interval for works
let worksIntervalId = setInterval(simulateWorksButtonClick, 5000);

// Event listener for the "Próximo" button associated with works
document.getElementById('nextBtnWorks').addEventListener('click', function () {
  // Reset the timer for works by clearing the existing interval and setting a new one
  clearInterval(worksIntervalId);
  worksIntervalId = setInterval(simulateWorksButtonClick, 5000);

  // Call the updateWorks function to perform the button click logic
  updateWorks();
});


document.getElementById('prevBtnDesigns').addEventListener('click', function () {
  
  // Reset the timer by clearing the existing interval and setting a new one
  clearInterval(intervalId);
  intervalId = setInterval(simulateButtonClick, 5000);

  if(designs_show_index[4] - 5 >= 5) {
    
    $('#designs_list li:not(:first)').addClass('hidden');
  
    // Atualiza os índices
    designs_show_index = designs_show_index.map(function (index) {
      return index - 5;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    designs_show_index.forEach(function (index) {
      $('#designs_list li').eq(index).removeClass('hidden');
    });
  }
});

// Function to update designs based on the button click
function updateDesigns() {
  if (designs_show_index[4] + 5 <= designs_list_size) {
    $('#designs_list li:not(:first)').addClass('hidden');

    // Atualiza os índices
    designs_show_index = designs_show_index.map(function (index) {
      return index + 5;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    designs_show_index.forEach(function (index) {
      $('#designs_list li').eq(index).removeClass('hidden');
    });
  } else {
    $('#designs_list li:not(:first)').addClass('hidden');

    designs_show_index = [1, 2, 3, 4, 5];

    // Remove a classe 'hidden' dos itens com os índices atualizados
    designs_show_index.forEach(function (index) {
      $('#designs_list li').eq(index).removeClass('hidden');
    });
  }
}

// Function to simulate button click every 5 seconds
function simulateButtonClick() {
  updateDesigns();
}

// Set initial interval
let intervalId = setInterval(simulateButtonClick, 5000);

// Event listener for the button click
document.getElementById('nextBtnDesigns').addEventListener('click', function () {
  // Reset the timer by clearing the existing interval and setting a new one
  clearInterval(intervalId);
  intervalId = setInterval(simulateButtonClick, 5000);

  // Call the updateDesigns function to perform the button click logic
  updateDesigns();
});


document.getElementById('prevBtnMerch').addEventListener('click', function () {
  
  // Reset the timer for works by clearing the existing interval and setting a new one
  clearInterval(merchIntervalId);
  merchIntervalId = setInterval(simulateMerchButtonClick, 5000);

  if(merch_show_index[2] - 3 >= 2) {
    $('#merch_list li').addClass('hidden'); // Oculta todos os itens
  
    // Atualiza os índices
    merch_show_index = merch_show_index.map(function (index) {
      return index - 3;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    merch_show_index.forEach(function (index) {
      $('#merch_list li').eq(index).removeClass('hidden');
    });
  }
});

var merch_show_index = [0, 1, 2];
var merch_list_size = 6;
var merch_index = 0;
// Function to update works based on the button click
function updateMerch() {
  if (merch_show_index[2] + 3 <= merch_list_size) {
    $('#merch_list li').addClass('hidden'); // Oculta todos os itens

    // Atualiza os índices
    merch_show_index = merch_show_index.map(function (index) {
      return index + 3;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    merch_show_index.forEach(function (index) {
      $('#merch_list li').eq(index).removeClass('hidden');
    });
  } else {
    $('#merch_list li').addClass('hidden'); // Oculta todos os itens

    merch_show_index = [0, 1, 2];

    // Remove a classe 'hidden' dos itens com os índices atualizados
    merch_show_index.forEach(function (index) {
      $('#merch_list li').eq(index).removeClass('hidden');
    });
  }
}

// Function to simulate button click every 5 seconds for works
function simulateMerchButtonClick() {
  updateMerch();
}

// Set initial interval for works
let merchIntervalId = setInterval(simulateMerchButtonClick, 5000);

// Event listener for the "Próximo" button associated with works
document.getElementById('nextBtnMerch').addEventListener('click', function () {
  // Reset the timer for works by clearing the existing interval and setting a new one
  clearInterval(merchIntervalId);
  merchIntervalId = setInterval(simulateMerchButtonClick, 5000);

  // Call the updateWorks function to perform the button click logic
  updateMerch();
});
