//initialize_sizes();
initialize_prices();
initialize_works();
initialize_designs();
initialize_clothingItems();

const listElementTypes = document.getElementById("clothing-type");
listElementTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    const selectedValue = event.target.textContent;
    handleClothingTypeSelected(selectedValue);
  }
});

const listElementSubTypes = document.getElementById("clothing-subtype");
listElementSubTypes.addEventListener("click", function(event) {
  if (event.target && event.target.nodeName === "LI") {
    const selectedValue = event.target.textContent;
    handleClothingSubTypeSelected(selectedValue);
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

document.getElementById('nextBtnWorks').addEventListener('click', function () {

  if(works_show_index[2] + 3 <= works_list_size) {

    $('#works_list li').addClass('hidden'); // Oculta todos os itens

    // Atualiza os índices
    works_show_index = works_show_index.map(function (index) {
      return index + 3;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    works_show_index.forEach(function (index) {
      $('#works_list li').eq(index).removeClass('hidden');
    });
  }
});

document.getElementById('prevBtnDesigns').addEventListener('click', function () {
  
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

document.getElementById('nextBtnDesigns').addEventListener('click', function () {

  if(designs_show_index[4] + 5 <= designs_list_size) {

    $('#designs_list li:not(:first)').addClass('hidden');


    // Atualiza os índices
    designs_show_index = designs_show_index.map(function (index) {
      return index + 5;
    });

    // Remove a classe 'hidden' dos itens com os índices atualizados
    designs_show_index.forEach(function (index) {
      $('#designs_list li').eq(index).removeClass('hidden');
    });
  }
});
