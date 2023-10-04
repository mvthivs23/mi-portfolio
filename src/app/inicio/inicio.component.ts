import { Component } from '@angular/core';
import { faJenkins } from '@fortawesome/free-brands-svg-icons';
import { faAngular } from '@fortawesome/free-brands-svg-icons';
import { faJava } from '@fortawesome/free-brands-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinux } from '@fortawesome/free-brands-svg-icons';
import { faShieldHalved } from '@fortawesome/free-solid-svg-icons';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  icon = faJenkins;
  icon2 = faAngular;
  icon3 = faJava;
  icon4 = faGithub;
  icon5 = faLinux;
  icon6 = faShieldHalved;
}
