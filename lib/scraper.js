import axios from "axios";
import cheerio from "cheerio";
import db from "../lib/db";

export async function getHTML(url) {
    const { data: html } = await axios.get(url);
    return html;
}

export async function getFollersTweeter(html) {
    const $ = cheerio.load(html);
    return $("[data-nav='followers'] .ProfileNav-value").data("count");
}

export async function getInstagramFollowers(html) {
    const $ = cheerio.load(html);
    const dataString = $('script[type="application/ld+json"]').html();
    const pageObject = JSON.parse(dataString);
    return parseInt(
        pageObject.mainEntityofPage.interactionStatistic.userInteractionCount
    );
}

export async function getCountInsta() {
    const html = await getHTML("https://www.instagram.com/anaizzle_/");
    const followersInstagram = await getInstagramFollowers(html);
    return followersInstagram;
}

export async function getCountTweeter() {
    const html = await getHTML("https://twitter.com/elonmusk?lang=fr");
    const followersTwitter = await getFollersTweeter(html);

    return followersTwitter;
}

export async function runCron() {
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
    console.log("Done crawling.");
}
