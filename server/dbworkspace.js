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
        `SELECT drawing_url, id, timestamp FROM workspace_drawings ORDER BY timestamp DESC`
    );
};

module.exports.deleteWhiteboard = (whiteboardId) => {
    return db.query(
        `DELETE FROM workspace_drawings WHERE id = $1`, [whiteboardId]
    );
};

module.exports.updateDrawing = (dataUrl, whiteboardId) => {
    return db.query(
        `UPDATE workspace_drawings SET drawing_url = $1 WHERE id = $2`,
        [dataUrl, whiteboardId]
    );
};