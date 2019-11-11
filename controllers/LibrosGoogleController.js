var LibrosGoogleController = (function () {
    function LibrosGoogleController($scope, librosGoogleService) {
        this.$scope = $scope;
        this.librosGoogleService = librosGoogleService;
        console.trace('LibrosGoogleController constructor');
        this.$scope.vm = this;
        $scope.vm.mensaje = undefined;
        $scope.vm.librosGoogle = [];
        $scope.vm.inputTexto;
        $scope.vm.inputAutor;
        librosGoogleService.getGoogleLibros($scope.vm.inputTexto = 'millenium', $scope.vm.inputAutor = 'stieg').then(function (datos) {
            $scope.vm.libros = datos;
            $scope.vm.librosGoogle = $scope.vm.libros.items.map(function (e) {
                return {
                    id: e.id,
                    titulo: e.volumeInfo.title,
                    autores: e.volumeInfo.authors,
                    fechaPublicacion: e.volumeInfo.publishedDate,
                    editor: e.volumeInfo.publisher,
                    descripcion: e.volumeInfo.description,
                    numeroPaginas: e.volumeInfo.pageCount,
                    categorias: e.volumeInfo.categories,
                    imagen: e.volumeInfo.imageLinks,
                    idioma: e.volumeInfo.language,
                };
            });
            console.debug($scope.vm.librosGoogle);
        }, function (errorResponse) {
            console.warn('respuesta servicio en controlador %o', errorResponse);
            $scope.vm.mensaje = "Servicio Rest parado o incorrecto " + errorResponse.status;
        });
        this.buscar = function () {
            librosGoogleService.getGoogleLibros($scope.vm.inputTexto, $scope.vm.inputAutor).then(function (datos) {
                $scope.vm.libros = datos;
                $scope.vm.librosGoogle = $scope.vm.libros.items.map(function (e) {
                    return {
                        id: e.id,
                        titulo: e.volumeInfo.title,
                        autores: e.volumeInfo.authors,
                        fechaPublicacion: e.volumeInfo.publishedDate,
                        editor: e.volumeInfo.publisher,
                        descripcion: e.volumeInfo.description,
                        numeroPaginas: e.volumeInfo.pageCount,
                        categorias: e.volumeInfo.categories,
                        imagen: e.volumeInfo.imageLinks,
                        idioma: e.volumeInfo.language,
                    };
                });
                console.debug($scope.vm.librosGoogle);
            }, function (errorResponse) {
                console.warn('respuesta servicio en controlador %o', errorResponse);
                $scope.vm.mensaje = "Servicio Rest parado o incorrecto " + errorResponse.status;
            });
        };
    }
    LibrosGoogleController.$inject = ["$scope", "librosGoogleService"];
    return LibrosGoogleController;
}());
//# sourceMappingURL=LibrosGoogleController.js.map