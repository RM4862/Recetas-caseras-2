import { AuthService } from './../../../auth/services/auth.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  get auth (){
    return this.authService.auth;
  }
  constructor(private router:Router,
              private authService:AuthService
  ){}
  logout(){
    this.router.navigate(['./auth']);
  }

  ngOnInit(): void {

  }
}
