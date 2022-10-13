export default async (req, res) => {
    if (req.query.secret !== process.env.PREVIEW_TOKEN) {
        return res.status(401).json({ message: "Invalid token" });
    } else {
        res.setPreviewData({});
        if (req.query.slug) {
            res.redirect(req.query.slug);
        } else {
            res.redirect("/");
        }
    }
};
