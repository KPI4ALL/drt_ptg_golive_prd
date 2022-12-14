/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 */
define([
        'SuiteScripts/drt_custom_module/drt_ptg_address_cm',
        'N/record'
    ],
    (
        drt_ptg_address_cm,
        record
    ) => {

        const afterSubmit = (scriptContext) => {
            log.debug(`afterSubmit ${scriptContext.type}`, `Type: ${scriptContext.newRecord.type} ID: ${scriptContext.newRecord.id}`);
            if (
                (
                    scriptContext.type == scriptContext.UserEventType.EDIT ||
                    scriptContext.type == scriptContext.UserEventType.CREATE
                ) &&
                scriptContext.newRecord.type == record.Type.CUSTOMER
            ) {
                drt_ptg_address_cm.addresEntity(scriptContext.newRecord.id);
            }
        }

        return {
            afterSubmit
        }

    });
