import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { EditorConfig } from './models/code-editor-config.model';

declare var ace;
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnChanges {

  editor: any;
  timeoutId: any;
  doneTypingInterval = 500;

  @Input() config: EditorConfig;
  @Output() onInitCompleted = new EventEmitter<any>();
  @Output() onCodeUpdated = new EventEmitter<string>();

  defaultData: EditorConfig;

  constructor(private ref: ChangeDetectorRef) {
    this.defaultData = {
      mode: 'java',
      readOnly: true,
      sourceCode: ''
    };
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (simpleChanges['config'] && simpleChanges['config'].currentValue) {
      this.config = { ...this.defaultData, ...simpleChanges['config'].currentValue };
      this.ref.detectChanges();
    }
  }

  ngAfterViewInit() {
    ace.config.setModuleUrl(
      'algo-store-monokai',
      '../../../assets/editor-themes/algo-store-monokai.js'
    );

    ace.config.setModuleUrl(
      'algo-store-eclipse',
      '../../../assets/editor-themes/algo-store-eclipse.js'
    );

    this.editor = ace.edit('editor');
    this.editor.setTheme('algo-store-eclipse');
    this.editor.setHighlightActiveLine(false);

    this.editor.session.on('change', () => {
      clearTimeout(this.timeoutId);
      this.timeoutId = setTimeout(() => {
        this.onCodeUpdated.emit(this.editor.getValue());
      }, this.doneTypingInterval);
    });

    this.editor.session.selection.on('changeCursor', () => {
      this.editor.setHighlightActiveLine(false);
    });

    if (!this.config.readOnly) {
      this.editor.setOptions({
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      });

      this.editor.commands.addCommand({
        name: 'showKeyboardShortcuts',
        bindKey: {win: 'Ctrl-Alt-h', mac: 'Command-Alt-h'},
        exec: function(currentEditor) {
          ace.config.loadModule('ace/ext/keybinding_menu', (module) => {
            module.init(currentEditor);
            currentEditor.showKeyboardShortcuts();
          });
        }
      });
    } else {
      this.editor.renderer.setOptions({
        showFoldWidgets: false
      });
    }

    this.onInitCompleted.emit(this.editor);
  }

  onThemeChange(): void {
    if (this.editor.renderer.$themeId.indexOf('eclipse') !== -1) {
      this.editor.setTheme('algo-store-monokai');
    } else {
      this.editor.setTheme('algo-store-eclipse');
    }
  }

}
