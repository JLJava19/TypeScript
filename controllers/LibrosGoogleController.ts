interface ILibrosGoogleController extends ng.IScope{
    vm: LibrosGoogleController;
}

class LibrosGoogleController implements ng.IController{

    public static $inject = ["$scope", "librosGoogleService"];

    public librosGoogle: ILibrosGoogle[];
    public libros: any;
    public mensaje: string;
    public inputTexto: string;
    public inputAutor: string;

    //funciones
    public buscar: any;
 
    constructor( private $scope: ILibrosGoogleController, private librosGoogleService: ILibrosGoogleService){

        console.trace('LibrosGoogleController constructor');        
        this.$scope.vm = this;
        $scope.vm.mensaje = undefined;          
        $scope.vm.librosGoogle = [];
        $scope.vm.inputTexto;
        $scope.vm.inputAutor;

        //$scope.vm.mensaje = undefined;

        librosGoogleService.getGoogleLibros($scope.vm.inputTexto='millenium', $scope.vm.inputAutor='stieg').then( 
            (datos)=>{
                $scope.vm.libros = datos;
                $scope.vm.librosGoogle = $scope.vm.libros.items.map((e)=>{
                    return{
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
                    }
                })
                console.debug($scope.vm.librosGoogle);
            },
            (errorResponse)=>{
                console.warn('respuesta servicio en controlador %o', errorResponse);
                $scope.vm.mensaje = `Servicio Rest parado o incorrecto ${errorResponse.status}`;
            });
       
        /* Funciones 
        **************************************************************/    
      
    

        this.buscar = ()=>{
           librosGoogleService.getGoogleLibros($scope.vm.inputTexto, $scope.vm.inputAutor).then( 
            (datos)=>{
                $scope.vm.libros = datos;
                $scope.vm.librosGoogle = $scope.vm.libros.items.map((e)=>{
                    return{
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
                    }
                })
                console.debug($scope.vm.librosGoogle);
            },
            (errorResponse)=>{
                console.warn('respuesta servicio en controlador %o', errorResponse);
                $scope.vm.mensaje = `Servicio Rest parado o incorrecto ${errorResponse.status}`;
            });
        };
      

    } 
    // constructor   
} 