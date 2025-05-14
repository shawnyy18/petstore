package com.guarin.pet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController // Simplifies controller with automatic @ResponseBody
@RequestMapping(path = "/guarin/pets")
@CrossOrigin(origins = "http://localhost:5173")
public class PetController {

    @Autowired
    private PetRepository petRepository;

    @GetMapping()
    public Iterable<Pet> getAllPets() {
        return petRepository.findAll();
    }

    @PostMapping()
    public ResponseEntity<?> createPet(@RequestBody Pet pet) {
        try {
            if (pet.getName() == null || pet.getName().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Pet name is required."));
            }
            if (pet.getPrice() < 0) {
                return ResponseEntity.badRequest().body(Map.of("message", "Price cannot be negative."));
            }

            Pet savedPet = petRepository.save(pet);
            return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Unexpected error occurred: " + e.getMessage()));
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<?> updatePet(@PathVariable Integer id, @RequestBody Pet pet) {

        System.out.println("🔄 PUT /guarin/pets/" + id + " received body: " + pet);

        try {
            if (pet.getName() == null || pet.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Pet name is required."));
            }
            if (pet.getPrice() < 0) {
                return ResponseEntity.badRequest().body(Map.of("message", "Price cannot be negative."));
            }

            Pet currentPet = petRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("No Pet found with id: " + id));

            currentPet.setName(pet.getName());
            currentPet.setSpecies(pet.getSpecies());
            currentPet.setBreed(pet.getBreed());
            currentPet.setGender(pet.getGender());
            currentPet.setImage(pet.getImage());
            currentPet.setPrice(pet.getPrice());

            petRepository.save(currentPet);
            return ResponseEntity.ok("Pet with id " + id + " updated.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Unexpected error occurred: " + e.getMessage()));
        }
    }



    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePet(@PathVariable Integer id) {
        Optional<Pet> pet = petRepository.findById(id);
        if (pet.isPresent()) {
            petRepository.deleteById(id);
            return ResponseEntity.ok("Pet with id " + id + " deleted.");
        } else {
            return ResponseEntity.badRequest().body("No Pet found with id: " + id);
        }
    }

    @PostMapping("/bulk")
    public ResponseEntity<List<Pet>> bulkUpload(@RequestBody List<Pet> pets) {
        try {
            // Optional: Add validation, e.g., price must be positive
            for (Pet pet : pets) {
                if (pet.getPrice() < 0) {
                    pet.setPrice(0.0);  // Set to default price if invalid
                }
            }
            // Bulk save the list of pets
            List<Pet> savedPets = petRepository.saveAll(pets);
            return new ResponseEntity<>(savedPets, HttpStatus.CREATED);
        } catch (DataIntegrityViolationException e) {
            // Handle validation errors (e.g., constraint violations)
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

}
