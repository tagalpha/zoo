import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { ANIMALS } from './mock-animals';
import { Nutriment } from './../nutriment/nutriment';

@Injectable()
export class AnimalService {
    storedAnimals = [];

    getAnimals(): Promise<Animal[]> {
        return Promise.resolve(this.storedAnimals);
    }

    getAnimal(id: number): Promise<Animal> {
        return this.getAnimals()
            .then(animals => animals.find(animal => animal.id === id));
    }

    addAnimals(animal: Animal) : void {
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
        sessionStorage.setItem('animal_' + newAnimal.id.toString(), JSON.stringify(newAnimal));
        this.storedAnimals.push(newAnimal);
    }

    updateAnimals(animal: Animal) : void {
        var animalToUpdate = JSON.parse(sessionStorage.getItem('animal_' + animal.id.toString()));
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
        sessionStorage.setItem('animal_' + animal.id.toString(), JSON.stringify(animalToUpdate));

        var storedAnimalToEdit = this.storedAnimals.filter((animalToEdit) => {
            return animalToEdit.id == animal.id;
        });
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

    deleteAnimals(animal: Animal) : void {
        sessionStorage.removeItem('animal_' + animal.id.toString());
        const index = this.storedAnimals.indexOf(animal);

        if(-1 < index) {
            this.storedAnimals.splice(index,  1);
        }
    }

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

    addNutriment(animal: Animal,  nutriment: Nutriment): void {
        var animalToUpdate = JSON.parse(sessionStorage.getItem('animal_' + animal.id.toString()));
        var storedAnimalToEdit = this.storedAnimals.filter((animalToEdit) => {
            return animalToEdit.id == animal.id;
        });

        var oldNutriment = animalToUpdate.nutriment;
        if (oldNutriment.indexOf(nutriment.name) === -1) {
            animalToUpdate.nutriment = nutriment.name + ', ' + oldNutriment;
            storedAnimalToEdit[0].nutriment = nutriment.name + ', ' + oldNutriment;
        }
        sessionStorage.setItem('animal_' + animal.id.toString(), JSON.stringify(animalToUpdate));

    }

    hydrateBdd(): void {
        var storageKeys = Object.keys(sessionStorage);
        var animalKeys = [];
        for (var j = 0; j < storageKeys.length; j++) {
            if (storageKeys[j].indexOf('animal_') != -1) {
                animalKeys.push(storageKeys[j]);
            }
        }
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
