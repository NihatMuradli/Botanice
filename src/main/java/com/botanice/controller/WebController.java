package com.botanice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        return "index"; // This will resolve to src/main/resources/templates/index.html
    }
    @GetMapping("/templates/flower-index.html")
    public String flowerIndex() {
        return "flower-index"; 
    }
    @GetMapping("/templates/flower-profile.html")
    public String flowerProfile() {
        return "flower-profile"; 
    }
    @GetMapping("/templates/login.html")
    public String login() {
        return "login"; 
    }
    @GetMapping("/templates/robot.html")
    public String robot() {
        return "robot"; 
    }
    @GetMapping("/templates/robot-index.html")
    public String robotIndex() {
        return "robot-index"; 
    }
    @GetMapping("/templates/signup.html")
    public String signup() {
        return "signup"; 
    }
}
