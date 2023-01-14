function getContacts() {
    const todosProprietarios = document.getElementById("form_candidato_proprietario");
    const proprietarioSelecionado = todosProprietarios.options[todosProprietarios.selectedIndex].value;

    
    if (proprietarioSelecionado == '') {
       $('#form_candidato_contato')
         .empty()
         .append('<option value="">Selecione..</option>')
         .prop( "disabled", true );
       return;
      }
      
      var config = {
         appName: "mobilize",
         reportName: "widget_contatos_full",
         criteria: "(Proprietario=" + proprietarioSelecionado + ")"
      }

       const contacts = document.getElementById("form_candidato_contato");
      
    ZOHO.CREATOR.init().then((data) => {
       ZOHO.CREATOR.API.getAllRecords(config).then((response) => {
                if(response.code != 3000) {
                   console.log("Não foi possível carregar os contatos - Erro: " + response.code);
                   return
                }

                response.data.forEach((contato, inicio) => {
                   const nome = contato.Nome
                   if(nome != '') {
                      var option = new Option(nome, contato.ID)
                      contacts.add(option)
                   }
                })
                contacts.disabled = false;
                console.log("Adicionado a lista os contatos");
          })
       })
    }
