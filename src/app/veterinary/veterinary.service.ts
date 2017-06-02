import { Injectable } from '@angular/core';
import { Veterinary } from './veterinary';
import { VETERINARIES } from './mock-veterinaries';

/* Class VeterinaryService
 *
 * Permet la gestion complète des animaux
 *
 * Map des fonctions :
 * getVeterinaries() => Fonction permettant de récupérer tous les vétérinaires
 * getVeterinary() => Fonction permettant de récupérer un vétérinaire
 * addVeterinary() => Fonction de création
 * updateVeterinaries() => Fonction d'édition
 * deleteVeterinary() => Fonction de suppression
 * setStoredVeterinaries() => Fonction d'ajout d'un vétérinaire dans le session storage
 * hydrateBdd() => Fonction générant des dataFixtures
*/
@Injectable()
export class VeterinaryService {
    // Tableau contenant tous les vétérinaires permettant à Angular d'afficher les
    // données dynamiquement
    storedVeterinary = [];

    /*
     * Permet de récupérer la liste complète des vétérinaires
    */
    getVeterinaries(): Promise<Veterinary[]> {
        return Promise.resolve(this.storedVeterinary);
    }

    /*
     * Permet de récupérer de récupérer un vétérinaire grâce à son id
    */
    getVeterinary(id: number): Promise<Veterinary> {
        return this.getVeterinaries()
            .then(veterinaries => veterinaries.find(veterinary => veterinary.id === id));
    }

    /*
     * Créer un Objet de type Veterinary à partir des informations récupérées dans
     * le formulaire de création d'un vétérinaire.
    */
    addVeterinary(veterinary: Veterinary) : void {
        // Création d'une instance d'un objet Animal
        var newVeterinary = {
            'id': veterinary.id,
            'name': veterinary.name,
            'lat': veterinary.lat,
            'lng': veterinary.lng,
        };

        // Enregistrement du nouvel objet Animal dans le sessionStorage
        sessionStorage.setItem('veterinary_' + newVeterinary.id.toString(), JSON.stringify(newVeterinary));
        this.storedVeterinary.push(newVeterinary);
    }

    /*
     * Modifie les informations d'un vétérinaires à partir des informations envoyées
     * par le formulaire de modification d'un vétérinaires
    */
    updateVeterinaries(veterinary: Veterinary) : void {
        // Récupération dans le sessionStorage du vétérinaire à modifier
        var veterinaryToUpdate = JSON.parse(sessionStorage.getItem('veterinary_' + veterinary.id.toString()));

        // Modification des éléments de l'objet
        veterinaryToUpdate.name = veterinary.name;
        veterinaryToUpdate.lat = veterinary.lat;
        veterinaryToUpdate.lng = veterinary.lng;

        // Enregistre le vétérinaires modifié en bdd
        sessionStorage.setItem('veterinary_' + veterinary.id.toString(), JSON.stringify(veterinaryToUpdate));

        // Récupération dans le tableau des vétérinaires
        var storedVeterinaryToEdit = this.storedVeterinary.filter((veterinaryToEdit) => {
            return veterinaryToEdit.id == veterinary.id;
        });

        // Modification des éléments de l'objet
        // Enregistre le vétérinaires modifié dans le tableau
        storedVeterinaryToEdit[0].name = veterinary.name;
        storedVeterinaryToEdit[0].lat = veterinary.lat;
        storedVeterinaryToEdit[0].lng = veterinary.lng;
    }

    /*
     * Supprime le vétérinaire sélectionner par l'utilisateur
    */
    deleteVeterinary(veterinary: Veterinary) : void {
        // Récupération dans le sessionStorage du vétérianire sélectionné par
        // Le vétérinaire et le supprimer
        sessionStorage.removeItem('veterinary_' + veterinary.id.toString());

        // Récupération dans le tableau des vétérinaires et le supprime
        const index = this.storedVeterinary.indexOf(veterinary);

        if(-1 < index) {
            this.storedVeterinary.splice(index,  1);
        }
    }

    /*
     * Rempli le tableau avec la liste des vétérinaires disponible sur le sessionStorage
    */
    setStoredVeterinaries(): void {
        var keys = Object.keys(sessionStorage);
        var veterinaryKeys = [];

        for (var j = 0; j < keys.length; j++) {
            if (keys[j].indexOf('veterinary_') != -1) {
                veterinaryKeys.push(keys[j]);
            }
        }
        
        for (var i = 0; i < veterinaryKeys.length; i++) {
            this.storedVeterinary.push(JSON.parse(sessionStorage.getItem(veterinaryKeys[i])));
        }
    }

    /*
     * Rempli le sessionStorage s'il n'y a pas de vétérinaires dedans
    */
    hydrateBdd(): void {
        // Récupération dans le sessionStorage des clées correspondant à des
        // animaux
        var storageKeys = Object.keys(sessionStorage);
        var veterinaryKeys = [];

        for (var j = 0; j < storageKeys.length; j++) {
            if (storageKeys[j].indexOf('veterinary_') != -1) {
                veterinaryKeys.push(storageKeys[j]);
            }
        }

        // Dans le cas ou il n'y a aucun vétérinaires on rempli le sessionStorage
        // avec le mock VETERINARIES
        if (veterinaryKeys.length === 0) {
            for (var i = 0; i < VETERINARIES.length; i++) {
                sessionStorage.setItem('veterinary_' + VETERINARIES[i].id.toString(), JSON.stringify({
                    'id': VETERINARIES[i].id,
                    'name': VETERINARIES[i].name,
                    'lat': VETERINARIES[i].lat,
                    'lng': VETERINARIES[i].lng,
                }));
            }
        }
    }
}
