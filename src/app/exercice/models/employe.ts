import { Affiliation } from "./affiliation";
import { Diplome } from "./diplome";

export interface Employe {
    id:string;
    matricule:string;
    nom:string;
    affiliation: Affiliation;
    diplomes?: Diplome[];
}
