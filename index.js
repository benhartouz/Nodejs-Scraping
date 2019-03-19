import { getHTML, getFollersTweeter } from "./lib/scraper";

async function go() {
    const value = await getHTML("https://twitter.com/elonmusk?lang=fr");
    const followers = await getFollersTweeter(value);
    console.log(followers);
}

go();
