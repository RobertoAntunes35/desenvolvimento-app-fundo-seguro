package br.com.debtscredits.debtscreditsapi;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;

@RestController
@RequestMapping("/api")
public class StatusController {
    @GetMapping("status")
    public ResponseEntity<HashMap<String, Object>> getStatusApi() {
        var response = new HashMap<String, Object> ();
        
        response.put("Service", "DEBTS-CREDITS-API");
        response.put("Status", "UP");
        response.put("HttpStatus", HttpStatus.OK.value());
        
        return ResponseEntity.ok(response);
    }
}
