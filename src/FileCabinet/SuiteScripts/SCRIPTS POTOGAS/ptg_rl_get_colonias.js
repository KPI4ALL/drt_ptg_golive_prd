/**
 * @NApiVersion 2.1
 * @NScriptType Restlet
 */
 define(['N/search', 'N/query'],
 /**
* @param{search} search
*/
 (search, query) => {
     /**
      * Defines the function that is executed when a GET request is sent to a RESTlet.
      * @param {Object} requestParams - Parameters from HTTP request URL; parameters passed as an Object (for all supported
      *     content types)
      * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
      *     Object when request Content-Type is 'application/json' or 'application/xml'
      * @since 2015.2
      */
     const get = (requestParams) => {
     }

     /**
      * Defines the function that is executed when a PUT request is sent to a RESTlet.
      * @param {string | Object} requestBody - The HTTP request body; request body are passed as a string when request
      *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
      *     the body must be a valid JSON)
      * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
      *     Object when request Content-Type is 'application/json' or 'application/xml'
      * @since 2015.2
      */
     const put = (requestBody) => {

     }

     /**
      * Defines the function that is executed when a POST request is sent to a RESTlet.
      * @param {string | Object} requestBody - The HTTP request body; request body is passed as a string when request
      *     Content-Type is 'text/plain' or parsed into an Object when request Content-Type is 'application/json' (in which case
      *     the body must be a valid JSON)
      * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
      *     Object when request Content-Type is 'application/json' or 'application/xml'
      * @since 2015.2
      */
     const post = (requestBody) => {
         let response = {
             success: true,
             data: []
         }                
         try {
             
             let sql = `SELECT
                            RUT.id,
                            COL.name
                        FROM
                            CUSTOMRECORD_PTG_COLONIASRUTAS_ RUT
                        LEFT JOIN CUSTOMRECORD_PTG_COLONIA_COL_RUT COL ON
                            COL.id = RUT.custrecord_ptg_nombrecolonia_            
                        LEFT JOIN MAP_customrecord_ptg_coloniasrutas__custrecord_ptg_rutacil_ cust1 ON
                            RUT.id = cust1.mapone 
                        LEFT JOIN 
                            location rutaCil ON cust1.maptwo = rutaCil.id
                        LEFT JOIN MAP_customrecord_ptg_coloniasrutas__custrecord_ptg_rutaest_ cust2 ON
                            RUT.id = cust2.mapone 
                        LEFT JOIN 
                            location rutaEst ON cust2.maptwo = rutaEst.id     
                        WHERE
                            RUT.isinactive = 'F' ` 
                            
                        if(requestBody.estado) {
                            sql += ` AND RUT.custrecord_ptg_estado_ = '${requestBody.estado}' `
                        }

                        if(requestBody.municipio) {
                            sql += ` AND RUT.custrecord_ptg_rutamunicipio_ = '${requestBody.municipio}' 
                                     AND RUT.custrecord_ptg_rutamunicipio_ IS NOT NULL `
                        }

                        if(requestBody.planta) {
                            sql += ` AND
                                        (rutaCil.fullname like '${requestBody.planta}%' OR
                                        rutaEst.fullname like '${requestBody.planta}%') `
                        };

                        sql += ` GROUP BY RUT.id, COL.name`

             let resultIterator = query.runSuiteQLPaged({
                 query: sql,
                 pageSize: 1000
             }).iterator();

             let data = [];
             resultIterator.each(function (page) {
                 let pageIterator = page.value.data.iterator();
                 pageIterator.each(function (row) {
                     //log.debug('ID: ' + row.value.getValue(0) + ', Context: ' + row.value.getValue(1));
                     let obj = {};
                     log.debug('data', row)
                     
                     if (!!row.value.getValue(0)) {
                         obj.id = row.value.getValue(0);
                         obj.name = row.value.getValue(1);
                         data.push(obj);
                     }

                     return true;
                 });
                 return true;
             });

             log.debug('data', data)
             response.success = true;
             response.data = data;
         } catch (error) {
             log.debug('error', error);
             response.message = error;
         }

         return response;

     }

     /**
      * Defines the function that is executed when a DELETE request is sent to a RESTlet.
      * @param {Object} requestParams - Parameters from HTTP request URL; parameters are passed as an Object (for all supported
      *     content types)
      * @returns {string | Object} HTTP response body; returns a string when request Content-Type is 'text/plain'; returns an
      *     Object when request Content-Type is 'application/json' or 'application/xml'
      * @since 2015.2
      */
     const doDelete = (requestParams) => {

     }

     return { get, put, post, delete: doDelete }

 });
