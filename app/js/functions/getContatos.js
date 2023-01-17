function getContacts() {
    const proprietario = $('#form_candidato_proprietario').find(':selected').val()

    if (proprietario == '') {
       $('#form_candidato_contato')
         .empty()
         .append('<option value="">Selecione..</option>')
         .prop( "disabled", true );
       return;
      }
      $('#form_candidato_contato').prop('disabled', false)
      getAllRecords('widget_contatos_full', 'form_candidato_contato', '(Proprietario='+proprietario+')')
    }
