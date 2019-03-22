import { runCron } from "./scraper";
import corn from "node-cron";

corn.schedule("* * * * *", () => {
    runCron();
});
