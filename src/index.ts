#!/usr/bin/env node

import Commander, { Command } from "commander";
import { Actions } from "./actions";

Commander.version("1.0.0").description("To Read Project CLI");

Commander.command("list")
    .alias("ls")
    .description("List all articles")
    .action(() => {
        Actions.getArticles();
    });

Commander.command("open <id>")
    .alias("o")
    .description("Open the article in the default browser.")
    .action((id: number) => {
        Actions.openArticle(id);
    });

Commander.command("saveArticle <url>")
    .alias("sa")
    .option("-i, --information <info>", "Description of the article.")
    .option("-t, --tags <tags>", "Tags separated by comma.")
    .description("Saves an article.")
    .action((url: string, cmd: Command) => {
        let description: string = cmd.opts()["information"];
        let tags: string = cmd.opts()["tags"];
        Actions.saveArticle(url, description, tags);
    });

Commander.command("updateArticle <id>")
    .alias("ua")
    .option("-i, --information <info>", "Description of the article.")
    .option("-t, --tags <tags>", "Tags separated by comma.")
    .option("-a, --addTags <addTags>", "Whether or not the tags given will be deleted (false) or added (true)")
    .description("Update an article's information. Only description and tags can be changed.")
    .action((id: number, cmd: Command) => {
        let description: string = cmd.opts()["information"];
        let tags: string = cmd.opts()["tags"];
        let addTags: boolean = cmd.opts()["addTags"] == "true" ? true : false;
        Actions.updateArticle(id, addTags, description, tags);
    });

Commander.command("deleteArticle <id>")
    .alias("da")
    .description("Delete the article with the given ID")
    .action((id: number) => {
        Actions.deleteArticle(id);
    });

Commander.parse(process.argv);
