import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
import { Nutriment } from './../nutriment/nutriment';

/* Class AnimalService
 *
 * Permet la gestion complète des animaux
 *
 * Map des fonctions :
 * getAnimals() => Fonction permettant de récupérer tous les animaux
 * getAnimal() => Fonction permettant de récupérer un animal
 * addAnimals() => Fonction de création
 * updateAnimals() => Fonction d'édition
 * deleteAniamls() => Fonction de suppression
 * setStoredAnimals() => Fonction d'ajout d'un animal dans le session storage
 * addNutriment() => Fonction permettant de rattacher un nutriment à un animal
 * hydrateBdd() => Fonction générant des dataFixtures
*/
@Injectable()
export class AnimalService {
    // Tableau contenant tous les animaux permettant à Angular d'afficher les
    // données dynamiquement
    storedAnimals = [];

    /*
     * Permet de récupérer la liste complète des animaux
    */
    getAnimals(): Promise<Animal[]> {
        return Promise.resolve(this.storedAnimals);
    }

    /*
     * Permet de récupérer de récupérer un animal grâce à son id
    */
    getAnimal(id: number): Promise<Animal> {
        return this.getAnimals()
            .then(animals => animals.find(animal => animal.id === id));
    }

    /*
     * Créer un Objet de type Animal à partir des informations récupérées dans
     * le formulaire de création d'un animal.
    */
    addAnimals(animal: Animal) : void {
        // Création d'une instance d'un objet Animal
        var newAnimal = {
            'id': animal.id,
            'name': animal.name,
            'race': animal.race,
            'size': animal.size,
            'weight': animal.weight,
            'origin': animal.origin,
            'description': animal.description,
            'picture': animal.picture,
            'gender': animal.gender,
            'nutriment': animal.nutriment,
            'lat': animal.lat,
            'lng': animal.lng,
        };

        // Enregistrement du nouvel objet Animal dans le sessionStorage
        sessionStorage.setItem('animal_' + newAnimal.id.toString(), JSON.stringify(newAnimal));
        this.storedAnimals.push(newAnimal);
    }

    /*
     * Modifie les informations d'un animal à partir des informations envoyées
     * par le formulaire de modification d'un animal
    */
    updateAnimals(animal: Animal) : void {
        // Récupération dans le sessionStorage de l'animal à modifier
        var animalToUpdate = JSON.parse(sessionStorage.getItem('animal_' + animal.id.toString()));

        // Modification des éléments de l'objet
        animalToUpdate.name = animal.name;
        animalToUpdate.race = animal.race;
        animalToUpdate.size = animal.size;
        animalToUpdate.weight = animal.weight;
        animalToUpdate.origin = animal.origin;
        animalToUpdate.description = animal.description;
        animalToUpdate.picture = animal.picture;
        animalToUpdate.gender = animal.gender;
        animalToUpdate.nutriment = animal.nutriment;
        animalToUpdate.lat = animal.lat;
        animalToUpdate.lng = animal.lng;

        // Enregistre l'animal modifié en bdd
        sessionStorage.setItem('animal_' + animal.id.toString(), JSON.stringify(animalToUpdate));

        // Récupération dans le tableau d'animaux
        var storedAnimalToEdit = this.storedAnimals.filter((animalToEdit) => {
            return animalToEdit.id == animal.id;
        });

        // Modification des éléments de l'objet
        // Enregistre l'animal modifié dans le tableau
        storedAnimalToEdit[0].name = animal.name;
        storedAnimalToEdit[0].race = animal.race;
        storedAnimalToEdit[0].size = animal.size;
        storedAnimalToEdit[0].weight = animal.weight;
        storedAnimalToEdit[0].origin = animal.origin;
        storedAnimalToEdit[0].description = animal.description;
        storedAnimalToEdit[0].picture = animal.picture;
        storedAnimalToEdit[0].gender = animal.gender;
        storedAnimalToEdit[0].nutriment = animal.nutriment;
        storedAnimalToEdit[0].lat = animal.lat;
        storedAnimalToEdit[0].lng = animal.lng;
    }

    /*
     * Supprime l'animal sélectionner par l'utilisateur
    */
    deleteAnimals(animal: Animal) : void {
        // Récupération dans le sessionStorage de l'animal sélectionné par
        // L'utilisateur et le supprimer
        sessionStorage.removeItem('animal_' + animal.id.toString());

        // Récupération dans le tableau des animaux et le supprime
        const index = this.storedAnimals.indexOf(animal);

        if (-1 < index) {
            this.storedAnimals.splice(index,  1);
        }
    }

    /*
     * Rempli le tableau avec la liste des animaux disponible sur le sessionStorage
    */
    setStoredAnimals(): void {
        var keys = Object.keys(sessionStorage);
        var animalKeys = [];

        for (var j = 0; j < keys.length; j++) {
            if (keys[j].indexOf('animal_') != -1) {
                animalKeys.push(keys[j]);
            }
        }

        for (var i = 0; i < animalKeys.length; i++) {
            this.storedAnimals.push(JSON.parse(sessionStorage.getItem(animalKeys[i])));
        }
    }

    /*
     * Permet d'ajouter un nutriment à un animal
    */
    addNutriment(animal: Animal,  nutriment: Nutriment): void {
        // Récupération dans le sessionStorage l'animal à modifier
        var animalToUpdate = JSON.parse(sessionStorage.getItem('animal_' + animal.id.toString()));
        // Récupération dans le tableau contenant les animaux
        var storedAnimalToEdit = this.storedAnimals.filter((animalToEdit) => {
            return animalToEdit.id == animal.id;
        });

        // Permet de compléter la liste des nutriments sans l'écraser
        var oldNutriment = animalToUpdate.nutriment;
        
        if (oldNutriment.indexOf(nutriment.name) === -1) {
            animalToUpdate.nutriment = nutriment.name + ', ' + oldNutriment;
            storedAnimalToEdit[0].nutriment = nutriment.name + ', ' + oldNutriment;
        }

        // Modifie l'aniaml dans le sessionStorage
        sessionStorage.setItem('animal_' + animal.id.toString(), JSON.stringify(animalToUpdate));

    }

    /*
     * Rempli le sessionStorage s'il n'y a pas d'animaux dedans
    */
    hydrateBdd(): void {
        // Récupération dans le sessionStorage des clées correspondant à des
        // animaux
        var storageKeys = Object.keys(sessionStorage);
        var animalKeys = [];

        for (var j = 0; j < storageKeys.length; j++) {
            if (storageKeys[j].indexOf('animal_') != -1) {
                animalKeys.push(storageKeys[j]);
            }
        }

        // Dans le cas ou il n'y a aucun animal on rempli le sessionStorage
        // avec le mock ANIMALS
        if (animalKeys.length === 0) {
            for (var i = 0; i < ANIMALS.length; i++) {
                sessionStorage.setItem('animal_' + ANIMALS[i].id.toString(), JSON.stringify({
                    'id': ANIMALS[i].id,
                    'name': ANIMALS[i].name,
                    'race': ANIMALS[i].race,
                    'size': ANIMALS[i].size,
                    'weight': ANIMALS[i].weight,
                    'origin': ANIMALS[i].origin,
                    'description': ANIMALS[i].description,
                    'picture': ANIMALS[i].picture,
                    'gender': ANIMALS[i].gender,
                    'nutriment': ANIMALS[i].nutriment,
                    'lat': ANIMALS[i].lat,
                    'lng': ANIMALS[i].lng,
                }));
            }
        }
    }
}
