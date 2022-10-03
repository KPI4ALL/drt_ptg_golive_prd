/******************************************************************
 * * DisrupTT * DisrupTT Developers *
 * ****************************************************************
 * Date: 01/2022
 * Script name: DRT - Facturacion Oport Estacionario MR
 * Script id: customscript_drt_ptg_factur_opor_esta_mr
 * Deployment id: customdeploy_drt_ptg_factur_opor_esta_mr
 * Applied to: 
 * File: drt_ptg_facturacion_oportunidad_esta_mr.js
 ******************************************************************/

/**
 *@NApiVersion 2.1
 *@NScriptType MapReduceScript
 */
 define(['SuiteScripts/drt_custom_module/drt_mapid_cm', 'N/runtime', 'N/search', 'N/record', 'N/email', 'N/error', 'N/url', 'N/https'], function (drt_mapid_cm, runtime, search, record, email, error, url, https) {

    function getInputData() {
        try {
            var respuesta = '';
            var id_search = runtime.getCurrentScript().getParameter({
                name: 'custscript_drt_oportunidad_a_factura_est'
            }) || '';
            log.audit("id_search 1", id_search);

                var arrayColumns = [
                    search.createColumn({ name: "custrecord_ptg_id_oportunidad_fact", label: "PTG - Id Oportunidad a Facturar" }),
                    search.createColumn({name: "custrecord_ptg_preliq_estacionarios", label: "PTG - Preliq Cilindros"})
                   ];
   
               var arrayFilters = [
                   ["custrecord_ptg_preliq_estacionarios","anyof",id_search],"AND", 
                   ["isinactive","is","F"]
                ];
               
                   respuesta = search.create({
                       type: 'customrecord_ptg_oportunidad_facturar',
                       columns: arrayColumns,
                       filters: arrayFilters
                   });
        } catch (error) {
            log.audit({
                title: 'error getInputData',
                details: JSON.stringify(error)
            });
        } finally {
            log.audit({
                title: 'respuesta getInputData Finally',
                details: JSON.stringify(respuesta)
            });
            return respuesta;
        }
    }

    function map(context) {
        try {
            log.audit({
                title: 'context map',
                details: JSON.stringify(context)
            });
            var objValue = JSON.parse(context.value);
            log.audit("objValueM", objValue);

            var objValue1 = objValue.values["custrecord_ptg_preliq_estacionarios"];

            var objValue3 = objValue1.value;

            var objValue2 = objValue.values["custrecord_ptg_id_oportunidad_fact"];

            var idOportunidad = objValue2.value;
            log.audit("idOportunidadM", idOportunidad);
            var cfdiCliente = 0;

            var publicoGeneral = 0;
            var cuentaAjusteInventario = 0;
            var formularioFacturaPTG = 0;
            var servicioEstacionario = 0;
            var gasLPUnidades = 0;
            var efectivoId = 0;
            var prepagoBanorteId = 0;
            var valeId = 0;
            var cortesiaId = 0;
            var tarjetaCreditoId = 0;
            var tarjetaDebitoId = 0;
            var multipleId = 0;
            var prepagoTransferenciaId = 0;
            var creditoClienteId = 0;
            var reposicionId = 0;
            var saldoAFavorId = 0;
            var consumoInternoId = 0;
            var prepagoBancomerId = 0;
            var prepagoHSBCId = 0;
            var prepagoBanamexId = 0;
            var prepagoSantanderId = 0;
            var prepagoScotianId = 0;
            var bonificacionId = 0;
            var ticketCardId = 0;
            var chequeBancomerId = 0;
            var recirculacionId = 0;
            var canceladoId = 0;
            var rellenoId = 0;
            var transferenciaId = 0;
            var traspasoId = 0;
            var chequeSantanderId = 0;
            var chequeScotianId = 0;
            var chequeHSBCId = 0;
            var chequeBanamexId = 0;
            var chequeBanorteId = 0;
            var tarjetaCreditoBancomerId = 0;
            var tarjetaCreditoHSBCId = 0;
            var tarjetaCreditoBanamexId = 0;
            var tarjetaDebitoBanamexId = 0;
            var tarjetaDebitoBancomerId = 0;
            var tarjetaDebitoHSBCId = 0;
            var publicoGeneralTXT = "";
            var articuloArray = [];
            var cantidadArray = [];



            var objMap=drt_mapid_cm.drt_liquidacion();
            if (Object.keys(objMap).length>0) {
                publicoGeneral = objMap.publicoGeneral;
                cuentaAjusteInventario = objMap.cuentaAjusteInventario;
                formularioFacturaPTG = objMap.formularioFacturaPTG;
                servicioEstacionario = objMap.servicioEstacionario;
                gasLPUnidades = objMap.gasLPUnidades;
                publicoGeneralTXT = objMap.publicoGeneralTXT;
                efectivoId = objMap.efectivoId;
                prepagoBanorteId = objMap.prepagoBanorteId;
                valeId = objMap.valeId;
                cortesiaId = objMap.cortesiaId;
                tarjetaCreditoId = objMap.tarjetaCreditoId;
                tarjetaDebitoId = objMap.tarjetaDebitoId;
                multipleId = objMap.multipleId;
                prepagoTransferenciaId = objMap.prepagoTransferenciaId;
                creditoClienteId = objMap.creditoClienteId;
                reposicionId = objMap.reposicionId;
                saldoAFavorId = objMap.saldoAFavorId;
                consumoInternoId = objMap.consumoInternoId;
                prepagoBancomerId = objMap.prepagoBancomerId;
                prepagoHSBCId = objMap.prepagoHSBCId;
                prepagoBanamexId = objMap.prepagoBanamexId;
                prepagoSantanderId = objMap.prepagoSantanderId;
                prepagoScotianId = objMap.prepagoScotianId;
                bonificacionId = objMap.bonificacionId;
                ticketCardId = objMap.ticketCardId;
                chequeBancomerId = objMap.chequeBancomerId;
                recirculacionId = objMap.recirculacionId;
                canceladoId = objMap.canceladoId;
                rellenoId = objMap.rellenoId;
                transferenciaId = objMap.transferenciaId;
                traspasoId = objMap.traspasoId;
                chequeSantanderId = objMap.chequeSantanderId;
                chequeScotianId = objMap.chequeScotianId;
                chequeHSBCId = objMap.chequeHSBCId;
                chequeBanamexId = objMap.chequeBanamexId;
                chequeBanorteId = objMap.chequeBanorteId;
                tarjetaCreditoBancomerId = objMap.tarjetaCreditoBancomerId;
                tarjetaCreditoHSBCId = objMap.tarjetaCreditoHSBCId;
                tarjetaCreditoBanamexId = objMap.tarjetaCreditoBanamexId;
                tarjetaDebitoBanamexId = objMap.tarjetaDebitoBanamexId;
                tarjetaDebitoBancomerId = objMap.tarjetaDebitoBancomerId;
                tarjetaDebitoHSBCId = objMap.tarjetaDebitoHSBCId;
                terminoContado = objMap.terminoContado;
            }


            var tipoPagoAFacturar = 0;
            var updOportunidad = {};
            var oporObj = record.load({
                type: record.Type.OPPORTUNITY,
                id: idOportunidad
            });

            var registroPagos = oporObj.getValue("custbody_ptg_registro_pagos");
            var pagoOrdenObj = search.create({
                type: "customrecord_ptg_pagos_oportunidad",
                filters: [["custrecord_ptg_registro_pagos","anyof",registroPagos]],
                columns: [
                    search.createColumn({name: "custrecord_ptg_tipo_pago", summary: "GROUP", label: "PTG - Tipo de Pago"}),
                    search.createColumn({name: "custrecord_ptg_total", summary: "SUM", sort: search.Sort.DESC, label: "PTG - Total"})
                ]
            });
            var pagoOrdenObjResult = pagoOrdenObj.run().getRange({
                start: 0,
                end: 2,
            });
            (tipoPagoAFacturar = pagoOrdenObjResult[0].getValue({name: "custrecord_ptg_tipo_pago", summary: "GROUP", label: "PTG - Tipo de Pago"}));
            log.audit("tipoPagoAFacturar", tipoPagoAFacturar);
            updOportunidad = {
                custbody_forma_pago_facturar: tipoPagoAFacturar
            }
            var updtOportunidad = record.submitFields({
                id: idOportunidad,
                type: record.Type.OPPORTUNITY,
                values: updOportunidad
            });
            log.audit("updtOportunidad", updtOportunidad);


            var oportunidadObj = record.load({
                type: record.Type.OPPORTUNITY,
                id: idOportunidad
            });
            var subsidiariaOportunidad = oportunidadObj.getValue("subsidiary");
            var solicitaFactura = oportunidadObj.getValue("custbody_ptg_cliente_solicita_factura");
            var numViaje = oportunidadObj.getValue('custbody_ptg_numero_viaje');
            var tipoPago = oportunidadObj.getValue("custbody_forma_pago_facturar");
            var opcionPagoObj = oportunidadObj.getValue("custbody_ptg_opcion_pago_obj");
            log.audit("opcionPagoObj", opcionPagoObj);
            var cliente = oportunidadObj.getValue("entity");
            log.audit("cliente", cliente);
            var zonaPrecioID = oportunidadObj.getValue("custbody_ptg_zonadeprecioop_");
            var zonaPrecioObj = record.load({
                type: "customrecord_ptg_zonasdeprecio_",
                id: zonaPrecioID,
            });
            var precioPorLitro = zonaPrecioObj.getValue("custrecord_ptg_precio_");
            var razonSocial = oportunidadObj.getValue("custbody_razon_social_para_facturar");
            var lineasArticulosOp = oportunidadObj.getLineCount({sublistId: "item"});
            
            for (var o = 0; o < lineasArticulosOp; o++){
                articuloArray[o] = oportunidadObj.getSublistValue({
                    sublistId: "item",
                    fieldId: "item",
                    line: o,
                });
                log.audit("articuloArray[o]", articuloArray[o]);
    
                cantidadArray[o] = oportunidadObj.getSublistValue({
                    sublistId: "item",
                    fieldId: "quantity",
                    line: o,
                });
                log.audit("cantidadArray[o]", cantidadArray[o]);
            }


            var nombreClienteAFacturar = "";
            var clienteObj = record.load({
                type: search.Type.CUSTOMER,
                id: cliente
            });
            var clienteAFacturar = clienteObj.getValue("custentity_mx_sat_registered_name");
            nombreClienteAFacturar = clienteAFacturar

            var terminosCliente = clienteObj.getValue("terms");
            var terminos = 0;
            if(tipoPago != creditoClienteId){
                terminos = terminoContado;
            } else {
                terminos = terminosCliente;
            }

            
            var rutaObj = record.load({
                type: "customrecord_ptg_tabladeviaje_enc2_",
                id: numViaje
            });
            var ruta = rutaObj.getValue("custrecord_ptg_vehiculo_tabladeviajes_");
  
            var ubicacionObj = record.load({
                type: "customrecord_ptg_equipos",
                id: ruta
            });
            var ubicacion = ubicacionObj.getValue("custrecord_ptg_ubicacionruta_");

            var subsidiaria = ubicacionObj.getValue("custrecord_ptg_subsidiaria_1");

            if(tipoPago == consumoInternoId){

                var articuloArray = [];
                var cantidadArray = [];
                var cantidadArrayPF = [];
                var cantidadArrayFin = [];
                var lineasArticulos = oportunidadObj.getLineCount({sublistId: "item"});
                log.audit("lineasArticulos", lineasArticulos);
                for (var t = 0; t < lineasArticulos; t++){
                    articuloArray[t] = oportunidadObj.getSublistValue({
                        sublistId: "item",
                        fieldId: "item",
                        line: t,
                    });
                    log.audit("articuloArray "+t, articuloArray);
    
                    cantidadArray[t] = oportunidadObj.getSublistValue({
                        sublistId: "item",
                        fieldId: "quantity",
                        line: t,
                    });
                    log.audit("cantidadArray "+t, cantidadArray);

                    cantidadArrayPF[t] = parseFloat(cantidadArray[t]);
                    log.audit("cantidadArrayPF "+t, cantidadArrayPF[t]);

                    cantidadArrayFin[t] = cantidadArrayPF[t] * -1;
                    log.audit("cantidadArrayFin "+t, cantidadArrayFin[t]);
                }


                var inventoryAdjustment = record.create({
                    type: record.Type.INVENTORY_ADJUSTMENT,
                    isDynamic: true,
                });
                inventoryAdjustment.setValue("subsidiary", subsidiariaOportunidad);
                inventoryAdjustment.setValue("account", cuentaAjusteInventario);
                for(var u = 0; u < lineasArticulos; u++){
                    inventoryAdjustment.selectLine("inventory", u);
                    inventoryAdjustment.setCurrentSublistValue("inventory", "item", articuloArray[u]);
                    inventoryAdjustment.setCurrentSublistValue("inventory", "location", ubicacion);
                    inventoryAdjustment.setCurrentSublistValue("inventory", "adjustqtyby", cantidadArrayFin[u]);
                    inventoryAdjustment.commitLine("inventory");
                }
                var idInventoryAdjustment = inventoryAdjustment.save();
                log.debug({
                    title: "Ajuste de Inventario",
                    details: "Id Saved: " + idInventoryAdjustment,
                });


                var recConsumoInterno = record.create({
                    type: "customrecord_ptg_consumointerno_",
                    isDynamic: true,
                });

                recConsumoInterno.setValue("custrecord_id_oportunidad_consumointerno", idOportunidad);
                recConsumoInterno.setValue("custrecord_ptg_ajusteconsumointerno_", idInventoryAdjustment);
                recConsumoInterno.setValue("custrecordptg_detalleconsumo_", objValue3);

                var idRecConsumoInterno = recConsumoInterno.save();



            } else if(tipoPago != recirculacionId && tipoPago != canceladoId && tipoPago != traspasoId){
            var facturaObj = record.transform({
                fromType: record.Type.OPPORTUNITY,
                fromId: idOportunidad,
                toType: record.Type.INVOICE,
                isDynamic: false
            });

            facturaObj.setValue("customform", formularioFacturaPTG);
            /*if(!solicitaFactura){
                facturaObj.setValue("entity", publicoGeneral);
            }*/

            if(!solicitaFactura){
                facturaObj.setValue("entity", publicoGeneral);
                cfdiCliente = 3;
                log.audit("cfdiCliente NO solicita", cfdiCliente);
                nombreClienteAFacturar = publicoGeneralTXT;
            } else {
                var entityObj = record.load({
                    type: search.Type.CUSTOMER,
                    id: cliente,
                });
                log.audit("entityObj", entityObj);

                cfdiCliente = entityObj.getValue("custentity_disa_uso_de_cfdi_") || 3;
                log.audit("cfdiCliente solicita", cfdiCliente);
            }



            facturaObj.setValue("custbody_ptg_registro_pre_liq_esta", objValue3);
            log.audit("objValue3", objValue3);
            facturaObj.setValue("location", ubicacion);
            facturaObj.setValue("custbody_ptg_tipo_servicio", servicioEstacionario);
            facturaObj.setValue("custbody_ptg_nombre_cliente", cliente);
            log.audit("cliente", cliente);
            facturaObj.setValue("custbody_psg_ei_status", 3); //ESTADO DEL DOCUMENTO ELECTRÓNICO
            facturaObj.setValue("custbody_mx_cfdi_usage", cfdiCliente);
            facturaObj.setValue("custbody_razon_social_para_facturar", nombreClienteAFacturar);
            facturaObj.setValue("terms", terminos);
            //facturaObj.setValue("custbody_psg_ei_template", 123); //PLANTILLA DEL DOCUMENTO ELECTRÓNICO
            //facturaObj.setValue("custbody_psg_ei_sending_method", 11); //MÉTODO DE ENVÍO DE DOCUMENTOS ELECTRÓNICOS

            var formaPagoSAT = searchFormaPagoSAT(subsidiariaOportunidad, tipoPago);
            log.emergency("formaPagoSAT", formaPagoSAT);

            facturaObj.setValue("custbody_mx_txn_sat_payment_method", formaPagoSAT);

            if(tipoPago == efectivoId){ //EFECTIVO
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 1); //01 - Efectivo
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 3); //PUE - Pago en una Sola Exhibición
            } 
            else if(tipoPago == prepagoBanorteId || tipoPago == prepagoTransferenciaId || tipoPago == prepagoBancomerId || tipoPago == prepagoHSBCId || tipoPago == prepagoBanamexId || tipoPago == prepagoSantanderId || tipoPago == prepagoScotianId){ //PREPAGO
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 23); //28 - Tarjeta de Débito
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 3); //PUE - Pago en una Sola Exhibición
            }
            else if(tipoPago == cortesiaId){ //CORTESIA
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 28); //99 - Por Definir
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 4); //PPD - Pago en Parcialidades o Diferido
            }
            else if(tipoPago == tarjetaCreditoId || tipoPago == tarjetaCreditoBancomerId || tipoPago == tarjetaCreditoHSBCId || tipoPago == tarjetaCreditoBanamexId){ //TARJETA CREDITO
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 4); //04 - Tarjeta de Crédito
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 3); //PUE - Pago en una Sola Exhibición
            }
            else if(tipoPago == tarjetaDebitoId || tipoPago == tarjetaDebitoBanamexId || tipoPago == tarjetaDebitoBancomerId || tipoPago == tarjetaDebitoHSBCId){ //TARJETA DEBITO
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 23); //28 - Tarjeta de Débito
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 3); //PUE - Pago en una Sola Exhibición
            } 
            else if(tipoPago == creditoClienteId){ //CREDITO CLIENTE
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 28); //99 - Por Definir
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 4); //PPD - Pago en Parcialidades o Diferido
            }
            else if(tipoPago == reposicionId){ //REPOSICION
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 28); //99 - Por Definir
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 4); //PPD - Pago en Parcialidades o Diferido
            }
            else if(tipoPago == bonificacionId){ //BONIFICACION
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 28); //99 - Por Definir
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 4); //PPD - Pago en Parcialidades o Diferido
            }
            else if(tipoPago == chequeBancomerId || tipoPago == chequeSantanderId || tipoPago == chequeScotianId || tipoPago == chequeHSBCId || tipoPago == chequeBanamexId || tipoPago == chequeBanorteId){ //CHEQUE    
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 2); //02 - CHEQUE NOMINATIVO
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 3); //PUE - Pago en una Sola Exhibición
                }
            else {
                //facturaObj.setValue("custbody_mx_txn_sat_payment_method", 28); //99 - Por Definir
                facturaObj.setValue("custbody_mx_txn_sat_payment_term", 4); //PPD - Pago en Parcialidades o Diferido
            }

            var itemCount = facturaObj.getLineCount('item');
            log.audit("itemCount", itemCount);

            for (var i = 0; i < itemCount; i++) {
                facturaObj.setSublistValue('item', 'location', i, ubicacion);
                facturaObj.setSublistValue("item", "custcol_ptg_cantidad_litros", i, cantidadArray[i]);
                facturaObj.setSublistValue("item", "custcol_ptg_precio_unitario", i, precioPorLitro);
                facturaObj.setSublistValue("item", "custcol_mx_txn_line_sat_tax_object", i, 2);
                log.audit("i", i);
            }

            var recObjID = facturaObj.save({
                ignoreMandatoryFields: true
            });
            log.debug("Factura Creada", recObjID);

            var invoiceObje = record.load({
                type: record.Type.INVOICE,
                id: recObjID,
            });
            var idRegistroPagos = invoiceObje.getValue("custbody_ptg_registro_pagos");

            var objPagosUpdate = {
                custrecord_ptg_factura_pagos: recObjID,
            }

            record.submitFields({
                id: idRegistroPagos,
                type: "customrecord_ptg_pagos",
                values: objPagosUpdate,
            });

            //SE HACE EL PROCESO DE GENERAR DOCUMENTO Y TIMBRADO
            var urlStlt = url.resolveScript({
                scriptId: "customscript_drt_ei_auto_stlt",
                deploymentId: "customdeploy_drt_global_invoice_suitelet",
                returnExternalUrl: true,
                params: {
                    id_factura: recObjID
                }
            });
            log.audit("urlStlt", urlStlt);

            var link = https.get({
                url: urlStlt
            });
        }
            context.write({
                key: recObjID,
                value: recObjID
            });
               
        } catch (error) {
            log.error({
                title: 'error map',
                details: JSON.stringify(error)
            });
        }
    }

    function reduce(context) {
        try {
            log.audit({
                title: 'context reduce',
                details: JSON.stringify(context)
            });
            var idFactura = JSON.parse(context.key);
            log.audit("idFactura", idFactura);

            var id_search = runtime.getCurrentScript().getParameter({
                name: 'custscript_drt_oportunidad_a_factura_est'
            }) || '';

            var articuloServicio = 0;
            var efectivoId = 0;
            var prepagoBanorteId = 0;
            var valeId = 0;
            var cortesiaId = 0;
            var tarjetaCreditoId = 0;
            var tarjetaDebitoId = 0;
            var multipleId = 0;
            var prepagoTransferenciaId = 0;
            var creditoClienteId = 0;
            var reposicionId = 0;
            var saldoAFavorId = 0;
            var consumoInternoId = 0;
            var prepagoBancomerId = 0;
            var prepagoHSBCId = 0;
            var prepagoBanamexId = 0;
            var prepagoSantanderId = 0;
            var prepagoScotianId = 0;
            var bonificacionId = 0;
            var ticketCardId = 0;
            var chequeBancomerId = 0;
            var recirculacionId = 0;
            var canceladoId = 0;
            var rellenoId = 0;
            var transferenciaId = 0;
            var traspasoId = 0;
            var chequeSantanderId = 0;
            var chequeScotianId = 0;
            var chequeHSBCId = 0;
            var chequeBanamexId = 0;
            var chequeBanorteId = 0;
            var tarjetaCreditoBancomerId = 0;
            var tarjetaCreditoHSBCId = 0;
            var tarjetaCreditoBanamexId = 0;
            var tarjetaDebitoBanamexId = 0;
            var tarjetaDebitoBancomerId = 0;
            var tarjetaDebitoHSBCId = 0;



            var objMap=drt_mapid_cm.drt_liquidacion();
            if (Object.keys(objMap).length>0) {
                articuloServicio = objMap.articuloServicio;
                efectivoId = objMap.efectivoId;
                prepagoBanorteId = objMap.prepagoBanorteId;
                valeId = objMap.valeId;
                cortesiaId = objMap.cortesiaId;
                tarjetaCreditoId = objMap.tarjetaCreditoId;
                tarjetaDebitoId = objMap.tarjetaDebitoId;
                multipleId = objMap.multipleId;
                prepagoTransferenciaId = objMap.prepagoTransferenciaId;
                creditoClienteId = objMap.creditoClienteId;
                reposicionId = objMap.reposicionId;
                saldoAFavorId = objMap.saldoAFavorId;
                consumoInternoId = objMap.consumoInternoId;
                prepagoBancomerId = objMap.prepagoBancomerId;
                prepagoHSBCId = objMap.prepagoHSBCId;
                prepagoBanamexId = objMap.prepagoBanamexId;
                prepagoSantanderId = objMap.prepagoSantanderId;
                prepagoScotianId = objMap.prepagoScotianId;
                bonificacionId = objMap.bonificacionId;
                ticketCardId = objMap.ticketCardId;
                chequeBancomerId = objMap.chequeBancomerId;
                recirculacionId = objMap.recirculacionId;
                canceladoId = objMap.canceladoId;
                rellenoId = objMap.rellenoId;
                transferenciaId = objMap.transferenciaId;
                traspasoId = objMap.traspasoId;
                chequeSantanderId = objMap.chequeSantanderId;
                chequeScotianId = objMap.chequeScotianId;
                chequeHSBCId = objMap.chequeHSBCId;
                chequeBanamexId = objMap.chequeBanamexId;
                chequeBanorteId = objMap.chequeBanorteId;
                tarjetaCreditoBancomerId = objMap.tarjetaCreditoBancomerId;
                tarjetaCreditoHSBCId = objMap.tarjetaCreditoHSBCId;
                tarjetaCreditoBanamexId = objMap.tarjetaCreditoBanamexId;
                tarjetaDebitoBanamexId = objMap.tarjetaDebitoBanamexId;
                tarjetaDebitoBancomerId = objMap.tarjetaDebitoBancomerId;
                tarjetaDebitoHSBCId = objMap.tarjetaDebitoHSBCId;
            }

            var invoiceObj = record.load({
                type: record.Type.INVOICE,
                id: idFactura,
            });

            var tipoPagoObj = invoiceObj.getValue("custbody_ptg_opcion_pago_obj");
            var clienteFactura = invoiceObj.getValue("entity");
            var subsidiaria = invoiceObj.getValue("subsidiary");
            var ubicacion = invoiceObj.getValue("location");
            var clientePrepago = invoiceObj.getValue("custbody_ptg_nombre_cliente");
            var idOportunidadFactura = invoiceObj.getValue("opportunity");
            var objValueTipoPago = invoiceObj.getValue("custbody_forma_pago_facturar");
            var objValue = JSON.parse(tipoPagoObj);
            var objValue2 = objValue;
            var objValue3 = objValue2.pago;
            var objCount = objValue3.length;
            var objValueMonto = objValue3[0].monto;
            log.audit("objValue3", objValue3);
            log.audit("objCount", objCount);
            log.audit("objValueTipoPago", objValueTipoPago);
            log.audit("objValueMonto", objValueMonto);

            
            if(objValueTipoPago == efectivoId || objValueTipoPago == tarjetaCreditoId || objValueTipoPago == tarjetaDebitoId || objValueTipoPago == chequeBancomerId || objValueTipoPago == chequeSantanderId || objValueTipoPago == chequeScotianId || objValueTipoPago == chequeHSBCId || objValueTipoPago == chequeBanamexId || objValueTipoPago == chequeBanorteId || objValueTipoPago == tarjetaCreditoBancomerId || objValueTipoPago == tarjetaCreditoHSBCId || objValueTipoPago == tarjetaCreditoBanamexId || objValueTipoPago == tarjetaDebitoBanamexId || objValueTipoPago == tarjetaDebitoBancomerId || objValueTipoPago == tarjetaDebitoHSBCId){
                log.audit("UN PAGO, EFECTIVO ó TARJETA DE CREDITO ó TARJETA DE DEBITO ó CHEQUE");
                var pagoObj = record.transform({
                    fromType: record.Type.INVOICE,
                    fromId: idFactura,
                    toType: record.Type.CUSTOMER_PAYMENT,
                    isDynamic: false
                });

                var cuenta = searchCuenta(subsidiaria, objValueTipoPago);
                log.emergency("cuenta 355", cuenta);

                pagoObj.setValue("account", cuenta);
    
                var pagoObjID = pagoObj.save({
                    ignoreMandatoryFields: true
                });
                log.debug("Pago Creado con: "+objValueTipoPago, pagoObjID);
            }

           
            else if (objValueTipoPago == prepagoBanorteId || objValueTipoPago == prepagoTransferenciaId || objValueTipoPago == prepagoBancomerId || objValueTipoPago == prepagoHSBCId || objValueTipoPago == prepagoBanamexId || objValueTipoPago == prepagoSantanderId || objValueTipoPago == prepagoScotianId){
                log.audit("UN PAGO Prepago");
                var invoiceUnPagoObj = record.load({
                    type: record.Type.INVOICE,
                    id: idFactura,
                });
                var importeAdeudadoFactura = invoiceUnPagoObj.getValue("amountremainingtotalbox");

                //SS: PTG - Ventas Estacionario Prepago SS
                var recOportunidadPrepago = search.create({
                    type: "customrecord_ptg_ventas_estacionario",
                    filters: [
                       ["custrecord_ptg_oportunidad_estacionario","anyof",idOportunidadFactura], "AND", 
                       ["custrecord_ptg_preliqui_rel_vts_","anyof",id_search], "AND", 
                       ["custrecord_ptg_cliente_est_vts","anyof",clientePrepago]
                    ],
                    columns: [
                       search.createColumn({name: "custrecord_ptg_prepago_est_vts_", label: "PTG - Prepago"}),
                       search.createColumn({name: "accountmain", join: "CUSTRECORD_PTG_PREPAGO_EST_VTS_", label: "Cuenta (principal)"})
                    ]
                });
                var prepagoObjResult = recOportunidadPrepago.run().getRange({
                    start: 0,
                    end: 3,
                });

                idPagoPrepago = prepagoObjResult[0].getValue({name: "custrecord_ptg_prepago_est_vts_", label: "PTG - Prepago"});
                log.emergency("idPagoPrepago", idPagoPrepago);
                idCuenta = prepagoObjResult[0].getValue({name: "accountmain", join: "CUSTRECORD_PTG_PREPAGO_EST_VTS_", label: "Cuenta (principal)"});
                log.emergency("idCuenta", idCuenta);
                if(idPagoPrepago){
                    var rec = record.load({
                        type: record.Type.CUSTOMER_PAYMENT,
                        id: idPagoPrepago,
                        isDynamic: true,
                    });
                    rec.setValue("customer", clienteFactura);
                    rec.setValue("account", idCuenta);


                    var lineCount = rec.getLineCount('apply');

                    for (var k = 0; k < lineCount; k++){
                        rec.selectLine({
                            sublistId: 'apply',
                            line: k
                        });
                        var factura = rec.getCurrentSublistValue({
                            sublistId: 'apply',
                            fieldId: 'internalid',
                        });
                        if (factura == idFactura){
                            rec.setCurrentSublistValue({
                                sublistId: 'apply',
                                fieldId: 'apply',
                                value: true
                            });
                        }
                    }
                    var recIdPago = rec.save();
                    log.emergency({
                        title: "Record updated successfully",
                        details: "Id: " + recIdPago,
                    });
                }

            }
            
            else if (objValueTipoPago == cortesiaId || objValueTipoPago == reposicionId || objValueTipoPago == bonificacionId || objValueTipoPago == rellenoId){
                log.audit("CORTESIA, REPOSICION, BONIFICACION Ó RELLENO DE MANGUERA")
                var creditMemoObj = record.transform({
                    fromType: record.Type.INVOICE,
                    fromId: idFactura,
                    toType: record.Type.CREDIT_MEMO,
                    isDynamic: false
                });

                if(objValueTipoPago == cortesiaId || objValueTipoPago == bonificacionId){
                    var amountArray = [];
                    var itemCountLine = creditMemoObj.getLineCount('item');
                    for (var i = 0; i < itemCountLine; i++) {
                        amountArray[i] = creditMemoObj.getSublistValue({
                            sublistId: "item",
                            fieldId: "amount",
                            line: i,
                        });
                    }
                        
                    for (var j = 0; j < itemCountLine; j++) {
                        creditMemoObj.setSublistValue('item', 'item', j, articuloServicio);  
                        creditMemoObj.setSublistValue('item', 'quantity', j, 1);
                        creditMemoObj.setSublistValue('item', 'amount', j, amountArray[j]);
                    }
                }
    
                var creditMemoID = creditMemoObj.save({
                    ignoreMandatoryFields: true
                });
                log.debug("Nota de credito Creado con: "+objValueTipoPago, creditMemoID);

            }
            
			
        } catch (error) {
            log.error({
                title: 'error reduce',
                details: JSON.stringify(error)
            });
        }
    }

    function summarize(summary) {

    }

      function searchCuenta(idSubsidiaria, idTipoPago) {
        try {
            var cuentaDefault = 0;
            var objMap=drt_mapid_cm.drt_liquidacion();
            if (Object.keys(objMap).length>0) {
                cuentaDefault = objMap.cuentaDefault;
                subsidiariaCorpoGas = objMap.subsidiariaCorpoGas;
                subsidiariaDistribuidora = objMap.subsidiariaDistribuidora;
                subsidiariaSanLuis = objMap.subsidiariaSanLuis;
            }

          //SS: PTG - Mapeo Formas de pago y cuentas SS
          var mapeoCuentaObj = search.create({
            type: "customrecord_mapeo_formasdepago_cuentas",
            filters: [
              ["custrecord_ptg_formadepago_subsidiaria", "anyof", idSubsidiaria], "AND",
              ["custrecord_ptg_forma_pago", "anyof", idTipoPago],
            ],
            columns: [
              search.createColumn({
                name: "custrecord_ptg_formadepago_cuenta",
                label: "PTG - Cuenta de banco",
              }),
            ],
          });
  
          var mapeoCuentaObjCount = mapeoCuentaObj.runPaged().count;
          var mapeoCuentaObjResult = mapeoCuentaObj.run().getRange({
            start: 0,
            end: mapeoCuentaObjCount,
          });
          if (mapeoCuentaObjCount > 0) {
            idCuenta = mapeoCuentaObjResult[0].getValue({
              name: "custrecord_ptg_formadepago_cuenta",
              label: "PTG - Cuenta de banco",
            });
            log.debug("idCuenta", idCuenta);
          } else {
            if(idSubsidiaria == subsidiariaCorpoGas){
                idCuenta = 3153;
            } else if(idSubsidiaria == subsidiariaDistribuidora){
                idCuenta = 2849;
            } else if(idSubsidiaria == subsidiariaSanLuis){
                idCuenta = 3151;
            }
              log.debug("cuenta no encontrada", idCuenta);
          }
  
          return idCuenta;
        } catch (error) {
          log.error({
            title: "error searchCuenta",
            details: JSON.stringify(error),
          });
        }
      }
      
      function searchFormaPagoSAT(idSubsidiaria, idTipoPago) {
        try {
            var formaDePagoDefault = 0;
            var objMap=drt_mapid_cm.drt_liquidacion();
            if (Object.keys(objMap).length>0) {
                formaDePagoDefault = objMap.formaDePagoDefault;
            }

            //SS: PTG - Mapeo Formas de pago y cuentas SS
            var mapeoCuentaObj = search.create({
                type: "customrecord_mapeo_formasdepago_cuentas",
                filters: [
                    ["custrecord_ptg_formadepago_subsidiaria", "anyof", idSubsidiaria], "AND",
                    ["custrecord_ptg_forma_pago", "anyof", idTipoPago],
                ],
                columns: [
                    search.createColumn({
                        name: "custrecord_ptg_forma_pago_sat",
                        label: "PTG - FORMA DE PAGO SAT",
                    }),
                ],
            });
  
            var mapeoCuentaObjCount = mapeoCuentaObj.runPaged().count;
            var mapeoCuentaObjResult = mapeoCuentaObj.run().getRange({
                start: 0,
                end: mapeoCuentaObjCount,
            });
            if (mapeoCuentaObjCount > 0) {
                idFormaPago = mapeoCuentaObjResult[0].getValue({
                    name: "custrecord_ptg_forma_pago_sat",
                    label: "PTG - FORMA DE PAGO SAT",
                });
                log.debug("idFormaPago", idFormaPago);
            } else {
                idFormaPago = formaDePagoDefault;
                log.debug("forma de pago no encontrada", idFormaPago);
            }
  
            return idFormaPago;
        } catch (error) {
            log.error({
                title: "error searchFormaPagoSAT",
                details: JSON.stringify(error),
            });
        }
    }
    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});