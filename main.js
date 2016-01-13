'use strict';
$( document ).ready(init);

function init() {
    $('#addtransgroup').submit(addNewTrans);
    $('table').on('click', '#delete', removeRow);
    $("table").on('click', '#earntoggle', onlyEarnings);
    $("table").on('click', '#spendtoggle', onlySpending);
}

  var newBalance = 0;
  var $removedEarn = {};
  var $removedSpend = {};



function addNewTrans(formdata) {

  formdata.preventDefault();
  var newTransDollarAmnt = $('#amount').val();
  var currencyAmnt = ('$' + parseFloat(newTransDollarAmnt, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
  var newTransSpend = $('#spend').is(':checked');
  var newTransDesc = $('#description').val();
  var newTransEarn = $('#earn').is(':checked');
  var newTransDate = moment().format("MMM Do YY");
  $('#addtransgroup').trigger("reset");


  var $newRow = $('#template').clone().removeAttr('id')

  $newRow.children('.date').text(newTransDate);
  $newRow.children('.description').text(newTransDesc);
    if (newTransSpend) {
      $newRow.children('.spend').text('-'+currencyAmnt).addClass('danger');
      updateBalance(currencyAmnt, "neg");
      $newRow.attr('data', 'neg');
    }
    else {
      $newRow.children('.earn').text('+'+currencyAmnt).addClass('success');
      updateBalance(currencyAmnt, "pos");
      $newRow.attr('data', 'pos');
    }
  $('#transhist').append($newRow);
  $('#delete').on('click', removeRow);
  // updateBalance();

}


function removeRow(){
  $(this).closest('tr').remove();
}

function onlyEarnings(){
  if ($('tr[data="neg"]').length > 0){
    $removedSpend = $('tr[data="neg"]').detach();
}
  else {
    $('#transhist').append($removedSpend);
  }

}

function onlySpending(){
  $removedEarn = $('tr[data="pos"]').detach();
}



function updateBalance(amount, toggle){
  if (toggle === "pos"){
    newBalance += parseInt(amount.substr(1));
  }
  else {
    newBalance -= parseInt(amount.substr(1));
  }
  $('.panel1 h2').text('Current Balance: '+('$' + parseFloat(newBalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()));
;
}
