import { useState, useEffect, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import axios from "../axios";
import { formateDateTime } from "../formateDate";
import { socket } from "../socket";

import { initialValue, afterSaveValue } from "./defaultTextValues";
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
    const [textSaved, setTextSaved] = useState(false);
    const [error, setError] = useState(false);
    const [latestTextes, setLatestTextes] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    let newTextValue;

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

    useEffect(() => {
        console.log("useEffect runs");
        // let abort;

        socket.on("text writing", (textdata) => {
            console.log("text writing", textdata);

            newTextValue = [
                {
                    children: [{ textdata }],
                },
            ];

            setValue(newTextValue);
        });

        axios
            .get("/api/latest-textes")
            .then(({ data }) => {
                if (data.success) {
                    setLatestTextes(data.latestTextes);
                    console.log(data, data.latestTextes);
                    setUpdateList(true);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in api/latest-setLatestWritebaords", err);
                setError(true);
            });

        // return () => {
        //     abort = true;
        // };
    }, [updateList, newTextValue]);

    function handleChange(value) {
        setValue(value);
        const text = { text: value[0].children[0].text };
        socket.emit("text writing", text);
    }

    function submitText() {
        const text = { text: value[0].children[0].text };
        console.log(text);
        axios
            .post("/api/save-text", text)
            .then(({ data }) => {
                console.log("data /api/save-text");
                if (data.success) {
                    setTextSaved(true);
                    setValue(afterSaveValue);
                    setUpdateList(false);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in /api/delete-text", err);
                this.setState({
                    error: true,
                });
            });
    }

    function deleteText(idText) {
        console.log("delete text runs");
        const textId = {
            textId: idText,
        };
        axios
            .post("/api/delete-text", textId)
            .then(({ data }) => {
                if (data.success) {
                    setUpdateList(false);
                } else {
                    setError(true);
                }
            })
            .catch((err) => {
                console.log("error in /api/delete-text", err);
                this.setState({
                    error: true,
                });
            });
    }

    return (
        <div className="texteditor-container">
            {error && <p className="error">Something went wrong, try again!</p>}
            <p>Latest Textes:</p>
            {latestTextes && (
                <div className="latest-textes">
                    {latestTextes.map((text) => (
                        <div key={text.id}>
                            <p>Text</p>
                            {formateDateTime(text.timestamp)}
                            <button
                                onClick={() => {
                                    deleteText(text.id);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <Slate
                editor={editor}
                value={value}
                onChange={(value) => {
                    setValue(value);
                    handleChange(value);
                    setTextSaved(false);
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
                    <button onClick={submitText}>save Text</button>
                    {textSaved && (
                        <p className="text-saved"> You text is saved!</p>
                    )}
                </div>

                <div className="edit-area">
                    {" "}
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
                </div>
            </Slate>
        </div>
    );
}
