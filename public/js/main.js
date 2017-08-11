$(document).ready(function() {
    $(".button-collapse").sideNav();
     $(".carousel.carousel-slider").carousel({noWrap:false, indicators:true});
    $(".scrollspy").scrollSpy();
    $(".slider").slider({indicators: false,height:500});
  $('#textareactact').trigger('autoresize');
  $('#textarea-body').trigger('autoresize');
  $('select').material_select();

  // $(function(){
  //   if($("#front-car-fests:onScreen")){
  //     $("#front-car-a").attr("href", "www.google.com");
  //   } else if($("#front-car-event:onScreen")){
  //         $("#front-car-a").attr("href", "www.facebook.com");
  //       } else if($("#front-car-seminars:onScreen")){
  //             $("#front-car-a").attr("href", "www.live.com");
  //           } else ($("#front-car-idgs:onScreen")){
  //                 $("#front-car-a").attr("href", "www.github.com");
  //               }
  // });

  //
  // if($('#front-car-fests').visible(true)) {
  //   $("#front-car-a").attr("href", "/fests");
  // } else if($('#front-car-events').visible(true)) {
  //   $("#front-car-a").attr("href", "/events");
  // } else if($('#front-car-seminars').visible(true)) {
  //   $("#front-car-a").attr("href", "/seminars");
  // } else($('#front-car-idgs').visible(true)) {
  //   $("#front-car-a").attr("href", "/idgs");
  // }
});
