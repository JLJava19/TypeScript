interface IContratosController extends ng.IScope{
    vm: ContratosController;
}

class ContratosController implements ng.IController{

    public titulo: string;
    public contratos: any;

    public static $inject = ["$scope", "contratosJson"];

    constructor(private $scope: IContratosController, private contratosJson: any){
        $scope.vm = this;
        $scope.vm.titulo = "Contratos Titulo";
        $scope.vm.contratos = $scope.vm.contratosJson;
    } //Constructor

}