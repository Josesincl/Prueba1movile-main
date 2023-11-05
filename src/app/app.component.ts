import { Component } from '@angular/core';
import { RegionService } from './services/region.service';




@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  title = 'region'
  public regiones:Array<any> =[]
  constructor(
    private RegionService:RegionService
  ) {
  


    this.RegionService.getRegions().subscribe({next :(resp:any) => 
      this.regiones = resp

    })

  }
  
}
