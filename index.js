import { getHTML, getCountInsta, getCountTweeter } from "./lib/scraper";

async function go() {
    const [instaCount, tweeterCount] = await Promise.all([
        getCountInsta(),
        getCountTweeter()
    ]);
    console.log("followers Twitter:", instaCount);
    console.log("followers Instagram:", tweeterCount);
}

go();
