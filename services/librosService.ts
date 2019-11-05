interface ILibrosService {
    
    /**
     * Petidion GET para obtener los resultados de los libros
     * @see http://http://127.0.0.1:3000/libros
     * @return Promesa con array de ILibro
     */
    getLibros(): angular.IPromise<ILibro[]>;

    // TODO Esto queda pendientes
    getLibroDetalle(id: number): angular.IPromise<ILibro>;

    delete(id: number): angular.IPromise<boolean>;

    crearLibro(libro: ILibro): angular.IPromise<ILibro>;
    /**
     * Modifica un ILibro existente
     * @param id identificador del libro a modificar
     * @param libro libro para modificar
     * @return true si modifica, false en caso contrario
     */
    modificar(id: number, libro: ILibro): angular.IPromise<boolean>;

}
  
class LibrosService implements ILibrosService {
    //let url = "http://http://127.0.0.1:3000/libros";
    private http: ng.IHttpService;
  
    constructor($http) {
      this.http = $http;
    }
    /*
    public getLibros = (): angular.IPromise<ILibro[]> => {
        return this.http.get<any>("http://http://127.0.0.1:3000/libros").then(result => {
          return result.data;
        });
    }
    */
    public getLibros = ():any => {

    let url = "http://127.0.0.1:3000/libros";
    console.trace('GET ' + url);
    return this.http.get(url).then( 
        (res) => { 
            console.debug('peticcion correcta %o', res);
            return res.data;
        },
        (res)=>{
            console.debug('peticcion INcorrecta %o', res);
            return res;
        });
    } 

    getLibroDetalle(id: number): angular.IPromise<ILibro> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): angular.IPromise<boolean> {
        throw new Error("Method not implemented.");
    }
    crearLibro(libro: ILibro): angular.IPromise<ILibro> {
        throw new Error("Method not implemented.");
    }
    modificar(id: number, libro: ILibro): angular.IPromise<boolean> {
        throw new Error("Method not implemented.");
    }
  
    
    /*
    public getDrivers = (): angular.IPromise<IDriverStanding[]> => {
      return this.http.get<any>("http://ergast.com/api/f1/2017/driverStandings.json").then(result => {
        return result.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      });
    }
  
    public getDriverDetails = id => {
      return this.http
        .get<any>("http://ergast.com/api/f1/2017/drivers/" + id + "/driverStandings.json")
        .then(response => {
          return response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        });
    }
  
    public getDriverRaces = id => {
      return this.http
        .get<any>("http://ergast.com/api/f1/2017/drivers/" + id + "/results.json")
        .then(response => {
          return response.data.MRData.RaceTable.Races;
        });
    }
  
  
    public getCircuitos = (): angular.IPromise<ICircuito[]> => {
  
      let url = 'http://ergast.com/api/f1/circuits.json';
      console.trace('ErgastService getCircuitos ' + url);
  
      return this.http.get(url).then(
        (response)=>{
          console.debug("llamada correcta %o ", response);
          const circuitsJson = response.data['MRData'].CircuitTable.Circuits;        
          return circuitsJson;
        }
      );
  
    }
    //getCircuitos
    */
  }