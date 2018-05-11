import { Component } from '@angular/core';
import { Algo, getAlgos } from '../models/algo.interface';
import { AlgoService } from '../../services/algo.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-my-algos',
  templateUrl: './my-algos.component.html',
  styleUrls: ['./my-algos.component.scss']
})
export class MyAlgosComponent {

  algos: Algo[];
  loadingIndicator: boolean;
  subscriptions: Subscription[] = [];

  constructor(private algoService: AlgoService) {
      // this.subscriptions.push(this.algoService.getMyAlgos().subscribe((algos) => {
      //   this.algos = algos;
      // }));


      this.algos = getAlgos();
  }

  duplicateAlgo(id: string): void {

  }

  deleteAlgo(id: string): void {

  }
}
