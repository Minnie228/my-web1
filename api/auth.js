export default function handler(req, res) {
    if (req.method === 'POST') {
        const { password } = req.body;
        if (password === "11250228") {
            res.status(200).json({ success: true });
        } else {
            res.status(401).json({ success: false });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
