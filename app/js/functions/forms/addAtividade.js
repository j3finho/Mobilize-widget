import adicionaZero from "../ultilitys.js";

function addTask() {
  ZOHO.CREATOR.init()
    .then(function (data) {
      var queryParams = ZOHO.CREATOR.UTIL.getQueryParams();
      var paramsID = queryParams.idconta
      var AtividadeSites = document.getElementById("AtividadeSites");
      var AtividadeSitesValue = AtividadeSites.options[AtividadeSites.selectedIndex].value;
      var selectStatus = document.getElementById("statusSelect");
      var selectStatusValue = selectStatus.options[selectStatus.selectedIndex].value;
      var tarefaSelect = document.getElementById("tarefaSelect");
      var tarefaSelectValue = tarefaSelect.options[tarefaSelect.selectedIndex].value;
      var selectResponsavel = document.getElementById("selectResponsavel");
      var selectResponsavelValue = selectResponsavel.options[selectResponsavel.selectedIndex].value;
      var selectContratos = document.getElementById("selectContratos");
      var selectContratoslValue = selectContratos.options[selectContratos.selectedIndex].value;
      var dataInicio = document.getElementById("dataInicio").value;
      var dataConclusao = document.getElementById("dataConclusao").value;
      const meses = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      let dataInicioAnterior = new Date(dataInicio);
      let dataInicioAFormatada = (adicionaZero(dataInicioAnterior.getDate().toString()) + "-" + meses[(dataInicioAnterior.getMonth())] + "-" + dataInicioAnterior.getFullYear());
      let dataConclusaoAnterior = new Date(dataConclusao);
      let dataConclusaoFormatada = (adicionaZero(dataConclusaoAnterior.getDate().toString()) + "-" + meses[(dataConclusaoAnterior.getMonth())] + "-" + dataConclusaoAnterior.getFullYear());
      var formData = { "data": { "site": AtividadeSitesValue, "status": selectStatusValue, "task": tarefaSelectValue, "responsible": selectResponsavelValue, "Tipo_de_Contrato": selectContratoslValue, "startDate": dataInicioAFormatada, "endDate": dataConclusaoFormatada } }
      var config = {
        appName: "mobilize",
        formName: "Atividades",
        data: formData
      }
      ZOHO.CREATOR.API.addRecord(config).then(function (response) {
        if (response.code == 3000) {
          swal({
            title: "Atividade Adicionada Com sucesso!",
            type: "success",
            showConfirmButton: false
          });
          setTimeout(() => {
            document.location.reload(true);
          }, 2000)
        }
      });
    });
}

export default addTask;