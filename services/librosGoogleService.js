var LibrosGoogleService = (function () {
    function LibrosGoogleService($http) {
        var _this = this;
        this.getGoogleLibros = function (texto, autor) {
            if (texto === void 0) { texto = 'millenium'; }
            if (autor === void 0) { autor = 'stieg'; }
            var url = "https://www.googleapis.com/books/v1/volumes?q=" + texto + "+inauthor:" + autor + "&key=AIzaSyCX9_wCDRlpRHv4dIdxU0fF_tEGqX6v718";
            console.trace('GET ' + url);
            return _this.http.get(url).then(function (res) {
                console.debug('peticcion correcta %o', res);
                return res.data;
            });
        };
        console.trace('LibrosGoogleService constructor');
        this.http = $http;
    }
    return LibrosGoogleService;
}());
//# sourceMappingURL=librosGoogleService.js.map