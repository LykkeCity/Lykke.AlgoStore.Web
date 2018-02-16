import { AfterViewInit, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { EditorConfig } from './models/code-editor-config.model';

declare var ace;
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  editor: any;
  @Input() config: EditorConfig;
  @Output() onInitCompleted = new EventEmitter<any>();

  defaultData: EditorConfig;

  constructor() {
    this.defaultData = {
      mode: 'java',
      readOnly: true,
      sourceCode: ''
    }
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if(simpleChanges['config'] && simpleChanges['config'].currentValue) {
      this.config = { ...this.defaultData, ...simpleChanges['config'].currentValue };
    }
  }

  ngAfterViewInit() {
    this.editor = ace.edit('editor');
    this.editor.setTheme('ace/theme/eclipse');
    this.editor.setHighlightActiveLine(false);

    this.editor.session.selection.on('changeCursor', (e) => {
      this.editor.setHighlightActiveLine(false);
    });

    if(!this.config.readOnly) {
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

    this.onInitCompleted.emit(this.editor);
  }

  onThemeChange(): void {
    if (this.editor.renderer.$themeId.indexOf('eclipse') !== -1) {
      this.editor.setTheme('ace/theme/monokai');
    } else {
      this.editor.setTheme('ace/theme/eclipse');
    }
  }

}
