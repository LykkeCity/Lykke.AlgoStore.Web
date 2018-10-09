import { ChangeDetectorRef, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlgoService } from '../../core/services/algo.service';
import { Algo } from '../models/algo.interface';
import { TabsetComponent } from 'ngx-bootstrap';
import { Subscription } from 'rxjs';
import { AlgoTemplate } from '../../models/algo-template.model';
import templates from '../../../assets/algo-templates/templates';
import { FileService } from '../../core/services/file.service';

@Component({
  selector: 'app-algo-create',
  templateUrl: './algo-create.component.html',
  styleUrls: ['./algo-create.component.scss']
})
export class AlgoCreateComponent implements OnDestroy {

  @ViewChild('creationTabs') staticTabs: TabsetComponent;

  algoForm: FormGroup;
  Algo: Algo = {};
  templates: AlgoTemplate[] = templates;
  currentTemplate = '';
  userFile: any;
  ready: boolean;
  algoSubmitted: boolean;
  algoErrors: string;

  editor: any;
  subscriptions: Subscription[] = [];

  constructor(private algoService: AlgoService,
              private formBuilder: FormBuilder,
              private ref: ChangeDetectorRef,
              private fileService: FileService) {

    this.algoForm = this.formBuilder.group({
      Name: ['', Validators.required],
      Description: ['']
    });

    this.ready = true;
    this.algoSubmitted = false;
  }

  ngOnDestroy() {
    this.templates.forEach(template => template.state = 'collapsed');
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCodeUpdate(code: string): void {
    this.Algo.Content = code;
    this.ref.detectChanges();
  }

  nextTab(tabIndex: number): void {
    this.staticTabs.tabs[tabIndex].active = true;

    if (tabIndex === 2) {
      this.ref.detectChanges();
      this.editor.resize(true); // force
    }
  }

  goBack(): void {
    this.algoSubmitted = false;
    this.ref.detectChanges();
    this.staticTabs.tabs[2].active = true;
    this.algoErrors = '';
  }

  openFile(event) {
    const input = event.target;
    this.userFile = event.target.files[0];
    if (!this.userFile) {
      return;
    }

    this.userFile['ext'] = this.userFile.name.substring(this.userFile.name.lastIndexOf('.') + 1);

    if (this.userFile['ext'] !== 'cs') {
      this.Algo.Content = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.Algo.Content = reader.result;
    };
    reader.readAsText(input.files[0]);
  }

  onSubmit(): void {
    if (!this.Algo.Content) {
      return;
    }

    this.ready = false;

    try {
      this.subscriptions.push(this.algoService.createAlgo({ ...this.algoForm.value, ...this.Algo, Content: btoa(this.Algo.Content) })
        .subscribe((newAlgo) => {
          this.ready = true;
          this.algoSubmitted = true;
          this.Algo.AlgoId = newAlgo.Id;
        }, (error) => {
          this.ready = true;
          this.algoSubmitted = true;
          this.algoErrors = error.DisplayMessage;
        }));
    } catch (e) {
      this.ready = true;
      this.algoSubmitted = true;
      this.algoErrors = e.message;
    } 
  }

  initEditor(event) {
      this.editor = event;
  }

  setTemplate(template: AlgoTemplate): void {
    if (template.code) {
      this.currentTemplate = template.code;
      this.Algo.Content = this.currentTemplate;
    } else {
      this.fileService.readFile(template.filePath).subscribe((file) => {
        this.templates.find(t => t.name === template.name).code = file;
        this.currentTemplate = template.code;
        this.Algo.Content = this.currentTemplate;
      });
    }
  }

  toggleState(index: number): void {
    this.templates[index].state = this.templates[index].state === 'collapsed' ? 'expanded' : 'collapsed';
  }
}
