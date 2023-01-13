function adicionaZero(numero) {
  if (numero <= 9) return "0" + numero;
  else return numero;
}

export function mostrarErro(campo, mensagem) {

  if(campo.length > 0) {

    var field = document.getElementById(campo);
  
    field.focus();
    field.style.background = "red";
  
    setTimeout(() => {
      field.style.background = ''
    }, 2 * 1000);
  }

  swal({
    title: mensagem,
    type: "error",
    showConfirmButton: true,
  });
}

export default adicionaZero;
