/******************************************************************
 * * DisrupTT * DisrupTT Developers *
 * ****************************************************************
 * Date: 05/2022
 * Script name: PTG - Registro de Servicios Cilindros UE
 * Script id: customscript_drt_ptg_reg_serv_cil_ue
 * customer Deployment id: customdeploy_drt_ptg_reg_serv_cil_ue
 * Applied to: PTG - Registro de Servicios
 * File: drt_ptg_reg_serv_cil_ue.js
 ******************************************************************/
/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define(['SuiteScripts/drt_custom_module/drt_mapid_cm', "N/record", "N/search", "N/task", "N/runtime"], function (drt_mapid_cm, record, search, task, runtime) {
  
  function beforeLoad(context) {
    try {
        var newRecord = context.newRecord;
        var type_event = context.type;
        var form = context.form;
        var recId = newRecord.id;
        var objUpdate = {};
        var estatusEtapa = 0;
        var estatusProcesado = 0;
        var servicioCilindros = 0;
        var servicioEstacionarios = 0;
        var objMap=drt_mapid_cm.drt_liquidacion();
        if (Object.keys(objMap).length>0) {
          estatusEtapa = objMap.estatusEtapa;
          estatusProcesado = objMap.estatusProcesado;
          servicioCilindros = objMap.servicioCilindros;
          servicioEstacionarios = objMap.servicioEstacionarios;
        }

        if (type_event == "view") {
          var status = newRecord.getValue("custrecord_ptg_etapa_reg_serv_cil");
          log.debug("status", status);
          var tipoServicio = newRecord.getValue("custrecord_ptg_tipo_servici_reg_serv_cil");
          log.debug("tipoServicio", tipoServicio);
          if (status == estatusEtapa && tipoServicio == servicioCilindros) {
              form.title = "Carga de Servicios de Cilindros";
          } else if (status == estatusEtapa && tipoServicio == servicioEstacionarios) {
            form.title = "Carga de Servicios de Estacionarios";
          } else if (status == estatusProcesado) {
            form.title = "Servicios Procesados";
          }
          
        //  if (status == estatusEtapa && tipoServicio == servicioCilindros) {
              form.addButton({
                  id: "custpage_drt_to_preliq_cil",
                  label: "Preliquidación Cilindros",
                  functionName: "pasarPreliquidacion()",
              });
         /* }
          if (status == estatusEtapa && tipoServicio == servicioEstacionarios) {
            form.addButton({
                id: "custpage_drt_to_preliq_cil",
                label: "Preliquidación Estacionarios",
                functionName: "pasarPreliquidacion()",
            });
        }*/

          form.clientScriptModulePath = "./drt_ptg_reg_serv_cil_cs.js";       

        }
    } catch (e) {
      log.error({
        title: e.name,
        details: e.message,
      });
    }
  }

  function afterSubmit(context) {
    try {
        var newRecord = context.newRecord;
        var recId = newRecord.id;
        var vehiculo = newRecord.getValue("custrecord_ptg_no_vehiculo_reg_serv_cil");
        var numViaje = newRecord.getValue("custrecord_ptg_num_viaje_reg_serv_cil");
        var etapa = newRecord.getValue("custrecord_ptg_etapa_reg_serv_cil");
        var estatusEtapaProcesado = 0;
        var objMap=drt_mapid_cm.drt_liquidacion();
        if (Object.keys(objMap).length>0) {
          estatusEtapaProcesado = objMap.estatusEtapaProcesado;
        }
        var type_interface = runtime.executionContext;
        var type_event = context.type;
        var recObj = context.newRecord;
        var form = context.form;
        var userRoleId = runtime.getCurrentUser().role;
        log.debug(["type_interface", "type_event", "recType", "recObj.id", "userRoleId",].join(" - "),
        [type_interface, type_event, recObj.type, recObj.id, userRoleId].join(" - "));

        if(type_interface === "USERINTERFACE"){
          var mrTask = task.create({
            taskType: task.TaskType.MAP_REDUCE,
            scriptId: 'customscript_drt_ptg_reg_serv_cil_mr',
            params: {
              custscript_drt_ptg_vehiculo_serv_cil: vehiculo,
              custscript_drt_ptg_num_viaje_serv_cil: numViaje,
              custscript_drt_ptg_id_registro_serv_cil: recId,
            }
          });
          var mrTaskId = mrTask.submit();
          var taskStatus = task.checkStatus(mrTaskId);
          log.audit({title: 'taskStatus', details: JSON.stringify(taskStatus)});

          var regCil = record.submitFields({
            type: recObj.type,
            id: recObj.id,
            values: {
              custrecord_ptg_etapa_reg_serv_cil: null
            }
          });
          log.audit("Registro Actualizado", regCil);
        }

    } catch (e) {
      log.error({
        title: e.name,
        details: e.message,
      });
    }
  }

  function beforeSubmit(context) {
    try {
      var newRecord = context.newRecord;
        var recId = newRecord.id;
  
        var numViaje = newRecord.getValue("custrecord_ptg_folio_reg_serv_cil");
        var numViajeSearchObj = search.create({
          type: "customrecord_ptg_registro_servicios_cili",
          filters:[],
          columns:[]
       });
  
       var searchResultCount = numViajeSearchObj.runPaged().count;
       log.audit("searchResultCount", searchResultCount);
  
        if (!numViaje || numViaje == "") {
              var numeroEntero = searchResultCount + 1;
              log.audit("numeroEntero", numeroEntero);
              newRecord.setValue("custrecord_ptg_folio_reg_serv_cil", numeroEntero.toFixed(0));
              newRecord.setValue("name", numeroEntero.toFixed(0));
        }
        
    } catch (e) {
      log.error({
        title: e.name,
        details: e.message,
      });
    }
  }
  return {
    afterSubmit: afterSubmit,
    beforeLoad: beforeLoad,
    beforeSubmit: beforeSubmit,
  };
});
