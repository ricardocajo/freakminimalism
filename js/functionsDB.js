function initialize_sizes() {
  let sizes_DOM = document.getElementById("sizes_list");
  fetch("https://ricardocajo.github.io/freakminimalism/db/sizes/sizes.json")
    .then(response => response.json())
    .then(data => {
      sizes_DOM.innerText = JSON.stringify(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}