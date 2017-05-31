import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { ANIMALS } from './mock-animals';

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
        var id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        var newAnimal = {
            'id': id,
            'name': animal.name,
            'race': animal.race,
            'size': animal.size,
            'weight': animal.weight,
            'origin': animal.origin,
            'description': animal.description,
            'picture': animal.picture,
            'gender': animal.gender,
            'nutriment': animal.nutriment,
        };
        sessionStorage.setItem(newAnimal.id.toString(), JSON.stringify(newAnimal));
        this.storedAnimals.push(newAnimal);
    }

    updateAnimals(animal: Animal) : void {
        var animalToUpdate = JSON.parse(sessionStorage.getItem(animal.id.toString()));
        animalToUpdate.name = animal.name;
        animalToUpdate.race = animal.race;
        animalToUpdate.size = animal.size;
        animalToUpdate.weight = animal.weight;
        animalToUpdate.origin = animal.origin;
        animalToUpdate.description = animal.description;
        animalToUpdate.picture = animal.picture;
        animalToUpdate.gender = animal.gender;
        animalToUpdate.nutriment = animal.nutriment;
        sessionStorage.setItem(animal.id.toString(), JSON.stringify(animalToUpdate));
    }

    deleteAnimals(animal: Animal) : void {
        sessionStorage.removeItem(animal.id.toString());
        const index = this.storedAnimals.indexOf(animal);

        if(-1 < index) {
            this.storedAnimals.splice(index,  1);
        }
    }

    setStoredAnimals(): void {
        var keys = Object.keys(sessionStorage);
        for (var i = 0; i < keys.length; i++) {
            this.storedAnimals.push(JSON.parse(sessionStorage.getItem(keys[i])));
        }
    }

    hydrateBdd(): void {
        if (Object.keys(sessionStorage).length === 0) {
            for (var i = 0; i < ANIMALS.length; i++) {
                sessionStorage.setItem(ANIMALS[i].id.toString(), JSON.stringify({
                    'id': ANIMALS[i].id.toString(),
                    'name': ANIMALS[i].name,
                    'race': ANIMALS[i].race,
                    'size': ANIMALS[i].size,
                    'weight': ANIMALS[i].weight,
                    'origin': ANIMALS[i].origin,
                    'description': ANIMALS[i].description,
                    'picture': ANIMALS[i].picture,
                    'gender': ANIMALS[i].gender,
                    'nutriment': ANIMALS[i].nutriment,
                }));
            }
        }
    }
}
