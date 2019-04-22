$('#removeVehicleBtn').click(function(){
  if ($('.vehicle.selected').length > 0){
    var licensePlate = $('.vehicle.selected').find('#licensePlate').text();

    // Send remove vehicle request
    console.log(licensePlate);

    $.getJSON('removevehicle?licensePlate=' + licensePlate, function(data){
      console.log(data);
      $('.vehicle.selected').remove();
    });
  }
  else {
    alert("Please select a vehicle!");
  }
});

$('#removeSpaceButton').click(function(){
  if ($('.pSpace.selected').length > 0){
    var id = $('.pSpace.selected').find('#id').text();

    // Send remove space request
    console.log(id);

    $.getJSON('removespace?id=' + id, function(data){
      console.log(data);
      $('.pSpace.selected').remove();
    });
  }
  else {
    alert("Please select a parking space!");
  }
});

$('tbody tr').click(function(){
  $(this).addClass('selected').siblings().removeClass('selected');
});
