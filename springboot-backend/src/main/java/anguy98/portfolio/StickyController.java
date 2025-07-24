package anguy98.portfolio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sticky")
@CrossOrigin(origins = "http://localhost:3000") //remove before deploying; replace with actual domain
public class StickyController {

    private final NotificationService notificationService;

    public StickyController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping
    public ResponseEntity<String> submitStickyForm(@RequestBody StickyFormRequest request) {
        try {
            String subject = "New Stickynote Add Request from " + request.getName();
            String message = "Name: " + request.getName() + "\nRole/Position: " + request.getRole() + "\nStatement: " + request.getStatement();
            notificationService.sendEmail(subject, message);
            return ResponseEntity.ok("Stickynote add request submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit stickynote add request");
        }
    }
}
