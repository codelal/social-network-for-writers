export const DefaultElement = (props) => {
    return <div {...props.attributes}>{props.children}</div>;
};

// Define a React component renderer for our code blocks.
export const CodeElement = (props) => {
    console.log("hh",props.children);
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
        <em
            {...props.attributes}
            style={{ fontWeight: props.leaf.italic ? "italic" : "normal" }}
        >
            {props.children}
        </em>
    );
};
