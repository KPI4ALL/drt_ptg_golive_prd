/**
 * @NApiVersion 2.1
 * @NScriptType plugintypeimpl
 */
define(
    [
        'N/runtime'
    ],
    (
        runtime
    ) => {
        const getVariables = () => {
            let respuesta = {};
            try {
                const mapObj = {
                    [ runtime.EnvType.PRODUCTION ]: {
                        customFormOppPotogas   : 265, // Oportunidad-Potogas
                        customFormOppCarb      : 264, // Oportunidad-Carburación
                        productgasLpId         : 4216,
                        publicoGeneralId       : 27041,
                        currency               : 1,// Pesos
                        tipoServicioEst        : 2,// Estacionario
                        tipoServicioCar        : 3,// Carburación
                        statusPedidoEntregado  : 3,// Entregado
                        statusPedidoAsignado   : 2,// Asignado
                        entityStatusConcretado : 13,// Concretado
                        tipoSgcWeb             : 1,// Web
                        urlSgcWeb              : "http://potogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php",
                        urlSgcWebLogin         : "http://potogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php/login",
                        urlSgcWebProcesar      : "http://potogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php/procesarPeticion",
                    },
                    [ runtime.EnvType.SANDBOX ]: {
                        customFormOppPotogas   : 305, // Oportunidad-Potogas
                        customFormOppCarb      : 307, // Oportunidad-Carburación
                        productgasLpId         : 4088,
                        publicoGeneralId       : 14508,
                        currency               : 1,// Pesos
                        tipoServicioEst        : 2,// Estacionario
                        tipoServicioCar        : 3,// Carburación
                        statusPedidoEntregado  : 3,// Entregado
                        statusPedidoAsignado   : 2,// Asignado
                        entityStatusConcretado : 13,// Concretado
                        tipoSgcWeb             : 1,// Web
                        urlSgcWeb              : "http://testpotogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php",
                        urlSgcWebLogin         : "http://testpotogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php/login",
                        urlSgcWebProcesar      : "http://testpotogas.sgcweb.com.mx/ws/1094AEV2/v2/soap.php/procesarPeticion",
                    }
                }
                respuesta = mapObj[ runtime.envType ];
            } catch (error) {
                log.error(`error getVariables`, error);
            } finally {
                log.debug(`respuesta getVariables ${runtime.envType}`, respuesta);
                return respuesta;
            }
        }

          const drt_liquidacion = () => {
            let respuesta = {};
            try {
                const mapObj = {
                    [runtime.EnvType.PRODUCTION]: {
                        efectivo: 1,
                        prepagoBanorte: 2,
                        vale: 3,
                        cortesia: 4,
                        tarjetaCredito: 5,
                        tarjetaDebito: 6,
                        multiple: 7,
                        prepagoTransferencia: 8,
                        creditoCliente: 9,
                        reposicion: 10,
                        saldoAFavor: 11,
                        consumoInterno: 12,
                        prepagoBancomer: 13,
                        prepagoHSBC: 14,
                        prepagoBanamex: 15,
                        prepagoSantander: 16,
                        prepagoScotian: 17,
                        bonificacion: 18,
                        ticketCard: 19,
                        chequeBancomer: 20,
                        recirculacion: 21,
                        cancelado: 22,
                        relleno: 23,
                        transferencia: 24,
                        traspaso: 25,
                        chequeSantander: 26,
                        chequeScotian: 27,
                        chequeHSBC: 28,
                        chequeBanamex: 29,
                        chequeBanorte: 30,
                        tarjetaCreditoBancomer: 31,
                        tarjetaCreditoHSBC: 32,
                        tarjetaCreditoBanamex: 33,
                        tarjetaDebitoBanamex: 34,
                        tarjetaDebitoBancomer: 35,
                        tarjetaDebitoHSBC: 36,
                        publicoGeneral: 27041,
                        urlPago: "https://5298967.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=587&id=",
                        estatusRecibido: 2,
                        cilindro10: 4210,
                        cilindro20: 4211,
                        cilindro30: 4212,
                        cilindro45: 4213,
                        envase10: 4206,
                        envase20: 4207,
                        envase30: 4208,
                        envase45: 4209,
                        gasLP: 4216,
                    },
                    [runtime.EnvType.SANDBOX]: {
                        efectivo: 1,
                        prepagoBanorte: 2,
                        vale: 3,
                        cortesia: 4,
                        tarjetaCredito: 5,
                        tarjetaDebito: 6,
                        multiple: 7,
                        prepagoTransferencia: 8,
                        creditoCliente: 9,
                        reposicion: 10,
                        saldoAFavor: 11,
                        consumoInterno: 12,
                        prepagoBancomer: 13,
                        prepagoHSBC: 14,
                        prepagoBanamex: 15,
                        prepagoSantander: 16,
                        prepagoScotian: 17,
                        bonificacion: 18,
                        ticketCard: 19,
                        chequeBancomer: 20,
                        recirculacion: 21,
                        cancelado: 22,
                        relleno: 23,
                        transferencia: 24,
                        traspaso: 25,
                        chequeSantander: 26,
                        chequeScotian: 27,
                        chequeHSBC: 28,
                        chequeBanamex: 29,
                        chequeBanorte: 30,
                        publicoGeneral: 14508,
                        urlPago: "https://5298967-sb1.app.netsuite.com/app/common/custom/custrecordentry.nl?rectype=503&id=",
                        estatusRecibido: 2,
                        cilindro10: 4094,
                        cilindro20: 4095,
                        cilindro30: 4096,
                        cilindro45: 4602,
                        envase10: 4097,
                        envase20: 4099,
                        envase30: 4098,
                        envase45: 4604,
                        gasLP: 4088,
                    }
                }
                respuesta = mapObj[runtime.envType];
            } catch (error) {
                log.error(`error drt_liquidacion`, error);
            } finally {
                log.debug(`respuesta drt_liquidacion ${runtime.envType}`, respuesta);
                return respuesta;
            }
        }

        return {
            drt_liquidacion,
            getVariables
        };

    });
