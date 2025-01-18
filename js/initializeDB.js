initialize_prices();
initialize_clothingItems();
initialize_colecoesItems();
initialize_destaquesItems();
initialize_3dItems();
initialize_artesItems();
initialize_designs();
initialize_patch();

// Add an event listener to the document or a parent element that exists on page load
document.addEventListener('change', function(event) {
  let encomendar_DOM = document.getElementById("encomendarButao");
  // Check if the change event originated from the uploadBtn
  if (event.target && event.target.id === 'upload-btn') {
    const file = event.target.files[0]; // Get the selected file
    let firstDesign_DOM = document.getElementById("firstDesign");
    if (currentSelectedDesign) {
      currentSelectedDesign.style.border = "none";
    } 
    const imageURL = URL.createObjectURL(file);
    currentSelectedDesignImgFile = file;
    currentSelectedDesignImg = file;
    firstDesign_DOM.src = imageURL;
    firstDesign_DOM.style.border = "6px solid #006666";
    currentSelectedDesign = firstDesign_DOM;
  }
  encomendar_DOM.style.display = "inline-block";
});

const listcarrinhoLista = document.getElementById("carrinhoLista");
listcarrinhoLista.addEventListener("click", function(event) {
  handleRemoveCarrinho(event.target);
});

const listTamanhos = document.getElementById("tamanhos");
listTamanhos.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    if (currentSelectedType === "KING" || currentSelectedType === "QUEEN" || currentSelectedType === "KID") {
      handleSizeSelected(event.target);
    } else {
      handleOtherSizeSelected(event.target);
    }
  }
});

const listDesigns = document.getElementById("designs_list");
listDesigns.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "IMG") {
    handleDesignSelected(event.target);
  }
});

const listDesignsChapeus = document.getElementById("designs_list_chapeus");
listDesignsChapeus.addEventListener("click", function(event) {
  if (event.target && (event.target.nodeName === "IMG" || event.target.nodeName === "LABEL")) {
    handleDesignChapeusSelected(event.target);
  }
});

const listDesignsToalha = document.getElementById("designs_list_toalha");
listDesignsToalha.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "IMG") {
    handleDesignToalhaSelected(event.target);
  }
});

const listPatch = document.getElementById("patch_list");
listPatch.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "IMG") {
    handlePatchSelected(event.target);
  }
});

const listElementTypes = document.getElementById("clothing-type");
listElementTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handleClothingTypeSelected(event.target);
  }
});

const arteElementTypes = document.getElementById("artes-type");
arteElementTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handleArteTypeSelected(event.target);
  }
});

const listColecoesTypes = document.getElementById("colecoes-type");
listColecoesTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handleColecoesTypeSelected(event.target);
  }
});

const list3dTypes = document.getElementById("3d-type");
list3dTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    handle3dTypeSelected(event.target);
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

var intervalId;

// Function to stop rotation for designs
function stopDesignRotation() {
  clearInterval(intervalId);
}

// Function to start rotation for designs
function startDesignRotation() {
  intervalId = setInterval(simulateButtonClick, 5000);
}


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

  if(merch_show_index[3] - 4 >= 0) {
    $('#merch_list li').addClass('hidden'); // Oculta todos os itens
  
    // Atualiza os índices
    merch_show_index = merch_show_index.map(function (index) {
      return index - 4;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    merch_show_index.forEach(function (index) {
      $('#merch_list li').eq(index).removeClass('hidden');
    });
  }
});

var merch_show_index = [0, 1, 2, 3]; // Initialize to show the first 4 items
var merch_list_size = 3; // Total number of items in the merch list
var merch_index = 0;

function updateMerch() {
  if (merch_show_index[3] + 4 <= merch_list_size) { // Check if there are enough items to show the next 4
    $('#merch_list li').addClass('hidden'); // Hide all items

    // Update the indices to show the next set of 4 items
    merch_show_index = merch_show_index.map(function (index) {
      return index + 4; // Move to the next set of 4
    });

    // Show the items corresponding to the updated indices
    merch_show_index.forEach(function (index) {
      $('#merch_list li').eq(index).removeClass('hidden');
    });
  } else {
    $('#merch_list li').addClass('hidden'); // Hide all items

    // Reset to the first 4 items
    merch_show_index = [0, 1, 2, 3];

    // Show the first 4 items
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


document.getElementById('prevBtnPatch').addEventListener('click', function () {
  
  // Reset the timer by clearing the existing interval and setting a new one
  clearInterval(intervalPatchId);
  intervalPatchId = setInterval(simulatePatchButtonClick, 5000);

  if(patch_show_index[4] - 5 >= 5) {
    
    $('#patch_list li:not(:first)').addClass('hidden');
  
    // Atualiza os índices
    patch_show_index = patch_show_index.map(function (index) {
      return index - 5;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    patch_show_index.forEach(function (index) {
      $('#patch_list li').eq(index).removeClass('hidden');
    });
  }
});

// Function to update designs based on the button click
function updatePatch() {
  if (patch_show_index[4] + 5 <= patch_list_size) {
    $('#patch_list li:not(:first)').addClass('hidden');

    // Atualiza os índices
    patch_show_index = patch_show_index.map(function (index) {
      return index + 5;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    patch_show_index.forEach(function (index) {
      $('#patch_list li').eq(index).removeClass('hidden');
    });
  } else {
    $('#patch_list li:not(:first)').addClass('hidden');

    patch_show_index = [1, 2, 3, 4, 5];

    // Remove a classe 'hidden' dos itens com os índices atualizados
    patch_show_index.forEach(function (index) {
      $('#patch_list li').eq(index).removeClass('hidden');
    });
  }
}

// Function to simulate button click every 5 seconds
function simulatePatchButtonClick() {
  updatePatch();
}

var intervalPatchId;

// Function to stop rotation for Patch
function stopPatchRotation() {
  clearInterval(intervalPatchId);
}

// Function to start rotation for Patch
function startPatchRotation() {
  intervalPatchId = setInterval(simulatePatchButtonClick, 5000);
}


// Event listener for the button click
document.getElementById('nextBtnPatch').addEventListener('click', function () {
  // Reset the timer by clearing the existing interval and setting a new one
  clearInterval(intervalPatchId);
  intervalPatchId = setInterval(simulatePatchButtonClick, 5000);

  // Call the updateDesigns function to perform the button click logic
  updatePatch();
});