var ContratosController = (function () {
    function ContratosController($scope, contratosJson) {
        this.$scope = $scope;
        this.contratosJson = contratosJson;
        $scope.vm = this;
        $scope.vm.titulo = "Contratos Titulo";
        $scope.vm.contratos = $scope.vm.contratosJson;
        $scope.vm.contratosMapeados = $scope.vm.contratos.map(function (elem) {
            return {
                "id": elem.idColumn,
                "nombre": (elem.nombre) ? elem.nombre : "Sin nombre",
                "numeroAcciones": (elem.ACCIONES) ? elem.ACCIONES.length : 0
            };
        });
        console.debug('contratos mapeados %o' + $scope.vm.contratosMapeados);
        $scope.vm.contratosSinAcciones = $scope.vm.contratos.filter(function (v) {
            if (v.ACCIONES == undefined) {
                return true;
            }
            else {
                return false;
            }
        });
        $scope.vm.contratosAccionesEntre1y3 = $scope.vm.contratos.filter(function (v) {
            if (v.ACCIONES != undefined) {
                return (v.ACCIONES.length >= 1 && v.ACCIONES.length <= 3);
            }
            else {
                return false;
            }
        });
        $scope.vm.contratosAccionesMayor3 = $scope.vm.contratos.filter(function (v) {
            if (v.ACCIONES != undefined) {
                return (v.ACCIONES.length > 3);
            }
            else {
                return false;
            }
        });
        $scope.vm.contratosAccionesClaveSituacion = $scope.vm.contratos.filter(function (v) {
            if (v.ACCIONES == undefined) {
                return true;
            }
            else {
                return false;
            }
        });
    }
    ContratosController.$inject = ["$scope", "contratosJson"];
    return ContratosController;
}());
//# sourceMappingURL=ContratosController.js.map