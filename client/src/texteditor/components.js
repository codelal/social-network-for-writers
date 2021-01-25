export const DefaultElement = (props) => {
    return <p {...props.attributes}>{props.children}</p>;
};

// Define a React component renderer for our code blocks.
export const CodeElement = (props) => {
    console.log(props);
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};


// Define a React component to render leaves with bold text.
export const LeafBold = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.bold ? "bold" : "normal" }}
        >
            {props.children}
        </span>
    );
};

export const LeafItalic = (props) => {
    return (
        <span
            {...props.attributes}
            style={{ fontWeight: props.leaf.italic ? "italic" : "normal" }}
        >
            {props.children}
        </span>
    );
};
