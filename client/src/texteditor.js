import { useState, useEffect, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms, Text} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { initialValue } from "./slateInitialvalue";

export default function Texteditor() {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(initialValue);
    console.log("editor", editor);

    // Define a rendering function based on the element passed to `props`. We use
    // `useCallback` here to memoize the function for subsequent renders.

    const renderElement = useCallback((props) => {
        if (props.element.type == "code") {
            // console.log(props.element);
            return <CodeElement {...props} />;
        } else {
            return <DefaultElement {...props} />;
        }
    });

    const renderLeaf = useCallback((props) => {
        return <Leaf {...props} />;
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
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => {
                        if (!event.ctrlKey) {
                            return;
                        }

                        if (event.key == "Dead") {
                            event.preventDefault();

                            // Determine whether any of the currently selected blocks are code blocks.

                            const [match] = Editor.nodes(editor, {
                                match: (n) => n.type === "code",
                            });

                            // Define a leaf rendering function that is memoized with `useCallback`.

                            Transforms.setNodes(
                                editor,
                                {
                                    type: match ? "paragraph" : "code",
                                },
                                {
                                    match: (n) => Editor.isBlock(editor, n),
                                }
                            );
                        }

                        if (event.key == "b") {
                            // console.log("Text", Text, "Editor", Editor);
                            event.preventDefault();
                            Transforms.setNodes(
                                editor,
                                { bold: true },
                                // Apply it to text nodes, and split the text node up if the
                                // selection is overlapping only part of it.
                                {
                                    match: (n) => Text.isText(n),
                                    split: true,
                                }
                            );
                        }
                    }}
                />
            </Slate>
        </div>
    );
}

// Define a React component renderer for our code blocks.
const CodeElement = (props) => {
    console.log(props);
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};

const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component to render leaves with bold text.
const Leaf = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
        >
            {props.children}
        </span>
    );
};
