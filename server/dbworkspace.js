const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/socialnetwork"
);

module.exports.insertDrawingUrl = (userId, drawingUrl) => {
    return db.query(
        `INSERT INTO workspace_drawings (user_id, drawing_url) VALUES($1, $2) RETURNING timestamp`,
        [userId, drawingUrl]
    );
};

module.exports.getDrawingUrl = () => {
    return db.query(
        `SELECT drawing_url, id, timestamp FROM workspace_drawings ORDER BY timestamp DESC LIMIT 5`
    );
};

module.exports.deleteWhiteboard = (whiteboardId) => {
    return db.query(`DELETE FROM workspace_drawings WHERE id = $1`, [
        whiteboardId,
    ]);
};

module.exports.updateDrawing = (dataUrl, whiteboardId) => {
    return db.query(
        `UPDATE workspace_drawings SET drawing_url = $1 WHERE id = $2`,
        [dataUrl, whiteboardId]
    );
};

module.exports.insertText = (userId, text) => {
    return db.query(
        `INSERT INTO workspace_text (user_id, text) VALUES($1, $2) RETURNING timestamp`,
        [userId, text]
    );
};

module.exports.getText = () => {
    return db.query(
        `SELECT text, id, timestamp FROM workspace_text ORDER BY timestamp DESC LIMIT 5`
    );
};

module.exports.deleteText = (textId) => {
    return db.query(`DELETE FROM workspace_text WHERE id = $1`, [textId]);
};
