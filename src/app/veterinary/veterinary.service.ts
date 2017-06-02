import { Injectable } from '@angular/core';
import { Veterinary } from './veterinary';
import { VETERINARIES } from './mock-veterinaries';

@Injectable()
export class VeterinaryService {
    storedVeterinary = [];

    getVeterinaries(): Promise<Veterinary[]> {
        return Promise.resolve(this.storedVeterinary);
    }

    getVeterinary(id: number): Promise<Veterinary> {
        return this.getVeterinaries()
            .then(veterinaries => veterinaries.find(veterinary => veterinary.id === id));
    }

    addVeterinary(veterinary: Veterinary) : void {
        var newVeterinary = {
            'id': veterinary.id,
            'name': veterinary.name,
            'lat': veterinary.lat,
            'lng': veterinary.lng,
        };
        sessionStorage.setItem('veterinary_' + newVeterinary.id.toString(), JSON.stringify(newVeterinary));
        this.storedVeterinary.push(newVeterinary);
    }

    updateVeterinaries(veterinary: Veterinary) : void {
        var veterinaryToUpdate = JSON.parse(sessionStorage.getItem('veterinary_' + veterinary.id.toString()));
        veterinaryToUpdate.name = veterinary.name;
        veterinaryToUpdate.lat = veterinary.lat;
        veterinaryToUpdate.lng = veterinary.lng;
        sessionStorage.setItem('veterinary_' + veterinary.id.toString(), JSON.stringify(veterinaryToUpdate));

        var storedVeterinaryToEdit = this.storedVeterinary.filter((veterinaryToEdit) => {
            return veterinaryToEdit.id == veterinary.id;
        });
        storedVeterinaryToEdit[0].name = veterinary.name;
        storedVeterinaryToEdit[0].lat = veterinary.lat;
        storedVeterinaryToEdit[0].lng = veterinary.lng;
    }

    deleteVeterinary(veterinary: Veterinary) : void {
        sessionStorage.removeItem('veterinary_' + veterinary.id.toString());
        const index = this.storedVeterinary.indexOf(veterinary);

        if(-1 < index) {
            this.storedVeterinary.splice(index,  1);
        }
    }

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

    hydrateBdd(): void {
        var storageKeys = Object.keys(sessionStorage);
        var veterinaryKeys = [];
        for (var j = 0; j < storageKeys.length; j++) {
            if (storageKeys[j].indexOf('veterinary_') != -1) {
                veterinaryKeys.push(storageKeys[j]);
            }
        }
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
