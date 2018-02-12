import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Algo } from '../models/algo.interface';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BaseAlgoParam } from '../models/base-algo-param.model';

declare var ace;

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  algo: Algo = {};
  getAlgoSubscription: Subscription;
  getAlgoSourceSubscription: Subscription;
  routeParamsSubscription: Subscription;
  editor: any;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      const id = params['id'];
      this.getAlgoSubscription = this.storeService.getAlgoById(id).subscribe(algo => {
        this.algo = Object.assign(this.algo, this.algo, algo);
      });

      this.getAlgoSourceSubscription = this.storeService.algoGet(id).subscribe(algoSource => {
        this.algo = Object.assign(this.algo, this.algo, algoSource);
      });
    });
  }

  ngAfterViewInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.setHighlightActiveLine(false);

    this.editor.session.selection.on('changeCursor', (e) => {
      this.editor.setHighlightActiveLine(false);
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.getAlgoSubscription.unsubscribe();
    this.getAlgoSourceSubscription.unsubscribe();
  }

  tryAlgo(): void {
    console.log(this.algo);
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
    this.editor.setHighlightActiveLine(true);
  }

  onThemeChange(): void {
    if (this.editor.renderer.$themeId.indexOf('eclipse') !== -1) {
      this.editor.setTheme('ace/theme/monokai');
    } else {
      this.editor.setTheme('ace/theme/eclipse');
    }
  }

}
