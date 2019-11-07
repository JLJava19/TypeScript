interface ILibrosController extends ng.IScope{
    vm: LibrosController;
}

class LibrosController implements ng.IController{

    public static $inject = ["$scope", "librosService"];

    public libros: Array<ILibro>;
    public libroEditar: ILibro;
    public mensaje: string;

    //funciones
    public editar: any;
    public borrar: any;
    public guardar: any;
 
    constructor( private $scope: ILibrosController, private librosService: ILibrosService){

        console.trace('LibrosController constructor');        
        this.$scope.vm = this;
       // $scope.vm.mensaje = undefined;        
       // $scope.vm.libroEditar = undefined;    
        $scope.vm.libros = [];
        //$scope.vm.mensaje = undefined;

        librosService.getLibros().then( 
            (datos)=>{
                $scope.vm.libros = datos;
                console.debug($scope.vm.libros);
            },
            (errorResponse)=>{
                console.warn('respuesta servicio en controlador %o', errorResponse);
                $scope.vm.mensaje = `Servicio Rest parado o incorrecto ${errorResponse.status}`;
            });
       
        /* Funciones 
        **************************************************************/    

        this.editar = ( libro: ILibro ) => {
            console.debug('click boton editar %o', libro);
            $scope.vm.libroEditar = angular.copy(libro);
        };

        this.borrar = ( libro: ILibro)=>{
            console.debug('click boton borrar %s', libro.id);
            let book = libro;
            librosService.delete( book.id).then(
                ( data )=>{
                    console.info("libro borrado %o", data);
                    $scope.vm.mensaje = "Libro Borrado";
                    const posicion = $scope.vm.libros.indexOf(book);
                    $scope.vm.libros.splice( posicion , 1);
                },
                ( res)=>{
                    console.warn("No se puedo borrar %o", res);
                    $scope.vm.mensaje = "ERROR borrando";
                }
            );

        };

        this.guardar = ()=>{
            const lib = $scope.vm.libroEditar;
            console.debug('submitado formulario %o', lib );

            if (!lib.digital){
                lib.formatos = undefined;
            }

            //validar si es digital, al menos un formato
            if ( lib.digital && !lib.formatos ){
                $scope.vm.mensaje = "*Es Necesario seleccionar algun formato";
                return false; // break de java
            }

            if ( lib.id ){     // modificar

                librosService.modificar( lib.id, lib).then(
                    ( data )=>{
                        console.info("libro editado %o", data);
                        $scope.vm.mensaje = "Libro Modificado";
                        // toastr.success('Libro Modificado!', 'LibreriaIpartek');
                        //TODO actualizar listado libros
                        let book = $scope.vm.libros.find( e => e.id==lib.id);
                        const posicion = $scope.vm.libros.indexOf(book);
                        $scope.vm.libros[posicion] = lib;
                        $scope.vm.libroEditar = undefined
                    },
                    ( res)=>{
                        console.warn("No se puedo editar %o", res);
                        $scope.vm.mensaje = "ERROR modificando";
                    }
                );

            }else{                              // insertar nuevo


                librosService.crear(lib).then(
                    ( data )=>{
                        console.info("libro nuevo %o", data);
                        $scope.vm.mensaje = "Libro Nuevo Creado";
                        $scope.vm.libros.push(data); 
                        //$scope.vm.libroEditar = undefined;
                    },
                    ( res)=>{
                        console.warn("No se puedo crear libro %o", res);
                        $scope.vm.mensaje = "ERROR creando Libro";
                    }
                );

            }


        };


    } 
    // constructor   
} 