import { useState, useEffect, useMemo, useCallback } from "react";
import { createEditor, Editor, Transforms, Text } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import axios from "../axios";
import { formateDateTime } from "../formateDate";
import { socket } from "../socket";
import Texteditor from "../texteditor";

import { initialValue, afterSaveValue } from "./defaultTextValues";
import { CustomEditor } from "./customEditor";
import {
    DefaultElement,
    CodeElement,
    LeafBold,
    LeafItalic,
} from "./components";

export default function SlateTexteditor() {
    const editor = useMemo(() => withReact(createEditor()), []);
    const [value, setValue] = useState(initialValue);
    const [textSaved, setTextSaved] = useState(false);
    const [error, setError] = useState(false);
    const [latestTextes, setLatestTextes] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [switchToCollaborativeMode, setSwitchToCollaborativeMode] = useState(
        false
    );

    let newTextValue;
    let modus = true;

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

        axios
            .get("/api/latest-textes/" + modus)
            .then(({ data }) => {
                console.log("modus", modus);
                if (data.success) {
                    setLatestTextes(data.latestTextes);
                    // console.log(data, data.latestTextes);
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
    }

    function submitText() {
        const text = { text: value[0].children[0].text, pmodus: true };
        console.log(text);
        axios
            .post("/api/save-text", text)
            .then(({ data }) => {
                console.log("/api/save-text");
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
            pmodus: true,
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
            {!switchToCollaborativeMode && (
                <>
                    {error && (
                        <p className="error-slate">
                            Something went wrong, try again!
                        </p>
                    )}
                    <h1 className="slate-h1">Private Texteditor</h1>
                    {latestTextes && (
                        <div className="latest-textes">
                            <h2>My Textes:</h2>
                            {latestTextes.map((text) => (
                                <div key={text.id}>
                                    {formateDateTime(text.timestamp)}
                                    <button>Edit</button>
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
                        onClick={() => {
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
                            <button onClick={submitText}>save Text</button>

                            <button
                                id="slate-button"
                                onClick={() =>
                                    setSwitchToCollaborativeMode(true)
                                }
                            >
                                Switch to Collaborative Mode
                            </button>
                        </div>
                        {textSaved && (
                            <p className="text-saved-slate">
                                {" "}
                                You text is saved!
                            </p>
                        )}
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
                </>
            )}
            {switchToCollaborativeMode && <Texteditor />}
        </div>
    );
}
