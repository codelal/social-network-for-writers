import { useState, useEffect, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";

import { initialValue } from "./slateInitialvalue";
import { CustomEditor } from "./customEditor";
import {
    DefaultElement,
    CodeElement,
    LeafBold,
    LeafItalic,
} from "./components";

export default function Texteditor() {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(initialValue);

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.

    const renderElement = useCallback((props) => {
        if (props.element.type == "code") {
            return <CodeElement {...props} />;
        } else {
            return <DefaultElement {...props} />;
        }
    });

    const renderLeaf = useCallback((props) => {
        if (props.leaf.bold) {
            return <LeafBold {...props} />;
        } else {
            return <LeafItalic {...props} />;
        }
    }, []);

    return (
        <div className="texteditor">
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => {
                    console.log("change");
                    setValue(value);
                }}
            >
                <div className="toolbar">
                    <button
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }}
                    >
                        Bold
                    </button>
                    <button
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                        }}
                    >
                        Code Block
                    </button>
                    <button
                        onMouseDown={(event) => {
                            event.preventDefault();
                            CustomEditor.toggleItalicMark(editor);
                        }}
                    >
                        Italic
                    </button>
                </div>

                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }

                        if (event.key == "Dead") {
                            event.preventDefault();
                            CustomEditor.toggleCodeBlock(editor);
                        }

                        if (event.key == "b") {
                            event.preventDefault();
                            CustomEditor.toggleBoldMark(editor);
                        }
                    }}
                />
            </Slate>
        </div>
    );
}
