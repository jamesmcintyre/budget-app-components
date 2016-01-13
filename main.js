'use strict';
$( document ).ready(init);

function init() {
    $('#addtransgroup').submit(addNewTrans);
    $('table').on('click','#delete', removeRow);
    $("#earntoggle").on('click', onlyEarnings);
    $("#spendtoggle").on('click', onlySpending);
}

  var newBalance = 0;
  var toggleEarn = true;
  var toggleSpend = true;



function addNewTrans(formdata) {

  formdata.preventDefault();
  var newTransDollarAmnt = $('#amount').val();
  var currencyAmnt = ('$' + parseFloat(newTransDollarAmnt, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
  var newTransSpend = $('#spend').is(':checked');
  var newTransDesc = $('#description').val();
  var newTransEarn = $('#earn').is(':checked');
  var newTransDate = moment().format("MMM Do, YYYY");
  $('#addtransgroup').trigger("reset");


  if (newTransDollarAmnt.match(/[^$,.\d]/)) {
    console.log('invalid');
    return alert('You gave an invalid Dollar amount!');
  }

  var $newRow = $('#template').clone().removeAttr('id')

  $newRow.children('.date').text(newTransDate);
  $newRow.children('.description').text(newTransDesc);
    if (newTransSpend) {
      var negAmnt = ('-'+currencyAmnt);
      $newRow.children('.spend').text(negAmnt).addClass('danger');
      updateBalance(negAmnt, "neg");
      $newRow.attr('data', 'neg');
    }
    else {
      var posAmnt = ('+'+currencyAmnt);
      console.log(posAmnt);
      $newRow.children('.earn').text(posAmnt).addClass('success');
      updateBalance(posAmnt, "pos");
      $newRow.attr('data', 'pos');
    }
  $('#transhist').append($newRow);
  $('#delete').on('click', removeRow);

}


function removeRow(){
  var removeSpendVal = $(this).closest('tr').find('.spend').text();
  var removeEarnVal = $(this).closest('tr').find('.earn').text();

  if (removeSpendVal !== "") {
    updateBalance(removeSpendVal, 'pos');
  }
  else {
    updateBalance(removeEarnVal, 'neg');
  }
  $(this).closest('tr').remove();

}

function onlyEarnings(){
  if (toggleEarn) {
    $('tr[data="neg"]').css('display', 'none');
    toggleEarn = false;
}
  else {
    $('tr[data="neg"]').css('display', 'table-row');
    toggleEarn = true;
  }
}




function onlySpending(){
  if (toggleSpend) {
    $('tr[data="pos"]').css('display', 'none');
    toggleSpend = false;
}
  else {
    $('tr[data="pos"]').css('display', 'table-row');
    toggleSpend = true;
  }
}



function updateBalance(amount, toggle){
  if (toggle === "pos"){
    newBalance += parseFloat(amount.substr(2));
  }
  else {
    newBalance -= parseFloat(amount.substr(2));
  }
  $('.panel1 h2').text('Current Balance: '+('$' + parseFloat(newBalance, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()));
;
}
