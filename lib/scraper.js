import axios from "axios";
import cheerio from "cheerio";

async function getHTML(url) {
    const { data: html } = await axios.get(url);
    return html;
}

async function getFollersTweeter(html) {
    const $ = cheerio.load(html);
    return $("[data-nav='followers'] .ProfileNav-value").data("count");
}

export { getHTML, getFollersTweeter };
