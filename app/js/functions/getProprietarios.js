
getProprietarios()

function getProprietarios() {
    const proprietariosField = document.getElementById('form_candidato_proprietario')

    var config = {
        appName: "mobilize",
        reportName: "Widget_Proprietario"
    }

    ZOHO.CREATOR.init().then((data) => {
        ZOHO.CREATOR.API.getAllRecords(config).then((response) => {
            if(response.code != 3000) {
                console.log("Não foi possível carregar os proprietários - Erro: " + response.code);
                return
            }

            response.data.forEach((proprietario, inicio) => {
            //console.log("nome dos proprietarios " + proprietario.Nome);
                const nome = proprietario.Nome
                if(nome != '') {
                    var option = new Option(nome, proprietario.ID)
                    proprietariosField.add(option)
                }
            })
            console.log("Adicionado a lista os proprietários");
        })
    })
}