// var working = false;
// $('.login').on('submit', function(e) 
// {
//   e.preventDefault();
//   if (working) return;
//   working = true;
//   var $this = $(this),
//     $state = $this.find('button > .state');
//   $this.addClass('loading');
//   $state.html('Registrando');
//   setTimeout(function() {
//     $this.addClass('ok');
//     $state.html('Bienvenido');
//     setTimeout(function() 
//     {
//       $state.html('Log in');
//       $this.removeClass('ok loading');
//       working = false;
//     }, 400);
//   }, 3000);
// });