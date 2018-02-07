import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Algo } from '../../models/algo.interface';
import { StoreService } from '../../services/store.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-algo-detail',
  templateUrl: './algo-details.component.html',
  styleUrls: ['./algo-details.component.scss']
})
export class AlgoDetailsComponent implements OnInit, AfterViewInit, OnDestroy {

  algo: Algo;
  metadata: any;
  @ViewChild('editor') editor;

  text = `
  public class Dog {
    String breed;
    int age;
    String color;

    void barking() {
    }

    void hungry() {
    }

    void sleeping() {
    }
 }
  `;

  constructor(private storeService: StoreService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.algo = {
      Name: 'My test Algo',
      Description: 'The best Algo ever',
      Rating: '5.67',
      UsersCount: '676',
      Author: 'Todor Ivanov'
    };

    this.metadata = [
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
      {
        Name: 'Metadata 1',
        Value: 'MetaValue'
      },
    ];
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.storeService.algoGet(id).subscribe(algo => {
        // TODO get algo here
      })
    });
  }

  ngAfterViewInit() {
    this.editor.setTheme('eclipse');

    this.editor.getEditor().setOptions({
      enableSnippets: true,
      enableBasicAutocompletion: true,
      enableLiveAutocompletion: true
    });

    this.editor.getEditor().commands.addCommand({
      name: 'showOtherCompletions',
      bindKey: 'Ctrl-.',
      exec: function () {
      }
    });

    this.cdr.detectChanges();
  }

  ngOnDestroy() {
  }

  tryAlgo(): void {
    console.log(this.algo);
  }

  highlight(meta: any): void {
    console.log(meta);
  }

  onThemeChange(): void {
    if (this.editor.getEditor().renderer.$themeId.indexOf('eclipse') !== -1) {
      this.editor.setTheme('monokai');
    } else {
      this.editor.setTheme('eclipse');
    }
  }

}
