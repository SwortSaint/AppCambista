import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanLoad{

  constructor(public userService: UserService){}

  canLoad(): Observable<boolean> | Promise<boolean> | boolean{
    return this.userService.validaToken();
  }

 /* canActivate(): Observable<boolean> | Promise<boolean> | boolean{
    return false;
  }*/
}
