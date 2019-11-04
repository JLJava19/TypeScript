interface IContratoResumen{
    id: string;
    nombre: string;
    numeroAcciones: number;
}

interface IContratosController extends ng.IScope{
    vm: ContratosController;
}

class ContratosController implements ng.IController{

    public titulo: string;
    public contratos: any;
    public contratosMapeados: Array<IContratoResumen>;
    public contratosSinAcciones: any;
    public contratosAccionesEntre1y3: any;
    public contratosAccionesMayor3: any;
    public contratosAccionesClaveSituacion: any;

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
            if ( v.ACCIONES == undefined ){

                return  true;
                   
              }else{
                  return false;
              }
        } );
        // Numero de contratos entre 1 y 3 acciones
        $scope.vm.contratosAccionesEntre1y3 = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES != undefined ){

                return  (v.ACCIONES.length >= 1 && v.ACCIONES.length <= 3) ;
                   
              }else{
                  return false;
              }
        } );
        // Numero de contratos de > 3 caracteres
        
        $scope.vm.contratosAccionesMayor3 = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES != undefined ){

                return  (v.ACCIONES.length > 3) ;
                   
              }else{
                  return false;
              }
        } );
        // Todas las acciones diferentes
        
        // Buscar Primer contrato que tenga en ACCIONES "clave":situacion
        $scope.vm.contratosAccionesClaveSituacion = $scope.vm.contratos.filter( (v)=>{
            if ( v.ACCIONES == undefined ){

                return  true;
                   
              }else{
                  return false;
              }
        } );
        //.map( e => e.ACCIONES.clave!=undefined );
        //.find( (e)=>{e.ACCIONES.clave=="SITUACION"} );
        // Buscar último contrato que tenga en ACCIONES "clave":situacion

    } //Constructor

}