package anguy98.portfolio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000") //remove before deploying; replace with actual domain
public class ContactController {

    private final NotificationService notificationService;

    public ContactController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<String> submitContactForm(@RequestBody ContactFormRequest request) {
        try {
            String subject = "New Contact Form Submission from " + request.getName();
            String message = "Name: " + request.getName() + "\nEmail: " + request.getEmail() + "\nMessage: " + request.getMessage();
            notificationService.sendEmail(subject, message);
            return ResponseEntity.ok("Contact form submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit contact form");
        }
    }
}
