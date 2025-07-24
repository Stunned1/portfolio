package anguy98.portfolio;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class PortfolioApplication {

	public static void main(String[] args) {

			Dotenv dotenv = Dotenv.configure().ignoreIfMissing().load(); //Remove when deploying; no .env to load

			if (dotenv.get("MAIL_USERNAME") != null) {
				System.setProperty("MAIL_USERNAME", dotenv.get("MAIL_USERNAME")); //Remove when deploying; no .env to load
			}
			if (dotenv.get("MAIL_PASSWORD") != null) {
				System.setProperty("MAIL_PASSWORD", dotenv.get("MAIL_PASSWORD")); //Remove when deploying; no .env to load
			}
			if (dotenv.get("MAIL_RECIPIENT") != null) {
				System.setProperty("MAIL_RECIPIENT", dotenv.get("MAIL_RECIPIENT")); //Remove when deploying; no .env to load
			}

		SpringApplication.run(PortfolioApplication.class, args);
	}

}
