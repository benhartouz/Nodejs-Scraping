import axios from "axios";
import cheerio from "cheerio";

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
