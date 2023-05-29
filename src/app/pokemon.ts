
export interface IPokemon  {
    numero: number ;
    name: string;
    tipo: string;
    tipos: string [];
    imagem: string;
    imagem_2: string;
    evolucoes: string []; 
    peso: number;
    altura: number;
    stats: string [];
    stat: string [];
    especies: string [];
    url: string;
    
}
export interface Evolucao {
    nome: string ;
    numero: number;
    imagem: string ;
    imagem_2: string ;
    tipo_2: string;
    tipos_2: string [];
}
export interface IPokeFoto{
    nome: string;
    foto: string;
    fotoR: string;
    url: string;
    tipo: string [];
    number: number;
}
export interface IPokeEvo {
    species:string, url:string;
    species1: string, url1:string;
    species2: string, url2:string;
}
