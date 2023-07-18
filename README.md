This is the website for the brand freakMinimalism

The website link: https://freak-minimalism.com


Mudar:

  entre preceraio e roupas por a ultima publicacao de instagram /3 publicacoes
  fazer seccao das roupas

<<<<<<< HEaaaaAD


  codigo para por ultima publicacao no instagram acho eu hahaha
  
<!DOCTYPE html>
<html>
<head>
  <title>Meu Site no GitHub</title>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body>
  <h1>Bem-vindos ao meu site no GitHub!</h1>

  <h2>Minha Última Publicação no Instagram</h2>
  <div id="instagram-post"></div>

  <script>
    // Função para obter a última publicação do Instagram
    function getLatestInstagramPost() {
      // Insira o seu nome de usuário do Instagram abaixo
      var username = 'seu_nome_de_usuario';
      // Insira o seu token de acesso à API do Instagram abaixo
      var accessToken = 'seu_token_de_acesso';

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
  </script>
</body>
</html>
=======
  mudar link redirecionado de http para https
  mudar o tipo de letra dos menus / sobre nós? Para ficar igual ao DESDE e PORTFOLIO ?
>>>>>>> c99194d5ec134f69aa1536d8d1da8d4daeb6c8df
