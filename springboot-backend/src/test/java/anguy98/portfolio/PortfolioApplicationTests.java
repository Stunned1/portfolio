package anguy98.portfolio;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest(properties = {
	"spring.mail.host=localhost",
	"spring.mail.port=1025",
	"spring.mail.username=test",
	"spring.mail.password=test",
	"mail.recipient=test@localhost"
})
class PortfolioApplicationTests {

	@Test
	void contextLoads() {
	}

}
