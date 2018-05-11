import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlgoService } from '../../services/algo.service';
import { Algo } from '../models/algo.interface';

@Component({
  selector: 'app-algo-create',
  templateUrl: './algo-create.component.html',
  styleUrls: ['./algo-create.component.scss']
})
export class AlgoCreateComponent {

  algoForm: FormGroup;
  Algo: Algo = {};
  editor: any;
  userFile: any;

  constructor(private algoService: AlgoService,
              private formBuilder: FormBuilder,
              private ref: ChangeDetectorRef) {

    this.algoForm = this.formBuilder.group({
      AlgoName: ['', Validators.required],
      Description: ['']
    });
  }

  onEditorCreated(editor: any): void {
    this.editor = editor;
  }

  onCodeUpdate(code: string): void {
    this.Algo.Data = code;
    this.ref.detectChanges();
  }

  openFile(event) {
    const input = event.target;
    this.userFile = event.target.files[0];
    this.userFile['ext'] = this.userFile.name.substring(this.userFile.name.lastIndexOf('.') + 1);

    if (this.userFile['ext'] !== 'cs') {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      this.Algo.Data = reader.result;
    };
    reader.readAsText(input.files[0]);
  }

}
