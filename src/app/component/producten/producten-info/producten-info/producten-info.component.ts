import {Component, Input} from '@angular/core';
import {ProductenModel} from "../../../../model/producten.model";

@Component({
  selector: 'app-producten-info',
  templateUrl: './producten-info.component.html',
  styleUrl: './producten-info.component.css'
})
export class ProductenInfoComponent {
  @Input() loading: boolean = true;
  @Input() product: ProductenModel | null = null;
}
