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

    addAnimals(name: string) : void {
        var id = Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);

        var newAnimal = { 'id': id, 'name': name };
        sessionStorage.setItem(newAnimal.id.toString(), JSON.stringify(newAnimal));
        this.storedAnimals.push(newAnimal);
    }

    updateAnimals(id: number, name: string) : void {
        var animalToUpdate = JSON.parse(sessionStorage.getItem(id.toString()));
        animalToUpdate.name = name;
        sessionStorage.setItem(id.toString(), JSON.stringify(animalToUpdate));
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
                sessionStorage.setItem(ANIMALS[i].id.toString(), JSON.stringify({ 'id': ANIMALS[i].id.toString(), 'name': ANIMALS[i].name }));
            }
        }
    }
}
