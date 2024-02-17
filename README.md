This is the website for the brand freakMinimalism

The website link: https://freak-minimalism.com







Por fazer:

------------------------------------------

- carrinho


while(color_DOM.firstChild){
          color_DOM.removeChild(color_DOM.firstChild);
        }
        firstType.colors.forEach(color => {
          
          // Create the div element with class "color-item"
          const colorItemDiv = document.createElement("div");
          colorItemDiv.className = "color-item";

          // Create the button element with class "color-button"
          const colorButton = document.createElement("button");
          colorButton.className = "color-button";

          // Create the img element and set its src and alt attributes
          const img = document.createElement("img");
          img.src = `${ABSOLUTE_PATH}/db/colors/${color}.png`;
          img.alt = color;

          // Append the img element to the button element
          colorButton.appendChild(img);
          // Append the button element to the div element
          colorItemDiv.appendChild(colorButton);
          
          color_DOM.appendChild(colorItemDiv);
        });

        // Add the event listener to the parent element (event delegation)
        document.getElementById("color-list").addEventListener("click", function(event) {
          const button = event.target.closest(".color-button");
          if (button) {
            const image = button.querySelector("img");
            const altValue = image.getAttribute("alt");
            handleClothingColorSelected(altValue);
          }
        });