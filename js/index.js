$(function(){
  // registra cuando el modal se termino de abrir
  // 'On' se utiliza siempre dentro de jquery para subscribir evento.
  $('#contacto').on('shown.bs.modal', function(e){
    console.log('El modal se abrió!');
  });
  
  $('#contacto').on('show.bs.modal', function(e){
    console.log('el modal se está abriendo');
    // le saco un class al boton
    $('#contactoBtn').removeClass('btn-outline-success');
    // le agrego un class al boton
    $('#contactoBtn').addClass('btn-primary');
    // Le agrego una propiedad de css, en este caso el disabled del boton.
    $('#contactoBtn').prop('disabled',true);

  });

  $('#contacto').on('hide.bs.modal', function(e){
    console.log('El modal se está ocultando');
  });

  $('#contacto').on('hidden.bs.modal', function(e){
    console.log('El modal se ocultó!');
    // le saco un class al boton
    $('#contactoBtn').removeClass('btn-primary');
    // le agrego un class al boton
    $('#contactoBtn').addClass('btn-outline-success');
    // Le agrego una propiedad de css, en este caso el disabled del boton.
    $('#contactoBtn').prop('disabled',false);
  });

  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();
  $('.carousel').carousel({
    interval: 2200  /*2.2 segundos*/
  });
});