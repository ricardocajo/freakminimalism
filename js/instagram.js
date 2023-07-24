// Função para obter a última publicação do Instagram
function getLatestInstagramPost() {
    // Insira o seu nome de usuário do Instagram abaixo
    var username = 'freakminimalism';
    // Insira o seu token de acesso à API do Instagram abaixo
    var accessToken = 'IGQVJXMUFYclFiMlVwY1lES0ozOGptLW1aWDJwWEFjTk1tamFtVzMzbmJqcWtPVlVSa2N0cWJWelVnZAlp6aENTaXdBYXRzTk4yNVZAYaFA0TTBsN1M3NE9reEhPLVdrUlpVV1pIT0s1QlJ0V0JzdG5mRwZDZD';

    // Faz a requisição para a API do Instagram
    $.ajax({
      url: 'https://api.instagram.com/v1/users/self/media/recent/?access_token=' + accessToken,
      dataType: 'jsonp',
      type: 'GET',
      data: { count: 1 },
      success: function(response) {
        var post = response.data[0];
        var imageUrl = post.images.standard_resolution.url;
        var caption = post.caption.text;

        // Cria o elemento de imagem
        var imageElement = $('<img>').attr('src', imageUrl);

        // Cria o elemento de legenda
        var captionElement = $('<p>').text(caption);

        // Adiciona a imagem e a legenda ao elemento de div no HTML
        $('#instagram-post').append(imageElement, captionElement);
      },
      error: function() {
        console.log('Erro ao carregar a última publicação do Instagram.');
      }
    });
  }

  // Chama a função para obter a última publicação do Instagram ao carregar a página
  $(document).ready(function() {
    getLatestInstagramPost();
  });