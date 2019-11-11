interface ILibrosGoogleService{

    /**
     * peticion GET para obtener todos los libros
     * @return   OK angular.IPromise<ILibro[]>    Error angular.IPromise<ng.IHttpResponse<T>>
     */
    getGoogleLibros(texto?: string, autor?: string): angular.IPromise<any[]>;


  }
  
  class LibrosGoogleService implements ILibrosGoogleService {
  
    private http: ng.IHttpService;
  
    constructor($http) {
      console.trace('LibrosGoogleService constructor');
      this.http = $http;
    }
  
    public getGoogleLibros = (texto='millenium', autor='stieg'): angular.IPromise<any> => {
  
        const url = "https://www.googleapis.com/books/v1/volumes?q=" + texto + "+inauthor:" + autor + "&key=";
        console.trace('GET ' + url);
        return this.http.get(url).then( 
            (res) => { 
                console.debug('peticcion correcta %o', res);
                return res.data;
            });
    } 
    
    
  }
  