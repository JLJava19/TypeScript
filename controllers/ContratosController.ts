interface IContratosController extends ng.IScope{
    vm: ContratosController;
}

class ContratosController implements ng.IController{

    public titulo: string;
    public contratos: any;
    public contratosMapeados: Array<IContratoResumen>;
    public contratosSinAcciones: Array<any>;
    public contratosAccionesEntre1y3: Array<any>;
    public contratosAccionesMayor3: Array<any>;
    public primerContratoAccionClaveSituacion: Array<any>;
    public ultimoContratoAccionClaveSituacion: Array<any>;
    public acciones: Array<string>;

    public static $inject = ["$scope", "contratosJson"];

    constructor(private $scope: IContratosController, private contratosJson: any){
        $scope.vm = this;
        $scope.vm.titulo = "Contratos Titulo";
        $scope.vm.contratos = $scope.vm.contratosJson;
    
        // Contratos ordenados a nuestro gusto para poder ordenar
        $scope.vm.contratosMapeados = $scope.vm.contratos.map( (elem)=>{
            return {
                    "id":elem.idColumn,
                    "nombre":(elem.nombre)?elem.nombre:"Sin nombre",
                    "numeroAcciones":(elem.ACCIONES)?elem.ACCIONES.length:0
                    }

        } );
        console.debug('contratos mapeados %o' + $scope.vm.contratosMapeados);

        // Numero de contratos sin acciones
        $scope.vm.contratosSinAcciones = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES == undefined || v.ACCIONES.length==0){
                // tambien se puede poner !v.ACCIONES
                return  true;
                   
              }else{
                  return false;
              }
        } );

        /* $scope.vm.contratosSinAcciones = this.contratosJson.
                                            filter( elem =>  !elem.ACCIONES || elem.ACCIONES.length == 0); */

        // Numero de contratos entre 1 y 3 acciones
        $scope.vm.contratosAccionesEntre1y3 = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES != undefined ){

                return  (v.ACCIONES.length >= 1 && v.ACCIONES.length <= 3) ;
                   
              }else{
                  return false;
              }
        } );

        /* $scope.vm.contratosAcciones13 = this.contratosJson.
                                                filter( elem => elem.ACCIONES && elem.ACCIONES.length > 0 && elem.ACCIONES.length <= 3 ); */

        // Numero de contratos de > 3 caracteres
        
        $scope.vm.contratosAccionesMayor3 = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES != undefined ){

                return  (v.ACCIONES.length > 3) ;
                   
              }else{
                  return false;
              }
        } );
        /* $scope.vm.contratosAccionesMasDe3 = this.contratosJson.
                                                filter( elem => elem.ACCIONES && elem.ACCIONES.length > 3 ); */
        // Buscar Primer contrato que tenga en ACCIONES "clave":situacion
        $scope.vm.primerContratoAccionClaveSituacion= this.contratosJson.
                            filter( (elem) => elem.ACCIONES && elem.ACCIONES.length > 0 ). //filtramos que tengan ACCIONES                           
                            find( (elem) => 
                                // dentro del array de ACCIONES, buscamos la clave
                                elem.ACCIONES.find( (elem)=> elem.clave === "SITUACION" ) 
                            );
        // Buscar último contrato que tenga en ACCIONES "clave":situacion
        $scope.vm.ultimoContratoAccionClaveSituacion = this.contratosJson.reverse(). // dar la vuelta al array
                            filter( (elem) => elem.ACCIONES && elem.ACCIONES.length > 0 ). //filtramos que tengan ACCIONES                           
                            find( (elem) => 
                                // dentro del array de ACCIONES, buscamos la clave
                                elem.ACCIONES.find( (elem)=> elem.clave === "SITUACION" ) 
                            );  
        // Todas las acciones diferentes
        
        let accionesDuplicadas: Array<any> = $scope.vm.contratos
            .filter(c => c.ACCIONES && c.ACCIONES.length > 0) // coger solo arrays con datos
            .map(c => c.ACCIONES)                             // quedarnos con las acciones            
            .reduce(function(a, b) {                          // reducir los subarrays a 1 array                             
                return a.concat(b);
            })            
            .map(x => x.titulo);                              // quedarnos con el titulo de la accion

        $scope.vm.acciones = [...new Set(accionesDuplicadas)].sort(); // eliminar duplicados y ordena
        
        /*
        // filtro para obtener todos los contratos con acciones
        $scope.vm.temporal = $scope.vm.contratos.filter((elem)=> elem.ACCIONES != "" && elem.ACCIONES != undefined);
        console.debug('temporales %o', $scope.vm.temporal);

        //filtro para obtener todos los tipos de contratos
        $scope.vm.temp = $scope.vm.temporal.map((elem)=>elem.ACCIONES.map(e => e.titulo).flat());
        $scope.vm.todasAcciones = $scope.vm.temp.flat().filter((v,i,a)=> a.indexOf(v)===i);
        console.debug('temporales unidos %o',$scope.vm.temp);
        console.debug('acciones %o',$scope.vm.todasAcciones);
        */
    } //Constructor

}