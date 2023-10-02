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

    console.log("aaa");
    handleClothingColorSelected(altValue);
  });
});
  
$(document).ready(function () {
  // Lista de imagens
  var images = []; // Adicione as suas imagens aqui
  fetch(ABSOLUTE_PATH + "/db/works/works.json")
    .then(response => response.json())
    .then(data => {
      Object.keys(data).forEach(key => {
        if (data[key]) {
          images.push(key);
        }
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Preencher a lista de imagens
  var worksList = $("#works_list");
  for (var i = 0; i < images.length; i++) {
    worksList.append('<li data-target="#carouselExampleIndicators" data-slide-to="' + i + '"></li>');
  }

  // Preencher o conteúdo do carrossel
  var carouselInner = $("#carouselInner");
  for (var i = 0; i < images.length; i++) {
    carouselInner.append('<div class="carousel-item"><img src="' + images[i] + '" class="d-block w-100" alt="Imagem ' + (i + 1) + '"></div>');
  }

  // Ativar o primeiro item do carrossel
  $(".carousel-item").first().addClass("active");

  // Adicionar eventos de clique para avançar e retroceder
  $("#prevBtn").click(function () {
    $("#carouselExampleIndicators").carousel("prev");
  });

  $("#nextBtn").click(function () {
    $("#carouselExampleIndicators").carousel("next");
  });
});