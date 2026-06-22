/*
 
Clase encargada de construir la respuesta del api estandar

*/

export class ResponseHelper {
/*
Respuesta exitosa
*/


  static succes(data:any,
      statusCode= 200,){
      return {succes:true,
          statusCode,
          data}}

/**
respuesta de error
*/



static error(message: string, status: number = 400) {
  return {
    success: false,
    status: status,
    message,};}
}