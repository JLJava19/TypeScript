interface IAutor{
    nombreAutor: string
}

interface ICategoria{
    nombreeCategoria: string
}

interface ILibrosGoogle{
    id: string;
    titulo: string;
    autores: string[];
    fechaPublicacion: string;
    editor: string;
    descripcion: string;
    numeroPaginas: number;
    categorias: string[];
    imagen: string[];
    idioma: string;

}