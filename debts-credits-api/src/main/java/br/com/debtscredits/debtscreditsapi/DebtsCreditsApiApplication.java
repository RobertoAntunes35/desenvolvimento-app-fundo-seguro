package br.com.debtscredits.debtscreditsapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;


@EntityScan(basePackages = "br.com.debtscredits.debtscreditsapi.modules.model")
@SpringBootApplication
public class DebtsCreditsApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(DebtsCreditsApiApplication.class, args);
		System.out.println("Hello World");
	}

}
