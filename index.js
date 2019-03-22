import { getHTML, getCountInsta, getCountTweeter } from "./lib/scraper";
import express from "express";
import db from "./lib/db";
import "./lib/cron";

const app = express();

// Scraper
app.get("/scrape", async (req, res) => {
    const [instaCount, tweeterCount] = await Promise.all([
        getCountInsta(),
        getCountTweeter()
    ]);
    // Add a instagram counts on current date
    db.get("instagram")
        .push({ date: Date.now(), count: instaCount })
        .write();
    db.get("tweeter")
        .push({ date: Date.now(), count: tweeterCount })
        .write();
    res.json({ instaCount, tweeterCount });
});

app.listen(3333, () => {
    console.log("Server run on port 3333");
});
