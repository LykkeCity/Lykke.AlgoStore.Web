import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Algo } from '../../models/algo.interface';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { AlgoMetadata, getDefaultMetaData } from '../models/algo-metadata.model';
import { Subscription } from 'rxjs/Subscription';
import { BaseAlgoParam } from '../models/base-algo-param.model';

declare var ace;

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  algo: Algo;
  metadata: AlgoMetadata;
  getAlgoSubscription: Subscription;
  routeParamsSubscription: Subscription;
  editor: any;

  text = `
  public class Dog {
    String breed;
    int age;
    String color;

    void barking() {
      IntegerBTC AssetPair = assetBTC;
    }

    void hungry() {
      Integer meta2 = meta2Value;
    }

    void sleeping() {
    }
 }
  `;

  constructor(private storeService: StoreService, private route: ActivatedRoute) {
    this.algo = { //TODO delete this
      Name: 'My test Algo',
      Description: 'The best Algo ever',
      Rating: '5.67',
      UsersCount: '676',
      Author: 'Todor Ivanov'
    };

    this.metadata = getDefaultMetaData(); // TODO get from API
  }

  ngOnInit() {
    this.routeParamsSubscription = this.route.params.subscribe(params => {
      const id = params['id'];

      this.getAlgoSubscription = this.storeService.algoGet(id).subscribe(algo => {
        // TODO get algo here
      })
    });
  }

  ngAfterViewInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');

    this.editor.setOptions({
      enableSnippets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });

    this.editor.commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function () {
      }
    });
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
    this.getAlgoSubscription.unsubscribe();
  }

  tryAlgo(): void {
    console.log(this.algo);
  }

  highlight(meta: BaseAlgoParam): void {
    this.editor.find(meta.Key);
  }

  onThemeChange(): void {
    if (this.editor.renderer.$themeId.indexOf('eclipse') !== -1) {
      this.editor.setTheme('ace/theme/monokai');
    } else {
      this.editor.setTheme('ace/theme/eclipse');
    }
  }

}
