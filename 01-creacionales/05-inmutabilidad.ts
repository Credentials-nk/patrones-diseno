/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
import {COLORS} from '../helpers/colors.ts'

class CodeEditorState {
    constructor(
        readonly content: string,
        readonly cursorPosition: number,
        readonly unsavedChanges: boolean
    ) {
        this.content = content,
        this.cursorPosition = cursorPosition,
        this.unsavedChanges = unsavedChanges
    }

    copyWith({
        content,
        cursorPosition,
        unsavedChanges
    }:Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
           content ?? this.content,
           cursorPosition ?? this.cursorPosition,
           unsavedChanges ?? this.unsavedChanges 
        )
    }


    displayState(){
        console.log('\n%cEstado del Editor:', COLORS.green)
        console.log(`
            Contenido: ${this.content}
            Cursor Pos: ${this.cursorPosition}
            Unsaved Changes: ${this.unsavedChanges}
        `)
    }
}

class CodeEditorHistory {
    private history: CodeEditorState[] = [];
    private currentIndex: number = -1;

    save(state: CodeEditorState): void {
        if (this.currentIndex < this.history.length - 1) {
            this.history = this.history.splice(0, this.currentIndex + 1)
        }

        this.history.push(state)
        this.currentIndex +=1
    }

    // Deshacer
    undo(): CodeEditorState | null {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            return this.history[this.currentIndex]
        }

        return null
    }

    // Rehacer
    redo(): CodeEditorState | null{
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            return this.history[this.currentIndex]
        }

        return null;
    }

}


function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState(
        "console.log('Hola mundo');",
        2,
        false
    );

    console.log("%cEstado inicial",COLORS.blue)
    history.save(editorState);
    editorState.displayState()

    console.log("%cPrimer cambio",COLORS.blue)
    editorState = editorState.copyWith({
        content: "console.log('Hola mundo); \nconsole.log('Nueva Linea');",
        cursorPosition: 3,
        unsavedChanges: true
    })
    history.save(editorState)
    editorState.displayState()

    console.log("%cMoviendo el cursor",COLORS.blue)
    editorState = editorState.copyWith({
        cursorPosition: 5,
    })
    history.save(editorState)
    editorState.displayState()

    console.log("%cCTRL + Z",COLORS.blue)
    editorState = history.undo()!
    editorState.displayState()

    console.log("%cCTRL + Shift + Z",COLORS.blue)
    editorState = history.redo()!
    editorState.displayState()
}


main()