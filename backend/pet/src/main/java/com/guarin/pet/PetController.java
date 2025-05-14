package com.guarin.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.View;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Allow requests from React's development server
@Controller // This means that this class is a Controller
@RequestMapping(path="/guarin/pets") // This means URL's start with /guarin/pets
public class PetController {
    @Autowired
    private PetRepository petRepository;

    @Autowired
    private View error;

    @GetMapping()
    public @ResponseBody Iterable<Pet> getAllPets() {
        return petRepository.findAll(); // Return all pets
    }

    @PostMapping()
    public ResponseEntity<Pet> createPet(@RequestBody Pet pet) {
        Pet savedPet = petRepository.save(pet);
        return ResponseEntity.ok(savedPet); // Returns the saved Pet object
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Integer id, @RequestBody Pet pet) {
        Pet currentPet = petRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No Pet found with id: " + id));

        currentPet.setName(pet.getName());
        currentPet.setSpecies(pet.getSpecies());
        currentPet.setBreed(pet.getBreed());
        currentPet.setGender(pet.getGender());
        currentPet.setImage(pet.getImage());
        currentPet.setDescription(pet.getDescription());
        currentPet.setPrice(pet.getPrice());
        petRepository.save(currentPet);
        return ResponseEntity.ok(currentPet); // Return the updated Pet object
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePet(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            petRepository.deleteById(id);
            return ResponseEntity.ok(Collections.singletonMap("message", "Pet with id " + id + " deleted."));
        } else {
            return ResponseEntity.badRequest().body(Collections.singletonMap("error", "No Pet found with id: " + id));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPet(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            return ResponseEntity.ok(pet.get());
        } else {
            return ResponseEntity.noContent().build();
        }
    }

    @GetMapping("/search/{key}")
    public ResponseEntity<?> searchPet(@PathVariable String key) {
        List<Pet> pets = petRepository.findByNameOrSpeciesOrBreedOrGenderOrImageOrDescription(
                key, key, key, key, key, key);

        if (pets.isEmpty()) {
            return ResponseEntity.ok(Collections.singletonMap("message", "No pet found for keyword: " + key));
        }

        return ResponseEntity.ok(pets);
    }

    @GetMapping("/search/price/{price}")
    public ResponseEntity<?> getPetsByPrice(@PathVariable Double price) {
        List<Pet> pets = petRepository.findByPriceLessThanEqual(price);

        if (!pets.isEmpty()) {
            return ResponseEntity.ok(pets);
        } else {
            return ResponseEntity.ok(Collections.singletonMap("message", "No pets found for the price of: " + price));
        }
    }
}