function validateEmail(value) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!value.match(mailformat)) {
    return false
  }
  return true
}

function formatCnpjCpf(event, fieldDisabled) {
  const cnpjCpf = event.target.value.replace(/\D/g, '');
  var field = document.querySelector("#" + fieldDisabled);

  if(cnpjCpf.length < 18) {
    field.disabled = true
  }

  if (cnpjCpf.length === 11) {
    event.target.value = cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, "\$1.\$2.\$3-\$4");
    return
  } 
  
  event.target.value = cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "\$1.\$2.\$3/\$4-\$5");
  field.disabled = false
};


function phoneMaskBrazil() {
    var key = window.event.key;
    var element = window.event.target;
    var isAllowed = /\d|Backspace|Tab/;
    if(!isAllowed.test(key)) window.event.preventDefault();
    
    var inputValue = element.value;
    inputValue = inputValue.replace(/\D/g,'');
    inputValue = inputValue.replace(/(^\d{2})(\d)/,'($1) $2');
    inputValue = inputValue.replace(/(\d{4,5})(\d{4}$)/,'$1-$2');

    element.value = inputValue;
  }

  function resetForm(formID) {
    $('#' + formID).each (function(){
        this.reset();
      });
      $('#modalAdicionarCandidato').css('z-index', ''); 
  }