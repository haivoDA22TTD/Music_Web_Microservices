package microservices.music_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

@EnableEurekaServer
@SpringBootApplication
public class MusicWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(MusicWebApplication.class, args);
	}

}
