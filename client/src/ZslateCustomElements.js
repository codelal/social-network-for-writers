{
    /* <Editable
    renderElement={renderElement}
    onKeyDown={(event) => {
        // if (event.key == "Dead" && event.ctrlKey) {
        //     Prevent the "`" from being inserted by default.
        //     event.preventDefault();
        //     Otherwise, set the currently selected blocks type to "code".
        //     Determine whether any of the currently selected blocks are code blocks.

        //     const [match] = Editor.nodes(editor, {
        //         match: (n) => n.type === "code",
        //     });

        //     console.log("match", match);
        //     Transforms.setNodes(
        //         editor,
        //         {
        //             type: match ? "paragraph" : "code",
        //         },
        //         {
        //             match: (n) => Editor.isBlock(editor, n),
        //         }
        //     );
        // }
    }}
/>; */
}

//////
{/* <Editable
    renderElement={renderElement}
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
            console.log(event.key);
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
/>; */}
