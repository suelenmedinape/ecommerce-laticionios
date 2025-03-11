import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: "app-admin-redirected",
  template: "<p>Redirecting to admin panel...</p>",
  standalone: true,
})
export class AdminRedirectedComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    // Short delay to allow the template to render
    setTimeout(() => {
      try {
        window.location.href = "http://localhost:4201"
      } catch (error) {
        console.error("Failed to redirect:", error)
        // Fallback to home page if redirect fails
        this.router.navigate(["/"])
      }
    }, 100)
  }
}
